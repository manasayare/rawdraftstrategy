// Builder data model. Workshops are saved in localStorage ("rd-workspace") in exactly this shape,
// so field names match what earlier versions stored.

export type Zone = "pre" | "live" | "after";
export type ItemKind = "block" | "section" | "day";
export type View = "timeline" | "blocks" | "days";
export type NoteType = "decision" | "action" | "park" | "note" | "offline";

export type NoteEntry = { t: NoteType; text: string; owner?: string; at?: string; typed?: string };

export type ItemCfg = {
  mode?: string;
  output?: string;
  purpose?: string;
  instr?: string;
  materials?: string;
  notes?: string;
  groups?: string;
  gsize?: string;
  log?: NoteEntry[];
};

export type Item = {
  id: string;
  kind: ItemKind;
  zone: Zone;
  title?: string;
  mins?: number;
  role?: string;
  ref?: string | null;
  cfg: ItemCfg;
  /** Items sharing a par id run in parallel (breakout lanes). */
  par?: string | null;
  custom?: boolean;
  locked?: boolean;
};

export type Brief = {
  question?: string;
  outcome?: string;
  time?: string;
  people?: string;
  owner?: string;
  who?: string[];
  evidence?: string[];
  format?: string;
  notes?: string;
  context?: string;
};

export type ShareRef = { id: string; key: string };

export type Workshop = {
  id: string;
  name: string;
  items: Item[];
  brief: Brief;
  start: string;
  view: View;
  created?: number;
  updated?: number;
  chat?: unknown[];
  /** Set once the workshop has a share link; only this browser holds the key. */
  share?: ShareRef;
  sharedSig?: string;
  /** Share id this workshop was copied from. */
  from?: string;
};

export type LibFilters = { q: string; stage: string; time: string; people: string; format: string; output: string; type: string };
export const BLANK_FILTERS: LibFilters = { q: "", stage: "", time: "", people: "", format: "", output: "", type: "" };

export type ChangeType = "mins" | "remove" | "zone" | "replace" | "cfg" | "insert" | "move" | "note" | "brief";
export type Change = {
  type: ChangeType;
  id?: string;
  to?: number | string;
  ref?: string;
  key?: string;
  val?: string;
  anchor?: string | null;
  item?: Partial<Item>;
  label: string;
  what?: string;
  why: string;
  saved: number;
  on?: boolean;
  /** The engine's original change, kept for impact text. */
  eng?: unknown;
};
export type Proposal = { title: string; sub?: string; changes: Change[] };

export type DragPayload =
  | { kind: "move"; id: string; isBlock: boolean; title: string; mins: string | number; label: string }
  | { kind: "lib"; id: string; isBlock: boolean; title: string; mins: string; label: string }
  | { kind: "struct"; t: StructType; isBlock: boolean; title: string; mins: string; label: string };
export type Drop = { type: "cancel"; key: "cancel" } | { type: "par"; id: string; key: string } | { type: "ins"; at: number; zone: Zone; key: string };
export type StructType = "break" | "lunch" | "custom" | "section" | "day";

export type RunState = {
  /** Index of the current block among live blocks. */
  i: number;
  /** Elapsed ms banked before the current start. */
  acc: number;
  /** When the clock was last started, or null while paused. */
  t0: number | null;
  /** Actual ms spent per block id. */
  log: Record<string, number>;
  /** Extra minutes added per block id. */
  extra: Record<string, number>;
  done: boolean;
};

export type Phase = "home" | "bench";
export type Center = "canvas" | "tpl";
export type Sheet = "lib" | "assist" | null;
