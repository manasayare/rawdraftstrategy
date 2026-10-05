"use client";
// Start screen and workshop list. Most workshops start from context that already exists elsewhere,
// so importing it comes first.
import { BLANK_NOTICE, C } from "../constants";
import { isLiveBlock, mins } from "../items";
import { ago, hm } from "../time";
import { DISPLAY, Kicker, accent, outline, useBuilder } from "../ui";

const step = (n: string, t: string, d: string) => (
  <div key={n} style={{ minWidth: 0 }}>
    <div style={{ fontSize: 12, letterSpacing: ".06em", color: C.accent }}>{n}</div>
    <div style={{ marginTop: 4, fontFamily: DISPLAY, fontWeight: 500, fontSize: 20 }}>{t}</div>
    <div style={{ marginTop: 4, fontSize: 14, lineHeight: 1.45, color: C.mute }}>{d}</div>
  </div>
);

export default function Home() {
  const { store } = useBuilder();
  const list = store.workshopList().slice().sort((a, c) => (c.updated || 0) - (a.updated || 0));
  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px 16px", fontSize: 14, color: C.mute }}><span>Builder</span><span>Saved in this browser</span></div>
      <h1 style={{ margin: "14px 0 0", fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(40px,6vw,92px)", letterSpacing: "-.04em", lineHeight: 0.92 }}>{list.length ? "Your workshops" : "Design it. Run it. Keep what happened."}</h1>
      <p style={{ margin: "14px 0 0", maxWidth: "60ch", fontSize: 17, lineHeight: 1.5, color: C.soft }}>Bring in what you've already worked out, in ChatGPT, Claude, a doc or your notes. Build the workshop from trusted methods, then facilitate it from here: timer, script, notes and decisions in one place.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
        <button onClick={() => store.set({ phase: "import", wid: null })} style={accent({ minHeight: 50, padding: "0 22px", fontSize: 16 })}>Import context</button>
        <button onClick={() => store.newWorkshop({}, { center: "tpl" })} style={outline({ minHeight: 50, padding: "0 18px", fontSize: 15, border: "1px solid " + C.edge })}>Use a template</button>
        <button onClick={() => store.newWorkshop({}, { notice: BLANK_NOTICE })} style={outline({ minHeight: 50, padding: "0 18px", fontSize: 15, border: "1px solid " + C.edge })}>Start blank</button>
      </div>
      {!list.length && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: "20px 28px", marginTop: "clamp(32px,4vw,52px)", paddingTop: 22, borderTop: "1px solid " + C.rule }}>
          {step("01 IMPORT", "Bring context in", "Paste a conversation, brief or agenda. Raw Draft pulls out the brief.")}
          {step("02 BUILD", "Design the session", "Drag in Library methods, retime, add breaks, days and breakouts.")}
          {step("03 RUN", "Facilitate from here", "A calm timer, the script, the next block and quick capture.")}
          {step("04 REVIEW", "Keep what happened", "Decisions, actions and the parking lot, organised by activity.")}
        </div>
      )}
      {list.length > 0 && (
        <>
          <Kicker style={{ marginTop: "clamp(32px,4vw,52px)" }}>RECENT</Kicker>
          <div style={{ marginTop: 8, borderTop: "1px solid " + C.rule }}>
            {list.map(w => {
              const bl = (w.items || []).filter(isLiveBlock), ran = w.session?.endedAt;
              return (
                <button key={w.id} onClick={() => store.openWorkshop(w.id)} className="bh-accent" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: "4px 20px", alignItems: "center", width: "100%", textAlign: "left", background: "none", border: 0, borderBottom: "1px solid " + C.rule, color: C.ink, minHeight: 64, padding: "12px 0", cursor: "pointer" }}>
                  <span>
                    <span style={{ display: "block", fontFamily: DISPLAY, fontWeight: 500, fontSize: 22, lineHeight: 1.1 }}>{w.name}</span>
                    <span style={{ display: "block", marginTop: 3, fontSize: 14, color: C.mute }}>{"Edited " + ago(w.updated) + " · " + hm(bl.reduce((a, x) => a + mins(x), 0)) + " · " + bl.length + " blocks" + (w.context ? " · has context" : "") + (ran ? " · run " + ago(ran) : "")}</span>
                  </span>
                  <span style={{ fontSize: 14, color: C.mute }}>Open</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
