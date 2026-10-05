// Proposed changes. Whole-workshop commands come from the engine (RDB.command); commands on a selection
// are worked out here. Nothing changes until the person accepts the proposal.
import { RDB, RDL } from "./engine";
import { conv, eng, mins } from "./items";
import type { Brief, Change, Item, Proposal } from "./types";

export type SelCmd = "shorten" | "expand" | "compress" | "remote" | "big" | "simpler" | "follow";

const r5 = (m: number) => Math.max(5, Math.round(m / 5) * 5);

export function selectionProposal(cmd: SelCmd, items: Item[], brief: Brief, ids: string[], n?: number | null): Proposal {
  const X = items.filter(x => ids.includes(x.id) && x.kind === "block"), ch: Change[] = [], sum = X.reduce((s, x) => s + mins(x), 0);
  const sub = "Applies only to the " + X.length + " selected block" + (X.length > 1 ? "s" : "") + ".";
  const B = RDB(), L = RDL();

  if (cmd === "shorten" || cmd === "expand" || cmd === "compress") {
    const f = cmd === "shorten" ? 0.75 : cmd === "expand" ? 1.25 : (n || sum) / (sum || 1);
    X.forEach(x => {
      const to = r5(mins(x) * f);
      if (to !== x.mins) ch.push({ type: "mins", id: x.id, to, label: to < mins(x) ? "Compress" : "Extend", why: cmd === "compress" ? "Scaled with the others to fit " + n + " minutes." : to < mins(x) ? "Tighter timebox, same output." : "More room for the same output.", saved: mins(x) - to });
    });
    return { title: cmd === "compress" ? "Compress into " + n + " minutes" : cmd === "shorten" ? "Shorten selection" : "Expand selection", sub, changes: ch };
  }
  if (cmd === "remote") {
    X.forEach(x => {
      if (x.role === "energise") ch.push({ type: "remove", id: x.id, label: "Remove", why: "Physical energisers do not translate to video.", saved: mins(x) });
      else if (mins(x) > 50) ch.push({ type: "mins", id: x.id, to: 50, label: "Compress", why: "Remote blocks over 50 minutes lose people.", saved: mins(x) - 50 });
    });
    ch.push({ type: "note", label: "Change", what: "One board frame per block, silent writing before any discussion", why: "Remote work needs a visible shared surface and explicit turns.", saved: 0 });
    return { title: "Adapt for remote", sub, changes: ch };
  }
  if (cmd === "big") {
    const one = L.get("one-two-four-all");
    X.forEach(x => {
      if (x.role === "options" && one && x.ref !== one.id) ch.push({ type: "replace", id: x.id, ref: one.id, label: "Replace", why: "Every voice in, without a 20-person discussion.", saved: 0 });
      else if (["sense", "landscape", "assumptions", "decide", "prioritise"].includes(x.role || "")) {
        ch.push({ type: "cfg", id: x.id, key: "mode", val: "Small group", label: "Change", what: x.title + " · small groups of 4 to 6", why: "Large groups stall in whole-room discussion.", saved: 0 });
        if (x.role === "sense") ch.push({ type: "mins", id: x.id, to: mins(x) + 10, label: "Extend", why: "Groups need time to report back and merge.", saved: -10 });
      }
    });
    ch.push({ type: "note", label: "Add", what: "A co-facilitator", why: "One facilitator cannot hold 20 people through synthesis.", saved: 0 });
    return { title: "Adapt for 20 people", sub, changes: ch };
  }
  if (cmd === "simpler") {
    const x = X[0];
    const alts = B.alternatives(brief, { role: x.role && B.ROLES[x.role] ? x.role : "custom", ref: x.ref });
    const a = alts.find(y => L.get(y.id)?.level === "first") || alts[0];
    return { title: "A simpler alternative", sub, changes: a ? [{ type: "replace", id: x.id, ref: a.id, label: "Replace", why: (L.get(a.id)?.level === "first" ? "First-time friendly. " : "") + (a.why || ""), saved: 0 }] : [] };
  }
  if (cmd === "follow") {
    const last = X[X.length - 1], eb = eng(items);
    const s = B.suggest(eb, eb.find(y => y.id === last.id) || { role: "custom", title: last.title }, "after")[0];
    const nx = items[items.findIndex(y => y.id === last.id) + 1];
    return { title: "Add a follow-up", sub, changes: s ? [{ type: "insert", anchor: nx ? nx.id : null, item: { kind: "block", zone: last.zone, role: s.role, ref: s.it.id, title: s.it.title, mins: B.minsOf(s.it) }, label: "Add", why: s.why, saved: -B.minsOf(s.it) }] : [] };
  }
  return { title: "", changes: [] };
}

export function workshopProposal(cmd: string, items: Item[], brief: Brief, avail: number | null, n?: number | null, sub?: string | null): Proposal {
  const eb = eng(items), R = RDB().command(cmd, brief, eb, avail || RDB().total(eb), n);
  return { title: R.title, sub: [sub, R.short].filter(Boolean).join(" · "), changes: R.changes.map(c => conv(c, eb)) };
}

/** Minutes available from the brief, or null when not set. */
export const available = (brief: Brief) => (brief.time && brief.time !== "Not sure" ? RDB().MIN[brief.time] : null);

/** Short label for a pending change, shown on the affected card. */
export function pendingLabel(c: Change) {
  if (c.type === "mins") return c.label.toLowerCase() + " to " + c.to + " min";
  if (c.type === "zone") return "move to pre-work";
  if (c.type === "remove") return "remove";
  if (c.type === "replace") return "replace with " + (RDL().get(c.ref)?.title ?? "undefined");
  if (c.type === "cfg") return "small groups";
  return "";
}
