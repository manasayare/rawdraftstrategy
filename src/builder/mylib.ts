// My Library: the facilitator's own templates and activities, saved Library items and recent ones.
// Lives in this browser next to the workshops. Shape is plain JSON so a future account sync or
// connector can read and write it.
import type { Brief, Item, ItemCfg, WorkshopContext } from "./types";

export type MyTemplate = { id: string; name: string; d: string; items: Item[]; brief: Brief; start: string; context?: WorkshopContext; created: number; fromRun?: boolean };
export type MyActivity = { id: string; title: string; mins: number; role?: string; ref?: string | null; cfg: ItemCfg; created: number };
export type MyLibrary = { templates: MyTemplate[]; activities: MyActivity[]; saved: string[]; recent: string[] };

const KEY = "rd-mylib";
const empty = (): MyLibrary => ({ templates: [], activities: [], saved: [], recent: [] });

export function loadMyLibrary(): MyLibrary {
  try { const v = JSON.parse(localStorage.getItem(KEY) || "null"); if (v) return { ...empty(), ...v }; } catch {}
  return empty();
}
export function saveMyLibrary(m: MyLibrary) { try { localStorage.setItem(KEY, JSON.stringify(m)); } catch {} }
export const libId = (p: string) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

/** Strips run-specific data so a template starts clean. */
export const cleanItems = (items: Item[]): Item[] => items.map(x => {
  const cfg = { ...x.cfg };
  delete cfg.log;
  return { ...x, cfg };
});
