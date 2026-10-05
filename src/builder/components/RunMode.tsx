"use client";
// Run mode: a full-screen facilitation view with a block timer, notes and the running order,
// then a summary with timings and everything captured.
import { C, NOTE_TYPES } from "../constants";
import { RDL } from "../engine";
import { mins } from "../items";
import { clock, hm, mmss } from "../time";
import type { Item, NoteEntry } from "../types";
import { Chip, DISPLAY, Kicker, KickerRow, accent, outline, solid, textBtn, useBuilder } from "../ui";
import { CopyAgenda } from "./SidePanel";

type Ctx = { x: Item; day: number; sec: string };

export default function RunMode() {
  const { S, store, d } = useBuilder();
  const r = S.run!, L = store.liveBlocks(), i = Math.min(r.i, Math.max(0, L.length - 1)), cur = L[i];
  if (!cur) return null;
  const start = d.start, plan = (x: Item) => mins(x) + (r.extra[x.id] || 0), el = store.runElapsed(r);

  // Day and section for every live block.
  const ctx: Ctx[] = [];
  let day = 1, sec = "";
  S.items.forEach(x => {
    if (x.zone !== "live") return;
    if (x.kind === "day") { day++; sec = ""; } else if (x.kind === "section") sec = x.title || ""; else if (x.kind === "block") ctx.push({ x, day, sec });
  });
  const nD = day, actual = (x: Item) => (x.id === cur.id && !r.done ? el : r.log[x.id]);
  let drift = 0;
  L.forEach((x, k) => {
    const a = actual(x);
    if (k < i || r.done) { if (a != null) drift += a - plan(x) * 60000; }
    else if (k === i) drift += Math.max(0, el - plan(x) * 60000);
  });
  const totalPlan = L.reduce((s, x) => s + mins(x), 0), extraAll = L.reduce((s, x) => s + (r.extra[x.id] || 0), 0), dm = Math.round(drift / 60000), endM = start + totalPlan + extraAll + dm;
  const c = ctx[i] || ({} as Ctx);

  return (
    <div role="dialog" aria-modal="true" aria-label="Run mode" data-screen-label="Run mode" style={{ position: "fixed", inset: 0, zIndex: 300, background: C.bg, color: C.ink, overflow: "auto", fontFamily: "'Satoshi',sans-serif", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px 20px", padding: "14px clamp(16px,3vw,36px)", borderBottom: "1px solid " + C.rule, fontSize: 14 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", alignItems: "baseline", minWidth: 0 }}>
          <span style={{ color: C.accent }}>Run mode</span><span>{S.name}</span><span style={{ color: C.mute }}>{[nD > 1 ? "Day " + c.day + " of " + nD : "", c.sec].filter(Boolean).join(" · ")}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", alignItems: "center" }}>
          <span style={{ color: dm >= 5 ? C.accent : C.soft }}>{!r.t0 && !el && !i ? "Not started" : Math.abs(dm) < 1 ? "On schedule" : dm > 0 ? dm + " min behind" : -dm + " min ahead"}</span>
          <span style={{ color: C.mute }}>{nD > 1 ? "" : "Ends " + clock(endM) + (endM !== start + totalPlan ? " (planned " + clock(start + totalPlan) + ")" : "")}</span>
          <button onClick={() => store.runEnd()} style={outline({ minHeight: 36, padding: "0 12px", fontSize: 14 })}>Exit</button>
        </div>
      </div>
      <div style={{ display: "flex", height: 4, gap: 2, padding: "0 clamp(16px,3vw,36px)", marginTop: 10 }}>
        {L.map((x, k) => <div key={x.id} title={x.title} style={{ flex: Math.max(1, plan(x)) + " 1 0", background: k < i || r.done ? C.mute : k === i ? C.accent : C.rule }} />)}
      </div>
      {r.done ? <Summary L={L} totalPlan={totalPlan} /> : <Live ctx={ctx} cur={cur} i={i} L={L} el={el} plan={plan} nD={nD} />}
    </div>
  );
}

function Live({ ctx, cur, i, L, el, plan, nD }: { ctx: Ctx[]; cur: Item; i: number; L: Item[]; el: number; plan: (x: Item) => number; nD: number }) {
  const { S, store, d } = useBuilder();
  const r = S.run!, start = d.start, wide = S.w >= 1000;
  const it = cur.ref ? RDL().get(cur.ref) : undefined;
  const steps = it && Array.isArray(it.steps) ? it.steps.map(s => (typeof s === "string" ? s : [s.name, s.purpose].filter(Boolean).join(": "))).slice(0, 7) : [];
  const out = cur.cfg?.output || (it && (it.outputs || [])[0]) || "", mat = it && (it.materials || []).join(", "), watch = it && (it.failures || []).slice(0, 2).join(". ");
  const pm = plan(cur) * 60000, rem = pm - el, over = rem < 0, tStr = (over ? "+" : "") + mmss(rem), c = ctx[i], nx = L[i + 1];
  const ty = NOTE_TYPES.find(n => n.key === S.runType) || NOTE_TYPES[0];
  const log = (x: Item) => x.cfg?.log || [];
  const all: (NoteEntry & { x: Item })[] = [];
  L.forEach(x => log(x).forEach(e => all.push({ x, ...e })));
  const cnt = NOTE_TYPES.map(n => [n, all.filter(e => e.t === n.key).length] as const).filter(z => z[1]).map(([n, k]) => k + " " + (n.key === "park" ? "parked" : n.label.toLowerCase() + (k > 1 ? "s" : ""))).join(" · ");

  // Running order rows with day/section headings.
  let t = start, pd = 0;
  const rows = ctx.map((cc, k) => {
    if (cc.day !== pd) t = start;
    const st = t;
    t += plan(cc.x);
    const head = [nD > 1 && cc.day !== pd ? "Day " + cc.day : "", cc.sec].filter(Boolean).join(" · "), showHead = (cc.day !== pd || cc.sec !== ctx[k - 1]?.sec) && !!head;
    pd = cc.day;
    return { cc, k, st, head, showHead };
  });

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    const tx = (S.runDraft || "").trim();
    if (!tx) return;
    const m = ty.key === "action" ? tx.match(/@([\w.-]+)/) : null;
    const en: NoteEntry = { t: ty.key, text: m ? tx.replace(m[0], "").replace(/\s{2,}/g, " ").trim() || tx : tx, owner: m ? m[1] : "", at: mmss(store.runElapsed()) };
    store.setLog(cur.id, lg => lg.concat([en]));
    store.set({ runDraft: "" });
  };
  const curNotes = log(cur);

  return (
    <div style={{ flex: "1 1 auto", display: "grid", gridTemplateColumns: wide ? "minmax(0,1fr) minmax(320px,400px)" : "minmax(0,1fr)", gap: "32px clamp(28px,4vw,64px)", padding: "clamp(24px,3vw,44px) clamp(16px,3vw,36px) 40px", alignItems: "start" }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", fontSize: 12, letterSpacing: ".06em", color: C.mute }}>
          <span style={{ color: over || r.t0 ? C.accent : C.mute }}>{r.t0 ? (over ? "OVER TIME" : "RUNNING") : el ? "PAUSED" : "READY"}</span><span>{"BLOCK " + (i + 1) + " OF " + L.length}</span><span>{(c?.sec || "").toUpperCase()}</span>
        </div>
        <h1 style={{ margin: "10px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(32px,4.2vw,60px)", letterSpacing: "-.03em", lineHeight: 1, maxWidth: "20ch", textWrap: "balance" }}>{cur.title}</h1>
        <div role="timer" aria-label={(over ? "Over by " : "Remaining ") + tStr.replace("+", "")} style={{ display: "flex", alignItems: "baseline", marginTop: "clamp(28px,3.6vw,48px)", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(84px,13vw,208px)", lineHeight: 1, letterSpacing: 0, color: over ? C.accent : r.t0 ? C.ink : C.mute }}>
          {tStr.split("").map((ch, k) => <span key={k} style={{ display: "inline-block", width: ch === ":" ? ".46em" : ch === "+" ? ".66em" : ".7em", textAlign: "center" }}>{ch}</span>)}
        </div>
        <div style={{ marginTop: "clamp(20px,2.4vw,32px)", maxWidth: 760, height: 6, background: C.hair, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: Math.min(100, pm ? (el / pm) * 100 : 0).toFixed(1) + "%", background: over ? C.accent : C.ink }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, maxWidth: 760, marginTop: 8, fontSize: 14, color: C.mute, fontVariantNumeric: "tabular-nums" }}>
          <span>{mmss(el) + " elapsed"}</span><span>{plan(cur) + " min planned" + (r.extra[cur.id] ? " (+" + r.extra[cur.id] + ")" : "")}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
          <button onClick={() => store.runMove(-1)} disabled={i === 0} style={outline({ minHeight: 52, padding: "0 18px", fontSize: 15, opacity: i === 0 ? 0.4 : 1 })}>← Back</button>
          <button onClick={() => store.runPlay()} style={{ whiteSpace: "nowrap", background: r.t0 ? C.ink : C.accent, border: 0, color: C.bg, minHeight: 52, minWidth: 140, padding: "0 22px", cursor: "pointer", fontSize: 16, fontWeight: 500 }}>{r.t0 ? "Pause" : el ? "Resume" : "Start"}</button>
          <button onClick={() => store.runMove(1)} style={solid({ minHeight: 52, padding: "0 20px", fontSize: 15 })}>{nx ? "Next: " + ((nx.title || "").length > 22 ? (nx.title || "").slice(0, 21) + "…" : nx.title) + " →" : "Finish session"}</button>
          <button onClick={() => store.runAddTime(cur.id)} style={outline({ minHeight: 52, padding: "0 16px", fontSize: 15 })}>+5 min</button>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: C.mute }}>Space start/pause · → next · ← back · Esc exit</div>
        {(steps.length > 0 || !!out || !!mat || !!watch) && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: "24px 40px", marginTop: "clamp(28px,3vw,44px)", paddingTop: 22, borderTop: "1px solid " + C.rule, maxWidth: 960 }}>
            {steps.length > 0 && <div><Kicker>HOW TO RUN IT</Kicker><ol style={{ margin: "10px 0 0", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6, fontSize: 16, lineHeight: 1.45 }}>{steps.map((s, k) => <li key={k}>{s}</li>)}</ol></div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {!!out && <div><Kicker>LEAVE WITH</Kicker><div style={{ marginTop: 4, fontSize: 16 }}>{out}</div></div>}
              {!!mat && <div><Kicker>MATERIALS</Kicker><div style={{ marginTop: 4, fontSize: 15, color: C.soft }}>{mat}</div></div>}
              {!!watch && <div><Kicker color={C.accent}>WATCH FOR</Kicker><div style={{ marginTop: 4, fontSize: 15, color: C.soft }}>{watch + "."}</div></div>}
            </div>
          </div>
        )}
      </div>
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 28 }}>
        <div>
          <KickerRow left="NOTES · THIS BLOCK" right={cnt ? "Session: " + cnt : ""} />
          <div role="group" aria-label="Note type" style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
            {NOTE_TYPES.map(n => <Chip key={n.key} on={n.key === ty.key} off={C.ink} onClick={() => store.set({ runType: n.key })} style={{ minHeight: 34, padding: "0 10px", fontSize: 13 }}>{n.label}</Chip>)}
          </div>
          <form onSubmit={addNote} style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <input aria-label={"Add a " + ty.label.toLowerCase()} value={S.runDraft} onChange={e => store.set({ runDraft: e.target.value })} placeholder={ty.placeholder} className="bf-line"
              style={{ flex: "1 1 auto", minWidth: 0, background: C.well, border: "1px solid " + C.line, color: C.ink, minHeight: 44, padding: "0 12px", font: "inherit", fontSize: 15 }} />
            <button type="submit" style={solid({ minHeight: 44, padding: "0 16px", fontSize: 14 })}>Add</button>
          </form>
          <div style={{ marginTop: 6, fontSize: 12, color: C.mute }}>{ty.key === "offline" ? "Log what was captured off-screen so you can type it up after." : ty.key === "action" ? "Add @name to set an owner." : "Enter to add. Notes stay with this block."}</div>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column" }}>
            {curNotes.map((e, k) => {
              const n = NOTE_TYPES.find(z => z.key === e.t) || NOTE_TYPES[3];
              const meta = [e.owner ? "Owner: " + e.owner : "", e.at ? "at " + e.at : ""].filter(Boolean).join(" · ");
              return (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "86px minmax(0,1fr) auto", gap: 10, alignItems: "baseline", padding: "9px 0", borderTop: "1px solid " + C.hair }}>
                  <span style={{ fontSize: 12, letterSpacing: ".04em", color: n.color }}>{n.label.toUpperCase()}</span>
                  <span style={{ minWidth: 0, fontSize: 15, lineHeight: 1.4 }}>{e.text}{!!meta && <span style={{ display: "block", marginTop: 2, fontSize: 12, color: C.mute }}>{meta}</span>}</span>
                  <button onClick={() => store.setLog(cur.id, lg => lg.filter((_, j) => j !== k))} aria-label="Remove note" className="bh-ink" style={textBtn({ color: C.mute, fontSize: 16, minWidth: 28, minHeight: 28 })}>×</button>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <KickerRow left="RUNNING ORDER" right={L.length + " blocks · " + hm(L.reduce((s, x) => s + mins(x), 0))} />
          <div style={{ marginTop: 8, borderTop: "1px solid " + C.rule }}>
            {rows.map(({ cc, k, st, head, showHead }) => {
              const a = r.log[cc.x.id], now = k === i, past = k < i, nn = log(cc.x).length;
              return (
                <div key={cc.x.id}>
                  {showHead && <div style={{ padding: "12px 0 4px", fontSize: 12, letterSpacing: ".06em", color: C.accent }}>{head.toUpperCase()}</div>}
                  <button onClick={() => store.runMove(0, k)} aria-current={now ? "step" : "false"}
                    style={{ display: "grid", gridTemplateColumns: "52px minmax(0,1fr) auto", gap: 10, alignItems: "baseline", width: "100%", textAlign: "left", background: now ? C.card : "transparent", border: 0, borderBottom: "1px solid " + C.hair, color: past ? C.mute : C.ink, padding: "10px 8px", cursor: "pointer", fontFamily: "'Satoshi',sans-serif", fontSize: 15 }}>
                    <span style={{ fontVariantNumeric: "tabular-nums", color: now ? C.accent : C.mute }}>{clock(st)}</span>
                    <span style={{ minWidth: 0 }}>{cc.x.title}{nn > 0 && <span style={{ marginLeft: 8, fontSize: 12, color: C.mute }}>{nn + " note" + (nn > 1 ? "s" : "")}</span>}</span>
                    <span style={{ whiteSpace: "nowrap", fontSize: 13, color: now ? C.accent : past && a != null && a > plan(cc.x) * 60000 + 30000 ? C.accent : C.mute, fontVariantNumeric: "tabular-nums" }}>{now ? "Now" : past && a != null ? Math.round(a / 60000) + " / " + plan(cc.x) + " min" : plan(cc.x) + " min"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary({ L, totalPlan }: { L: Item[]; totalPlan: number }) {
  const { S, store } = useBuilder();
  const r = S.run!, log = (x: Item) => x.cfg?.log || [];
  const all: (NoteEntry & { x: Item; k: number })[] = [];
  L.forEach(x => log(x).forEach((e, k) => all.push({ x, k, ...e })));
  const cnt = NOTE_TYPES.map(n => [n, all.filter(e => e.t === n.key).length] as const).filter(z => z[1]).map(([n, k]) => k + " " + (n.key === "park" ? "parked" : n.label.toLowerCase() + (k > 1 ? "s" : ""))).join(" · ");
  const rows = L.map(x => {
    const a = r.log[x.id], p = mins(x), am = a != null ? Math.round(a / 60000) : null, dd = am == null ? null : am - p;
    return { x, plan: p + " min", act: am == null ? "Skipped" : am + " min", diff: dd == null ? "–" : dd === 0 ? "0" : (dd > 0 ? "+" : "−") + Math.abs(dd), dc: dd != null && dd > 2 ? C.accent : C.mute };
  });
  const aMin = Math.round(L.reduce((s, x) => s + (r.log[x.id] || 0), 0) / 60000), dT = aMin - totalPlan, long = rows.filter(s => s.dc === C.accent).length;
  const offN = all.filter(e => e.t === "offline" && !e.typed).length;
  const groups = NOTE_TYPES.map(n => ({ n, entries: all.filter(e => e.t === n.key) })).filter(g => g.entries.length);
  const sub = [cnt ? "Captured " + cnt + "." : "", offN ? offN + " offline capture" + (offN > 1 ? "s" : "") + " still to type up." : "", long ? long + " block" + (long > 1 ? "s" : "") + " ran long." : ""].filter(Boolean).join(" ") || "Planned " + hm(totalPlan) + ", ran " + hm(aMin) + ".";
  const quiet = textBtn({ color: C.mute, minHeight: 44, fontSize: 14 });

  return (
    <div style={{ flex: "1 1 auto", padding: "clamp(24px,4vw,56px) clamp(16px,3vw,36px)", maxWidth: 1000 }}>
      <Kicker color={C.accent}>SESSION COMPLETE</Kicker>
      <h1 style={{ margin: "10px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(40px,6vw,84px)", letterSpacing: "-.04em", lineHeight: 0.95 }}>{Math.abs(dT) < 2 ? "Finished on time." : dT > 0 ? "Ran " + hm(dT) + " over." : "Finished " + hm(-dT) + " early."}</h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.5, color: C.soft, maxWidth: "60ch" }}>{sub}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
        <button onClick={() => store.exportFile("pdf")} style={accent({ minHeight: 48, padding: "0 18px", fontSize: 15 })}>{S.exporting === "pdf" ? "Preparing…" : "Session notes PDF"}</button>
        <button onClick={() => store.exportFile("docx")} style={outline({ minHeight: 48, padding: "0 16px", fontSize: 15 })}>{S.exporting === "docx" ? "Preparing…" : ".docx"}</button>
        <CopyAgenda style={outline({ minHeight: 48, padding: "0 16px", fontSize: 15 })} />
      </div>
      {groups.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "28px 40px", marginTop: 36 }}>
          {groups.map(({ n, entries }) => (
            <div key={n.key}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12, letterSpacing: ".06em", color: n.color }}>
                <span>{n.key === "offline" ? "CAPTURED OFFLINE" : n.label.toUpperCase() + (n.key === "park" ? "" : "S")}</span><span style={{ color: C.mute }}>{entries.length}</span>
              </div>
              {entries.map((e, j) => (
                <div key={j} style={{ padding: "10px 0", borderTop: "1px solid " + C.hair }}>
                  <div style={{ fontSize: 15, lineHeight: 1.4 }}>{e.text}</div>
                  <div style={{ marginTop: 2, fontSize: 12, color: C.mute }}>{e.x.title + (e.owner ? " · Owner: " + e.owner : "") + (e.at ? " · at " + e.at : "")}</div>
                  {e.t === "offline" && (
                    <input aria-label="Type up this offline capture" value={e.typed || ""} placeholder="Type up the key points when you have them"
                      onChange={ev => { const v = ev.target.value; store.setLog(e.x.id, lg => { lg[e.k] = { ...lg[e.k], typed: v }; return lg; }); }}
                      style={{ display: "block", width: "100%", marginTop: 8, background: C.well, border: "1px solid " + C.line, color: C.ink, minHeight: 40, padding: "0 10px", font: "inherit", fontSize: 14 }} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : <p style={{ margin: "28px 0 0", fontSize: 15, color: C.mute }}>No notes were captured. You can still export timings and agenda.</p>}
      <Kicker style={{ marginTop: 36 }}>TIMING</Kicker>
      <div style={{ marginTop: 8, borderTop: "1px solid " + C.rule }}>
        {rows.map(s => (
          <div key={s.x.id} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 64px 64px 52px", gap: 10, padding: "8px 0", borderBottom: "1px solid " + C.hair, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>
            <span style={{ minWidth: 0 }}>{s.x.title}</span><span style={{ textAlign: "right", color: C.mute }}>{s.plan}</span><span style={{ textAlign: "right" }}>{s.act}</span><span style={{ textAlign: "right", color: s.dc }}>{s.diff}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", alignItems: "center", marginTop: 24 }}>
        <button onClick={() => store.runApplyTimings()} style={outline({ minHeight: 44, padding: "0 16px", fontSize: 14 })}>Use actual timings in the plan</button>
        <button onClick={() => store.runMove(0, L.length - 1)} className="bh-ink" style={quiet}>Back to last block</button>
        <button onClick={() => store.runEnd()} className="bh-ink" style={quiet}>Close</button>
      </div>
    </div>
  );
}
