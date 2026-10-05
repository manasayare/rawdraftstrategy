// Typed access to the shared engines loaded by src/rd (window.RD, RDL, RDB). The Library, Item pages and
// Builder all use them, so they stay as they are; this file is the boundary where their loose data gets types.
/* eslint-disable @typescript-eslint/no-explicit-any */

export type LibStep = string | { name?: string; purpose?: string; methods?: string[] };
export type LibItem = {
  id: string;
  title: string;
  type: string;
  short?: string;
  outputs?: string[];
  steps?: LibStep[];
  sourceUrl?: string;
  toolLinks?: { tool?: string; url: string; label?: string }[];
  materials?: string[];
  failures?: string[];
  useWhen?: string[];
  sizes?: string[];
  delivery?: string;
  stage?: string;
  timeKey?: string;
  duration?: string;
  level?: string;
  agenda?: { ref?: string; name?: string; mins?: number; purpose?: string; output?: string }[];
  sequence?: [string, string][];
  uses?: string[];
  _n?: number;
};
export type Deco = { href: string; typeLabel: string; timeLabel?: string; creatorLabel?: string };

/** [label, candidate titles, default minutes, uses, makes, kind, energy] */
export type RoleDef = [string, string[], number, string[], string[], string, number];

/** The engine's view of a block (see eng() in items.ts). */
export type EngBlock = { id: string; role: string; label: string; ref?: string | null; title?: string; mins: number; locked?: boolean; pre: boolean };

export type Insight = { sev: "high" | "mid" | "low"; t: string; fix: string; cmd?: string; n?: number; at?: string };
export type FlowRow = { id: string; uses: { k: string; ok: boolean }[]; makes: string[] };
export type Alternative = { id: string; title: string; why: string; meta: string };
export type Suggestion = { it: LibItem; why: string; role: string };
export type Detail = {
  purpose?: string; why: string; steps: string[]; output: string; input: string; notes: string[];
  useWhen: string[]; avoidWhen: string[]; watch: string[]; assets: { href: string; title: string }[];
  source?: string; rights?: string; related: { href: string; title: string }[]; href: string;
};
export type Template = { name: string; d: string; seq: (string | number)[][]; brief?: Record<string, unknown> };

export type RDBApi = {
  ROLES: Record<string, RoleDef>;
  ORDER: string[];
  TPL: Template[];
  MIN: Record<string, number>;
  WHY: Record<string, string>;
  roleOf(it: LibItem | null | undefined): string;
  minsOf(it: LibItem | null | undefined): number;
  suggest(blocks: EngBlock[], anchor: Partial<EngBlock> | null, dir: "before" | "after"): Suggestion[];
  flow(blocks: EngBlock[]): FlowRow[];
  alternatives(b: object, blk: Partial<EngBlock>): Alternative[];
  command(cmd: string, b: object, blocks: EngBlock[], avail: number, n?: number | null): { title: string; short?: string; changes: any[] };
  impact(blocks: EngBlock[], c: any): string;
  detail(b: object, blk: Partial<EngBlock>): Detail;
  insertAt(blocks: EngBlock[], role: string): number;
  total(blocks: EngBlock[]): number;
  compose(b: object): { day?: boolean; role: string; ref?: string | null; title: string; mins: number }[];
  recommend(b: object): { name: string; why: string };
};
export type RDLApi = {
  STAGES: [string, string][];
  get(id: string | null | undefined): LibItem | undefined;
  deco(it: LibItem): Deco;
  search(q: string, pool: LibItem[]): LibItem[];
};

declare global {
  interface Window {
    RD?: { items: LibItem[] };
    RDB?: RDBApi;
    RDL?: RDLApi;
  }
}

export const enginesReady = () => typeof window !== "undefined" && !!(window.RDB && window.RD && window.RDL && window.RDB.TPL);
export const RDB = () => window.RDB as RDBApi;
export const RDL = () => window.RDL as RDLApi;
export const libraryItems = () => (window.RD as { items: LibItem[] }).items;
