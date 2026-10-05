// Fixed copy and option lists used across Builder.
import type { Brief, NoteType, StructType } from "./types";

export type BriefKey = "outcome" | "time" | "people" | "owner" | "who" | "evidence" | "format";
export const BRIEF_QUESTIONS: { key: BriefKey; label: string; options: string[]; multi: boolean }[] = [
  { key: "outcome", label: "Outcome", options: ["Decision", "Direction", "Ideas", "Prototype", "Research evidence", "Plan", "Alignment", "Priorities", "Strategy"], multi: false },
  { key: "time", label: "Time", options: ["90 min", "Half day", "1 day", "2 days", "3 to 5 days", "Multiple sessions", "Not sure"], multi: false },
  { key: "people", label: "People", options: ["1", "2 to 5", "6 to 10", "11 to 20", "20+"], multi: false },
  { key: "owner", label: "Decision owner", options: ["Yes", "Joins final part", "No", "Not sure"], multi: false },
  { key: "who", label: "In the room", options: ["Founders", "Leadership", "Product", "Design", "Engineering", "Research", "Sales", "Marketing", "Operations", "Customers", "External stakeholders"], multi: true },
  { key: "evidence", label: "Evidence", options: ["Customer research", "Analytics", "Market research", "Internal data", "Existing strategy", "Prototype", "Nothing yet"], multi: true },
  { key: "format", label: "Format", options: ["In person", "Remote", "Hybrid", "Not sure"], multi: false }
];
/** Context fields editable in the side panel. */
export const CONTEXT_KEYS: (keyof Brief & BriefKey)[] = ["outcome", "time", "people", "owner", "format"];

export const NOTE_TYPES: { key: NoteType; label: string; placeholder: string; color: string }[] = [
  { key: "decision", label: "Decision", placeholder: "What was decided", color: "#ff4b23" },
  { key: "action", label: "Action", placeholder: "What needs doing, by when · @owner", color: "#ece9e0" },
  { key: "park", label: "Parking lot", placeholder: "Question or topic to come back to", color: "#c9c5ba" },
  { key: "note", label: "Note", placeholder: "Observation, quote, energy in the room", color: "#c9c5ba" },
  { key: "offline", label: "Offline", placeholder: "Where it lives: flipchart, sticky wall, photo", color: "#8f8b80" }
];

export const STRUCTS: [StructType, string][] = [["break", "Break"], ["lunch", "Lunch"], ["custom", "Custom block"], ["section", "Section"], ["day", "Day"]];
export const STRUCT_MINS: Record<StructType, string> = { break: "10 min", lunch: "45 min", custom: "20 min", section: "", day: "" };

export const CUSTOM_PRESETS = ["Presentation", "Discussion", "Client update", "Demo", "Coffee", "Lunch", "CEO introduction", "Custom exercise"];
export const MODES = ["Individual", "Pair", "Small group", "Whole group"];

export const WORKSHOP_CMDS: [string, string][] = [
  ["Fit to time", "fit"], ["Cut 30 minutes", "cut"], ["Make this remote", "remote"], ["Adapt for 20 people", "big"], ["Executive-friendly", "exec"], ["Add a decision gate", "decision"],
  ["Add customer evidence", "evidence"], ["More divergence", "diverge"], ["Improve convergence", "converge"], ["Create pre-work", "prework"], ["Easier to facilitate", "easy"], ["Add a break", "break"]
];

export const BLANK_NOTICE = "Blank workshop. Drag from the Library, or use + Structure for breaks, sections and custom blocks.";
export const BIG_GROUPS = ["11 to 20", "20+"];

/** Slight rotations that make cards feel placed by hand. */
export const TILT = [-0.6, 0.5, -0.3, 0.7, -0.5, 0.4, -0.7, 0.3];

// Palette
export const C = { ink: "#ece9e0", soft: "#c9c5ba", mute: "#8f8b80", faint: "#5a5850", line: "#34332e", rule: "#2a2925", hair: "#1d1c1a", bg: "#0b0b0a", well: "#111110", card: "#1a1917", accent: "#ff4b23", edge: "#4a4843" } as const;
