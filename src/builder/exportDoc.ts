// Turns a workshop into export shapes: flat rows (CSV, copy), the structured agenda (PDF, Word) and JSON.
import { RDL } from "./engine";
import type { AgendaDoc, AgendaRow } from "./agenda";
import { BRIEF_QUESTIONS } from "./constants";
import { mins } from "./items";
import { clock, hm, parseStart } from "./time";
import type { Brief, Item, Session } from "./types";

/** [part, start, end, section, title, mins, mode, output, libraryUrl]. Pre-work and after rows have no times. */
export type ExportRow = [string, string, string, string, string, number, string, string, string];

const libUrl = (ref?: string | null) => {
  const it = ref ? RDL().get(ref) : undefined;
  const h = it ? RDL().deco(it).href : "";
  return h ? location.origin + (h.startsWith("#/") ? h.slice(1) : h) : "";
};

export function exportRows(items: Item[], startStr: string): ExportRow[] {
  const start = parseStart(startStr), out: ExportRow[] = [];
  let day = 1, t = start, sec = "";
  items.forEach(x => {
    if (x.zone === "backup") return;
    if (x.zone !== "live") {
      if (x.kind === "block") out.push([x.zone === "pre" ? "Pre-work" : "After", "", "", "", x.title || "", mins(x), x.cfg.mode || "", x.cfg.output || "", libUrl(x.ref)]);
      return;
    }
    if (x.kind === "day") { day++; t = start; return; }
    if (x.kind === "section") { sec = x.title || ""; return; }
    out.push(["Day " + day, clock(t), clock(t + mins(x)), sec, x.title || "", mins(x), x.cfg.mode || "", x.cfg.output || "", libUrl(x.ref)]);
    t += mins(x);
  });
  return out;
}

export function briefList(b: Brief): [string, string][] {
  const val = (v: unknown) => (Array.isArray(v) ? v.join(", ") : (v as string));
  return ([["Question", b.question]] as [string, unknown][])
    .concat(BRIEF_QUESTIONS.map(q => [q.label, val(b[q.key])]))
    .concat(b.notes ? [["Constraints", b.notes]] : [])
    .filter(r => r[1]) as [string, string][];
}

export type NoteWithBlock = { text: string; block: string; owner?: string; typed?: string };
const GROUPS: [string, string][] = [["decision", "Decisions"], ["followup", "Follow-ups"], ["question", "Open questions"], ["parking", "Parking lot"], ["observation", "Observations"]];
/** Session captures grouped by type, plus notes from runs made before captures existed. */
export function notesByType(items: Item[], session?: Session | null): [string, NoteWithBlock[]][] {
  const out: [string, NoteWithBlock[]][] = GROUPS.map(([k, label]) => [label, (session?.captures || []).filter(c => c.type === k).map(c => ({ text: c.text, block: c.blockTitle || "", owner: c.owner }))]);
  const legacy: Record<string, string> = { decision: "Decisions", action: "Follow-ups", park: "Parking lot", note: "Observations", offline: "Observations" };
  items.forEach(x => (x.cfg?.log || []).forEach(e => out.find(g => g[0] === legacy[e.t])?.[1].push({ text: e.text, block: x.title || "", owner: e.owner, typed: e.typed })));
  const notes = items.filter(x => session?.blockNotes[x.id]?.trim()).map(x => ({ text: session!.blockNotes[x.id].trim(), block: x.title || "" }));
  if (notes.length) out.push(["Facilitator notes", notes]);
  const outputs = items.filter(x => session?.outputs[x.id]?.trim()).map(x => ({ text: session!.outputs[x.id].trim(), block: x.title || "" }));
  if (outputs.length) out.unshift(["Outputs", outputs]);
  return out.filter(g => g[1].length);
}

export function agendaDoc(w: { name: string; start: string; brief: Brief; items: Item[]; session?: Session | null }, total: number, nDays: number): AgendaDoc {
  const start = parseStart(w.start), rows = exportRows(w.items, w.start), NB = notesByType(w.items, w.session);
  const row = (r: ExportRow): AgendaRow => ({ start: r[1], end: r[2], title: String(r[4]), mins: +r[5] || 0, output: r[7] || "", mode: r[6] || "", link: r[8] || "" });
  const live = rows.filter(r => r[1]), dayN = [...new Set(live.map(r => r[0]))];
  const days = dayN.map(d => {
    const dr = live.filter(r => r[0] === d), secs: { title: string; rows: AgendaRow[] }[] = [];
    dr.forEach(r => { const last = secs[secs.length - 1]; if (!last || last.title !== r[3]) secs.push({ title: r[3] || "", rows: [] }); secs[secs.length - 1].rows.push(row(r)); });
    return { label: d, range: dr[0][1] + "–" + dr[dr.length - 1][2], total: hm(dr.reduce((s, r) => s + (+r[5] || 0), 0)), sections: secs };
  });
  return {
    name: w.name || "",
    kicker: NB.length ? "Agenda and session notes" : "Workshop agenda",
    meta: live.length ? "Starts " + clock(start) + " · " + hm(total) + (nDays > 1 ? " across " + nDays + " days" : " · ends " + clock(start + total)) : "No timed blocks yet",
    brief: briefList(w.brief).filter(r => r[0] === "Question" || /outcome|people|decision|output/i.test(r[0])),
    pre: rows.filter(r => r[0] === "Pre-work").map(row),
    days,
    after: rows.filter(r => r[0] === "After").map(row),
    notes: NB.map(([group, es]) => ({ group, entries: es.map(e => ({ text: e.text, typed: e.typed || "", block: e.block, owner: e.owner || "" })) })),
    date: new Date().toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
  };
}

export const agendaText = (name: string, rows: ExportRow[]) => [name, ""].concat(rows.map(r => (r[1] ? r[1] + "  " : r[0] + "  ") + r[4] + "  (" + r[5] + " min)")).join("\n");

export const agendaCsv = (rows: ExportRow[]) =>
  ([["Part", "Start", "End", "Section", "Block", "Minutes", "Mode", "Output", "Library"]] as (string | number)[][]).concat(rows).map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(",")).join("\n");

export const fileName = (name: string, ext: string) => (name || "workshop").replace(/[^\w]+/g, "-") + ext;

export function download(name: string, type: string, text: string) {
  try {
    const u = URL.createObjectURL(new Blob([text], { type }));
    const a = document.createElement("a");
    a.href = u; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 1000);
  } catch {}
}

export const copyText = (t: string) => { try { Promise.resolve(navigator.clipboard && navigator.clipboard.writeText(t)).catch(() => {}); } catch {} };
