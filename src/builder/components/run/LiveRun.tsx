"use client";
// The facilitator desktop: the current activity dominates (timer, script), with the workshop clock,
// previous and next, quick capture and notes beside it. Everything has a keyboard shortcut.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { canVibrate, cue } from "../../run/cues";
import { C } from "../../constants";
import { mins } from "../../items";
import { CAPTURE_TYPES, SHOW_LABELS, curId, elapsed, planOf, recoveryOptions, schedule } from "../../run/session";
import { scriptFor } from "../../run/script";
import { linksOf } from "../../tools";
import { clock, hm, mmss } from "../../time";
import type { Capture, Item } from "../../types";
import { BODY, DISPLAY, Kicker, accent, field, outline, solid, textBtn, useBuilder } from "../../ui";
import { openPresent } from "./ReadyScreen";
import Timer, { timerState } from "./Timer";

const ctl = (o: CSSProperties = {}) => outline({ minHeight: 52, padding: "0 16px", fontSize: 16, border: "1px solid " + C.edge, ...o });
const hhmm = (t: number) => { const d = new Date(t); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); };
const Label = ({ children, color }: { children: ReactNode; color?: string }) => <div style={{ fontSize: 12, letterSpacing: ".07em", color: color || C.mute }}>{children}</div>;

export default function LiveRun() {
  const { S, store, d } = useBuilder();
  const ss = S.session!, now = Date.now(), show = ss.settings.show, mobile = S.w < 760, wide = S.w >= 1100;
  const sch = schedule(ss, S.items, d.start, now), byId = new Map(S.items.map(x => [x.id, x]));
  const cur = byId.get(curId(ss));
  const [overAck, setOverAck] = useState<string | null>(null);
  const [lateIgnored, setLateIgnored] = useState<number | null>(null);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [breakIgnored, setBreakIgnored] = useState<string | null>(null);
  useEffect(() => { if (!confirmEnd) return; const t = setTimeout(() => setConfirmEnd(false), 4000); return () => clearTimeout(t); }, [confirmEnd]);
  if (!cur) return null;

  const live = (k: number) => ss.order[k] && !ss.skipped.includes(ss.order[k]);
  let pk = ss.i - 1; while (pk >= 0 && !live(pk)) pk--;
  let nk = ss.i + 1; while (nk < ss.order.length && !live(nk)) nk++;
  const prev = pk >= 0 ? byId.get(ss.order[pk]) : undefined, next = nk < ss.order.length ? byId.get(ss.order[nk]) : undefined;
  const planMs = planOf(ss, cur) * 60000, el = elapsed(ss, now), rem = planMs - el, running = !!ss.t0, started = ss.started.includes(cur.id) || el > 0;
  const tstate = timerState(rem, planMs, running, started), isBreak = cur.role === "breaks";
  const sc = scriptFor(cur, S.brief, next), curLinks = linksOf(cur);
  const late = sch.late, showLate = late >= 5 && (lateIgnored == null || late >= lateIgnored + 5);
  const recov = showLate ? recoveryOptions(ss, S.items, late) : [];
  const slot = sch.slots[ss.i], dayL = sch.days > 1 ? "Day " + sch.day + " of " + sch.days : "";
  const flash = S.flash > 0 && now - S.flash < 2500;
  const timerSize = wide ? 400 : mobile ? Math.min(S.w - 64, 300) : 340;
  const over = rem < 0 && overAck !== cur.id;

  // Break due: worked continuously for over 100 minutes and the next break is far off.
  const breakTip = (() => {
    if (isBreak || breakIgnored === cur.id) return null;
    let worked = el / 60000;
    for (let k = ss.i - 1; k >= 0; k--) { const y = byId.get(ss.order[k]); if (!y || y.role === "breaks" || y.role === "energise") break; if (!ss.skipped.includes(y.id)) worked += (ss.actual[y.id] || 0) / 60000; }
    if (worked < 100) return null;
    let until = Math.max(0, rem) / 60000, breakId: string | undefined;
    for (let k = ss.i + 1; k < ss.order.length; k++) { const y = byId.get(ss.order[k]); if (!y || ss.skipped.includes(y.id)) continue; if (y.role === "breaks") { breakId = y.id; break; } until += planOf(ss, y); }
    if (breakId && until <= 30) return null;
    return { breakId, text: "The group has worked " + hm(Math.round(worked)) + " without a break." + (breakId ? " The next one is in " + hm(Math.round(until)) + "." : " There's no break left in the plan.") };
  })();

  return (
    <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Workshop bar */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 24px", padding: "12px clamp(16px,3vw,36px)", borderBottom: "1px solid " + C.rule }}>
        <button onClick={() => store.exitRun()} title="Back to Build. The session and its clock keep going." className="bh-ink" style={{ whiteSpace: "nowrap", background: "none", border: 0, borderRight: "1px solid " + C.rule, color: C.soft, cursor: "pointer", alignSelf: "stretch", padding: "0 18px 0 0", fontSize: 15 }}>← Build</button>
        <div style={{ minWidth: 0, flex: "1 1 260px" }}>
          <div style={{ fontSize: 12, letterSpacing: ".07em", color: C.accent }}>RUNNING{dayL ? " · " + dayL.toUpperCase() : ""}</div>
          <div style={{ marginTop: 2, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{S.name}</div>
        </div>
        {show.clock && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 26px", alignItems: "baseline", fontVariantNumeric: "tabular-nums" }}>
            <span><span style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 500 }}>{hhmm(now)}</span></span>
            <span style={{ fontSize: 14, color: C.soft }}>Workshop <b style={{ color: C.ink, fontWeight: 500 }}>{hm(Math.round(sch.remaining))}</b> left</span>
            <span style={{ fontSize: 14, color: C.soft }}>{late > 0 ? <>Finish <s style={{ color: C.mute }}>{clock(sch.plannedEnd)}</s> <b style={{ color: C.accent, fontWeight: 500 }}>{clock(Math.round(sch.projectedEnd))}</b></> : <>Finish <b style={{ color: C.ink, fontWeight: 500 }}>{clock(Math.round(sch.projectedEnd))}</b></>}</span>
            <span style={{ fontSize: 13, letterSpacing: ".06em", color: late >= 5 ? C.accent : late <= -5 ? C.soft : C.mute }}>{late >= 1 ? "RUNNING " + late + " MIN LATE" : late <= -1 ? -late + " MIN AHEAD" : "ON TIME"}</span>
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <button onClick={() => store.set({ runOverlay: S.runOverlay === "agenda" ? null : "agenda" })} title="Agenda (A)" style={outline({ minHeight: 40, padding: "0 12px", fontSize: 14 })}>Agenda</button>
          <button onClick={openPresent} title="Open the participant screen in a new window" style={outline({ minHeight: 40, padding: "0 12px", fontSize: 14 })}>Present ↗</button>
          <button onClick={() => store.set({ runOverlay: S.runOverlay === "view" ? null : "view" })} style={outline({ minHeight: 40, padding: "0 12px", fontSize: 14 })}>View</button>
          <button onClick={() => store.set({ runOverlay: S.runOverlay === "help" ? null : "help" })} aria-label="Keyboard shortcuts" title="Shortcuts (?)" style={outline({ minHeight: 40, minWidth: 40, fontSize: 14 })}>?</button>
          <button onClick={() => (confirmEnd ? store.runEnd() : setConfirmEnd(true))} style={outline({ minHeight: 40, padding: "0 12px", fontSize: 14, color: confirmEnd ? C.bg : C.ink, background: confirmEnd ? C.accent : "none", border: "1px solid " + (confirmEnd ? C.accent : C.line) })}>{confirmEnd ? "Confirm: end workshop" : "End workshop"}</button>
        </div>
      </div>

      {showLate && (
        <div role="status" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 10px", padding: "10px clamp(16px,3vw,36px)", background: "#1a0f0b", borderBottom: "1px solid " + C.accent }}>
          <span style={{ fontSize: 13, letterSpacing: ".07em", color: C.accent, marginRight: 8 }}>{late} MIN BEHIND · SUGGESTED</span>
          {recov.map(r => <button key={r.key} onClick={() => store.runApply(r.apply)} title={r.detail} style={outline({ minHeight: 36, padding: "0 12px", fontSize: 14, border: "1px solid " + C.edge })}>{r.label}</button>)}
          <button onClick={() => setLateIgnored(late)} title={"Accept finishing at " + clock(Math.round(sch.projectedEnd))} style={outline({ minHeight: 36, padding: "0 12px", fontSize: 14, border: "1px solid " + C.edge })}>Finish later ({clock(Math.round(sch.projectedEnd))})</button>
          <button onClick={() => setLateIgnored(late)} style={textBtn({ color: C.mute, fontSize: 14, minHeight: 36, padding: "0 6px" })}>Ignore</button>
        </div>
      )}

      {breakTip && !showLate && (
        <div role="status" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 10px", padding: "10px clamp(16px,3vw,36px)", borderBottom: "1px solid " + C.rule }}>
          <span style={{ fontSize: 14, color: C.soft, marginRight: 8 }}>{breakTip.text}</span>
          {breakTip.breakId ? <button onClick={() => store.runBreakNext(breakTip.breakId!)} style={outline({ minHeight: 36, padding: "0 12px", fontSize: 14, border: "1px solid " + C.edge })}>Take the break next</button>
            : <button onClick={() => store.runAddBreak()} style={outline({ minHeight: 36, padding: "0 12px", fontSize: 14, border: "1px solid " + C.edge })}>Add a 10-minute break next</button>}
          <button onClick={() => setBreakIgnored(cur.id)} style={textBtn({ color: C.mute, fontSize: 14, minHeight: 36, padding: "0 6px" })}>Not now</button>
        </div>
      )}

      <div style={{ flex: "1 1 auto", display: "grid", gridTemplateColumns: wide ? "minmax(0,1fr) 400px" : "minmax(0,1fr)", gap: "28px clamp(28px,4vw,56px)", padding: "clamp(20px,3vw,36px) clamp(16px,3vw,36px) 48px", alignItems: "start" }}>
        {/* Current activity */}
        <main style={{ minWidth: 0 }}>
          <Label color={isBreak ? C.accent : undefined}>{isBreak ? "BREAK" : "CURRENT · " + (ss.i + 1) + " OF " + ss.order.length + (slot?.sec ? " · " + slot.sec.toUpperCase() : "")}</Label>
          <h1 style={{ margin: "8px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: isBreak ? "clamp(56px,8vw,120px)" : "clamp(34px,4.6vw,68px)", letterSpacing: "-.035em", lineHeight: 0.98, maxWidth: "18ch", textWrap: "balance" }}>{cur.title}</h1>
          {curLinks.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
              {curLinks.map(l => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" title={l.url} className="rd-run-btn" style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", minHeight: 40, padding: "0 14px", border: "1px solid " + C.edge, color: C.ink, textDecoration: "none", fontSize: 15 }}>Open {l.tool}{l.label ? " · " + l.label : ""} ↗</a>)}
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "28px clamp(28px,4vw,56px)", alignItems: "center", marginTop: 26 }}>
            {show.timer && <Timer remMs={rem} planMs={planMs} state={tstate} size={timerSize} flash={flash} />}
            <div style={{ flex: "1 1 260px", minWidth: 0 }}>
              {isBreak ? (
                <>
                  <div style={{ fontSize: 20, color: C.soft }}>Workshop resumes at</div>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 56, lineHeight: 1 }}>{hhmm(now + Math.max(0, rem))}</div>
                  {next && <div style={{ marginTop: 10, fontSize: 16, color: C.mute }}>Then: {next.title}</div>}
                </>
              ) : (
                <>
                  {sc.purpose && show.instructions && <><Label>PURPOSE</Label><p style={{ margin: "4px 0 14px", fontSize: 18, lineHeight: 1.45 }}>{sc.purpose}</p></>}
                  {sc.open && show.instructions && <><Label>SAY</Label><p style={{ margin: "4px 0 14px", fontSize: 20, lineHeight: 1.4, fontFamily: DISPLAY }}>{sc.open}</p></>}
                  {sc.output && show.outputs && <><Label>OUTPUT</Label><p style={{ margin: "4px 0 0", fontSize: 17, color: C.soft }}>{sc.output}</p></>}
                </>
              )}
            </div>
          </div>

          {over ? (
            <div role="alert" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 24, padding: "14px 16px", border: "1px solid " + C.accent, background: "#1a0f0b" }}>
              <span style={{ fontSize: 15, letterSpacing: ".05em", color: C.accent, marginRight: 8 }}>TIME +{mmss(rem)}</span>
              <button onClick={() => store.runFinish()} className="rd-run-btn" style={accent({ minHeight: 48, padding: "0 18px", fontSize: 16 })}>Finish now</button>
              <button onClick={() => setOverAck(cur.id)} className="rd-run-btn" style={ctl({ minHeight: 48 })}>Continue</button>
              <button onClick={() => store.runAdjust(5)} className="rd-run-btn" style={ctl({ minHeight: 48 })}>+5 min</button>
            </div>
          ) : null}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
            <button onClick={() => store.runPlay()} className="rd-run-btn" style={{ whiteSpace: "nowrap", background: running ? C.ink : C.accent, border: 0, color: C.bg, minHeight: 56, minWidth: 150, padding: "0 24px", cursor: "pointer", fontSize: 17, fontWeight: 500 }}>{running ? "Pause" : started ? "Resume" : "Start"}</button>
            {isBreak ? (
              <>
                <button onClick={() => store.runFinish()} className="rd-run-btn" style={ctl()}>Resume early</button>
                <button onClick={() => store.runAdjust(5)} className="rd-run-btn" style={ctl()}>+5 min</button>
              </>
            ) : (
              <>
                <button onClick={() => store.runAdjust(-1)} aria-label="Remove a minute" className="rd-run-btn" style={ctl()}>−1</button>
                <button onClick={() => store.runAdjust(1)} aria-label="Add a minute" className="rd-run-btn" style={ctl()}>+1</button>
                <button onClick={() => store.runAdjust(5)} aria-label="Add five minutes" className="rd-run-btn" style={ctl()}>+5</button>
                <button onClick={() => store.runReset()} className="rd-run-btn" style={ctl({ color: C.soft })}>Reset</button>
              </>
            )}
            <span style={{ flex: "1 1 20px" }} />
            <button onClick={() => store.runFinish()} className="rd-run-btn" style={solid({ minHeight: 56, padding: "0 22px", fontSize: 16 })}>{next ? "Finish · next →" : "Finish workshop"}</button>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.mute }}>Space pause · N next · P back · = +1 · + +5 · − −1 · D Q L F O capture · A agenda · ? help</div>

          {!isBreak && (show.instructions || show.materials || show.participant || show.notes) && <ScriptView sc={sc} show={show} />}
        </main>

        {/* Beside: where we are, capture, notes */}
        <aside style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 26 }}>
          {S.outputPrompt && <OutputPrompt id={S.outputPrompt} />}
          {show.next && <PrevNext prev={prev} cur={cur} next={next} ss={ss} rem={rem} />}
          {show.notes && <CapturePanel cur={cur} />}
          <Backups cur={cur} />
          {show.agenda && <MiniAgenda sch={sch} />}
        </aside>
      </div>
      {S.runOverlay && <Overlay />}
    </div>
  );
}

function ScriptView({ sc, show }: { sc: ReturnType<typeof scriptFor>; show: Record<string, boolean> }) {
  const block = (label: string, body: ReactNode, color?: string) => <div style={{ minWidth: 0 }}><Label color={color}>{label}</Label><div style={{ marginTop: 6, fontSize: 16, lineHeight: 1.5 }}>{body}</div></div>;
  const list = (xs: string[], ol = false) => { const L = ol ? "ol" : "ul"; return <L style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 5 }}>{xs.map((s, i) => <li key={i}>{s}</li>)}</L>; };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "26px 40px", marginTop: 32, paddingTop: 24, borderTop: "1px solid " + C.rule }}>
      {show.instructions && sc.instructions.length > 0 && block("INSTRUCTIONS", list(sc.instructions, true))}
      {show.instructions && sc.questions.length > 0 && block("QUESTIONS TO ASK", list(sc.questions))}
      {show.instructions && sc.watch.length > 0 && block("WATCH FOR", list(sc.watch), C.accent)}
      {show.instructions && sc.transition && block("TRANSITION", <span style={{ color: C.soft }}>{sc.transition}</span>)}
      {show.materials && sc.materials && block("MATERIALS", <span style={{ color: C.soft }}>{sc.materials}</span>)}
      {show.participant && sc.participant.length > 0 && block("PARTICIPANTS SEE", list(sc.participant))}
      {show.notes && sc.notes && block("YOUR PREP NOTES", <span style={{ color: C.soft }}>{sc.notes}</span>)}
    </div>
  );
}

function PrevNext({ prev, cur, next, ss, rem }: { prev?: Item; cur: Item; next?: Item; ss: NonNullable<ReturnType<typeof useBuilder>["S"]["session"]>; rem: number }) {
  const row = (label: string, x: Item | undefined, meta: string, on = false) => (
    <div style={{ display: "grid", gridTemplateColumns: "76px minmax(0,1fr) auto", gap: 10, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid " + C.hair, color: on ? C.ink : C.soft }}>
      <span style={{ fontSize: 12, letterSpacing: ".07em", color: on ? C.accent : C.mute }}>{label}</span>
      <span style={{ fontSize: on ? 17 : 15, minWidth: 0 }}>{x ? x.title : "—"}</span>
      <span style={{ fontSize: 13, color: on ? C.accent : C.mute, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{x ? meta : ""}</span>
    </div>
  );
  return (
    <div style={{ borderTop: "1px solid " + C.rule }}>
      {row("PREVIOUS", prev, prev ? (ss.actual[prev.id] != null ? Math.round(ss.actual[prev.id] / 60000) + " min · done" : "skipped") : "")}
      {row("CURRENT", cur, (rem < 0 ? "+" : "") + mmss(rem) + (rem < 0 ? " over" : " left"), true)}
      {row("NEXT", next, next ? planOf(ss, next) + " min" + (next.priority === "optional" ? " · optional" : "") : "")}
    </div>
  );
}

function CapturePanel({ cur }: { cur: Item }) {
  const { S, store } = useBuilder();
  const ss = S.session!, inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (S.focusCapture) inputRef.current?.focus(); }, [S.focusCapture]);
  const ct = CAPTURE_TYPES.find(c => c.key === S.captureType) || CAPTURE_TYPES[0];
  const mine = ss.captures.filter(c => c.blockId === cur.id);
  return (
    <section aria-label="Capture">
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, letterSpacing: ".07em", color: C.mute }}><span>CAPTURE</span><span>{ss.captures.length ? ss.captures.length + " this session" : ""}</span></div>
      <div role="group" aria-label="Capture type" style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
        {CAPTURE_TYPES.map(c => {
          const on = c.key === ct.key;
          return <button key={c.key} onClick={() => { store.set(s => ({ captureType: c.key, focusCapture: s.focusCapture + 1 })); }} aria-pressed={on} title={"Shortcut " + c.hotkey?.toUpperCase()}
            style={{ whiteSpace: "nowrap", background: on ? C.ink : "transparent", color: on ? C.bg : C.ink, border: "1px solid " + (on ? C.ink : C.line), minHeight: 36, padding: "0 10px", cursor: "pointer", fontSize: 13 }}>+ {c.label}</button>;
        })}
      </div>
      <form onSubmit={e => { e.preventDefault(); store.addCapture(ct.key, S.captureDraft); }} style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <input ref={inputRef} aria-label={"Add a " + ct.label.toLowerCase()} value={S.captureDraft} onChange={e => store.set({ captureDraft: e.target.value })}
          placeholder={ct.key === "decision" ? "What was decided" : ct.key === "followup" ? "What, by when · @owner" : ct.key === "parking" ? "Topic to come back to" : ct.key === "question" ? "Open question" : "What you noticed"}
          style={{ flex: "1 1 auto", minWidth: 0, background: C.well, border: "1px solid " + C.line, color: C.ink, minHeight: 46, padding: "0 12px", font: "inherit", fontSize: 16 }} />
        <button type="submit" style={solid({ minHeight: 46, padding: "0 16px", fontSize: 14 })}>Add</button>
      </form>
      <div style={{ marginTop: 10 }}>
        {mine.map(c => <CaptureRow key={c.id} c={c} />)}
        {!mine.length && <p style={{ margin: 0, fontSize: 13, color: C.mute }}>Captures attach to {cur.title} with the time.</p>}
      </div>
      <label style={{ display: "block", marginTop: 14 }}>
        <Label>NOTES ON THIS ACTIVITY</Label>
        <textarea value={ss.blockNotes[cur.id] || ""} onChange={e => store.setBlockNote(cur.id, e.target.value)} rows={4} placeholder="Type freely. Saved as you go."
          style={{ ...field, display: "block", width: "100%", marginTop: 6, padding: "10px 12px", fontFamily: BODY, fontSize: 15, lineHeight: 1.5, resize: "vertical" }} />
      </label>
    </section>
  );
}

export function CaptureRow({ c }: { c: Capture }) {
  const { store } = useBuilder();
  const t = CAPTURE_TYPES.find(x => x.key === c.type);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr) auto", gap: 10, alignItems: "baseline", padding: "8px 0", borderTop: "1px solid " + C.hair }}>
      <span style={{ fontSize: 12, color: C.mute, fontVariantNumeric: "tabular-nums" }}>{hhmm(c.at)}</span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 11, letterSpacing: ".07em", color: t?.color }}>{t?.short}{c.owner ? " · @" + c.owner : ""}</span>
        <span style={{ fontSize: 15, lineHeight: 1.4 }}>{c.text}</span>
      </span>
      <button onClick={() => store.removeCapture(c.id)} aria-label="Remove" className="bh-ink" style={textBtn({ color: C.mute, fontSize: 16, minWidth: 28, minHeight: 28 })}>×</button>
    </div>
  );
}

function OutputPrompt({ id }: { id: string }) {
  const { S, store } = useBuilder();
  const x = S.items.find(y => y.id === id), [v, setV] = useState("");
  if (!x) return null;
  const sc = scriptFor(x, S.brief);
  return (
    <div style={{ border: "1px solid " + C.edge, padding: "12px 14px" }}>
      <Label color={C.accent}>CAPTURE OUTPUT?</Label>
      <div style={{ marginTop: 4, fontSize: 15 }}>{x.title} <span style={{ color: C.mute }}>· expected: {sc.output}</span></div>
      <textarea value={v} onChange={e => setV(e.target.value)} rows={3} placeholder="Type, paste, or add a link to the board" style={{ ...field, display: "block", width: "100%", marginTop: 8, padding: "8px 10px", fontFamily: BODY, fontSize: 14, resize: "vertical" }} />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={() => { if (v.trim()) store.setOutput(id, v.trim()); store.set({ outputPrompt: null }); }} style={solid({ minHeight: 38, padding: "0 14px", fontSize: 14 })}>Save</button>
        <button onClick={() => store.set({ outputPrompt: null })} style={textBtn({ color: C.mute, fontSize: 14, minHeight: 38 })}>Skip</button>
      </div>
    </div>
  );
}

function Backups({ cur }: { cur: Item }) {
  const { S, store } = useBuilder();
  const ss = S.session!, all = S.items.filter(x => x.zone === "backup" && x.kind === "block" && !ss.order.includes(x.id));
  if (!all.length) return null;
  const sorted = all.slice().sort((a, b) => Number(b.backupFor === cur.id) - Number(a.backupFor === cur.id));
  return (
    <section aria-label="Backup activities">
      <Label>BACKUPS</Label>
      {sorted.map(x => (
        <div key={x.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: "1px solid " + C.hair }}>
          <span style={{ minWidth: 0, fontSize: 15 }}>{x.title} <span style={{ color: C.mute, fontSize: 13 }}>· {mins(x)} min{x.backupFor === cur.id ? " · for this activity" : ""}</span></span>
          <button onClick={() => store.runActivateBackup(x.id)} style={outline({ minHeight: 34, padding: "0 10px", fontSize: 13 })}>Use next</button>
        </div>
      ))}
    </section>
  );
}

function MiniAgenda({ sch }: { sch: ReturnType<typeof schedule> }) {
  const { store } = useBuilder();
  return (
    <section aria-label="Running order">
      <Label>RUNNING ORDER</Label>
      <div style={{ marginTop: 6 }}>
        {sch.slots.filter(v => v.day === sch.day).map(v => {
          const k = sch.slots.indexOf(v), on = v.state === "current";
          return (
            <button key={v.x.id + k} onClick={() => store.runGo(k)} aria-current={on ? "step" : undefined}
              style={{ display: "grid", gridTemplateColumns: "48px minmax(0,1fr) auto", gap: 8, width: "100%", textAlign: "left", background: on ? C.card : "none", border: 0, borderBottom: "1px solid " + C.hair, padding: "7px 6px", cursor: "pointer", color: v.state === "done" || v.state === "skipped" ? C.mute : C.ink, fontSize: 14 }}>
              <span style={{ fontVariantNumeric: "tabular-nums", color: on ? C.accent : C.mute }}>{clock(Math.round(v.projectedStart))}</span>
              <span style={{ minWidth: 0, textDecoration: v.state === "skipped" ? "line-through" : "none" }}>{v.x.title}</span>
              <span style={{ color: C.mute, fontSize: 12 }}>{v.state === "done" ? (v.actualMin != null ? Math.round(v.actualMin) + "m" : "✓") : v.state === "skipped" ? "skip" : v.plan + "m"}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Overlay() {
  const { S, store, d } = useBuilder();
  const ss = S.session!, close = () => store.set({ runOverlay: null });
  const sch = schedule(ss, S.items, d.start);
  return (
    <div role="dialog" aria-modal="true" aria-label={S.runOverlay || ""} onClick={close} style={{ position: "fixed", inset: 0, zIndex: 320, background: "rgba(0,0,0,.6)", display: "flex", justifyContent: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "min(520px,100%)", height: "100%", overflow: "auto", background: "#0f0f0e", borderLeft: "1px solid " + C.edge, padding: "20px 22px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Kicker>{S.runOverlay === "agenda" ? "AGENDA" : S.runOverlay === "help" ? "SHORTCUTS" : "VIEW"}</Kicker>
          <button onClick={close} aria-label="Close" style={outline({ minWidth: 40, minHeight: 40 })}>×</button>
        </div>
        {S.runOverlay === "agenda" && (
          <div style={{ marginTop: 12 }}>
            {sch.slots.map((v, k) => (
              <div key={v.x.id + k} style={{ display: "grid", gridTemplateColumns: "54px minmax(0,1fr) auto", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: "1px solid " + C.hair, color: v.state === "upcoming" || v.state === "current" ? C.ink : C.mute }}>
                <span style={{ fontVariantNumeric: "tabular-nums", fontSize: 14, color: v.state === "current" ? C.accent : C.mute }}>{v.day === sch.day ? clock(Math.round(v.projectedStart)) : "Day " + v.day}</span>
                <span style={{ minWidth: 0, fontSize: 15 }}>{v.x.title}<span style={{ display: "block", fontSize: 12, color: C.mute }}>{v.plan} min{v.x.priority === "optional" ? " · optional" : ""}{v.state === "done" && v.actualMin != null ? " · took " + Math.round(v.actualMin) : ""}{v.state === "skipped" ? " · skipped" : ""}</span></span>
                <span style={{ display: "flex", gap: 6 }}>
                  {v.state !== "current" && <button onClick={() => { store.runGo(k); close(); }} style={outline({ minHeight: 32, padding: "0 8px", fontSize: 12 })}>Go</button>}
                  {v.state === "upcoming" && <button onClick={() => store.runSkip(v.x.id)} style={outline({ minHeight: 32, padding: "0 8px", fontSize: 12 })}>Skip</button>}
                  {v.state === "skipped" && <button onClick={() => store.runSkip(v.x.id, false)} style={outline({ minHeight: 32, padding: "0 8px", fontSize: 12 })}>Restore</button>}
                </span>
              </div>
            ))}
          </div>
        )}
        {S.runOverlay === "help" && (
          <div style={{ marginTop: 12 }}>
            {[["Space", "Pause or resume"], ["N or →", "Finish activity, go to next"], ["P or ←", "Previous activity"], ["=", "Add a minute"], ["+", "Add five minutes"], ["−", "Remove a minute"], ["D", "Capture a decision"], ["Q", "Capture a question"], ["L", "Parking lot"], ["F", "Follow-up"], ["O", "Observation"], ["A", "Agenda"], ["Esc", "Close this, or leave a text field"]].map(([k, l]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid " + C.hair, fontSize: 15 }}><span>{l}</span><kbd style={{ fontFamily: BODY, color: C.soft, border: "1px solid " + C.line, padding: "1px 8px" }}>{k}</kbd></div>
            ))}
            <p style={{ fontSize: 13, color: C.mute }}>Shortcuts never fire while you are typing.</p>
          </div>
        )}
        {S.runOverlay === "view" && (
          <div style={{ marginTop: 12 }}>
            {SHOW_LABELS.map(([k, l]) => (
              <label key={k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid " + C.hair, fontSize: 15, cursor: "pointer" }}>
                <input type="checkbox" checked={!!ss.settings.show[k]} onChange={e => store.setRunSettings({ show: { ...ss.settings.show, [k]: e.target.checked } })} style={{ width: 18, height: 18, accentColor: C.accent }} />{l}
              </label>
            ))}
            <Kicker style={{ marginTop: 20 }}>WHEN TIME IS UP</Kicker>
            {([["soft", "Soft chime and a visual cue"], ["visual", "Visual cue only"], ["silent", "Nothing"]] as const).map(([k, l]) => (
              <label key={k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid " + C.hair, fontSize: 15, cursor: "pointer" }}>
                <input type="radio" name="sound" checked={ss.settings.sound === k} onChange={() => store.setRunSettings({ sound: k })} style={{ width: 18, height: 18, accentColor: C.accent }} />{l}
              </label>
            ))}
            <Kicker style={{ marginTop: 20 }}>FEEDBACK</Kicker>
            {([["clicks", "Sound on next, pause and capture", ss.settings.sound !== "soft"], ["haptics", canVibrate() ? "Vibrate on this device" : "Vibrate (not available in this browser)", !canVibrate() || ss.settings.sound === "silent"]] as const).map(([k, l, off]) => (
              <label key={k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid " + C.hair, fontSize: 15, cursor: off ? "default" : "pointer", color: off ? C.mute : C.ink }}>
                <input type="checkbox" disabled={off} checked={!off && ss.settings[k] !== false} onChange={e => store.setRunSettings({ [k]: e.target.checked })} style={{ width: 18, height: 18, accentColor: C.accent }} />{l}
              </label>
            ))}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              {([["next", "Test a tap"], ["warn", "2 min left"], ["due", "Time's up"]] as const).map(([c, l]) => (
                <button key={c} onClick={() => cue(c, ss.settings)} className="bh-line-mute" style={outline({ minHeight: 36, padding: "0 12px", fontSize: 13, border: "1px solid " + C.edge })}>{l}</button>
              ))}
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 13, color: C.mute }}>Sound plays from this device. iPhones don't allow vibration from a web page.</p>
          </div>
        )}
      </div>
    </div>
  );
}
