"use client";
// Participant screen (/present), for a projector or a shared screen. Shows only the current task,
// its timer and what participants need. Updates as the facilitator moves on, from another window.
import { useEffect, useState } from "react";
import { C } from "./constants";
import { listenPresent, readPresent, type PresentSnapshot } from "./run/present";
import { mmss } from "./time";
import { DISPLAY } from "./ui";

const hhmm = (t: number) => { const d = new Date(t); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); };

export default function Present() {
  const [snap, setSnap] = useState<PresentSnapshot | null>(null);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    setSnap(readPresent());
    const off = listenPresent(setSnap);
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => { off(); clearInterval(t); };
  }, []);

  const shell = { minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: "'Satoshi',sans-serif", display: "flex", flexDirection: "column" as const, padding: "clamp(24px,5vw,72px)" };
  if (!snap || snap.status === "waiting") return (
    <main style={{ ...shell, justifyContent: "center" }}>
      <div style={{ fontSize: 14, letterSpacing: ".08em", color: C.mute }}>RAW DRAFT · PARTICIPANT VIEW</div>
      <h1 style={{ margin: "14px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(40px,7vw,110px)", letterSpacing: "-.04em", lineHeight: 0.95 }}>{snap?.name || "Waiting for the workshop to start."}</h1>
      <p style={{ marginTop: 18, fontSize: 20, color: C.soft }}>{snap ? "Starting soon." : "Open Run mode in Builder in this browser and start the workshop. This screen follows it."}</p>
    </main>
  );
  if (snap.status === "ended") return (
    <main style={{ ...shell, justifyContent: "center" }}>
      <div style={{ fontSize: 14, letterSpacing: ".08em", color: C.mute }}>{snap.name.toUpperCase()}</div>
      <h1 style={{ margin: "14px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(48px,8vw,130px)", letterSpacing: "-.04em", lineHeight: 0.95 }}>Thank you.</h1>
    </main>
  );

  const el = snap.acc + (snap.t0 ? now - snap.t0 : 0), rem = snap.planMs - el, over = rem < 0;
  const frac = Math.max(0, Math.min(1, rem / Math.max(1, snap.planMs)));
  return (
    <main style={shell}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 20, fontSize: 16, color: C.mute }}><span>{snap.name}</span><span style={{ fontVariantNumeric: "tabular-nums" }}>{hhmm(now)}</span></div>
      <div style={{ flex: "1 1 auto", display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: "4vw", alignItems: "center", marginTop: "3vh" }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "clamp(14px,1.4vw,22px)", letterSpacing: ".08em", color: C.accent }}>{snap.isBreak ? "BREAK" : "NOW"}</div>
          <h1 style={{ margin: "1vh 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: snap.isBreak ? "clamp(64px,11vw,200px)" : "clamp(44px,6.4vw,120px)", letterSpacing: "-.04em", lineHeight: 0.95 }}>{snap.title}</h1>
          {snap.isBreak ? (
            <p style={{ margin: "4vh 0 0", fontSize: "clamp(24px,3vw,52px)", color: C.soft }}>Back at <span style={{ color: C.ink }}>{hhmm(now + Math.max(0, rem))}</span></p>
          ) : (
            <>
              {snap.question && <p style={{ margin: "3vh 0 0", fontFamily: DISPLAY, fontSize: "clamp(24px,2.8vw,48px)", lineHeight: 1.2, color: C.ink, maxWidth: "28ch" }}>{snap.question}</p>}
              {snap.lines.length > 0 && <ol style={{ margin: "3vh 0 0", paddingLeft: "1.2em", fontSize: "clamp(20px,2vw,34px)", lineHeight: 1.45, color: C.soft, display: "flex", flexDirection: "column", gap: "1vh" }}>{snap.lines.map((l, i) => <li key={i}>{l}</li>)}</ol>}
            </>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg viewBox="0 0 200 200" style={{ width: "min(36vw,62vh)", height: "auto" }} aria-hidden="true">
            <circle cx="100" cy="100" r="78" fill="none" stroke={over ? "rgba(255,75,35,.12)" : "#1a1917"} strokeWidth="34" />
            {frac > 0 && <circle cx="100" cy="100" r="78" fill="none" stroke={snap.t0 ? C.accent : C.mute} strokeWidth="34" strokeDasharray={`${2 * Math.PI * 78 * frac} ${2 * Math.PI * 78}`} transform="rotate(-90 100 100)" />}
            <text x="100" y="108" textAnchor="middle" fill={over ? C.accent : C.ink} style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 500 }}>{over ? "Time" : mmss(rem)}</text>
          </svg>
          {snap.next && !snap.isBreak && <div style={{ marginTop: "3vh", fontSize: "clamp(16px,1.4vw,24px)", color: C.mute }}>Next: {snap.next}</div>}
        </div>
      </div>
    </main>
  );
}
