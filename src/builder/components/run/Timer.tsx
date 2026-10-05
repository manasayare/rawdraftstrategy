"use client";
// Raw Draft countdown dial. A thick ring whose orange segment shrinks back toward twelve o'clock as
// time runs out, so remaining time reads at a glance from across a room. Numbers sit in the middle.
import { C } from "../../constants";
import { mmss } from "../../time";
import { DISPLAY } from "../../ui";

export type TimerState = "ready" | "paused" | "normal" | "approaching" | "final" | "over";

export function timerState(remMs: number, planMs: number, running: boolean, started: boolean): TimerState {
  if (remMs <= 0) return "over";
  if (!started) return "ready";
  if (!running) return "paused";
  if (remMs <= 60000) return "final";
  if (remMs <= Math.max(120000, planMs * 0.2)) return "approaching";
  return "normal";
}
export const STATE_LABEL: Record<TimerState, string> = { ready: "READY", paused: "PAUSED", normal: "REMAINING", approaching: "WRAPPING UP", final: "FINAL MINUTE", over: "OVER TIME" };

export default function Timer({ remMs, planMs, state, size = 360, flash = false }: { remMs: number; planMs: number; state: TimerState; size?: number; flash?: boolean }) {
  const R = 78, CIRC = 2 * Math.PI * R, frac = state === "over" ? 0 : Math.max(0, Math.min(1, remMs / Math.max(1, planMs)));
  const arc = state === "paused" || state === "ready" ? C.mute : C.accent;
  const num = state === "over" || state === "final" ? C.accent : state === "approaching" ? "#ffb39f" : C.ink;
  const text = (state === "over" ? "+" : "") + mmss(remMs);
  // Five-minute ticks for plans up to an hour, fifteen-minute ticks above.
  const planMin = planMs / 60000, step = planMin > 60 ? 15 : 5, ticks = Math.max(0, Math.floor(planMin / step));
  return (
    <div role="timer" aria-label={(state === "over" ? "Over by " : "Remaining ") + text.replace("+", "")} style={{ position: "relative", width: size, height: size, maxWidth: "100%", aspectRatio: "1 / 1" }}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true" style={{ display: "block" }}>
        <circle cx="100" cy="100" r={R} fill="none" stroke={state === "over" ? "rgba(255,75,35,.12)" : "#1a1917"} strokeWidth="34" />
        {Array.from({ length: ticks }, (_, i) => {
          const a = ((i * step) / planMin) * 2 * Math.PI - Math.PI / 2;
          return <line key={i} x1={100 + Math.cos(a) * 97} y1={100 + Math.sin(a) * 97} x2={100 + Math.cos(a) * 92} y2={100 + Math.sin(a) * 92} stroke={C.faint} strokeWidth="1" />;
        })}
        {frac > 0 && (
          <circle cx="100" cy="100" r={R} fill="none" stroke={arc} strokeWidth="34" strokeDasharray={`${CIRC * frac} ${CIRC}`} transform="rotate(-90 100 100)"
            style={{ transition: "stroke-dasharray .25s linear, stroke .3s" }} />
        )}
        {state === "over" && <circle cx="100" cy="100" r={R + 17} fill="none" stroke={C.accent} strokeWidth="1.5" strokeDasharray="4 4" />}
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: size * 0.17, lineHeight: 1, letterSpacing: "-.01em", fontVariantNumeric: "tabular-nums", color: num, transition: "color .3s", animation: flash ? "rdflash 1.2s ease-out 2" : undefined }}>{text}</div>
        <div style={{ marginTop: size * 0.03, fontSize: Math.max(11, size * 0.034), letterSpacing: ".08em", color: state === "over" || state === "final" ? C.accent : C.mute }}>{STATE_LABEL[state]}</div>
      </div>
    </div>
  );
}
