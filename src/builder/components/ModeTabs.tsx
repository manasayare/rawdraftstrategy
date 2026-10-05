"use client";
// Import · Build · Run · Review: four views of the same workshop.
import { C } from "../constants";
import { useBuilder } from "../ui";

export default function ModeTabs() {
  const { S, store } = useBuilder();
  const canRun = store.liveBlocks().length > 0, hasSession = !!S.session?.startedAt;
  const cur = S.phase === "import" ? "import" : S.phase === "review" ? "review" : S.run ? "run" : "build";
  const tabs: [string, string, () => void, boolean, string][] = [
    ["import", "Import", () => store.set({ phase: "import" }), true, "Bring in context"],
    ["build", "Build", () => store.set({ phase: "bench" }), !!S.wid, "Design the workshop"],
    ["run", "Run", () => store.openRun(), canRun, canRun ? "Facilitate it live" : "Add blocks first"],
    ["review", "Review", () => store.set({ phase: "review" }), hasSession, hasSession ? "What happened and what's next" : "Available after you run it"]
  ];
  return (
    <nav aria-label="Workshop mode" style={{ display: "flex", flexWrap: "wrap", gap: 0, borderBottom: "1px solid " + C.rule, marginBottom: 18 }}>
      {tabs.map(([k, l, go, on, tip]) => (
        <button key={k} onClick={go} disabled={!on} title={tip} aria-current={cur === k ? "page" : undefined}
          style={{ whiteSpace: "nowrap", background: "none", border: 0, borderBottom: "2px solid " + (cur === k ? C.accent : "transparent"), marginBottom: -1, color: cur === k ? C.ink : on ? C.soft : C.faint, cursor: on ? "pointer" : "default", minHeight: 44, padding: "0 16px 0 0", marginRight: 18, fontSize: 15, fontWeight: cur === k ? 500 : 400 }}>{l}</button>
      ))}
    </nav>
  );
}
