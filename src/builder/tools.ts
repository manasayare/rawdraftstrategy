// Where workshop material lives outside Raw Draft: whiteboards, polls, slides. Links come from the
// block ("Board, poll and slides links") and from the Library record's template links.
import { RDL } from "./engine";
import type { Item } from "./types";

export type ToolLink = { tool: string; url: string; label: string; fromLibrary?: boolean };

const TOOLS: [RegExp, string][] = [
  [/(^|\.)miro\.com$/, "Miro"], [/(^|\.)figma\.com$/, "FigJam"], [/(^|\.)mentimeter\.com$|(^|\.)menti\.com$/, "Mentimeter"],
  [/(^|\.)slido\.com$|(^|\.)sli\.do$/, "Slido"], [/(^|\.)mural\.co$/, "Mural"], [/(^|\.)canva\.com$/, "Canva"], [/(^|\.)notion\.(so|site)$/, "Notion"],
  [/(^|\.)loom\.com$/, "Loom"], [/(^|\.)kahoot\.(it|com)$/, "Kahoot"], [/(^|\.)lucid\.app$|(^|\.)lucidspark\.com$/, "Lucid"], [/(^|\.)whimsical\.com$/, "Whimsical"]
];

export function toolOf(url: string): string {
  try {
    const u = new URL(url), h = u.hostname.replace(/^www\./, "");
    if (/docs\.google\.com$/.test(h)) return /\/presentation\//.test(u.pathname) ? "Google Slides" : /\/spreadsheets\//.test(u.pathname) ? "Google Sheets" : /\/forms\//.test(u.pathname) ? "Google Forms" : "Google Docs";
    if (/figma\.com$/.test(h)) return /\/board\/|\/file\/.*figjam|\/jam\//i.test(u.pathname + u.search) ? "FigJam" : "Figma";
    return TOOLS.find(([re]) => re.test(h))?.[1] || h;
  } catch { return "Link"; }
}

const URL_RE = /https?:\/\/[^\s<>"')]+/g;
export const parseLinks = (text?: string): ToolLink[] =>
  (text || "").split("\n").flatMap(line => {
    const urls = line.match(URL_RE) || [];
    const label = line.replace(URL_RE, "").replace(/[-–—:|·]+\s*$/, "").trim();
    return urls.map(url => ({ tool: toolOf(url), url, label }));
  });

/** Links for a block: the facilitator's own first, then any template links on its Library record. */
export function linksOf(x: Item): ToolLink[] {
  const own = parseLinks(x.cfg.links);
  const it = x.ref ? RDL().get(x.ref) : undefined;
  const lib: ToolLink[] = (it?.toolLinks || []).filter(l => l?.url).map(l => ({ tool: l.tool || toolOf(l.url), url: l.url, label: l.label || "Template", fromLibrary: true }));
  if (it?.sourceUrl && toolOf(it.sourceUrl) !== new URL(it.sourceUrl, "https://x").hostname.replace(/^www\./, "")) lib.push({ tool: toolOf(it.sourceUrl), url: it.sourceUrl, label: "Template", fromLibrary: true });
  const seen = new Set<string>();
  return [...own, ...lib].filter(l => (seen.has(l.url) ? false : (seen.add(l.url), true)));
}

/** Tools participants join (polls, boards) rather than ones only the facilitator uses. */
export const PARTICIPANT_TOOLS = ["Mentimeter", "Slido", "Miro", "FigJam", "Mural", "Kahoot", "Google Forms", "Lucid", "Whimsical"];
