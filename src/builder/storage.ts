// Workshops live in this browser's localStorage. Keys and shapes match earlier versions so nothing is lost.
import type { Workshop } from "./types";

const WORKSPACE = "rd-workspace";

export type Workspace = { workshops: Workshop[]; current: string | null };

export function loadWorkspace(): Workspace {
  try {
    const w = JSON.parse(localStorage.getItem(WORKSPACE) || "null");
    if (w && Array.isArray(w.workshops)) return { workshops: w.workshops, current: w.current || null };
  } catch {}
  return { workshops: [], current: null };
}

export function saveWorkspace(w: Workspace) {
  try { localStorage.setItem(WORKSPACE, JSON.stringify(w)); } catch {}
}
