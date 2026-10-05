"use client";
// Review: what happened, organised without reconstructing the meeting by hand. Decisions get a light
// log, the parking lot gets resolved, and the workshop becomes something reusable.
import { useState, type ReactNode } from "react";
import { C } from "../constants";
import { copyText, download, fileName } from "../exportDoc";
import { mins } from "../items";
import { recapText, sessionStats, summaryMarkdown } from "../review";
import { CAPTURE_TYPES } from "../run/session";
import { hm } from "../time";
import type { Capture } from "../types";
import { BODY, DISPLAY, Kicker, KickerRow, accent, field, outline, solid, textBtn, useBuilder } from "../ui";

const hhmm = (t: number) => { const d = new Date(t); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); };
const input = { ...field, fontFamily: BODY, minHeight: 34, padding: "0 8px", fontSize: 14, width: "100%" } as const;

export default function ReviewView() {
  const { S, store, d } = useBuilder();
  const ss = S.session;
  const [copied, setCopied] = useState("");
  const [tplName, setTplName] = useState(S.name);
  const [useActual, setUseActual] = useState(true);
  if (!ss?.startedAt) return <p style={{ color: C.mute }}>Run the workshop first. Review fills itself from what you capture.</p>;

  const st = sessionStats(S.items, ss), wide = d.wide;
  const caps = (t: Capture["type"]) => ss.captures.filter(c => c.type === t);
  const flash = (k: string) => { setCopied(k); setTimeout(() => setCopied(""), 1500); };
  const goal = S.context?.brief.goal || S.brief.question;
  const add = (type: Capture["type"]) => store.setSession(s => ({ ...s, captures: s.captures.concat([{ id: "c" + Date.now().toString(36), type, text: "", at: Date.now(), status: type === "decision" ? undefined : "open" }]) }));
  const customs = S.items.filter(x => x.kind === "block" && (x.role === "custom" || x.custom) && !S.mylib.activities.some(a => a.title === x.title));

  const stat = (n: ReactNode, l: string, hot = false) => (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(28px,3vw,44px)", lineHeight: 1, color: hot ? C.accent : C.ink }}>{n}</div>
      <div style={{ marginTop: 4, fontSize: 13, color: C.mute }}>{l}</div>
    </div>
  );

  return (
    <div>
      <Kicker>WHAT HAPPENED</Kicker>
      <h1 style={{ margin: "10px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(36px,5vw,72px)", letterSpacing: "-.035em", lineHeight: 0.95 }}>{S.name}</h1>
      <p style={{ margin: "10px 0 0", fontSize: 16, color: C.soft }}>{new Date(ss.startedAt).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })} · {hhmm(ss.startedAt)}{ss.endedAt ? "–" + hhmm(ss.endedAt) : " · still running"}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: "22px 28px", marginTop: 26, paddingTop: 20, borderTop: "1px solid " + C.rule }}>
        {stat(hm(st.actual), "ran, of " + hm(st.planned) + " planned", st.actual > st.planned + 10)}
        {stat(st.done.length + " / " + st.blocks.length, "activities completed")}
        {stat(st.skipped.length, "skipped")}
        {stat(st.decisions, "decisions")}
        {stat(st.followups, "follow-ups")}
        {stat(st.parking, "in the parking lot")}
        {stat(st.questions, "open questions")}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
        <button onClick={() => { copyText(summaryMarkdown(S.name, S.items, ss, goal)); flash("sum"); }} style={solid({ minHeight: 44, padding: "0 16px", fontSize: 14 })}>{copied === "sum" ? "Copied" : "Copy summary"}</button>
        <button onClick={() => download(fileName(S.name, "-summary.md"), "text/markdown", summaryMarkdown(S.name, S.items, ss, goal))} style={outline({ minHeight: 44, padding: "0 14px", fontSize: 14 })}>Summary .md</button>
        <button onClick={() => store.exportFile("pdf")} style={outline({ minHeight: 44, padding: "0 14px", fontSize: 14 })}>{S.exporting === "pdf" ? "Preparing…" : "Agenda and notes PDF"}</button>
        <button onClick={() => store.exportFile("docx")} style={outline({ minHeight: 44, padding: "0 14px", fontSize: 14 })}>{S.exporting === "docx" ? "Preparing…" : ".docx"}</button>
        <button onClick={() => { copyText(recapText(S.name, ss)); flash("recap"); }} style={outline({ minHeight: 44, padding: "0 14px", fontSize: 14 })}>{copied === "recap" ? "Copied" : "Copy participant recap"}</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,1.3fr) minmax(0,1fr)" : "minmax(0,1fr)", gap: "36px 48px", marginTop: 36, alignItems: "start" }}>
        <div style={{ minWidth: 0 }}>
          <Section title="DECISION LOG" count={st.decisions} onAdd={() => add("decision")}>
            {caps("decision").map(c => (
              <div key={c.id} style={{ padding: "12px 0", borderBottom: "1px solid " + C.hair }}>
                <Meta c={c} />
                <input aria-label="Decision" value={c.text} onChange={e => store.updateCapture(c.id, { text: e.target.value })} placeholder="What was decided" style={{ ...input, fontSize: 16, minHeight: 40, marginTop: 4 }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 6 }}>
                  <input aria-label="Decider" value={c.decider || ""} onChange={e => store.updateCapture(c.id, { decider: e.target.value })} placeholder="Decided by" style={input} />
                  <input aria-label="Follow-up" value={c.followup || ""} onChange={e => store.updateCapture(c.id, { followup: e.target.value })} placeholder="Follow-up" style={input} />
                  <input aria-label="Rationale" value={c.rationale || ""} onChange={e => store.updateCapture(c.id, { rationale: e.target.value })} placeholder="Why" style={input} />
                  <input aria-label="Evidence" value={c.evidence || ""} onChange={e => store.updateCapture(c.id, { evidence: e.target.value })} placeholder="Evidence" style={input} />
                </div>
              </div>
            ))}
          </Section>

          <Section title="ACTIONS AND FOLLOW-UPS" count={st.followups} onAdd={() => add("followup")}>
            {ss.captures.filter(c => c.type === "followup" || (c.type === "parking" && c.status === "action")).map(c => (
              <div key={c.id} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 130px auto", gap: 6, alignItems: "center", padding: "10px 0", borderBottom: "1px solid " + C.hair }}>
                <div style={{ minWidth: 0 }}><Meta c={c} /><input value={c.text} onChange={e => store.updateCapture(c.id, { text: e.target.value })} placeholder="What needs doing" style={{ ...input, marginTop: 4 }} /></div>
                <input aria-label="Owner" value={c.owner || ""} onChange={e => store.updateCapture(c.id, { owner: e.target.value })} placeholder="Owner" style={{ ...input, alignSelf: "end" }} />
                <button onClick={() => store.updateCapture(c.id, { status: c.status === "resolved" ? "open" : "resolved" })} style={outline({ alignSelf: "end", minHeight: 34, padding: "0 10px", fontSize: 13, color: c.status === "resolved" ? C.mute : C.ink })}>{c.status === "resolved" ? "Done ✓" : "Mark done"}</button>
              </div>
            ))}
          </Section>

          <Section title="PARKING LOT" count={st.parking} onAdd={() => add("parking")}>
            {caps("parking").map(c => (
              <div key={c.id} style={{ padding: "10px 0", borderBottom: "1px solid " + C.hair, opacity: c.status === "resolved" ? 0.5 : 1 }}>
                <Meta c={c} />
                <input value={c.text} onChange={e => store.updateCapture(c.id, { text: e.target.value })} placeholder="Topic" style={{ ...input, marginTop: 4 }} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6, alignItems: "center" }}>
                  {([["action", "Convert to action"], ["followup", "For a follow-up workshop"], ["resolved", "Resolved"], ["open", "Leave open"]] as const).map(([k, l]) => (
                    <button key={k} onClick={() => store.updateCapture(c.id, { status: k })} aria-pressed={(c.status || "open") === k}
                      style={{ whiteSpace: "nowrap", background: (c.status || "open") === k ? C.ink : "transparent", color: (c.status || "open") === k ? C.bg : C.soft, border: "1px solid " + ((c.status || "open") === k ? C.ink : C.line), minHeight: 32, padding: "0 9px", cursor: "pointer", fontSize: 13 }}>{l}</button>
                  ))}
                  <input aria-label="Owner" value={c.owner || ""} onChange={e => store.updateCapture(c.id, { owner: e.target.value })} placeholder="Owner" style={{ ...input, width: 130 }} />
                </div>
              </div>
            ))}
          </Section>

          <Section title="OPEN QUESTIONS" count={st.questions} onAdd={() => add("question")}>
            {caps("question").map(c => (
              <div key={c.id} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 6, alignItems: "end", padding: "10px 0", borderBottom: "1px solid " + C.hair }}>
                <div style={{ minWidth: 0 }}><Meta c={c} /><input value={c.text} onChange={e => store.updateCapture(c.id, { text: e.target.value })} style={{ ...input, marginTop: 4 }} /></div>
                <button onClick={() => store.updateCapture(c.id, { status: c.status === "resolved" ? "open" : "resolved" })} style={outline({ minHeight: 34, padding: "0 10px", fontSize: 13 })}>{c.status === "resolved" ? "Answered ✓" : "Answered"}</button>
              </div>
            ))}
          </Section>

          <Kicker style={{ marginTop: 32 }}>BY ACTIVITY</Kicker>
          {st.blocks.map(x => {
            const a = ss.actual[x.id], skipped = ss.skipped.includes(x.id) || a == null, mine = ss.captures.filter(c => c.blockId === x.id);
            const am = a != null ? Math.round(a / 60000) : 0, diff = am - mins(x);
            return (
              <div key={x.id} style={{ padding: "14px 0", borderBottom: "1px solid " + C.rule }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
                  <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 20, color: skipped ? C.mute : C.ink }}>{x.title}</span>
                  <span style={{ fontSize: 13, color: skipped ? C.mute : diff > 2 ? C.accent : C.mute, whiteSpace: "nowrap" }}>{skipped ? "Skipped" : am + " of " + mins(x) + " min"}</span>
                </div>
                {mine.map(c => <div key={c.id} style={{ marginTop: 6, fontSize: 14 }}><span style={{ fontSize: 11, letterSpacing: ".07em", color: CAPTURE_TYPES.find(t => t.key === c.type)?.color }}>{CAPTURE_TYPES.find(t => t.key === c.type)?.short}</span> {c.text}</div>)}
                {!skipped && (
                  <div style={{ display: "grid", gridTemplateColumns: wide ? "1fr 1fr" : "1fr", gap: 6, marginTop: 8 }}>
                    <textarea aria-label={"Output of " + x.title} value={ss.outputs[x.id] || ""} onChange={e => store.setOutput(x.id, e.target.value)} rows={2} placeholder="Output: type, paste or link" style={{ ...field, padding: "8px 10px", fontFamily: BODY, fontSize: 14, resize: "vertical" }} />
                    <textarea aria-label={"Notes on " + x.title} value={ss.blockNotes[x.id] || ""} onChange={e => store.setBlockNote(x.id, e.target.value)} rows={2} placeholder="Notes" style={{ ...field, padding: "8px 10px", fontFamily: BODY, fontSize: 14, resize: "vertical" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <aside style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ border: "1px solid " + C.edge, padding: "16px 18px" }}>
            <Kicker color={C.accent}>REUSE</Kicker>
            <label style={{ display: "block", marginTop: 10, fontSize: 12, color: C.mute }}>Template name
              <input value={tplName} onChange={e => setTplName(e.target.value)} style={{ ...input, display: "block", marginTop: 4, fontSize: 15, minHeight: 40 }} />
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 14, color: C.soft, cursor: "pointer" }}>
              <input type="checkbox" checked={useActual} onChange={e => setUseActual(e.target.checked)} style={{ accentColor: C.accent }} /> Use the timings from this run
            </label>
            <button onClick={() => store.saveTemplate(tplName, useActual)} style={accent({ marginTop: 10, width: "100%", minHeight: 46, fontSize: 15 })}>Save as template</button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
              <button onClick={() => store.duplicateWorkshop()} style={outline({ minHeight: 42, fontSize: 14 })}>Duplicate</button>
              <button onClick={() => store.followupWorkshop()} style={outline({ minHeight: 42, fontSize: 14 })}>Plan follow-up</button>
            </div>
            {customs.length > 0 && (
              <>
                <div style={{ marginTop: 14, fontSize: 12, color: C.mute }}>Custom activities from this workshop</div>
                {customs.map(x => (
                  <div key={x.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", padding: "6px 0", borderBottom: "1px solid " + C.hair, fontSize: 14 }}>
                    <span>{x.title}</span><button onClick={() => store.saveActivity(x)} style={textBtn({ color: C.accent, fontSize: 13, minHeight: 30 })}>Add to My Library</button>
                  </div>
                ))}
              </>
            )}
          </div>
          <div>
            <KickerRow left="TIMING" right={hm(st.actual) + " / " + hm(st.planned)} />
            <div style={{ marginTop: 8, borderTop: "1px solid " + C.rule }}>
              {st.blocks.map(x => {
                const a = ss.actual[x.id], am = a != null ? Math.round(a / 60000) : null, dd = am == null ? null : am - mins(x);
                return (
                  <div key={x.id} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 52px 52px 44px", gap: 8, padding: "7px 0", borderBottom: "1px solid " + C.hair, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>
                    <span style={{ minWidth: 0 }}>{x.title}</span><span style={{ textAlign: "right", color: C.mute }}>{mins(x)}m</span><span style={{ textAlign: "right" }}>{am == null ? "–" : am + "m"}</span>
                    <span style={{ textAlign: "right", color: dd != null && dd > 2 ? C.accent : C.mute }}>{dd == null ? "" : dd === 0 ? "0" : (dd > 0 ? "+" : "−") + Math.abs(dd)}</span>
                  </div>
                );
              })}
            </div>
            <button onClick={() => { store.commit(list => list.map(x => (ss.actual[x.id] != null && x.kind === "block" ? { ...x, mins: Math.max(5, Math.round(ss.actual[x.id] / 300000) * 5) } : x)), "Timings updated from the session"); store.set({ phase: "bench", notice: "Durations updated from the run. Undo brings back the plan." }); }}
              style={outline({ marginTop: 10, minHeight: 40, padding: "0 12px", fontSize: 13 })}>Use actual timings in the plan</button>
          </div>
          {ss.general && <div><Kicker>GENERAL NOTES</Kicker><p style={{ whiteSpace: "pre-wrap", fontSize: 15 }}>{ss.general}</p></div>}
        </aside>
      </div>
    </div>
  );
}

function Section({ title, count, onAdd, children }: { title: string; count: number; onAdd: () => void; children: ReactNode }) {
  return (
    <section style={{ marginTop: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontSize: 12, letterSpacing: ".06em", color: C.mute }}>{title} · {count}</span>
        <button onClick={onAdd} className="bh-ink" style={textBtn({ color: C.soft, fontSize: 13, minHeight: 30 })}>+ Add</button>
      </div>
      <div style={{ borderTop: "1px solid " + C.rule }}>{children}</div>
      {!count && <p style={{ margin: "8px 0 0", fontSize: 14, color: C.mute }}>Nothing captured.</p>}
    </section>
  );
}

const Meta = ({ c }: { c: Capture }) => <div style={{ fontSize: 12, color: C.mute }}>{c.blockTitle ? c.blockTitle + " · " : ""}{hhmm(c.at)}</div>;
