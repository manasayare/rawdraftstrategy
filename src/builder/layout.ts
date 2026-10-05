// Schedule layout: splits items into zones (pre-work, live, after), live into days, and each day into
// rows (sections and groups of parallel lanes) with start times. Rendering decides how rows look.
import { mins } from "./items";
import type { Item, Zone } from "./types";

export type Indexed = { x: Item; i: number };
export type SectionRow = { kind: "section"; x: Item; first: number; last: number; t0: number; mins: number; t1: number };
export type GroupRow = { kind: "group"; par: string | null; first: number; last: number; lanes: Indexed[]; t0: number; dur: number };
export type Row = SectionRow | GroupRow;
export type DayLayout = { index: number; divider: Indexed | null; list: Indexed[]; rows: Row[]; dur: number; end: number };
export type ZoneLayout = { key: Zone; list: Indexed[]; rows: Row[]; end: number; dur: number };
export type Layout = { pre: ZoneLayout; after: ZoneLayout; days: DayLayout[]; liveEnd: number; preEnd: number; total: number; hasBlocks: boolean };

function buildRows(list: Indexed[], zone: Zone, start: number): { rows: Row[]; dur: number } {
  const rows: Row[] = [];
  list.forEach(o => {
    const x = o.x;
    if (x.kind === "section") { rows.push({ kind: "section", x, first: o.i, last: o.i, t0: 0, mins: 0, t1: 0 }); return; }
    const lr = rows[rows.length - 1];
    if (lr && lr.kind === "group" && x.par && lr.par === x.par && zone === "live") { lr.lanes.push(o); lr.last = o.i; }
    else rows.push({ kind: "group", par: zone === "live" ? x.par || null : null, first: o.i, last: o.i, lanes: [o], t0: 0, dur: 0 });
  });
  let t = start;
  rows.forEach(r => { r.t0 = t; if (r.kind === "group") { r.dur = Math.max(...r.lanes.map(o => mins(o.x))); t += r.dur; } });
  rows.forEach((r, ri) => {
    if (r.kind !== "section") return;
    let m = 0, j = ri + 1;
    while (rows[j] && rows[j].kind !== "section") { m += (rows[j] as GroupRow).dur; j++; }
    r.mins = m; r.t1 = r.t0 + m;
  });
  return { rows, dur: t - start };
}

export function layout(items: Item[], start: number): Layout {
  const idx = items.map((x, i) => ({ x, i }));
  const preL = idx.filter(o => o.x.zone === "pre"), liveL = idx.filter(o => o.x.zone === "live"), aftL = idx.filter(o => o.x.zone === "after");
  const preEnd = preL.length, liveEnd = preEnd + liveL.length;

  const split: { div: Indexed | null; list: Indexed[] }[] = [];
  let cur: { div: Indexed | null; list: Indexed[] } = { div: null, list: [] };
  liveL.forEach(o => { if (o.x.kind === "day") { split.push(cur); cur = { div: o, list: [] }; } else cur.list.push(o); });
  split.push(cur);

  let total = 0;
  const days = split.map((dd, di) => {
    const B = buildRows(dd.list, "live", start);
    total += B.dur;
    const end = dd.list.length ? dd.list[dd.list.length - 1].i + 1 : dd.div ? dd.div.i + 1 : preEnd;
    return { index: di, divider: dd.div, list: dd.list, rows: B.rows, dur: B.dur, end };
  });
  const zone = (key: Zone, list: Indexed[], end: number): ZoneLayout => ({ key, list, end, rows: buildRows(list, key, start).rows, dur: list.reduce((s, o) => s + mins(o.x), 0) });

  return { pre: zone("pre", preL, preEnd), after: zone("after", aftL, items.length), days, liveEnd, preEnd, total, hasBlocks: liveL.some(o => o.x.kind === "block") };
}
