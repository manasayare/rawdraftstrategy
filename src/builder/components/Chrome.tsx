"use client";
// Notices under the header, the phone-width action bar and the drag ghost.
import { useCallback } from "react";
import { C } from "../constants";
import { RDL } from "../engine";
import { expand } from "../items";
import { DISPLAY, accent, outline, textBtn, useBuilder } from "../ui";

export function Notices() {
  const { S, store } = useBuilder();
  const pending = S.pendingAdd ? RDL().get(S.pendingAdd) : undefined;
  return (
    <>
      {S.notice && (
        <div role="status" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px 20px", marginTop: 12, padding: "10px 14px", border: "1px solid " + C.edge, fontSize: 15, color: C.soft }}>
          <span style={{ minWidth: 0, flex: "1 1 300px" }}>{S.notice}</span>
          <button onClick={() => store.set({ notice: "" })} style={textBtn({ color: C.mute, fontSize: 14, minHeight: 28 })}>Dismiss</button>
        </div>
      )}
      {S.pendingAdd && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 16px", marginTop: 12, padding: "12px 14px", border: "1px solid " + C.accent, fontSize: 15 }}>
          <span style={{ flex: "1 1 260px" }}>Add <span style={{ color: C.accent }}>{pending?.title}</span> to:</span>
          <button onClick={() => { store.set({ pendingAdd: null }); if (pending) store.addEnd(expand(pending), pending.title); }} style={accent({ minHeight: 40, padding: "0 14px", fontSize: 14 })}>This workshop</button>
          <button onClick={() => {
            store.set({ pendingAdd: null });
            if (pending) store.commit(() => expand(pending), "New workshop", { name: pending.type === "workshop" || pending.type === "sprint" ? pending.title : "Untitled workshop", notice: "New workshop started with " + pending.title + ". Undo brings the previous one back." });
          }} style={outline({ border: "1px solid " + C.edge, minHeight: 40, padding: "0 14px", fontSize: 14 })}>A new workshop</button>
          <button onClick={() => store.set({ pendingAdd: null })} style={textBtn({ color: C.mute, minHeight: 40, fontSize: 14 })}>Cancel</button>
        </div>
      )}
    </>
  );
}

export function MobileBar() {
  const { store, d } = useBuilder();
  return (
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 75, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.rule, borderTop: "1px solid " + C.line }}>
      <button onClick={() => store.set({ sheet: "lib", open: null })} style={accent({ fontWeight: 500, minHeight: 56, fontSize: 16 })}>+ Add block</button>
      <button onClick={() => store.set({ sheet: "assist" })} style={{ whiteSpace: "nowrap", background: C.well, color: C.ink, border: 0, minHeight: 56, cursor: "pointer", fontSize: 16 }}>{"Suggestions" + (d.sug.filter(s => s.level !== "optional" && !s.inlineOnly).length ? " · " + d.sug.filter(s => s.level !== "optional" && !s.inlineOnly).length : "")}</button>
    </div>
  );
}

/** Follows the pointer while dragging; positioned by the store for smoothness. */
export function Ghost() {
  const { S, store } = useBuilder();
  const ref = useCallback((el: HTMLDivElement | null) => { store.ghost = el; }, [store]);
  const g = S.drag;
  return (
    <div ref={ref} aria-hidden="true" style={{ position: "fixed", left: 0, top: 0, zIndex: 120, pointerEvents: "none", display: g ? "block" : "none", width: g ? g.w + "px" : "0px", background: "#1f1e1b", border: "1px solid " + C.ink, boxShadow: "0 18px 40px rgba(0,0,0,.55)", padding: "10px 12px 12px", willChange: "transform" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12, color: C.mute }}><span>{g?.label || ""}</span><span>{g?.mins || ""}</span></div>
      <div style={{ marginTop: 3, fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, lineHeight: 1.1, color: C.ink }}>{g?.title}</div>
    </div>
  );
}
