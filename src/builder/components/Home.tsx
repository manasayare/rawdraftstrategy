"use client";
// The workshops list, reached from "Workshops" in the header.
import { C } from "../constants";
import { isLiveBlock, mins } from "../items";
import { ago, hm } from "../time";
import { DISPLAY, Kicker, useBuilder } from "../ui";

const startBtn = { whiteSpace: "nowrap", background: "none", border: "1px solid " + C.edge, color: C.ink, minHeight: 44, padding: "0 16px", cursor: "pointer", fontSize: 15 } as const;

export default function Home() {
  const { store } = useBuilder();
  const list = store.workshopList().slice().sort((a, c) => (c.updated || 0) - (a.updated || 0));
  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px 16px", fontSize: 14, color: C.mute }}><span>Builder</span><span>Saved in this browser</span></div>
      <h1 style={{ margin: "14px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(40px,6vw,92px)", letterSpacing: "-.04em", lineHeight: 0.92 }}>Your workshops</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
        <button onClick={() => store.blankWorkshop()} style={startBtn}>Start blank</button>
        <button onClick={() => store.newWorkshop({}, { center: "tpl" })} style={startBtn}>Use a template</button>
      </div>
      <Kicker style={{ marginTop: "clamp(32px,4vw,52px)" }}>RECENT</Kicker>
      <div style={{ marginTop: 8, borderTop: "1px solid " + C.rule }}>
        {list.map(w => {
          const bl = (w.items || []).filter(isLiveBlock);
          return (
            <button key={w.id} onClick={() => store.openWorkshop(w.id)} className="bh-accent" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: "4px 20px", alignItems: "center", width: "100%", textAlign: "left", background: "none", border: 0, borderBottom: "1px solid " + C.rule, color: C.ink, minHeight: 64, padding: "12px 0", cursor: "pointer" }}>
              <span>
                <span style={{ display: "block", fontFamily: DISPLAY, fontWeight: 500, fontSize: 22, lineHeight: 1.1 }}>{w.name}</span>
                <span style={{ display: "block", marginTop: 3, fontSize: 14, color: C.mute }}>{"Edited " + ago(w.updated) + " · " + hm(bl.reduce((a, x) => a + mins(x), 0)) + " · " + bl.length + " blocks"}</span>
              </span>
              <span style={{ fontSize: 14, color: C.mute }}>Open</span>
            </button>
          );
        })}
        {!list.length && <p style={{ margin: "12px 0 0", fontSize: 15, color: C.mute }}>No workshops yet. Start blank, or open a template.</p>}
      </div>
    </div>
  );
}
