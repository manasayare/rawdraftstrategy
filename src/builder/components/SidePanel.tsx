"use client";
// Right-hand panel (a bottom sheet on phones): the open block, or selection actions, proposals,
// workshop context, checks, the stress test, sharing and exports.
import { BRIEF_QUESTIONS, C, CONTEXT_KEYS, SEVERE, STRESS_FIX, STRESS_Q, WORKSHOP_CMDS } from "../constants";
import { RDB, RDL } from "../engine";
import { eng, applyChanges, mins, uid } from "../items";
import { agendaCsv, agendaText, copyText, download, exportRows, fileName } from "../exportDoc";
import type { SelCmd } from "../commands";
import { hm } from "../time";
import { BLANK_FILTERS, type Item } from "../types";
import { BODY, DISPLAY, Kicker, KickerRow, accent, field, outline, path, solid, textBtn, useBuilder } from "../ui";
import BlockDetail from "./BlockDetail";
import { panelStyle } from "./LibraryPanel";

const chipBtn = (hover = "bh-line-ink") => ({ className: hover, style: outline({ minHeight: 34, padding: "0 9px", fontSize: 13 }) });
const small = outline({ minHeight: 36, padding: "0 10px", fontSize: 13 });

export default function SidePanel() {
  const { S, store, d } = useBuilder();
  const wide = d.wide;
  const open = S.open ? S.items.find(x => x.id === S.open && x.kind === "block") : undefined;
  return (
    <aside aria-label="Workshop context and Builder assistance" style={panelStyle(wide, wide || S.sheet === "assist")}>
      {!wide && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
          <button onClick={() => store.set(s => ({ sheet: null, open: wide ? s.open : null }))} aria-label="Close panel" style={outline({ minWidth: 40, minHeight: 40 })}>×</button>
        </div>
      )}
      {open ? <BlockDetail x={open} /> : (
        <>
          <Selection />
          <ProposalView />
          <Context />
          <Checks />
          <Kicker style={{ marginTop: 22 }}>ADJUST THE WHOLE WORKSHOP</Kicker>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {WORKSHOP_CMDS.map(([l, c]) => <button key={c} onClick={() => store.propose(c, c === "cut" ? 30 : null)} {...chipBtn()}>{l}</button>)}
          </div>
          <Stress />
          <ShareExport />
        </>
      )}
    </aside>
  );
}

function Selection() {
  const { S, store, d } = useBuilder();
  const items = S.items.filter(x => S.sel.includes(x.id) && x.kind === "block"), ids = items.map(x => x.id);
  if (!items.length) return null;
  const onSel = (fn: (y: Item) => void) => (its: Item[]) => { its.forEach(y => { if (ids.includes(y.id)) fn(y); }); return its; };
  const acts: [string, () => void][] = [
    ["Duplicate", () => store.commit(its => its.flatMap(y => (ids.includes(y.id) ? [y, { ...y, id: uid(), cfg: { ...y.cfg } }] : [y])), "Duplicated")],
    ["Delete", () => store.commit(its => its.filter(y => !ids.includes(y.id)), items.length + " deleted", { sel: [] })]
  ];
  if (items.length > 1) acts.push(["Group as breakout", () => store.commit(its => {
    const pid = uid(), moving = its.filter(y => ids.includes(y.id)), first = its.findIndex(y => ids.includes(y.id)), rest = its.filter(y => !ids.includes(y.id));
    moving.forEach(m => { m.par = pid; m.zone = "live"; });
    rest.splice(rest.indexOf(its.slice(0, first).filter(y => !ids.includes(y.id)).pop()!) + 1, 0, ...moving);
    return rest;
  }, "Grouped as parallel breakout")]);
  if (items.some(x => x.par)) acts.push(["Ungroup", () => store.commit(onSel(y => (y.par = null)), "Ungrouped")]);
  acts.push(["Move to pre-work", () => store.commit(onSel(y => (y.zone = "pre")), "Moved to pre-work")], ["Move to after", () => store.commit(onSel(y => (y.zone = "after")), "Moved to after")]);
  if (items.some(x => x.zone !== "live")) acts.push(["Move into live", () => store.commit(onSel(y => (y.zone = "live")), "Moved into the live workshop")]);
  if (d.nDays > 1) acts.push(["Move to next day", () => store.commit(its => {
    const moving = its.filter(y => ids.includes(y.id)), rest = its.filter(y => !ids.includes(y.id));
    const nd = its.slice(its.findIndex(y => y.id === ids[ids.length - 1])).find(y => y.kind === "day");
    if (!nd) return its;
    moving.forEach(m => { m.zone = "live"; m.par = null; });
    rest.splice(rest.indexOf(nd) + 1, 0, ...moving);
    return rest;
  }, "Moved to the next day")]);
  acts.push(["Whole group", () => store.commit(onSel(y => (y.cfg.mode = "Whole group")), "Format changed")], ["Small groups", () => store.commit(onSel(y => (y.cfg.mode = "Small group")), "Format changed")]);

  const one = items.length === 1;
  const adjust = ([["Shorten", "shorten"], ["Expand", "expand"], ["Adapt for remote", "remote"], ["Adapt for 20 people", "big"], one ? ["Find a simpler alternative", "simpler"] : null, ["Add a follow-up", "follow"], one ? ["What comes before?", "before"] : null, one ? ["What comes after?", "after"] : null]
    .filter(Boolean) as [string, string][]);
  const run = (c: string) => (c === "before" || c === "after" ? store.set({ suggestFor: { id: ids[0], dir: c }, sheet: d.wide ? null : "lib", lib: { ...BLANK_FILTERS } }) : store.propose(c as SelCmd, null, null, ids));

  return (
    <div style={{ border: "1px solid " + C.ink, padding: "14px 16px", marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
        <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 19 }}>{items.length + " selected · " + hm(items.reduce((s, x) => s + mins(x), 0))}</span>
        <button onClick={() => store.set({ sel: [] })} style={textBtn({ color: C.mute, fontSize: 13 })}>Clear</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>{acts.map(([l, fn]) => <button key={l} onClick={fn} {...chipBtn()}>{l}</button>)}</div>
      <Kicker style={{ marginTop: 12 }}>ADJUST THESE</Kicker>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>{adjust.map(([l, c]) => <button key={c} onClick={() => run(c)} {...chipBtn("bh-line-accent")}>{l}</button>)}</div>
      <form onSubmit={e => { e.preventDefault(); store.propose("compress", Math.max(5, parseInt(S.cmp, 10) || 0), null, ids); }} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, fontSize: 14, color: C.soft }}>
        <span>Compress these into</span>
        <input type="number" min="5" step="5" aria-label="Target minutes" value={S.cmp} onChange={e => store.set({ cmp: e.target.value })} style={{ ...field, fontFamily: undefined, width: 70, minHeight: 34, padding: "0 6px", fontSize: 14 }} />
        <span>min</span>
        <button type="submit" style={outline({ border: "1px solid " + C.edge, minHeight: 34, padding: "0 10px", fontSize: 13 })}>Propose</button>
      </form>
    </div>
  );
}

function ProposalView() {
  const { S, store, d } = useBuilder();
  const P = S.proposal;
  if (!P) return null;
  const B = RDB(), items = S.items, b = S.brief;
  const on = P.changes.filter(c => c.on), after = eng(applyChanges(items, on.filter(c => c.type !== "brief"))), ta = B.total(after), tb = B.total(d.eb);
  return (
    <div role="dialog" aria-label={P.title} style={{ border: "1px solid " + C.accent, padding: "14px 16px", marginBottom: 18, background: "#140f0d" }}>
      <Kicker color={C.accent}>PROPOSED CHANGE</Kicker>
      <div style={{ marginTop: 4, fontFamily: DISPLAY, fontWeight: 500, fontSize: 20, lineHeight: 1.1 }}>{P.title}</div>
      {!!P.sub && <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.4, color: C.mute }}>{P.sub}</div>}
      {ta !== tb && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "baseline", marginTop: 8, fontSize: 15 }}>
          <span style={{ color: C.mute, textDecoration: "line-through" }}>{hm(tb)}</span><span>→</span><span>{hm(ta) + (d.avail ? " of " + hm(d.avail) : "")}</span>
        </div>
      )}
      {P.changes.map((c, ci) => {
        const x = c.id ? items.find(y => y.id === c.id) : undefined, ni = c.ref ? RDL().get(c.ref) : undefined;
        let old = x ? x.title + " · " + x.mins + " min" : "", nw = c.what || "";
        if (c.type === "remove" && x) nw = "Removed";
        if (c.type === "zone" && x) nw = x.title + " · pre-work";
        if (c.type === "mins" && x) nw = x.title + " · " + c.to + " min";
        if (c.type === "replace" && x && ni) nw = ni.title + " · " + x.mins + " min";
        if (c.type === "insert" && c.item) nw = c.item.kind === "day" ? "New day" : c.item.title + " · " + c.item.mins + " min";
        if (c.type === "brief") old = "Decision owner: " + ((b as Record<string, unknown>)[c.key as string] || "not set");
        if (c.type === "cfg") old = "";
        const imp = c.type === "zone" ? "Its output still arrives, as pre-work." : c.type === "insert" && c.eng ? B.impact(d.eb, c.eng) : ["remove", "mins", "replace"].includes(c.type) ? B.impact(d.eb, c) : "";
        const saved = c.saved > 0 ? "Saves " + c.saved + " min" : c.saved < 0 ? "Adds " + -c.saved + " min" : "";
        return (
          <div key={ci} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 10, padding: "10px 0", borderBottom: "1px solid " + C.rule }}>
            <button role="checkbox" aria-checked={c.on ? "true" : "false"} aria-label={"Include " + c.label + " " + nw} onClick={() => store.toggleChange(ci)}
              style={{ whiteSpace: "nowrap", width: 22, height: 22, background: c.on ? C.accent : "transparent", border: "1px solid " + (c.on ? C.accent : C.faint), color: C.bg, cursor: "pointer", fontSize: 13, lineHeight: 1, padding: 0 }}>{c.on ? "✓" : ""}</button>
            <div style={{ minWidth: 0, opacity: c.on ? "1" : ".5" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12, letterSpacing: ".04em" }}><span style={{ color: C.accent }}>{c.label.toUpperCase()}</span><span style={{ color: C.mute }}>{saved}</span></div>
              {!!old && <div style={{ marginTop: 3, fontSize: 14, color: C.mute, textDecoration: "line-through" }}>{old}</div>}
              <div style={{ marginTop: 2, fontSize: 14 }}>{nw}</div>
              <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.4, color: C.soft }}>{c.why}</div>
              {!!imp && <div style={{ marginTop: 2, fontSize: 13, lineHeight: 1.4, color: C.mute }}>Downstream: {imp}</div>}
            </div>
          </div>
        );
      })}
      {!P.changes.length && <p style={{ margin: "8px 0 0", fontSize: 14, color: C.mute }}>Nothing needs to change.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
        <button onClick={() => store.acceptProposal()} style={accent({ minHeight: 42, padding: "0 14px", fontSize: 14 })}>{P.changes.length ? (on.length === P.changes.length ? "Accept all" : "Accept " + on.length + " of " + P.changes.length) : "Close"}</button>
        <button onClick={() => store.set({ proposal: null })} style={outline({ border: "1px solid " + C.edge, minHeight: 42, padding: "0 14px", fontSize: 14 })}>Reject</button>
      </div>
    </div>
  );
}

function Context() {
  const { S, store } = useBuilder();
  const b = S.brief;
  const summary = [b.time, b.people && b.people + " people", b.format, b.owner === "Yes" ? "decider in the room" : b.owner === "Joins final part" ? "decider joins late" : ""].filter(Boolean).join(" · ") || "Not set. Optional, but sharpens the checks.";
  const sel = { ...field, width: "100%", marginTop: 4, minHeight: 36, padding: "0 6px", fontSize: 13 };
  return (
    <>
      <button onClick={() => store.set(s => ({ ctx: !s.ctx }))} aria-expanded={S.ctx ? "true" : "false"} style={{ display: "flex", justifyContent: "space-between", gap: 10, width: "100%", textAlign: "left", background: "none", border: 0, borderBottom: "1px solid " + C.rule, color: C.ink, padding: "0 0 8px", cursor: "pointer" }}>
        <span><span style={{ display: "block", fontFamily: DISPLAY, fontWeight: 500, fontSize: 19 }}>Workshop context</span><span style={{ display: "block", marginTop: 2, fontSize: 13, color: C.mute }}>{summary}</span></span>
        <span style={{ fontSize: 13, color: C.mute }}>{S.ctx ? "Close" : "Edit"}</span>
      </button>
      {S.ctx && (
        <>
          <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.45, color: C.mute }}>Optional. Used by the checks below.</p>
          <label style={{ display: "block", marginTop: 8 }}>
            <span style={{ fontSize: 12, color: C.mute }}>Question</span>
            <textarea value={b.question || ""} onChange={e => store.setBrief("question", e.target.value)} rows={2} placeholder="What must this workshop figure out?" style={{ ...field, display: "block", width: "100%", marginTop: 4, padding: "8px 10px", fontFamily: BODY, fontSize: 14, lineHeight: 1.4, resize: "vertical" }} />
          </label>
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
        </>
      )}
    </>
  );
}

function Checks() {
  const { store, d } = useBuilder();
  const obs = d.ins.filter(o => !o.at);
  return (
    <>
      <KickerRow style={{ marginTop: 22 }} left="CHECKS" right={d.ins.length ? String(d.ins.length) : ""} />
      {obs.map((o, i) => (
        <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid " + C.rule }}>
          <div style={{ fontSize: 14, lineHeight: 1.4, color: o.sev === "high" ? C.accent : C.ink }}>{o.t}</div>
          <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.4, color: C.mute }}>{o.fix}</div>
          {o.cmd && <button onClick={() => store.propose(o.cmd!, o.n)} style={outline({ marginTop: 6, border: "1px solid " + C.edge, minHeight: 32, padding: "0 10px", fontSize: 13 })}>Propose fix</button>}
        </div>
      ))}
      {!obs.length && <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.45, color: C.mute }}>{!d.L.hasBlocks ? "Add blocks and Builder will check sequence, timing and inputs as you go." : d.ins.length ? "The rest are flagged on the canvas, next to the block they affect." : "Nothing flagged. Run a stress test to check it properly."}</p>}
    </>
  );
}

function Stress() {
  const { S, store, d } = useBuilder();
  const st = S.stress ? RDB().stress(S.brief, d.eb).map(r => (r.k === "Timing" && !d.avail ? { ...r, ok: true, msg: "No time limit set. Add one in Workshop context to check fit." } : r)) : [];
  const groups = ([["HIGH PRIORITY", C.accent, st.filter(r => !r.ok && SEVERE.includes(r.k))], ["WORTH FIXING", C.ink, st.filter(r => !r.ok && !SEVERE.includes(r.k))], ["HOLDING UP", C.mute, st.filter(r => r.ok)]] as const).filter(g => g[2].length);
  return (
    <>
      <button onClick={() => store.set({ stress: true })} style={solid({ marginTop: 22, width: "100%", minHeight: 46, fontSize: 15 })}>{S.stress ? "Stress test · re-run after changes" : "Stress test"}</button>
      {S.stress && groups.map(([k, color, rows]) => (
        <div key={k} style={{ marginTop: 14 }}>
          <Kicker color={color}>{k}</Kicker>
          {rows.map(r => (
            <div key={r.k} style={{ padding: "9px 0", borderBottom: "1px solid " + C.hair }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12, color: C.mute }}><span>{r.k}</span><span>{STRESS_Q[r.k] || ""}</span></div>
              <div style={{ marginTop: 3, fontSize: 14, lineHeight: 1.4 }}>{r.msg}</div>
              {!r.ok && <div style={{ marginTop: 2, fontSize: 13, color: C.mute }}>Suggested fix: {r.fix}</div>}
              {!r.ok && STRESS_FIX[r.k] && <button onClick={() => store.propose(STRESS_FIX[r.k])} style={outline({ marginTop: 6, border: "1px solid " + C.edge, minHeight: 32, padding: "0 10px", fontSize: 13 })}>Propose fix</button>}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

function ShareExport() {
  const { S, store, d } = useBuilder();
  const share = store.shareState();
  const rows = () => exportRows(S.items, S.start);
  const methods = d.eb.filter(x => x.ref).map(x => RDL().get(x.ref)).filter((x, i, a) => x && a.findIndex(y => y?.id === x.id) === i).map(it => ({ it: it!, deco: RDL().deco(it!) }));
  return (
    <>
      <Kicker style={{ marginTop: 24 }}>SHARE</Kicker>
      <button onClick={() => store.shareLink()} className="bh-raise" style={outline({ marginTop: 8, width: "100%", border: "1px solid " + C.ink, minHeight: 42, fontSize: 14, fontWeight: 500 })}>
        {S.sharing ? "Saving…" : share.shared ? (share.upToDate ? "Copy share link" : "Update share link") : "Create share link"}
      </button>
      {share.shared && <input readOnly value={share.url} onFocus={e => e.target.select()} aria-label="Share link" style={{ marginTop: 6, width: "100%", boxSizing: "border-box", background: "#141413", border: "1px solid " + C.line, color: C.soft, minHeight: 36, padding: "0 10px", font: "inherit", fontSize: 13 }} />}
      <p role="status" style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.45, color: C.mute }}>{S.shareMsg || (share.shared ? "Updating keeps the same link." : "Saves a copy online. Run notes stay in this browser.")}</p>

      <Kicker style={{ marginTop: 24 }}>EXPORT</Kicker>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
        <button onClick={() => store.exportFile("pdf")} style={solid({ minHeight: 36, padding: "0 12px", fontSize: 13 })}>{S.exporting === "pdf" ? "Preparing…" : "Agenda PDF"}</button>
        <button onClick={() => store.exportFile("docx")} style={small}>{S.exporting === "docx" ? "Preparing…" : ".docx"}</button>
        <CopyAgenda style={small} />
        <button onClick={() => download(fileName(S.name, ".csv"), "text/csv", agendaCsv(rows()))} style={small}>.csv</button>
        <button onClick={() => download(fileName(S.name, ".json"), "application/json", JSON.stringify({ name: S.name, start: S.start, brief: S.brief, items: S.items }, null, 2))} style={small}>.json</button>
      </div>
      <p style={{ margin: "16px 0 0", fontSize: 13, lineHeight: 1.45, color: C.mute }}>Saved in this browser. PDF and Word files download straight away.</p>
      {methods.length > 0 && (
        <>
          <Kicker style={{ marginTop: 20 }}>METHODS IN THIS WORKSHOP</Kicker>
          {methods.map(({ it, deco }) => (
            <a key={it.id} href={path(deco.href)} className="bh-accent" style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "7px 0", borderBottom: "1px solid " + C.hair, color: C.ink, textDecoration: "none", fontSize: 14 }}>
              <span>{it.title}</span><span style={{ color: C.mute }}>{deco.typeLabel}</span>
            </a>
          ))}
        </>
      )}
    </>
  );
}

/** "Copy agenda" as plain text; also used on the Run summary. */
export function CopyAgenda({ style }: { style: React.CSSProperties }) {
  const { S, store } = useBuilder();
  return <button onClick={() => { copyText(agendaText(S.name, exportRows(S.items, S.start))); store.flash("copied", true); }} style={style}>{S.copied ? "Copied" : "Copy agenda"}</button>;
}
