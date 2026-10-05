"use client";
// Run mode: full screen over the Builder. The Ready screen first, then the facilitator desktop.
import { C } from "../constants";
import { useBuilder } from "../ui";
import LiveRun from "./run/LiveRun";
import ReadyScreen from "./run/ReadyScreen";

export default function RunMode() {
  const { S } = useBuilder();
  return (
    <div role="dialog" aria-modal="true" aria-label="Run mode" data-screen-label="Run mode" style={{ position: "fixed", inset: 0, zIndex: 300, background: C.bg, color: C.ink, overflow: "auto", fontFamily: "'Satoshi',sans-serif", display: "flex", flexDirection: "column" }}>
      {S.runView === "ready" ? <ReadyScreen /> : <LiveRun />}
    </div>
  );
}
