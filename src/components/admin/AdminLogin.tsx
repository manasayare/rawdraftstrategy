"use client";
import { useState } from "react";
import { C, btn, input, kicker, shell } from "./styles";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "wrong" | "error">("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) }).catch(() => null);
    if (res && res.ok) return location.reload();
    setState(res && res.status === 401 ? "wrong" : "error");
  }
  return (
    <main style={shell}>
      <form onSubmit={submit} style={{ maxWidth: 420 }}>
        <div style={kicker}>Raw Draft · Leads</div>
        <h1 style={{ margin: "12px 0 0", fontFamily: "'Clash Display',sans-serif", fontWeight: 500, fontSize: "clamp(40px,6vw,72px)", letterSpacing: "-.04em", lineHeight: 0.92 }}>Sign in</h1>
        <label style={{ display: "block", marginTop: 28, fontSize: 14, color: C.mute }}>
          Password
          <input type="password" autoComplete="current-password" autoFocus value={pw} onChange={e => { setPw(e.target.value); setState("idle"); }} style={{ ...input, display: "block", width: "100%", marginTop: 6, minHeight: 48, fontSize: 17 }} />
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
          <button type="submit" disabled={state === "busy" || !pw} style={{ ...btn(true), minHeight: 48, padding: "0 22px", fontSize: 16, opacity: state === "busy" || !pw ? 0.6 : 1 }}>{state === "busy" ? "Checking…" : "Sign in"}</button>
          <span role="status" style={{ fontSize: 14, color: C.accent }}>{state === "wrong" ? "Wrong password." : state === "error" ? "Couldn't sign in. Try again." : ""}</span>
        </div>
      </form>
    </main>
  );
}
