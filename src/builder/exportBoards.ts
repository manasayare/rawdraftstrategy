// Exports for the tools workshops actually run in: slides (.pptx opens in PowerPoint, Keynote and
// Google Slides; Mentimeter imports it too), a board (.svg drops into FigJam and Figma as editable
// shapes and text, into Miro as an image), sticky-note text for Miro, and poll questions for Mentimeter.
import { mins } from "./items";
import { scriptFor, type Script } from "./run/script";
import { clock, hm, parseStart } from "./time";
import { linksOf, type ToolLink } from "./tools";
import type { Brief, Item } from "./types";

type W = { name: string; start: string; brief: Brief; items: Item[] };
export type BoardBlock = { day: number; sec: string; start: string; end: string; x: Item; mins: number; isBreak: boolean; sc: Script; links: ToolLink[] };
export type BoardColumn = { title: string; blocks: BoardBlock[] };

/** Live blocks in order, with times, script and links; pre-work and follow-up as their own columns. */
export function boardBlocks(w: W) {
  const start = parseStart(w.start), live: BoardBlock[] = [], pre: BoardBlock[] = [], after: BoardBlock[] = [];
  const blocks = w.items.filter(x => x.kind === "block" && x.zone === "live");
  let day = 1, t = start, sec = "";
  const mk = (x: Item, st: string, en: string): BoardBlock => {
    const nx = blocks[blocks.indexOf(x) + 1];
    return { day, sec, start: st, end: en, x, mins: mins(x), isBreak: x.role === "breaks", sc: scriptFor(x, w.brief, nx), links: linksOf(x) };
  };
  w.items.forEach(x => {
    if (x.zone === "backup") return;
    if (x.zone !== "live") { if (x.kind === "block") (x.zone === "pre" ? pre : after).push(mk(x, "", "")); return; }
    if (x.kind === "day") { day++; t = start; return; }
    if (x.kind === "section") { sec = x.title || ""; return; }
    live.push(mk(x, clock(t), clock(t + mins(x))));
    t += mins(x);
  });
  const nDays = day, cols: BoardColumn[] = [];
  if (pre.length) cols.push({ title: "Before", blocks: pre });
  live.forEach(b => {
    const title = (nDays > 1 ? "Day " + b.day + (b.sec ? " · " : "") : "") + (b.sec || (nDays > 1 ? "" : "Agenda"));
    const last = cols[cols.length - 1];
    if (last && last.title === title && last.blocks[0]?.day === b.day && last.title !== "Before") last.blocks.push(b);
    else cols.push({ title, blocks: [b] });
  });
  if (after.length) cols.push({ title: "After", blocks: after });
  const total = live.reduce((s, b) => s + b.mins, 0);
  return { live, pre, after, cols, nDays, total };
}

const fileBase = (name: string) => (name || "workshop").replace(/[^\w]+/g, "-");

// ---------- Slides ----------
const INK = "ECE9E0", SOFT = "C9C5BA", MUTE = "8F8B80", BG = "0B0B0A", ACC = "FF4B23", RULE = "2A2925";

export async function exportSlides(w: W) {
  const { default: PptxGen } = await import("pptxgenjs");
  const p = new PptxGen(), B = boardBlocks(w);
  p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in
  p.title = w.name || "Workshop";
  const font = "Helvetica";
  const base = () => { const s = p.addSlide(); s.background = { color: BG }; return s; };
  const kicker = (s: ReturnType<typeof base>, t: string) => s.addText(t.toUpperCase(), { x: 0.7, y: 0.5, w: 12, h: 0.35, fontFace: font, fontSize: 12, color: ACC, charSpacing: 2 });
  const foot = (s: ReturnType<typeof base>, t: string) => s.addText(t, { x: 0.7, y: 6.85, w: 12, h: 0.3, fontFace: font, fontSize: 10, color: MUTE });

  // Title
  let s = base();
  kicker(s, "Workshop");
  s.addText(w.name || "Workshop", { x: 0.7, y: 2.2, w: 11.5, h: 2, fontFace: font, fontSize: 54, bold: true, color: INK, valign: "top", fit: "shrink" });
  const meta = [B.live.length ? B.live[0].start + " · " + hm(B.total) + (B.nDays > 1 ? " across " + B.nDays + " days" : "") : "", w.brief.people ? w.brief.people + " participants" : ""].filter(Boolean).join("   ·   ");
  if (meta) s.addText(meta, { x: 0.7, y: 4.4, w: 11.5, h: 0.5, fontFace: font, fontSize: 18, color: SOFT });
  if (w.brief.question) s.addText(w.brief.question, { x: 0.7, y: 5.1, w: 11.5, h: 1.2, fontFace: font, fontSize: 18, color: MUTE, valign: "top", fit: "shrink" });

  // Agenda, 12 rows per slide
  const agenda = B.live;
  for (let i = 0; i < agenda.length; i += 12) {
    s = base();
    kicker(s, "Agenda" + (agenda.length > 12 ? " · " + (i / 12 + 1) : ""));
    s.addTable(agenda.slice(i, i + 12).map(b => [
      { text: b.start, options: { color: MUTE } },
      { text: b.x.title || "", options: { color: b.isBreak ? MUTE : INK } },
      { text: b.mins + " min", options: { color: MUTE, align: "right" as const } }
    ]), { x: 0.7, y: 1.1, w: 11.9, colW: [1.2, 9.2, 1.5], fontFace: font, fontSize: 16, rowH: 0.42, border: { type: "solid", pt: 0.5, color: RULE } as never, fill: { color: BG } });
  }

  // One slide per activity, speaker notes from the facilitator script
  B.live.forEach(b => {
    s = base();
    if (b.isBreak) {
      s.addText(b.x.title || "Break", { x: 0.7, y: 2.4, w: 11.9, h: 1.4, fontFace: font, fontSize: 60, bold: true, color: INK });
      s.addText("Back at " + b.end, { x: 0.7, y: 3.9, w: 11.9, h: 0.6, fontFace: font, fontSize: 24, color: SOFT });
      return;
    }
    kicker(s, [b.start + "–" + b.end, b.mins + " min", B.nDays > 1 ? "Day " + b.day : "", b.sec].filter(Boolean).join("  ·  "));
    s.addText(b.x.title || "", { x: 0.7, y: 1.0, w: 11.9, h: 1.1, fontFace: font, fontSize: 40, bold: true, color: INK, valign: "top", fit: "shrink" });
    let y = 2.3;
    if (b.sc.open) { s.addText(b.sc.open, { x: 0.7, y, w: 11.9, h: 1.0, fontFace: font, fontSize: 24, color: ACC, valign: "top", fit: "shrink" }); y += 1.15; }
    const steps = b.sc.participant.filter(l => l !== b.sc.open && l !== b.sc.open.replace(/^“|”$/g, "")).slice(0, 5);
    if (steps.length) { s.addText(steps.map(t => ({ text: t, options: { bullet: { type: "number" as const }, breakLine: true } })), { x: 0.7, y, w: 11.9, h: 2.6, fontFace: font, fontSize: 18, color: SOFT, valign: "top", paraSpaceAfter: 6, fit: "shrink" }); y += 2.7; }
    if (b.sc.output) s.addText("Output: " + b.sc.output, { x: 0.7, y: Math.min(y, 5.9), w: 11.9, h: 0.5, fontFace: font, fontSize: 14, color: MUTE });
    const join = b.links.filter(l => !l.fromLibrary).slice(0, 2);
    if (join.length) foot(s, join.map(l => l.tool + "  " + l.url).join("     "));
    s.addNotes([
      b.sc.purpose && "Purpose: " + b.sc.purpose,
      b.sc.instructions.length ? "Run it:\n" + b.sc.instructions.map((t, k) => k + 1 + ". " + t).join("\n") : "",
      b.sc.questions.length ? "Questions:\n" + b.sc.questions.map(t => "- " + t).join("\n") : "",
      b.sc.watch.length ? "Watch for:\n" + b.sc.watch.map(t => "- " + t).join("\n") : "",
      b.sc.materials && "Materials: " + b.sc.materials,
      b.sc.notes && "Notes: " + b.sc.notes,
      b.links.length ? "Links:\n" + b.links.map(l => l.tool + (l.label ? " (" + l.label + ")" : "") + ": " + l.url).join("\n") : "",
      b.sc.transition && "Transition: " + b.sc.transition
    ].filter(Boolean).join("\n\n"));
  });

  // Close
  s = base();
  kicker(s, "Close");
  s.addText("Decisions, owners, next steps", { x: 0.7, y: 2.4, w: 11.9, h: 1.2, fontFace: font, fontSize: 44, bold: true, color: INK });
  const outs = B.live.map(b => b.sc.output).filter(Boolean).slice(0, 6);
  if (outs.length) s.addText(outs.map(t => ({ text: t, options: { bullet: true, breakLine: true } })), { x: 0.7, y: 3.8, w: 11.9, h: 2.6, fontFace: font, fontSize: 18, color: SOFT, valign: "top", fit: "shrink" });

  await p.writeFile({ fileName: fileBase(w.name) + ".pptx" });
}

// ---------- Board (.svg) ----------
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** Greedy wrap by character count; SVG text has no layout of its own. */
const wrap = (s: string, n: number, max: number) => {
  const out: string[] = []; let line = "";
  s.split(/\s+/).filter(Boolean).forEach(w => { if ((line + " " + w).trim().length > n && line) { out.push(line); line = w; } else line = (line + " " + w).trim(); });
  if (line) out.push(line);
  return out.length > max ? [...out.slice(0, max - 1), out[max - 1].replace(/.{0,2}$/, "") + "…"] : out;
};

/** Columns per section, one sticky per activity: time, title, minutes, the opening question. */
export function boardSvg(w: W) {
  const B = boardBlocks(w), CW = 300, GAP = 40, PAD = 60, HEAD = 150;
  const STICKY: Record<string, string> = { default: "#FFF3B0", breaks: "#E6E3DA", decide: "#FFC9B8", prioritise: "#FFC9B8", criteria: "#FFC9B8", open: "#D7ECFF", options: "#D9F2D0", commit: "#E9DBFF", align: "#D7ECFF", reflect: "#E9DBFF" };
  const font = "font-family=\"Inter, Helvetica, Arial, sans-serif\"";
  let maxH = 0;
  const cols = B.cols.map((c, ci) => {
    const x = PAD + ci * (CW + GAP); let y = HEAD + 50;
    const cards = c.blocks.map(b => {
      const title = wrap(b.x.title || "", 26, 3), q = b.isBreak ? [] : wrap(b.sc.open.replace(/^“|”$/g, "") || b.sc.purpose, 38, 4);
      const h = b.isBreak ? 70 : 64 + title.length * 24 + (q.length ? 12 + q.length * 18 : 0) + (b.links.length ? 26 : 0);
      const fill = STICKY[b.x.role || ""] || STICKY.default, top = y;
      y += h + 16;
      let ty = top + 26;
      const parts = [
        `<rect x="${x}" y="${top}" width="${CW}" height="${h}" rx="6" fill="${fill}"/>`,
        `<text x="${x + 16}" y="${ty}" ${font} font-size="13" fill="#5a5850">${esc([b.start && b.start + "–" + b.end, b.mins + " min"].filter(Boolean).join("  ·  "))}</text>`
      ];
      ty += 26;
      title.forEach(l => { parts.push(`<text x="${x + 16}" y="${ty}" ${font} font-size="19" font-weight="600" fill="#111110">${esc(l)}</text>`); ty += 24; });
      if (q.length) { ty += 6; q.forEach(l => { parts.push(`<text x="${x + 16}" y="${ty}" ${font} font-size="14" fill="#34332e">${esc(l)}</text>`); ty += 18; }); }
      if (b.links.length) { const l = b.links[0]; parts.push(`<a href="${esc(l.url)}"><text x="${x + 16}" y="${top + h - 14}" ${font} font-size="13" fill="#c2361a">${esc(l.tool)} ↗</text></a>`); }
      return `<g>${parts.join("")}</g>`;
    });
    maxH = Math.max(maxH, y);
    const mins = c.blocks.reduce((s, b) => s + b.mins, 0);
    return `<g><text x="${x}" y="${HEAD + 10}" ${font} font-size="15" font-weight="600" letter-spacing="1.2" fill="#ff4b23">${esc(c.title.toUpperCase())}</text>` +
      `<text x="${x}" y="${HEAD + 32}" ${font} font-size="13" fill="#8f8b80">${esc(c.blocks[0].start ? c.blocks[0].start + " · " + hm(mins) : c.blocks.length + " item" + (c.blocks.length > 1 ? "s" : ""))}</text>${cards.join("")}</g>`;
  });
  const W = PAD * 2 + Math.max(1, B.cols.length) * (CW + GAP) - GAP, H = maxH + PAD;
  const meta = [B.live.length ? B.live[0].start + " · " + hm(B.total) : "", w.brief.people ? w.brief.people + " participants" : ""].filter(Boolean).join("  ·  ");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<rect width="${W}" height="${H}" fill="#FAF9F5"/>` +
    `<text x="${PAD}" y="${PAD + 30}" ${font} font-size="36" font-weight="700" fill="#111110">${esc(w.name || "Workshop")}</text>` +
    `<text x="${PAD}" y="${PAD + 62}" ${font} font-size="16" fill="#5a5850">${esc([meta, w.brief.question].filter(Boolean).join("  ·  "))}</text>` +
    cols.join("") + `</svg>`;
}
export const boardFileName = (name: string) => fileBase(name) + "-board.svg";

// ---------- Text for pasting ----------
/** One line per activity. Miro turns pasted spreadsheet cells into stickies; plain lines become a text list. */
export const stickyText = (w: W) => boardBlocks(w).cols.flatMap(c => c.blocks.map(b => [b.start, b.x.title, b.mins + " min", c.title].filter(Boolean).join(" · "))).join("\n");

const POLL: Record<string, [string, () => string]> = {
  decide: ["Multiple choice", () => "Which option do we go with?"],
  prioritise: ["Ranking", () => "Rank what matters most."],
  criteria: ["100 points", () => "What should this decision be judged on?"],
  align: ["Scales", () => "How aligned are you right now?"],
  open: ["Word cloud", () => "One word for how you're arriving."],
  frame: ["Word cloud", () => "One word: what is this session really about?"],
  diverge: ["Open ended", () => "Add your ideas."],
  options: ["Open ended", () => "What options are we missing?"],
  commit: ["Open ended", () => "What will you do next, and by when?"],
  reflect: ["Open ended", () => "What will you take from today?"],
  close: ["Word cloud", () => "One word to close."]
};
const unq = (s: string) => s.replace(/^“|”$/g, "");
/** A poll per activity where one fits. The facilitator's or Library's own question wins over the default. */
export function mentiQuestions(w: W) {
  const qs = boardBlocks(w).live.filter(b => !b.isBreak && (POLL[b.x.role || ""] || b.sc.open)).map(b => {
    const [kind, def] = POLL[b.x.role || ""] || ["Open ended", () => ""];
    return kind + " · " + b.x.title + "\n" + (unq(b.sc.open) || b.sc.questions[0] || def());
  });
  return [w.name, "", ...qs.flatMap(q => [q, ""])].join("\n").trim();
}
