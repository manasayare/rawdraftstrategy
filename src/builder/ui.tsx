"use client";
// Shared context and small presentational pieces for Builder components.
import { createContext, useContext, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { C } from "./constants";
import type { Derived } from "./derive";
import type { BuilderStore, State } from "./store";

export const DISPLAY = "'Clash Display',sans-serif";
export const BODY = "'Satoshi',sans-serif";

const Ctx = createContext<{ store: BuilderStore; d: Derived } | null>(null);
export const BuilderProvider = Ctx.Provider;
export function useBuilder(): { S: State; store: BuilderStore; d: Derived } {
  const c = useContext(Ctx)!;
  const S = useSyncExternalStore(c.store.subscribe, c.store.get, c.store.get);
  return { S, store: c.store, d: c.d };
}

/** Small uppercase label above a group. */
export const Kicker = ({ children, color = C.mute, style }: { children: ReactNode; color?: string; style?: CSSProperties }) => (
  <div style={{ fontSize: 12, letterSpacing: ".06em", color, ...style }}>{children}</div>
);
/** Kicker with a value on the right. */
export const KickerRow = ({ left, right, style }: { left: ReactNode; right: ReactNode; style?: CSSProperties }) => (
  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12, letterSpacing: ".06em", color: C.mute, ...style }}><span>{left}</span><span>{right}</span></div>
);

const base: CSSProperties = { whiteSpace: "nowrap", cursor: "pointer" };
/** Bordered button on the dark background. */
export const outline = (o: CSSProperties = {}): CSSProperties => ({ ...base, background: "none", border: "1px solid " + C.line, color: C.ink, ...o });
/** Filled light button. */
export const solid = (o: CSSProperties = {}): CSSProperties => ({ ...base, background: C.ink, border: 0, color: C.bg, fontWeight: 500, ...o });
/** Filled accent button. */
export const accent = (o: CSSProperties = {}): CSSProperties => ({ ...base, background: C.accent, border: 0, color: C.bg, fontWeight: 500, ...o });
/** Borderless text button. */
export const textBtn = (o: CSSProperties = {}): CSSProperties => ({ ...base, background: "none", border: 0, padding: 0, ...o });

/** Pressed/unpressed option chip (filters, modes, note types). */
export function Chip({ on, onClick, children, style, off = C.soft }: { on: boolean; onClick: () => void; children: ReactNode; style?: CSSProperties; off?: string }) {
  return (
    <button onClick={onClick} aria-pressed={on ? "true" : "false"} style={{ ...base, background: on ? C.ink : "transparent", color: on ? C.bg : off, border: "1px solid " + (on ? C.ink : C.line), ...style }}>
      {children}
    </button>
  );
}

/** Library links are stored as "#/library/…"; the app routes on paths. */
export const path = (h?: string) => (h && h.startsWith("#/") ? h.slice(1) : h || "");

export const field: CSSProperties = { background: C.well, border: "1px solid " + C.rule, color: C.ink, fontFamily: BODY };
