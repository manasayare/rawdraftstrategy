// The facilitator script for a block: the facilitator's own edits first, then the Library record.
import { RDB, RDL, type LibItem } from "../engine";
import type { Brief, Item } from "../types";

export type Script = {
  purpose: string;
  open: string;
  instructions: string[];
  questions: string[];
  watch: string[];
  transition: string;
  participant: string[];
  output: string;
  materials: string;
  notes: string;
  source: string;
};

const lines = (s?: string) => (s || "").split("\n").map(l => l.replace(/^\s*(\d+[.)]|[-*•])\s*/, "").trim()).filter(Boolean);
type Blueprint = { h: string; text?: string; items?: string[] }[];
const bp = (it: LibItem | undefined, h: RegExp) => ((it as unknown as { blueprint?: Blueprint })?.blueprint || []).find(b => h.test(b.h));
const strSteps = (it?: LibItem) => (it?.steps || []).map(s => (typeof s === "string" ? s : [s.name, s.purpose].filter(Boolean).join(": "))).filter(Boolean);

export function scriptFor(x: Item, brief: Brief, next?: Item): Script {
  const it = x.ref ? RDL().get(x.ref) : undefined, raw = it as unknown as Record<string, unknown> | undefined;
  const cfg = x.cfg || {};
  const detail = it ? RDB().detail(brief, { role: x.role || "custom", ref: x.ref, title: x.title }) : null;
  const purpose = cfg.purpose || (raw?.purpose as string) || bp(it, /purpose/i)?.text || detail?.why || "";
  const question = (raw?.question as string) || "";
  const instructions = cfg.instr ? lines(cfg.instr) : strSteps(it).length ? strSteps(it) : bp(it, /run structure|steps|how/i)?.items || [];
  const watch = cfg.watch ? lines(cfg.watch) : (it?.failures || []).slice(0, 3);
  const output = cfg.output || (it?.outputs || [])[0] || detail?.output || "";
  const nextT = next?.title;
  return {
    purpose,
    open: cfg.open || (raw?.say as string) || (question ? "“" + question.replace(/^[“"]|[”"]$/g, "") + "”" : ""),
    instructions,
    questions: cfg.questions ? lines(cfg.questions) : bp(it, /question|prompt/i)?.items || (Array.isArray(raw?.debrief) ? (raw!.debrief as string[]) : []),
    watch,
    transition: cfg.transition || (nextT ? (output ? `Take “${output}” into ${nextT}.` : `Next: ${nextT}.`) : "Close the session."),
    participant: cfg.participant ? lines(cfg.participant) : [question, ...instructions.slice(0, 3)].filter(Boolean),
    output,
    materials: cfg.materials || (it?.materials || []).join(", "),
    notes: cfg.notes || "",
    source: it ? "From the Library: " + it.title : x.role === "breaks" ? "" : "Custom block"
  };
}
