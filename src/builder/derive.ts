// Values computed from state on each render: schedule, engine checks and pending-change labels.
import { available, pendingLabel } from "./commands";
import { RDB, type FlowRow, type Insight } from "./engine";
import { eng, mins } from "./items";
import { layout } from "./layout";
import type { State } from "./store";
import { parseStart } from "./time";

export function derive(S: State) {
  const start = parseStart(S.start), eb = eng(S.items), B = RDB();
  const flow: Record<string, FlowRow> = {};
  B.flow(eb).forEach(f => (flow[f.id] = f));
  const L = layout(S.items, start), nDays = L.days.length, total = L.total, avail = available(S.brief);
  const over = avail && nDays === 1 ? total - avail : 0;

  const ins: Insight[] = eb.some(x => !x.pre) ? B.insights(S.brief, eb) : [];
  const liveB = S.items.filter(x => x.kind === "block" && x.zone === "live");
  const optMin = liveB.filter(x => x.role === "options").reduce((s, x) => s + mins(x), 0);
  if (optMin >= 60 && !liveB.some(x => ["evidence", "sense", "landscape"].includes(x.role || ""))) ins.unshift({ sev: "mid", t: "You have " + optMin + " minutes of idea generation but no evidence review.", fix: "Add evidence before generating ideas.", cmd: "evidence" });
  const byAt: Record<string, Insight[]> = {};
  ins.filter(o => o.at).forEach(o => (byAt[o.at!] = byAt[o.at!] || []).push(o));
  if (over > 0) ins.unshift({ sev: "high", t: "Your workshop runs " + over + " minutes over.", fix: "Builder can propose what to compress or move.", cmd: "fit" });

  const pend: Record<string, string> = {};
  S.proposal?.changes.filter(c => c.on && c.id).forEach(c => (pend[c.id!] = pendingLabel(c)));

  return { start, eb, flow, L, nDays, total, avail, over, ins, byAt, pend, wide: S.w >= 1100 };
}
export type Derived = ReturnType<typeof derive>;
