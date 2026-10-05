// Facilitator → participant screen. The facilitator's window publishes a public snapshot (no notes,
// no context, no warnings) over BroadcastChannel and localStorage; /present renders it. Both windows
// compute the countdown from the same wall-clock start, so they agree without constant messages.
import { mins } from "../items";
import type { State } from "../store";
import { curId, planOf } from "./session";
import { scriptFor } from "./script";
import { PARTICIPANT_TOOLS, linksOf } from "../tools";

export type PresentSnapshot = {
  wid: string;
  name: string;
  status: "waiting" | "live" | "ended";
  title: string;
  isBreak: boolean;
  lines: string[];
  question: string;
  planMs: number;
  acc: number;
  t0: number | null;
  next: string;
  /** Polls and boards the room joins, e.g. a Mentimeter code. */
  join: { tool: string; url: string }[];
  sent: number;
};

const KEY = "rd-present", CHANNEL = "rd-present";
let channel: BroadcastChannel | null = null;
const ch = () => (channel = channel || (typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(CHANNEL) : null));

export function snapshotOf(s: State): PresentSnapshot | null {
  const ss = s.session;
  if (!ss || !s.wid) return null;
  const byId = new Map(s.items.map(x => [x.id, x])), x = byId.get(curId(ss));
  const nextId = ss.order.slice(ss.i + 1).find(id => !ss.skipped.includes(id)), nx = nextId ? byId.get(nextId) : undefined;
  const sc = x ? scriptFor(x, s.brief, nx) : null, isBreak = x?.role === "breaks";
  return {
    wid: s.wid, name: s.name, status: ss.endedAt ? "ended" : ss.startedAt ? "live" : "waiting", title: x?.title || "", isBreak,
    question: sc?.open || "", lines: isBreak ? [] : (sc?.participant || []).filter(l => l !== sc?.open).slice(0, 5),
    planMs: x ? planOf(ss, x) * 60000 : 0, acc: ss.acc, t0: ss.t0, next: nx ? nx.title + " · " + mins(nx) + " min" : "", join: x && !isBreak ? linksOf(x).filter(l => !l.fromLibrary && PARTICIPANT_TOOLS.includes(l.tool)).slice(0, 2).map(l => ({ tool: l.tool, url: l.url })) : [], sent: Date.now()
  };
}

let last = "";
export function publishPresent(s: State) {
  const snap = snapshotOf(s);
  if (!snap) return;
  const sig = JSON.stringify({ ...snap, sent: 0 });
  if (sig === last) return;
  last = sig;
  try { localStorage.setItem(KEY, JSON.stringify(snap)); } catch {}
  try { ch()?.postMessage(snap); } catch {}
}

export function readPresent(): PresentSnapshot | null {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}

export function listenPresent(fn: (s: PresentSnapshot) => void) {
  const c = ch();
  const onMsg = (e: MessageEvent) => fn(e.data);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY && e.newValue) try { fn(JSON.parse(e.newValue)); } catch {} };
  c?.addEventListener("message", onMsg);
  window.addEventListener("storage", onStorage);
  return () => { c?.removeEventListener("message", onMsg); window.removeEventListener("storage", onStorage); };
}
