// After the session: what happened, in shapes people can use. Pure functions over a workshop.
import { mins } from "./items";
import { CAPTURE_TYPES, runnable } from "./run/session";
import { hm } from "./time";
import type { Capture, CaptureType, Item, Session } from "./types";

const hhmm = (t: number) => { const d = new Date(t); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); };

export function sessionStats(items: Item[], ss: Session) {
  const byId = new Map(items.map(x => [x.id, x]));
  const blocks = ss.order.map(id => byId.get(id)).filter((x): x is Item => !!x && x.role !== "breaks");
  const done = blocks.filter(x => ss.actual[x.id] != null && !ss.skipped.includes(x.id));
  const skipped = blocks.filter(x => ss.skipped.includes(x.id) || ss.actual[x.id] == null);
  const planned = runnable(items).reduce((s, r) => s + mins(r.x), 0);
  const actual = ss.startedAt && ss.endedAt ? Math.round((ss.endedAt - ss.startedAt) / 60000) : Math.round(Object.values(ss.actual).reduce((a, b) => a + b, 0) / 60000);
  const count = (t: CaptureType) => ss.captures.filter(c => c.type === t).length;
  return { blocks, done, skipped, planned, actual, decisions: count("decision"), parking: count("parking"), followups: count("followup"), questions: count("question"), observations: count("observation") };
}

const line = (c: Capture) => "- " + c.text + (c.owner ? " (owner: " + c.owner + ")" : "") + (c.blockTitle ? " · " + c.blockTitle : "");

/** Full summary for the facilitator and stakeholders, as Markdown. */
export function summaryMarkdown(name: string, items: Item[], ss: Session, goal?: string): string {
  const st = sessionStats(items, ss), L: string[] = [];
  const date = ss.startedAt ? new Date(ss.startedAt).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) : "";
  L.push("# " + name, "", [date, ss.startedAt && ss.endedAt ? hhmm(ss.startedAt) + "–" + hhmm(ss.endedAt) : "", "ran " + hm(st.actual) + " of " + hm(st.planned) + " planned", st.done.length + " of " + st.blocks.length + " activities"].filter(Boolean).join(" · "));
  if (goal) L.push("", "**Goal:** " + goal);
  const sec = (title: string, xs: Capture[], fmt: (c: Capture) => string = line) => { if (xs.length) L.push("", "## " + title, ...xs.map(fmt)); };
  sec("Decisions", ss.captures.filter(c => c.type === "decision"), c => line(c) + (c.decider ? "\n  - Decided by " + c.decider : "") + (c.rationale ? "\n  - Why: " + c.rationale : "") + (c.evidence ? "\n  - Evidence: " + c.evidence : "") + (c.followup ? "\n  - Follow-up: " + c.followup : ""));
  sec("Actions", ss.captures.filter(c => c.type === "followup" || (c.type === "parking" && c.status === "action")));
  sec("Open questions", ss.captures.filter(c => c.type === "question" && c.status !== "resolved"));
  sec("Parking lot", ss.captures.filter(c => c.type === "parking" && c.status !== "action" && c.status !== "resolved"), c => line(c) + (c.status === "followup" ? " → follow-up workshop" : ""));
  const outs = st.blocks.filter(x => ss.outputs[x.id]);
  if (outs.length) L.push("", "## Outputs", ...outs.map(x => "- **" + x.title + ":** " + ss.outputs[x.id]));
  L.push("", "## By activity");
  st.blocks.forEach(x => {
    const caps = ss.captures.filter(c => c.blockId === x.id), note = ss.blockNotes[x.id];
    const a = ss.actual[x.id], tag = ss.skipped.includes(x.id) || a == null ? "skipped" : Math.round(a / 60000) + " of " + mins(x) + " min";
    L.push("", "### " + x.title + " (" + tag + ")");
    caps.forEach(c => L.push("- " + (CAPTURE_TYPES.find(t => t.key === c.type)?.label || c.type) + ": " + c.text));
    if (note) L.push("", note);
  });
  return L.join("\n");
}

/** What to send participants: outcomes only, no private notes or observations. */
export function recapText(name: string, ss: Session): string {
  const L: string[] = ["Thanks for joining " + name + ".", ""];
  const part = (title: string, xs: Capture[]) => { if (xs.length) L.push(title, ...xs.map(c => "• " + c.text + (c.owner ? " (" + c.owner + ")" : "")), ""); };
  part("What we decided", ss.captures.filter(c => c.type === "decision"));
  part("Next steps", ss.captures.filter(c => c.type === "followup" || (c.type === "parking" && c.status === "action")));
  part("Still open", ss.captures.filter(c => (c.type === "question" || c.type === "parking") && c.status !== "action" && c.status !== "resolved"));
  return L.join("\n").trim();
}
