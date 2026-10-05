// Sound and haptic cues for Run mode. Tones are synthesised (no files), quiet, and short enough to sit
// under a room's conversation. Vibration uses navigator.vibrate: Android phones and tablets; iPhone
// Safari has no vibration API, so there it is sound only.

export type Cue = "start" | "next" | "back" | "pause" | "resume" | "capture" | "warn" | "due" | "over" | "end";
/** Cues the facilitator causes. The rest are the clock talking. */
const ACTION: Cue[] = ["next", "back", "pause", "resume", "capture"];

type Note = [freq: number, at: number, len: number, gain?: number];
const SOUND: Record<Cue, { type: OscillatorType; notes: Note[] }> = {
  start: { type: "sine", notes: [[523, 0, 0.35], [659, 0.12, 0.35], [784, 0.24, 0.6]] },
  next: { type: "triangle", notes: [[880, 0, 0.09, 0.05]] },
  back: { type: "triangle", notes: [[660, 0, 0.09, 0.05]] },
  pause: { type: "sine", notes: [[740, 0, 0.12, 0.05], [554, 0.09, 0.16, 0.05]] },
  resume: { type: "sine", notes: [[554, 0, 0.12, 0.05], [740, 0.09, 0.16, 0.05]] },
  capture: { type: "triangle", notes: [[1320, 0, 0.05, 0.04], [1760, 0.05, 0.08, 0.04]] },
  warn: { type: "sine", notes: [[587, 0, 0.35], [587, 0.3, 0.45]] },
  due: { type: "sine", notes: [[660, 0, 0.6], [880, 0.22, 0.7]] },
  over: { type: "sine", notes: [[440, 0, 0.4], [330, 0.25, 0.5], [440, 0.7, 0.4], [330, 0.95, 0.6]] },
  end: { type: "sine", notes: [[784, 0, 0.5], [659, 0.15, 0.5], [523, 0.3, 0.6], [392, 0.45, 1.1]] }
};
const BUZZ: Record<Cue, number | number[]> = {
  start: [20, 40, 20], next: 8, back: 8, pause: 15, resume: 15, capture: 12,
  warn: [30, 60, 30], due: [80, 60, 80], over: [200, 100, 200], end: [40, 60, 40, 60, 120]
};

let ctx: AudioContext | null = null;
function audio() {
  if (typeof window === "undefined") return null;
  try {
    const A = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx || new A();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  } catch { return null; }
}
/** Browsers only start audio from a tap or key. Called on the first one after a reload mid-session. */
export const unlockAudio = () => { audio(); };

function play(c: Cue) {
  const a = audio();
  if (!a) return;
  const { type, notes } = SOUND[c], t0 = a.currentTime + 0.01;
  notes.forEach(([f, at, len, peak = 0.08]) => {
    const o = a.createOscillator(), g = a.createGain(), t = t0 + at;
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(g).connect(a.destination);
    o.start(t); o.stop(t + len + 0.05);
  });
}

export const canVibrate = () => typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

export type CueSettings = { sound: "soft" | "visual" | "silent"; clicks?: boolean; haptics?: boolean };
/** Plays a cue as the facilitator's settings allow. Time cues follow "When time is up"; action cues also need clicks on. */
export function cue(c: Cue, s: CueSettings) {
  const isAction = ACTION.includes(c);
  if (s.sound === "soft" && (!isAction || s.clicks !== false)) play(c);
  if (s.haptics !== false && s.sound !== "silent" && canVibrate()) { try { navigator.vibrate(BUZZ[c]); } catch {} }
}
