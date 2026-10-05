// Values computed from state: schedule, suggestions and pending-change labels.
import { available, pendingLabel } from "./commands";
import { RDB, type FlowRow } from "./engine";
import { eng } from "./items";
import { layout } from "./layout";
import type { State } from "./store";
import { suggestions, type Suggestion } from "./suggest/rules";
import { parseStart } from "./time";

export function derive(S: State) {
  const start = parseStart(S.start), eb = eng(S.items);
  const flow: Record<string, FlowRow> = {};
  RDB().flow(eb).forEach(f => (flow[f.id] = f));
  const L = layout(S.items, start), nDays = L.days.length, total = L.total, avail = available(S.brief);
  const over = avail && nDays === 1 ? total - avail : 0;

  // Your own past runs (other workshops, plus this one's last run) inform timing suggestions.
  const history = S.workshops.filter(w => w.id !== S.wid).concat(S.session?.endedAt ? [{ id: S.wid || "", name: S.name, items: S.items, brief: S.brief, start: S.start, view: S.view, session: S.session }] : []);
  const all = suggestions({ items: S.items, brief: S.brief, context: S.context, start, total, nDays, avail, history, currentId: S.wid });
  const sug = all.filter(s => { const d = S.dismissed[s.id]; return !(d === "*" || d === s.sig); });
  const byAt: Record<string, Suggestion[]> = {};
  sug.filter(s => s.at).forEach(s => (byAt[s.at!] = byAt[s.at!] || []).push(s));

  const pend: Record<string, string> = {};
  S.proposal?.changes.filter(c => c.on && c.id).forEach(c => (pend[c.id!] = pendingLabel(c)));

  return { start, eb, flow, L, nDays, total, avail, over, sug, byAt, dismissedCount: all.length - sug.length, pend, wide: S.w >= 1100 };
}
export type Derived = ReturnType<typeof derive>;
