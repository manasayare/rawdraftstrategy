// Matches imported agenda lines to Library records. Works on any index of {id, title}, so it can run
// in the browser (window.RD) or on a server with the same content.
import type { AgendaLine } from "./parse";

export type IndexItem = { id: string; title: string; type?: string };
export type MatchIndex = { items: IndexItem[]; search?: (q: string) => IndexItem[] };
export type Confidence = "exact" | "close" | "none";
export type AgendaMatch = {
  line: AgendaLine;
  kind: "library" | "break" | "lunch" | "custom" | "section" | "day";
  ref?: string;
  refTitle?: string;
  confidence: Confidence;
  candidates: IndexItem[];
};

const STOP = new Set(["the", "a", "an", "and", "of", "for", "to", "with", "on", "in", "session", "exercise", "activity", "method", "workshop", "round", "quick", "short", "group"]);
export const normTitle = (s: string) => s.toLowerCase().replace(/&/g, " and ").replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
const tokens = (s: string) => normTitle(s).split(" ").filter(w => w && !STOP.has(w));
const core = (s: string) => s.split(/\s+[–—-]\s+|:\s+|\s+\(/)[0];

function similarity(a: string, b: string) {
  const A = new Set(tokens(a)), B = new Set(tokens(b));
  if (!A.size || !B.size) return 0;
  let n = 0;
  A.forEach(w => { if (B.has(w)) n++; });
  return n / (A.size + B.size - n);
}

export function matchLine(line: AgendaLine, index: MatchIndex): AgendaMatch {
  if (line.kind !== "block") return { line, kind: line.kind, confidence: "none", candidates: [] };
  const t = normTitle(line.title);
  if (/^(lunch|lunch break)\b/.test(t)) return { line, kind: "lunch", confidence: "exact", candidates: [] };
  if (/^((coffee|comfort|short|tea) )?break\b|^coffee\b/.test(t)) return { line, kind: "break", confidence: "exact", candidates: [] };

  const keys = [...new Set([line.title, core(line.title)])];
  for (const k of keys) {
    const nk = normTitle(k);
    const hit = index.items.find(it => normTitle(it.title) === nk || normTitle(core(it.title)) === nk);
    if (hit) return { line, kind: "library", ref: hit.id, refTitle: hit.title, confidence: "exact", candidates: [hit] };
  }
  let best: IndexItem | null = null, bestS = 0;
  for (const it of index.items) {
    const sc = Math.max(...keys.map(k => similarity(k, it.title)));
    if (sc > bestS) { bestS = sc; best = it; }
  }
  const searched = index.search ? index.search(core(line.title)).slice(0, 4) : [];
  const candidates = [...(best && bestS >= 0.34 ? [best] : []), ...searched].filter((x, i, a) => a.findIndex(y => y.id === x.id) === i).slice(0, 4);
  if (best && bestS >= 0.67) return { line, kind: "library", ref: best.id, refTitle: best.title, confidence: "close", candidates };
  return { line, kind: "custom", confidence: "none", candidates };
}

export const matchAgenda = (lines: AgendaLine[], index: MatchIndex) => lines.map(l => matchLine(l, index));
