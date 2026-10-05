// Creating, normalising and transforming workshop items. Pure apart from reading the Library.
import { RDB, RDL, type EngBlock, type LibItem, type Template } from "./engine";
import type { Change, Item, StructType, Zone } from "./types";

export const uid = () => "i" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
export const mins = (x: Pick<Item, "mins">) => x.mins || 0;
export const isLiveBlock = (x: Item) => x.kind === "block" && x.zone === "live";

export const clone = (items: Item[]): Item[] => items.map(x => ({ ...x, cfg: { ...x.cfg } }));

const RANK: Record<Zone, number> = { pre: 0, live: 1, after: 2 };

/** Orders items pre → live → after (stable) and drops parallel ids that no longer have a neighbour. */
export function norm(input: Item[]): Item[] {
  const items = input.map((x, i) => [x, i] as const).sort((a, b) => RANK[a[0].zone] - RANK[b[0].zone] || a[1] - b[1]).map(a => a[0]);
  items.forEach(x => { if (x.zone !== "live" || x.kind !== "block") x.par = null; });
  items.forEach((x, i) => { if (x.par && !(items[i - 1]?.par === x.par || items[i + 1]?.par === x.par)) x.par = null; });
  return items;
}

export const mkLib = (it: LibItem, m?: number): Item => ({ id: uid(), kind: "block", zone: "live", role: RDB().roleOf(it), ref: it.id, title: it.title, mins: m || RDB().minsOf(it), cfg: {} });

export function mkStruct(t: StructType): Item {
  const base = { id: uid(), zone: "live" as Zone, cfg: {} };
  if (t === "section") return { ...base, kind: "section", title: "New section" };
  if (t === "day") return { ...base, kind: "day" };
  if (t === "lunch") return { ...base, kind: "block", role: "breaks", title: "Lunch", mins: 45 };
  if (t === "custom") return { ...base, kind: "block", role: "custom", title: "Custom block", mins: 20, custom: true };
  return { ...base, kind: "block", role: "breaks", title: "Break", mins: 10 };
}

/** A Library record as workshop items: formats expand to their agenda or methods, anything else is one block. */
export function expand(it: LibItem | undefined): Item[] {
  if (!it) return [];
  const L = RDL();
  if (Array.isArray(it.agenda) && it.agenda.length) {
    return it.agenda.map(a => {
      const r = a.ref ? L.get(a.ref) : undefined;
      const b = r ? mkLib(r, a.mins) : { ...mkStruct("custom"), title: a.name, mins: a.mins || 15, custom: true };
      b.title = a.name || b.title;
      b.cfg = { purpose: a.purpose || "", output: a.output || "" };
      return b;
    });
  }
  if (Array.isArray(it.steps) && it.steps.some(s => s && typeof s === "object" && s.methods)) {
    const out: Item[] = [];
    it.steps.forEach(s => {
      if (!s || typeof s !== "object" || !s.methods) return;
      out.push({ ...mkStruct("section"), title: s.name });
      s.methods.slice(0, 2).forEach(m => { const r = L.get(m); if (r) out.push(mkLib(r)); });
    });
    return out;
  }
  if (it.type === "playbook" && Array.isArray(it.sequence)) return it.sequence.map(s => L.get(s[1])).filter((r): r is LibItem => !!r).map(r => mkLib(r));
  if ((it.type === "workshop" || it.type === "playbook") && (it.uses || []).length) return (it.uses || []).map(u => L.get(u)).filter((r): r is LibItem => !!r).map(r => mkLib(r));
  return [mkLib(it)];
}

/** Template sequence → items. Entries: ["§", title], ["day"], ["break" | "lunch", mins], [libraryId, mins]. */
export function tplItems(t: Template): Item[] {
  return t.seq.map(s => {
    const [k, v] = s as [string, string | number];
    if (k === "§") return { ...mkStruct("section"), title: String(v) };
    if (k === "day") return mkStruct("day");
    if (k === "break" || k === "lunch") return { ...mkStruct(k), mins: +v };
    const r = RDL().get(k);
    return r ? mkLib(r, +v) : null;
  }).filter((x): x is Item => !!x);
}

/** The engine's view: blocks before the session plus live blocks; a parallel group counts once at its longest lane. */
export function eng(items: Item[]): EngBlock[] {
  const ROLES = RDB().ROLES, out: EngBlock[] = [];
  let lastPar: string | null | undefined = null, head: EngBlock | null = null;
  items.forEach(x => {
    if (x.kind !== "block" || x.zone === "after") { if (x.kind === "day") lastPar = null; return; }
    const role = x.role && ROLES[x.role] ? x.role : "custom";
    const e: EngBlock = { id: x.id, role, label: ROLES[role][0], ref: x.ref, title: x.title, mins: mins(x), locked: x.locked, pre: x.zone === "pre" };
    if (x.zone === "live" && x.par && x.par === lastPar && head) { head.mins = Math.max(head.mins, mins(x)); e.mins = 0; }
    else if (x.zone === "live") head = x.par ? e : null;
    lastPar = x.zone === "live" ? x.par : null;
    out.push(e);
  });
  return out;
}

/** Engine command change → Builder change (anchors and inserted items resolved against the current blocks). */
export function conv(c: Record<string, any>, eb: EngBlock[]): Change { // eslint-disable-line @typescript-eslint/no-explicit-any
  const o = { ...c, eng: c } as Change & Record<string, unknown>;
  if (c.type === "async") { o.type = "zone"; o.to = "pre"; }
  if (c.type === "insert") {
    o.anchor = eb[c.at] ? eb[c.at].id : null;
    o.item = c.nb && c.nb.day ? { kind: "day", zone: "live" } : { kind: "block", zone: "live", role: c.nb.role, ref: c.nb.ref, title: c.nb.title, mins: c.nb.mins };
  }
  return o;
}

/** Applies accepted changes. Inserts first (anchored to the original items), then edits in order. */
export function applyChanges(items: Item[], chs: Change[]): Item[] {
  let out = clone(items);
  chs.filter(c => c.type === "insert").forEach(c => {
    const ni = { ...c.item, id: uid(), cfg: {} } as Item;
    let pos = c.anchor ? out.findIndex(y => y.id === c.anchor) : -1;
    if (pos < 0) pos = out.filter(y => y.zone !== "after").length;
    out.splice(pos, 0, ni);
  });
  chs.forEach(c => {
    const x = c.id ? out.find(y => y.id === c.id) : undefined;
    if (c.type === "remove") { out = out.filter(y => y.id !== c.id); return; }
    if (!x) return;
    if (c.type === "zone") x.zone = c.to as Zone;
    else if (c.type === "mins") x.mins = c.to as number;
    else if (c.type === "replace") { const it = RDL().get(c.ref); if (it) { x.ref = it.id; x.title = it.title; x.role = RDB().roleOf(it); } }
    else if (c.type === "cfg") (x.cfg as Record<string, unknown>)[c.key as string] = c.val;
    else if (c.type === "move") {
      out = out.filter(y => y.id !== x.id);
      const p = c.anchor ? out.findIndex(y => y.id === c.anchor) : -1;
      out.splice(p < 0 ? out.filter(y => y.zone !== "after").length : p, 0, x);
    }
  });
  return norm(out);
}
