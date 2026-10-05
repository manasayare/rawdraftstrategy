"use client";
// Template picker shown in the canvas area. Each template opens as a new, editable workshop.
import { C, TILT } from "../constants";
import { RDB } from "../engine";
import { mins, tplItems } from "../items";
import { hm } from "../time";
import { DISPLAY, textBtn, useBuilder } from "../ui";

export default function TemplatePicker() {
  const { store, d } = useBuilder();
  return (
    <div style={{ background: C.well, border: "1px solid " + C.rule, padding: "clamp(18px,3vw,32px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 14, color: C.mute }}>
        <span>Templates · each opens as an editable copy</span>
        <button onClick={() => store.set({ center: "canvas" })} style={textBtn({ color: C.soft, fontSize: 14 })}>Back to the canvas</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))", gap: 14, marginTop: 16 }}>
        {RDB().TPL.map((t, i) => {
          const its = tplItems(t), blocks = its.filter(x => x.kind === "block"), days = its.filter(x => x.kind === "day").length + 1, m = blocks.reduce((s, x) => s + mins(x), 0);
          return (
            <button key={t.name} onClick={() => store.openTemplate(t)} className="bh-tpl"
              style={{ textAlign: "left", background: C.card, border: "1px solid " + C.line, color: C.ink, padding: "14px 16px 16px", cursor: "pointer", transform: `rotate(${TILT[i % 8]}deg)`, transition: "transform .2s,border-color .2s" }}>
              <span style={{ display: "block", fontSize: 12, color: C.mute }}>{(days > 1 ? days + " days" : hm(m)) + " · " + blocks.length + " blocks"}</span>
              <span style={{ display: "block", marginTop: 10, fontFamily: DISPLAY, fontWeight: 500, fontSize: 20, lineHeight: 1.05 }}>{t.name}</span>
              <span style={{ display: "block", marginTop: 6, fontSize: 14, lineHeight: 1.4, color: C.soft }}>{t.d}</span>
            </button>
          );
        })}
      </div>
      {d.L.hasBlocks && <p style={{ margin: "14px 0 0", fontSize: 14, color: C.mute }}>Opening a template replaces the canvas. Undo brings it back.</p>}
    </div>
  );
}
