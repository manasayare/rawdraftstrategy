"use client";
// The canvas: pre-work, the live workshop (split into days) and follow-up, laid out as rows of
// sections and blocks. Blocks in a parallel group render side by side as lanes.
import type { CSSProperties } from "react";
import { BLANK_NOTICE, C } from "../constants";
import { RDB, RDL } from "../engine";
import { SuggestionCard, SuggestionChip } from "./Suggestions";
import type { DayLayout, GroupRow, Row, SectionRow } from "../layout";
import { STAGE_CATS } from "../library";
import { mins, mkStruct } from "../items";
import { clock, hm } from "../time";
import { BLANK_FILTERS, type Item, type Zone } from "../types";
import { DISPLAY, outline, solid, textBtn, useBuilder } from "../ui";

const GRID = "linear-gradient(rgba(236,233,224,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(236,233,224,.04) 1px,transparent 1px)";
const iconBtn: CSSProperties = { whiteSpace: "nowrap", background: "none", border: 0, color: C.mute, cursor: "pointer", fontSize: 14, minWidth: 28, minHeight: 28, padding: 0 };

/** Drop indicator: a vertical slot between cards in Blocks view, a horizontal one elsewhere. */
function Gap({ on }: { on: boolean }) {
  const { S } = useBuilder();
  const blocks = S.view === "blocks";
  return (
    <div aria-hidden="true" style={{
      flex: "0 0 auto", width: blocks ? (on ? "14px" : "0px") : "100%", height: blocks ? "auto" : on ? "54px" : "0px",
      border: on ? "1px dashed " + C.accent : "0", background: on ? "rgba(255,75,35,.08)" : "transparent", transition: S.reducedMotion ? "none" : "height .16s ease, width .16s ease", boxSizing: "border-box"
    }} />
  );
}

type ZoneSpec = { key: Zone; label: string; meta: string; live: boolean; days: { day: DayLayout | null; rows: Row[]; end: number; empty: boolean; emptyMsg: string }[] };

export default function Canvas() {
  const { S, store, d } = useBuilder();
  const { L, start, total, nDays } = d;
  const view = S.view, dragging = !!S.drag;
  const side = (key: "pre" | "after" | "backup", label: string, desc: string, emptyMsg: string): ZoneSpec => {
    const z = L[key];
    return { key, label, live: false, meta: z.list.length ? z.list.length + " item" + (z.list.length > 1 ? "s" : "") + " · " + hm(z.dur) + ", " + (key === "backup" ? "not in the timeline" : "not counted in session time") : desc, days: [{ day: null, rows: z.rows, end: z.end, empty: !z.list.length, emptyMsg }] };
  };
  const zones: ZoneSpec[] = [
    side("pre", "PRE-WORK", "Reading, surveys, examples to prepare", "Drag pre-work here."),
    { key: "live", label: "LIVE WORKSHOP", live: true, meta: L.hasBlocks ? hm(total) + (nDays > 1 ? " across " + nDays + " days" : " · " + clock(start) + "–" + clock(start + total)) : "", days: L.days.map(dd => ({ day: dd, rows: dd.rows, end: dd.end, empty: !dd.list.length, emptyMsg: "Drag something here." })) },
    side("after", "AFTER", "Decision memo, follow-up research, tests", "Drag follow-up here."),
    side("backup", "BACKUPS", "Alternatives to swap in during the run if something stalls", "Drag a backup activity here.")
  ];
  const dk = S.drop?.key || "";
  const multiDay = view === "days" && nDays > 1;

  return (
    <>
      {zones.map(z => (
        <div key={z.key} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 16px", marginBottom: 8 }}>
            <span style={{ fontSize: 12, letterSpacing: ".06em", color: z.live ? C.ink : C.mute }}>{z.label}</span>
            <span style={{ fontSize: 13, color: C.mute }}>{z.meta}</span>
          </div>
          <div style={{ backgroundColor: z.live ? C.well : "transparent", backgroundImage: z.live ? GRID : "none", backgroundSize: "40px 40px", border: "1px " + (z.live ? "solid" : "dashed") + " " + C.rule, padding: z.live ? "clamp(10px,1.6vw,20px)" : "10px", overflowX: z.live && view === "days" ? "auto" : "visible" }}>
            <div style={{ display: z.live && multiDay ? "grid" : "flex", gridAutoFlow: z.live ? "column" : "row", gridAutoColumns: z.live ? "minmax(270px,1fr)" : "auto", flexDirection: "column", gap: z.live ? (multiDay ? "18px" : "26px") : "0px" }}>
              {z.days.map((dd, di) => {
                const endOn = dk === "ins:" + z.key + ":" + dd.end;
                const hero = z.live && dd.empty && !L.hasBlocks && nDays === 1 && !dragging;
                const quiet = dd.empty && (z.live ? L.hasBlocks || nDays > 1 || dragging : true);
                return (
                  <div key={di} data-dayend={dd.end} data-dzone={z.key} style={{ minWidth: 0, minHeight: z.live && view === "days" ? "200px" : "0px" }}>
                    {z.live && nDays > 1 && dd.day && <DayHead day={dd.day} />}
                    {dd.empty && (
                      <div style={{
                        border: "1px dashed " + (z.live ? (dragging && endOn ? C.accent : dragging ? C.mute : C.line) : dragging && endOn ? C.accent : "transparent"),
                        padding: z.live ? (hero ? "clamp(28px,5vw,64px) 20px" : "22px 16px") : "8px", textAlign: z.live ? "center" : "left", transition: "border-color .15s"
                      }}>
                        {hero && <Hero />}
                        {quiet && <span style={{ fontSize: 14, color: C.mute }}>{dragging ? "Drop here" : dd.emptyMsg}</span>}
                      </div>
                    )}
                    <div style={{ display: "flex", flexDirection: view === "blocks" ? "row" : "column", flexWrap: view === "blocks" ? "wrap" : "nowrap", gap: view === "blocks" ? "12px" : "8px", alignItems: "stretch" }}>
                      {dd.rows.map(r => <RowView key={r.kind === "section" ? r.x.id : r.lanes[0].x.id} r={r} zone={z.key} />)}
                      <Gap on={endOn} />
                    </div>
                  </div>
                );
              })}
            </div>
            {z.live && <button onClick={() => store.insertItems([mkStruct("day")], null, "Day added")} className="bh-ink" style={textBtn({ marginTop: 12, color: C.mute, fontSize: 14, minHeight: 32 })}>+ Add a day</button>}
          </div>
        </div>
      ))}
    </>
  );
}

function DayHead({ day }: { day: DayLayout }) {
  const { store, d } = useBuilder();
  const n = day.index + 1;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "4px 14px", paddingBottom: 8, marginBottom: 10, borderBottom: "1px solid " + C.edge }}>
      <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 20 }}>Day {n}</span>
      <span style={{ display: "flex", gap: 12, alignItems: "baseline", fontSize: 13, color: C.mute }}>
        <span>{day.dur ? clock(d.start) + "–" + clock(d.start + day.dur) + " · " + hm(day.dur) : "Empty"}</span>
        {day.divider && <button onClick={() => store.remove(day.divider!.x.id, "Day merged")} aria-label={"Merge day " + n + " into the previous day"} className="bh-accent" style={textBtn({ color: C.mute, fontSize: 13 })}>Merge into previous day</button>}
      </span>
    </div>
  );
}

function Hero() {
  const { store, d } = useBuilder();
  const wide = d.wide;
  return (
    <>
      <div style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(30px,3.6vw,52px)", letterSpacing: "-.03em", lineHeight: 1 }}>Build your workshop.</div>
      <p style={{ margin: "10px auto 0", maxWidth: "42ch", fontSize: 16, lineHeight: 1.45, color: C.soft }}>Drag something from the Library or describe what you need.</p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 20 }}>
        <button onClick={() => store.set({ sheet: wide ? null : "lib", notice: BLANK_NOTICE })} style={solid({ minHeight: 46, padding: "0 18px", fontSize: 15 })}>Start blank</button>
        <button onClick={() => store.set({ center: "tpl", open: null, sheet: null })} style={outline({ border: "1px solid " + C.edge, minHeight: 46, padding: "0 18px", fontSize: 15 })}>Use a template</button>
      </div>
      <div style={{ marginTop: 22, fontSize: 13, color: C.mute }}>Or browse by stage</div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 8 }}>
        {STAGE_CATS.map(([k, l]) => (
          <button key={k} onClick={() => store.set({ lib: { ...BLANK_FILTERS, stage: k === "close" ? "commit" : k }, filters: true, sheet: wide ? null : "lib" })} className="bh-line-mute"
            style={{ whiteSpace: "nowrap", background: C.card, border: "1px solid " + C.line, color: C.ink, minHeight: 36, padding: "0 12px", cursor: "pointer", fontSize: 14 }}>{l}</button>
        ))}
      </div>
    </>
  );
}

function RowView({ r, zone }: { r: Row; zone: Zone }) {
  const { S, d } = useBuilder();
  const blocks = S.view === "blocks", isSection = r.kind === "section", isPar = r.kind === "group" && r.lanes.length > 1;
  // An expanded inline suggestion for a block in this row.
  const notes = r.kind === "group" && S.sugOpen && r.lanes.some(o => o.x.id === S.sugOpen) ? d.byAt[S.sugOpen] || [] : [];
  return (
    <div data-first={r.first} data-last={r.last} data-zone={zone}
      style={{ display: "flex", flexDirection: blocks && !isSection ? "row" : "column", alignItems: "stretch", flex: blocks ? (isSection ? "1 1 100%" : "0 0 auto") : "0 0 auto", width: blocks && !isSection ? (isPar ? Math.min(3, (r as GroupRow).lanes.length) * 230 + 40 : 236) + "px" : "100%", maxWidth: "100%" }}>
      <Gap on={S.drop?.key === "ins:" + zone + ":" + r.first} />
      <div style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column" }}>
        {r.kind === "section" ? <SectionView r={r} zone={zone} /> : <GroupView r={r} zone={zone} />}
        {notes.length > 0 && <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6, marginLeft: zone === "live" && !blocks ? 56 : 0 }}>{notes.map(s => <SuggestionCard key={s.id} s={s} compact />)}</div>}
      </div>
    </div>
  );
}

function SectionView({ r, zone }: { r: SectionRow; zone: Zone }) {
  const { S, store } = useBuilder();
  const x = r.x, src = !!S.drag && S.drag.kind === "move" && S.drag.id === x.id;
  return (
    <div onPointerDown={e => store.beginPress(e, { kind: "move", id: x.id, isBlock: false, title: x.title || "", mins: "", label: "Section" })}
      style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0 6px", borderBottom: "1px solid " + C.edge, opacity: src ? ".35" : "1" }}>
      <span data-handle="1" aria-hidden="true" style={{ touchAction: "none", color: C.faint, cursor: "grab", fontSize: 15, letterSpacing: -2, userSelect: "none", padding: "4px 2px" }}>⋮⋮</span>
      <input aria-label="Section name" value={x.title || ""} onChange={e => store.edit(x.id, { title: e.target.value })} className="bf-accent"
        style={{ flex: "1 1 auto", minWidth: 0, background: "none", border: 0, outline: "none", color: C.ink, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 0" }} />
      <span style={{ fontSize: 13, color: C.mute, whiteSpace: "nowrap" }}>{zone === "live" && r.mins ? clock(r.t0) + "–" + clock(r.t1) + " · " + hm(r.mins) : ""}</span>
      <button onClick={() => store.moveBy(x.id, -1)} aria-label={"Move section " + x.title + " earlier"} className="bh-ink" style={iconBtn}>↑</button>
      <button onClick={() => store.moveBy(x.id, 1)} aria-label={"Move section " + x.title + " later"} className="bh-ink" style={iconBtn}>↓</button>
      <button onClick={() => store.remove(x.id, "Section removed")} aria-label={"Remove section " + x.title + ". Its blocks stay."} className="bh-accent" style={{ ...iconBtn, fontSize: 15 }}>×</button>
    </div>
  );
}

function GroupView({ r, zone }: { r: GroupRow; zone: Zone }) {
  const { S } = useBuilder();
  const timed = zone === "live" && S.view !== "blocks", isPar = r.lanes.length > 1;
  return (
    <div style={{ display: "grid", gridTemplateColumns: timed ? "46px minmax(0,1fr)" : "minmax(0,1fr)", gap: "8px 10px", alignItems: "start" }}>
      {timed && <div style={{ paddingTop: 12, fontSize: 13, color: C.mute, fontVariantNumeric: "tabular-nums" }}>{clock(r.t0)}</div>}
      <div style={{ minWidth: 0 }}>
        {isPar && <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12, letterSpacing: ".06em", color: C.mute, marginBottom: 6 }}><span>PARALLEL · {r.lanes.length} GROUPS</span><span>{r.dur} min, longest lane</span></div>}
        <div style={{ display: "grid", gridTemplateColumns: isPar ? (S.view === "blocks" ? "1fr" : "repeat(" + r.lanes.length + ",minmax(0,1fr))") : "minmax(0,1fr)", gap: 8, borderLeft: isPar ? "2px solid " + C.faint : "0", paddingLeft: isPar ? "10px" : "0px" }}>
          {r.lanes.map(o => <BlockCard key={o.x.id} x={o.x} t0={r.t0} />)}
        </div>
      </div>
    </div>
  );
}

const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter(y => y !== id) : list.concat([id]));

function BlockCard({ x, t0 }: { x: Item; t0: number }) {
  const { S, store, d } = useBuilder();
  const view = S.view, wide = d.wide, ROLES = RDB().ROLES;
  const isBreak = x.role === "breaks", R = ROLES[x.role || ""] || ROLES.custom, it = x.ref ? RDL().get(x.ref) : undefined, deco = it ? RDL().deco(it) : undefined;
  const f = d.flow[x.id], sel = S.sel.includes(x.id), open = S.open === x.id, live = x.zone === "live", pend = d.pend[x.id];
  const src = !!S.drag && S.drag.kind === "move" && (S.drag.id === x.id || (sel && S.sel.includes(S.drag.id)));
  const k = view === "days" ? 1.1 : 1.4, m = mins(x);
  const h = live && view !== "blocks" ? Math.max(isBreak ? 52 : 74, Math.min(320, Math.round(m * k))) : view === "blocks" && live ? 150 : 0;
  const label = x.role === "custom" ? "Custom" : isBreak ? (x.title === "Lunch" ? "Lunch" : "Break") : R[0];
  const meta = live ? clock(t0) + "–" + clock(t0 + m) + (x.cfg.mode ? " · " + x.cfg.mode : "") : (x.zone === "pre" ? "Before the session" : "After the session") + (x.cfg.mode ? " · " + x.cfg.mode : "");
  const showFlow = !isBreak && x.role !== "custom" && !!f && f.uses.length + f.makes.length > 0 && (h >= 100 || view === "blocks" || !live);
  const openSheet = (o: boolean) => (wide ? null : o ? "assist" : null);
  const onClick = (e: React.MouseEvent) => {
    if (store.justDragged) return;
    if (e.shiftKey || e.metaKey || e.ctrlKey) store.set(s => ({ sel: toggle(s.sel, x.id) }));
    else store.set({ open: open ? null : x.id, sel: [x.id], alts: null, sheet: openSheet(!open) });
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.shiftKey) store.set(s => ({ sel: toggle(s.sel, x.id) }));
      else store.set({ open: x.id, sel: [x.id], sheet: openSheet(true) });
    } else if (e.altKey && e.key === "ArrowUp") { e.preventDefault(); store.moveBy(x.id, -1); }
    else if (e.altKey && e.key === "ArrowDown") { e.preventDefault(); store.moveBy(x.id, 1); }
    else if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); store.remove(x.id, x.title + " deleted"); }
  };
  return (
    <div data-lane={x.id} style={{ position: "relative", minWidth: 0 }}>
      <div role="button" tabIndex={0} aria-pressed={sel ? "true" : "false"} className="bf-line-ink"
        aria-label={x.title + ", " + m + " minutes" + (live ? ", " + clock(t0) : "") + (sel ? ", selected" : "") + ". Enter to configure, shift and Enter to select."}
        onPointerDown={e => store.beginPress(e, { kind: "move", id: x.id, isBlock: true, title: x.title || "", mins: m, label: x.role === "custom" ? "Custom" : R[0] })}
        onClick={onClick} onKeyDown={onKey}
        style={{
          position: "relative", display: "flex", flexDirection: "column", minHeight: h + "px", background: isBreak ? "#131312" : open ? "#22211d" : C.card,
          border: "1px " + (isBreak ? "dashed" : "solid") + " " + (open ? C.ink : sel || pend ? C.accent : C.line), boxShadow: open || sel ? "0 8px 24px rgba(0,0,0,.4)" : "none",
          opacity: src ? ".35" : "1", cursor: "grab", userSelect: "none", outline: "none", transition: S.reducedMotion ? "none" : "border-color .15s, box-shadow .15s, opacity .15s"
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 8px 0 8px" }}>
          <span data-handle="1" aria-hidden="true" style={{ touchAction: "none", color: C.faint, fontSize: 14, letterSpacing: -2, padding: 2 }}>⋮⋮</span>
          <button onClick={e => { e.stopPropagation(); store.set(s => ({ sel: toggle(s.sel, x.id) })); }} aria-label={(sel ? "Deselect " : "Select ") + x.title} aria-pressed={sel ? "true" : "false"}
            style={{ whiteSpace: "nowrap", flex: "0 0 auto", width: 16, height: 16, background: sel ? C.accent : "transparent", border: "1px solid " + (sel ? C.accent : C.faint), cursor: "pointer", padding: 0 }} />
          <span style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexWrap: "wrap", gap: "2px 8px", fontSize: 12, color: C.mute }}><span style={{ color: sel || pend ? C.accent : C.mute }}>{label}</span><span>{deco ? deco.typeLabel : ""}</span></span>
          <span style={{ fontSize: 13, color: C.ink, whiteSpace: "nowrap" }}>{m} min</span>
          <button onClick={e => { e.stopPropagation(); store.moveBy(x.id, -1); }} aria-label={"Move " + x.title + " earlier"} className="bh-ink" style={{ ...iconBtn, minWidth: 24, minHeight: 26 }}>↑</button>
          <button onClick={e => { e.stopPropagation(); store.moveBy(x.id, 1); }} aria-label={"Move " + x.title + " later"} className="bh-ink" style={{ ...iconBtn, minWidth: 24, minHeight: 26 }}>↓</button>
        </div>
        <div style={{ padding: "4px 12px 0 30px", fontFamily: DISPLAY, fontWeight: 500, fontSize: isBreak ? "16px" : view === "days" ? "17px" : "19px", lineHeight: 1.08, letterSpacing: "-.01em" }}>{x.title}</div>
        {(view !== "timeline" || !live || !!x.cfg.mode) && <div style={{ padding: "3px 12px 0 30px", fontSize: 12, color: C.mute }}>{meta}</div>}
        {showFlow && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, padding: "7px 12px 0 30px", fontSize: 12 }}>
            {f.uses.map((u, i) => <span key={"u" + i} style={{ border: "1px solid " + (u.ok ? C.line : C.accent), color: u.ok ? C.mute : C.accent, padding: "2px 6px" }}>{(u.ok ? "" : "Needs ") + u.k}</span>)}
            {f.makes.map((mk, i) => <span key={"m" + i} style={{ background: "#26251f", color: C.soft, padding: "3px 7px" }}>→ {mk}</span>)}
          </div>
        )}
        {!!pend && <div style={{ padding: "6px 12px 0 30px", fontSize: 13, color: C.accent }}>Proposed: {pend}</div>}
        {(d.byAt[x.id] || []).length > 0 && <div style={{ padding: "6px 12px 0 30px" }}><SuggestionChip id={x.id} /></div>}
        <div style={{ flex: "1 1 auto", minHeight: 8 }} />
        {live && view !== "blocks" && (
          <div onPointerDown={e => store.resizeStart(e, x.id, k)} aria-hidden="true" title="Drag to change duration" style={{ touchAction: "none", height: 12, cursor: "ns-resize", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: 28, height: 3, borderTop: "1px solid " + C.faint, borderBottom: "1px solid " + C.faint }} />
          </div>
        )}
      </div>
      {S.drop?.key === "par:" + x.id && (
        <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, right: -6, width: "44%", border: "1px dashed " + C.accent, background: "rgba(255,75,35,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: C.accent, pointerEvents: "none" }}>Run in parallel</div>
      )}
    </div>
  );
}
