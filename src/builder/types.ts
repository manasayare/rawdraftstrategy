// Builder data model. Workshops are saved in localStorage ("rd-workspace") in exactly this shape,
// so field names match what earlier versions stored.

/** "backup" holds alternatives that are not in the timeline until activated during a run. */
export type Zone = "pre" | "live" | "after" | "backup";
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
  // Facilitator script, shown in Run mode
  open?: string;
  questions?: string;
  watch?: string;
  transition?: string;
  /** What the room sees on the participant screen. */
  participant?: string;
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
  /** Optional blocks can be skipped when running late. Default is core. */
  priority?: "core" | "optional";
  /** For a backup: the block it stands in for. */
  backupFor?: string | null;
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

// ---- Context: what the workshop is for, kept with it for its whole life ----
export type SourceType = "paste" | "ai" | "agenda" | "notes" | "file" | "connector";
export type Source = { id: string; type: SourceType; title: string; text: string; added: number; origin?: string; url?: string };
export type ContextBrief = import("./import/parse").ContextBrief;
export type WorkshopContext = { brief: ContextBrief; sources: Source[] };

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
  context?: WorkshopContext;
  session?: Session | null;
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

// ---- Session: one run of the workshop, and what was captured ----
export type CaptureType = "decision" | "question" | "parking" | "followup" | "observation" | "note";
export type Capture = {
  id: string;
  type: CaptureType;
  text: string;
  /** Wall-clock time of capture (ms). */
  at: number;
  blockId?: string;
  blockTitle?: string;
  owner?: string;
  // Decision log
  decider?: string;
  rationale?: string;
  evidence?: string;
  followup?: string;
  /** Parking lot / follow-up handling after the session. */
  status?: "open" | "action" | "followup" | "resolved";
};
export type RunSettings = { sound: "soft" | "visual" | "silent"; show: Record<string, boolean> };
export type Session = {
  id: string;
  startedAt: number | null;
  endedAt: number | null;
  /** Ordered ids of the blocks being run (live blocks plus activated backups). */
  order: string[];
  i: number;
  acc: number;
  t0: number | null;
  actual: Record<string, number>;
  extra: Record<string, number>;
  skipped: string[];
  /** Ids whose clock has been started at least once. */
  started: string[];
  breakUntil: number | null;
  captures: Capture[];
  outputs: Record<string, string>;
  blockNotes: Record<string, string>;
  general: string;
  checklist: Record<string, boolean>;
  settings: RunSettings;
};

export type Phase = "home" | "import" | "bench" | "review";
export type Center = "canvas" | "tpl";
export type Sheet = "lib" | "assist" | null;
