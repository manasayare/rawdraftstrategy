"use client";
// The workshop's context in Build: key facts that drive checks and recommendations, the brief from
// import, and the original sources. Collapsed by default so it informs without crowding.
import { useState } from "react";
import { BRIEF_QUESTIONS, C, CONTEXT_KEYS } from "../constants";
import { BRIEF_FIELDS } from "../import/parse";
import { ago } from "../time";
import { BODY, DISPLAY, Kicker, field, textBtn, useBuilder } from "../ui";

const SOURCE_L = { paste: "Pasted text", ai: "AI conversation", agenda: "Agenda", notes: "Notes", file: "Document", connector: "Connector" } as const;

export default function ContextPanel() {
  const { S, store } = useBuilder();
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const b = S.brief, cb = S.context?.brief, sources = S.context?.sources || [];
  const facts = [b.time, b.people && b.people + " people", b.format, b.owner === "Yes" ? "decider in the room" : b.owner === "Joins final part" ? "decider joins late" : ""].filter(Boolean).join(" · ");
  const lead = cb?.goal || cb?.problem || b.question || "";
  const sel = { ...field, width: "100%", marginTop: 4, minHeight: 36, padding: "0 6px", fontSize: 13 };
  const ta = { ...field, display: "block", width: "100%", marginTop: 4, padding: "8px 10px", fontFamily: BODY, fontSize: 14, lineHeight: 1.4, resize: "vertical" } as const;

  return (
    <div id="rd-context">
      <button onClick={() => store.set(s => ({ ctx: !s.ctx }))} aria-expanded={S.ctx ? "true" : "false"} style={{ display: "flex", justifyContent: "space-between", gap: 10, width: "100%", textAlign: "left", background: "none", border: 0, borderBottom: "1px solid " + C.rule, color: C.ink, padding: "0 0 8px", cursor: "pointer" }}>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: "block", fontFamily: DISPLAY, fontWeight: 500, fontSize: 19 }}>Context</span>
          {lead && <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginTop: 3, fontSize: 14, lineHeight: 1.4, color: C.soft }}>{lead}</span>}
          <span style={{ display: "block", marginTop: 2, fontSize: 13, color: C.mute }}>{(facts || (lead ? "" : "Not set. Optional, but sharpens checks and recommendations.")) + (sources.length ? (facts ? " · " : "") + sources.length + " source" + (sources.length > 1 ? "s" : "") : "")}</span>
        </span>
        <span style={{ fontSize: 13, color: C.mute }}>{S.ctx ? "Close" : "Open"}</span>
      </button>
      {S.ctx && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {CONTEXT_KEYS.map(k => {
              const q = BRIEF_QUESTIONS.find(x => x.key === k)!;
              return (
                <label key={k} style={{ display: "block", marginTop: 8, minWidth: 0 }}>
                  <span style={{ fontSize: 12, color: C.mute }}>{q.label}</span>
                  <select value={(b[k] as string) || ""} onChange={e => store.onContext(k, e.target.value)} style={sel}>
                    <option value="">Not set</option>
                    {q.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
              );
            })}
          </div>
          <label style={{ display: "block", marginTop: 10 }}>
            <span style={{ fontSize: 12, color: C.mute }}>Question</span>
            <textarea value={b.question || ""} onChange={e => store.setBrief("question", e.target.value)} rows={2} placeholder="What must this workshop figure out?" style={ta} />
          </label>
          {BRIEF_FIELDS.filter(f => f.key !== "ideas" && (cb?.[f.key] || f.key === "goal" || f.key === "decisions" || f.key === "output")).map(f => (
            <label key={f.key} style={{ display: "block", marginTop: 10 }}>
              <span style={{ fontSize: 12, color: C.mute }}>{f.label}</span>
              <textarea value={cb?.[f.key] || ""} onChange={e => store.setContextBrief(f.key, e.target.value)} rows={2} placeholder={f.hint} style={ta} />
            </label>
          ))}
          <Kicker style={{ marginTop: 16 }}>SOURCES</Kicker>
          {sources.map(s => (
            <div key={s.id} style={{ padding: "8px 0", borderBottom: "1px solid " + C.hair }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
                <button onClick={() => setOpenSrc(openSrc === s.id ? null : s.id)} aria-expanded={openSrc === s.id} className="bh-accent" style={textBtn({ color: C.ink, fontSize: 14, textAlign: "left", whiteSpace: "normal" })}>{s.title}</button>
                <span style={{ fontSize: 12, color: C.mute, whiteSpace: "nowrap" }}>{SOURCE_L[s.type]} · {ago(s.added)}</span>
              </div>
              {openSrc === s.id && (
                <>
                  <pre style={{ margin: "8px 0 0", maxHeight: 280, overflow: "auto", whiteSpace: "pre-wrap", fontFamily: BODY, fontSize: 13, lineHeight: 1.5, color: C.soft, background: C.well, border: "1px solid " + C.rule, padding: "8px 10px" }}>{s.text}</pre>
                  <button onClick={() => store.removeSource(s.id)} className="bh-accent" style={textBtn({ color: C.mute, fontSize: 13, minHeight: 30 })}>Remove source</button>
                </>
              )}
            </div>
          ))}
          {!sources.length && <p style={{ margin: "6px 0 0", fontSize: 13, color: C.mute }}>Nothing imported yet.</p>}
          <button onClick={() => store.set({ phase: "import" })} className="bh-ink" style={textBtn({ marginTop: 8, color: C.soft, fontSize: 14, minHeight: 32 })}>+ Add context</button>
        </>
      )}
    </div>
  );
}
