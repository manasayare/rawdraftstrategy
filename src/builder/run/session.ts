// Run engine: pure functions over a Session and the workshop's items. The clock is wall time
// (Date.now()), so the timer stays right while the facilitator types, switches tabs or reloads.
import { mins } from "../items";
import type { Capture, CaptureType, Item, Session } from "../types";

export const DEFAULT_SHOW: Record<string, boolean> = { timer: true, instructions: true, notes: true, participant: false, outputs: true, materials: true, next: true, agenda: true, clock: true };
export const SHOW_LABELS: [string, string][] = [["timer", "Timer"], ["instructions", "Instructions"], ["notes", "Facilitator notes"], ["participant", "Participant instructions"], ["outputs", "Outputs"], ["materials", "Materials"], ["next", "Previous and next"], ["agenda", "Running order"], ["clock", "Workshop clock"]];

export const CHECKLIST: [string, string][] = [
  ["invite", "Participant invite sent"], ["room", "Room or call link ready"], ["boards", "Boards ready"], ["materials", "Materials ready"], ["prework", "Pre-work completed"],
  ["decider", "Decider attending"], ["timer", "Timer and screen ready"], ["configured", "Activities configured"], ["outputs", "Outputs defined"]
];

export const CAPTURE_TYPES: { key: CaptureType; label: string; short: string; color: string; hotkey?: string }[] = [
  { key: "decision", label: "Decision", short: "DECISION", color: "#ff4b23", hotkey: "d" },
  { key: "question", label: "Question", short: "QUESTION", color: "#ece9e0", hotkey: "q" },
  { key: "parking", label: "Parking lot", short: "PARKING LOT", color: "#c9c5ba", hotkey: "l" },
  { key: "followup", label: "Follow-up", short: "FOLLOW-UP", color: "#ece9e0", hotkey: "f" },
  { key: "observation", label: "Observation", short: "OBSERVATION", color: "#8f8b80", hotkey: "o" }
];

const id = () => "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

/** Blocks in run order: live blocks across days (with their day number). Parallel lanes run as one slot, led by the first. */
export function runnable(items: Item[]): { x: Item; day: number; sec: string }[] {
  const out: { x: Item; day: number; sec: string }[] = [];
  let day = 1, sec = "", lastPar: string | null | undefined = null;
  items.forEach(x => {
    if (x.zone !== "live") return;
    if (x.kind === "day") { day++; sec = ""; lastPar = null; return; }
    if (x.kind === "section") { sec = x.title || ""; return; }
    if (x.par && x.par === lastPar) return;
    lastPar = x.par;
    out.push({ x, day, sec });
  });
  return out;
}

export function newSession(items: Item[], prev?: Session | null): Session {
  return {
    id: "r" + Date.now().toString(36), startedAt: null, endedAt: null, order: runnable(items).map(r => r.x.id), i: 0, acc: 0, t0: null,
    actual: {}, extra: {}, skipped: [], started: [], breakUntil: null, captures: [], outputs: {}, blockNotes: {}, general: "",
    checklist: prev?.checklist && !prev.startedAt ? prev.checklist : {}, settings: prev?.settings || { sound: "soft", show: { ...DEFAULT_SHOW } }
  };
}

export const elapsed = (s: Session, now = Date.now()) => s.acc + (s.t0 ? now - s.t0 : 0);
export const curId = (s: Session) => s.order[Math.min(s.i, s.order.length - 1)];
/** Planned minutes for a block in this run, including time added or removed live. */
export const planOf = (s: Session, x: Item) => Math.max(1, mins(x) + (s.extra[x.id] || 0));

export type BlockState = "done" | "current" | "skipped" | "upcoming";
export type SlotView = { x: Item; day: number; sec: string; state: BlockState; plannedStart: number; projectedStart: number; plan: number; actualMin: number | null };

/**
 * The schedule for the day of the current block, in minutes of the day. "planned" uses the workshop's
 * own durations from the day's anchor; "projected" uses what actually happened plus what remains.
 * The anchor is the scheduled start, or the real start when the run began far from it (rehearsals).
 */
export function schedule(s: Session, items: Item[], startMin: number, now = Date.now()) {
  const byId = new Map(items.map(x => [x.id, x])), meta = new Map(runnable(items).map(r => [r.x.id, r]));
  const slots = s.order.map((oid, k) => {
    const x = byId.get(oid)!, m = meta.get(oid) || { day: 1, sec: "" };
    const state: BlockState = s.skipped.includes(oid) ? "skipped" : k < s.i ? "done" : k === s.i && !s.endedAt ? "current" : s.endedAt ? (s.actual[oid] != null ? "done" : "skipped") : "upcoming";
    return { x, day: m.day, sec: m.sec, state, plannedStart: 0, projectedStart: 0, plan: x ? planOf(s, x) : 0, actualMin: s.actual[oid] != null ? s.actual[oid] / 60000 : null };
  }).filter(v => v.x) as SlotView[];

  const cur = slots[Math.min(s.i, slots.length - 1)], day = cur ? cur.day : 1;
  const dayslots = slots.filter(v => v.day === day);
  const nowMin = (() => { const d = new Date(now); return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60; })();
  const startedMin = s.startedAt ? (() => { const d = new Date(s.startedAt); return d.getHours() * 60 + d.getMinutes(); })() : null;
  const anchor = startedMin != null && day === 1 && Math.abs(startedMin - startMin) > 60 ? startedMin : startMin;

  // Planned: original durations (no live changes), so lateness stays honest.
  let t = anchor;
  dayslots.forEach(v => { v.plannedStart = t; t += mins(v.x); });
  const plannedEnd = t;

  // Projected: finished blocks at their actual length, the current one at max(plan, elapsed), the rest as planned.
  const el = elapsed(s, now) / 60000;
  let p = anchor;
  dayslots.forEach(v => {
    v.projectedStart = p;
    if (v.state === "skipped") return;
    if (v.state === "done") p += v.actualMin ?? v.plan;
    else if (v.state === "current") { p = Math.max(p, nowMin - el); v.projectedStart = p; p += Math.max(v.plan, el); }
    else p += v.plan;
  });
  const projectedEnd = s.startedAt ? Math.max(p, nowMin) : plannedEnd;
  const late = s.startedAt ? Math.round(projectedEnd - plannedEnd) : 0;
  const remaining = s.startedAt ? Math.max(0, projectedEnd - nowMin) : plannedEnd - anchor;
  const days = new Set(slots.map(v => v.day)).size;
  return { slots, day, days, anchor, plannedEnd, projectedEnd, late, remaining, nowMin };
}

export type Recovery = { key: string; label: string; detail: string; apply: (s: Session) => Session };

/** Ways to recover time when running late. Nothing is applied until the facilitator picks one. */
export function recoveryOptions(s: Session, items: Item[], lateMin: number): Recovery[] {
  const byId = new Map(items.map(x => [x.id, x])), out: Recovery[] = [];
  const future = s.order.slice(s.i + 1).filter(oid => !s.skipped.includes(oid)).map(oid => byId.get(oid)!).filter(Boolean);
  const nextAct = future.find(x => x.role !== "breaks"), nextBreak = future.find(x => x.role === "breaks");
  const cut = (x: Item, n: number) => (ss: Session) => ({ ...ss, extra: { ...ss.extra, [x.id]: (ss.extra[x.id] || 0) - n } });
  if (nextAct && planOf(s, nextAct) > 10) { const n = Math.min(lateMin, Math.floor((planOf(s, nextAct) - 5) / 5) * 5, 15); if (n >= 5) out.push({ key: "next", label: `Shorten ${nextAct.title} by ${n} min`, detail: planOf(s, nextAct) + " → " + (planOf(s, nextAct) - n) + " min", apply: cut(nextAct, n) }); }
  if (nextBreak && planOf(s, nextBreak) > 5) { const n = Math.min(lateMin, planOf(s, nextBreak) - 5, 10); if (n >= 5) out.push({ key: "break", label: `Shorten the next break by ${n} min`, detail: planOf(s, nextBreak) + " → " + (planOf(s, nextBreak) - n) + " min", apply: cut(nextBreak, n) }); }
  future.filter(x => x.priority === "optional").slice(0, 2).forEach(x => out.push({ key: "skip:" + x.id, label: `Skip ${x.title}`, detail: "Optional · saves " + planOf(s, x) + " min", apply: ss => ({ ...ss, skipped: ss.skipped.concat([x.id]) }) }));
  return out;
}

export function capture(s: Session, type: CaptureType, text: string, block?: Item): Session {
  const m = type === "followup" || type === "decision" ? text.match(/@([\w.-]+)/) : null;
  const c: Capture = { id: id(), type, text: m ? text.replace(m[0], "").replace(/\s{2,}/g, " ").trim() : text, at: Date.now(), blockId: block?.id, blockTitle: block?.title, ...(m ? { owner: m[1] } : {}), status: type === "parking" || type === "followup" || type === "question" ? "open" : undefined };
  return { ...s, captures: s.captures.concat([c]) };
}
