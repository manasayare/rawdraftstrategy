"use client";
// Workshop name, start time, total, view switch and workshop-level actions.
import { BLANK_NOTICE, C } from "../constants";
import { clock, hm } from "../time";
import type { View } from "../types";
import { BODY, DISPLAY, accent, outline, textBtn, useBuilder } from "../ui";
import ExportMenu from "./ExportMenu";

const VIEWS: [View, string][] = [["timeline", "Timeline"], ["blocks", "Blocks"], ["days", "Days"]];
const headBtn = (o = {}) => outline({ minHeight: 40, padding: "0 12px", fontSize: 14, ...o });

export default function Header() {
  const { S, store, d } = useBuilder();
  const { start, total, nDays, avail, over, L } = d;
  const has = L.hasBlocks, canRun = store.liveBlocks().length > 0;
  const totalL = has ? hm(total) + (nDays > 1 ? " across " + nDays + " days" : " · ends " + clock(start + total)) : "Nothing planned yet";
  const overL = !has ? "" : over > 0 ? hm(over) + " over the " + hm(avail!) + " available" : over < 0 ? hm(-over) + " spare of " + hm(avail!) : avail && has ? "Fits " + hm(avail) : "";

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "12px 24px", paddingBottom: 14, borderBottom: "1px solid " + C.rule }}>
      <div style={{ minWidth: 0, flex: "1 1 360px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 18px", fontSize: 14, color: C.mute }}>
          <button onClick={() => store.goHome()} className="bh-ink" style={textBtn({ color: C.soft, fontSize: 14, minHeight: 32 })}>← Back</button>
          <button onClick={() => store.newWorkshop({}, { notice: BLANK_NOTICE })} className="bh-ink" style={textBtn({ color: C.mute, fontSize: 14, minHeight: 32 })}>+ New workshop</button>
        </div>
        <input aria-label="Workshop name" value={S.name} onChange={e => store.set({ name: e.target.value })} className="bf-under"
          style={{ display: "block", width: "100%", marginTop: 4, background: "none", border: 0, borderBottom: "1px solid transparent", outline: "none", color: C.ink, padding: "2px 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(28px,3.4vw,46px)", letterSpacing: "-.03em", lineHeight: 1.05 }} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px", marginTop: 8, fontSize: 15 }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.mute }}>
            Starts <input type="time" aria-label="Start time" value={S.start} onChange={e => store.set({ start: e.target.value || "09:30" })}
              style={{ background: C.well, border: "1px solid " + C.rule, color: C.ink, minHeight: 34, padding: "0 6px", fontFamily: BODY, fontSize: 14, colorScheme: "dark" }} />
          </label>
          <span>{totalL}</span>
          <span style={{ color: over > 0 ? C.accent : C.mute }}>{overL}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 10px", alignItems: "center" }}>
        <div role="group" aria-label="View" style={{ display: "flex", border: "1px solid " + C.line }}>
          {VIEWS.map(([k, l]) => (
            <button key={k} onClick={() => store.set({ view: k })} aria-pressed={S.view === k ? "true" : "false"}
              style={{ whiteSpace: "nowrap", background: S.view === k ? C.ink : "transparent", color: S.view === k ? C.bg : C.ink, border: 0, minHeight: 38, padding: "0 12px", cursor: "pointer", fontSize: 14 }}>{l}</button>
          ))}
        </div>
        <button onClick={() => store.undo()} disabled={!S.hist.length} style={headBtn({ color: S.hist.length ? C.ink : C.faint })}>Undo</button>
        <button onClick={() => store.set({ center: "tpl", open: null, sheet: null })} className="bh-line-mute" style={headBtn()}>Templates</button>
        <ExportMenu />
        <button onClick={() => store.openRun()} disabled={!canRun} title={canRun ? "Facilitate this workshop live" : "Add blocks to the session first"}
          style={accent({ minHeight: 40, padding: "0 16px", fontSize: 14, opacity: canRun ? 1 : 0.4 })}>Run workshop</button>
      </div>
    </div>
  );
}
