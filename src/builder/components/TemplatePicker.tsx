"use client";
// Template picker, as a popup over the Builder. Each template opens as a new, editable workshop.
import { C, TILT } from "../constants";
import { RDB } from "../engine";
import { mins, tplItems } from "../items";
import { hm } from "../time";
import { DISPLAY, useBuilder } from "../ui";

export default function TemplatePicker() {
  const { S, store, d } = useBuilder();
  return (
    <div role="dialog" aria-modal="true" aria-label="Templates" onClick={() => store.set({ center: "canvas" })}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,.72)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "clamp(12px,5vh,64px) clamp(12px,3vw,40px)", overflow: "auto" }}>
    <div onClick={e => e.stopPropagation()} style={{ width: "min(1080px,100%)", background: C.well, border: "1px solid " + C.edge, boxShadow: "0 30px 80px rgba(0,0,0,.6)", padding: "clamp(18px,3vw,32px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <span><span style={{ display: "block", fontFamily: DISPLAY, fontWeight: 500, fontSize: 28 }}>Templates</span><span style={{ fontSize: 14, color: C.mute }}>Each opens as a new workshop you can change.</span></span>
        <button autoFocus onClick={() => store.set({ center: "canvas" })} aria-label="Close templates" style={{ whiteSpace: "nowrap", background: "none", border: "1px solid " + C.line, color: C.ink, minWidth: 40, minHeight: 40, cursor: "pointer", fontSize: 16 }}>×</button>
      </div>
      {S.mylib.templates.length > 0 && (
        <>
          <div style={{ marginTop: 18, fontSize: 12, letterSpacing: ".06em", color: C.accent }}>MY TEMPLATES</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))", gap: 14, marginTop: 10 }}>
            {S.mylib.templates.map(t => (
              <button key={t.id} onClick={() => store.openMyTemplate(t)} className="bh-tpl" style={{ textAlign: "left", background: C.card, border: "1px solid " + C.edge, color: C.ink, padding: "14px 16px 16px", cursor: "pointer", transition: "transform .2s,border-color .2s" }}>
                <span style={{ display: "block", fontSize: 12, color: C.mute }}>{t.items.filter(x => x.kind === "block" && x.zone === "live").length + " blocks" + (t.fromRun ? " · proven in a run" : "")}</span>
                <span style={{ display: "block", marginTop: 10, fontFamily: DISPLAY, fontWeight: 500, fontSize: 20, lineHeight: 1.05 }}>{t.name}</span>
                <span style={{ display: "block", marginTop: 6, fontSize: 14, lineHeight: 1.4, color: C.soft }}>{t.d}</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 22, fontSize: 12, letterSpacing: ".06em", color: C.mute }}>RAW DRAFT TEMPLATES</div>
        </>
      )}
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
      {d.L.hasBlocks && <p style={{ margin: "14px 0 0", fontSize: 14, color: C.mute }}>Opening a template starts a new workshop. This one stays in your workshops.</p>}
    </div>
    </div>
  );
}
