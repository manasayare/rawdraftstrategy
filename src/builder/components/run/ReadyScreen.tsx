"use client";
// Before the run: a calm summary, a facilitator checklist (never blocking), and everything to glance
// over once more: agenda, materials and preparation notes.
import { useState } from "react";
import { C } from "../../constants";
import { mins } from "../../items";
import { CHECKLIST, runnable } from "../../run/session";
import { scriptFor } from "../../run/script";
import { clock, hm } from "../../time";
import { DISPLAY, Kicker, accent, outline, textBtn, useBuilder } from "../../ui";

export const openPresent = () => window.open("/present", "rd-present", "popup,width=1280,height=760");

export default function ReadyScreen() {
  const { S, store, d } = useBuilder();
  const [tab, setTab] = useState<"agenda" | "materials" | "notes" | null>("agenda");
  const rows = runnable(S.items), people = S.brief.people, decisions = rows.filter(r => ["decide", "prioritise", "criteria"].includes(r.x.role || "")).length;
  const total = d.total, ck = S.readyChecklist, done = CHECKLIST.filter(([k]) => ck[k]).length;
  const prev = S.session?.endedAt;
  let t = d.start, day = 1;
  const timed = rows.map(r => { if (r.day !== day) { day = r.day; t = d.start; } const st = t; t += mins(r.x); return { ...r, st }; });
  const materials = rows.map(r => ({ x: r.x, m: scriptFor(r.x, S.brief).materials })).filter(r => r.m);
  const notes = rows.map(r => ({ x: r.x, n: r.x.cfg.notes || "", p: scriptFor(r.x, S.brief).purpose })).filter(r => r.n || r.p);
  const tabBtn = (k: typeof tab, l: string) => (
    <button key={k} onClick={() => setTab(tab === k ? null : k)} aria-expanded={tab === k} style={{ whiteSpace: "nowrap", background: "none", border: 0, borderBottom: "2px solid " + (tab === k ? C.accent : "transparent"), color: tab === k ? C.ink : C.soft, minHeight: 40, padding: 0, marginRight: 22, cursor: "pointer", fontSize: 15 }}>{l}</button>
  );

  return (
    <div style={{ flex: "1 1 auto", padding: "clamp(28px,5vw,72px) clamp(16px,4vw,56px)", maxWidth: 1180, width: "100%", margin: "0 auto" }}>
      <Kicker color={C.accent}>READY TO RUN</Kicker>
      <h1 style={{ margin: "12px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(40px,6vw,88px)", letterSpacing: "-.04em", lineHeight: 0.92, maxWidth: "18ch" }}>{S.name}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px", marginTop: 20, fontSize: 18, color: C.soft }}>
        <span>{hm(total)}{d.nDays > 1 ? " across " + d.nDays + " days" : ""}</span>
        {people && <span>{people} participants</span>}
        <span>{rows.filter(r => r.x.role !== "breaks").length} activities</span>
        {decisions > 0 && <span>{decisions} decision{decisions > 1 ? "s" : ""}</span>}
        <span>Scheduled {clock(d.start)} → {clock(d.start + (d.nDays > 1 ? (d.L.days[0]?.dur || 0) : total))}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
        <button autoFocus onClick={() => store.startRun()} className="rd-run-btn" style={accent({ minHeight: 56, padding: "0 28px", fontSize: 17 })}>Start workshop</button>
        <button onClick={openPresent} className="rd-run-btn" style={outline({ minHeight: 56, padding: "0 20px", fontSize: 15, border: "1px solid " + C.edge })}>Open participant view ↗</button>
        <button onClick={() => store.exitRun()} className="bh-ink" style={textBtn({ color: C.mute, minHeight: 56, fontSize: 15, marginLeft: 8 })}>Back to Build</button>
      </div>
      {prev && <p style={{ margin: "14px 0 0", fontSize: 14, color: C.mute }}>Starting again begins a new record. The last run's notes and decisions stay in Review until then.</p>}

      <div style={{ display: "grid", gridTemplateColumns: d.wide ? "minmax(0,1.5fr) minmax(280px,1fr)" : "minmax(0,1fr)", gap: "32px 56px", marginTop: 44, alignItems: "start" }}>
        <section>
          <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "1px solid " + C.rule }}>{tabBtn("agenda", "Review agenda")}{tabBtn("materials", "Materials")}{tabBtn("notes", "Facilitator notes")}</div>
          {tab === "agenda" && timed.map((r, k) => (
            <div key={r.x.id}>
              {r.sec && r.sec !== timed[k - 1]?.sec && <div style={{ padding: "14px 0 4px", fontSize: 12, letterSpacing: ".06em", color: C.accent }}>{(d.nDays > 1 ? "DAY " + r.day + " · " : "") + r.sec.toUpperCase()}</div>}
              <div style={{ display: "grid", gridTemplateColumns: "56px minmax(0,1fr) auto", gap: 12, padding: "10px 0", borderBottom: "1px solid " + C.hair, fontSize: 16, color: r.x.role === "breaks" ? C.mute : C.ink }}>
                <span style={{ color: C.mute, fontVariantNumeric: "tabular-nums" }}>{clock(r.st)}</span>
                <span>{r.x.title}{r.x.priority === "optional" && <span style={{ marginLeft: 8, fontSize: 12, color: C.mute }}>OPTIONAL</span>}</span>
                <span style={{ color: C.mute }}>{mins(r.x)} min</span>
              </div>
            </div>
          ))}
          {tab === "materials" && (materials.length ? materials.map(r => (
            <div key={r.x.id} style={{ padding: "10px 0", borderBottom: "1px solid " + C.hair }}><div style={{ fontSize: 13, color: C.mute }}>{r.x.title}</div><div style={{ marginTop: 2, fontSize: 16 }}>{r.m}</div></div>
          )) : <p style={{ color: C.mute, fontSize: 15 }}>No materials listed. Add them per block in Build.</p>)}
          {tab === "notes" && notes.map(r => (
            <div key={r.x.id} style={{ padding: "10px 0", borderBottom: "1px solid " + C.hair }}>
              <div style={{ fontSize: 13, color: C.mute }}>{r.x.title}</div>
              {r.p && <div style={{ marginTop: 2, fontSize: 15, color: C.soft }}>{r.p}</div>}
              {r.n && <div style={{ marginTop: 4, fontSize: 15 }}>{r.n}</div>}
            </div>
          ))}
        </section>
        <section aria-label="Checklist">
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, letterSpacing: ".06em", color: C.mute }}><span>CHECKLIST</span><span>{done} / {CHECKLIST.length}</span></div>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: C.mute }}>For you, not a gate. Start whenever you're ready.</p>
          <div style={{ marginTop: 10, borderTop: "1px solid " + C.rule }}>
            {CHECKLIST.map(([k, l]) => (
              <label key={k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid " + C.hair, cursor: "pointer", fontSize: 16, color: ck[k] ? C.mute : C.ink }}>
                <input type="checkbox" checked={!!ck[k]} onChange={e => store.set(s => ({ readyChecklist: { ...s.readyChecklist, [k]: e.target.checked } }))} style={{ width: 20, height: 20, accentColor: C.accent }} />
                <span style={{ textDecoration: ck[k] ? "line-through" : "none" }}>{l}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
