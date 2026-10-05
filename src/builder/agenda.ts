// The printable shape of a workshop, produced by Builder and turned into files by exporters.ts.

export type AgendaRow = { start?: string; end?: string; title: string; mins: number; output?: string; mode?: string; link?: string };
export type AgendaSection = { title: string; rows: AgendaRow[] };
export type AgendaDay = { label: string; range: string; total: string; sections: AgendaSection[] };
export type NoteEntry = { text: string; typed?: string; block: string; owner?: string };

export type AgendaDoc = {
  name: string;
  kicker: string; // "Workshop agenda" or "Agenda and session notes"
  meta: string; // "Starts 09:30 · 3h 20m · ends 12:50"
  brief: [string, string][];
  pre: AgendaRow[];
  days: AgendaDay[];
  after: AgendaRow[];
  notes: { group: string; entries: NoteEntry[] }[];
  date: string;
};

export const fileBase = (doc: AgendaDoc) => (doc.name || "workshop").replace(/[^\w]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "workshop";
