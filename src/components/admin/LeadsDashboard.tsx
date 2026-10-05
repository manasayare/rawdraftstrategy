"use client";
import { useMemo, useState } from "react";
import { STATUSES, callBy, emailUrl, googleCalendarUrl, icsFile, suggestedUrgency, urgencyOf, type Lead, type LeadStatus, type Urgency } from "@/lib/leads";
import { C, btn, input, kicker, shell } from "./styles";

const TABS: [string, string, (l: Lead) => boolean][] = [
  ["active", "Active", l => ["new", "toSchedule", "booked"].includes(l.status)],
  ["new", "Needs a decision", l => l.status === "new"],
  ["toSchedule", "To schedule", l => l.status === "toSchedule"],
  ["booked", "Calls booked", l => l.status === "booked"],
  ["closed", "Closed", l => ["done", "notNow", "declined"].includes(l.status)],
  ["all", "All", () => true]
];
const URG: Record<Urgency, [string, string]> = { high: ["High", C.accent], medium: ["Medium", "#e0b25a"], low: ["Low", C.mute] };
const RANK: Record<Urgency, number> = { high: 0, medium: 1, low: 2 };
const STATUS_L = Object.fromEntries(STATUSES) as Record<LeadStatus, string>;

const day = (d: Date) => d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
const dayTime = (d: Date) => d.toLocaleString(undefined, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const ago = (iso: string) => { const h = (Date.now() - Date.parse(iso)) / 36e5; return h < 1 ? "just now" : h < 24 ? Math.round(h) + "h ago" : Math.round(h / 24) + "d ago"; };
const localInput = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

// First suggested slot: 10:00 on the next working day.
function suggestedSlot() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  d.setHours(10, 0, 0, 0);
  return d;
}

export default function LeadsDashboard({ initial, error }: { initial: Lead[]; error: string }) {
  const [leads, setLeads] = useState(initial);
  const [tab, setTab] = useState("active");
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState(error ? "Couldn't load leads: " + error : "");

  async function save(id: string, patch: Partial<Lead> & { callAt?: string | null }) {
    const before = leads;
    setLeads(ls => ls.map(l => (l._id === id ? { ...l, ...(patch as Partial<Lead>), callAt: patch.callAt === null ? undefined : patch.callAt ?? l.callAt } : l)));
    const res = await fetch(`/api/admin/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) }).catch(() => null);
    if (!res || !res.ok) {
      setLeads(before);
      setMsg(res && res.status === 401 ? "Signed out. Reload to sign in again." : "Couldn't save that change. Try again.");
      return false;
    }
    setMsg("");
    return true;
  }

  const now = Date.now();
  const counts = Object.fromEntries(TABS.map(([k, , f]) => [k, leads.filter(f).length]));
  const overdue = leads.filter(l => (l.status === "new" || l.status === "toSchedule") && callBy(l).getTime() < now).length;
  const next = leads.filter(l => l.status === "booked" && l.callAt && Date.parse(l.callAt) > now).sort((a, b) => Date.parse(a.callAt!) - Date.parse(b.callAt!))[0];

  const shown = useMemo(() => {
    const f = TABS.find(t => t[0] === tab)![2], words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return leads.filter(f)
      .filter(l => words.every(w => [l.name, l.email, l.org, l.topics, l.help, l.notes].join(" ").toLowerCase().includes(w)))
      .sort((a, b) => {
        if (a.status === "booked" && b.status === "booked") return Date.parse(a.callAt || "") - Date.parse(b.callAt || "");
        return RANK[urgencyOf(a)] - RANK[urgencyOf(b)] || callBy(a).getTime() - callBy(b).getTime();
      });
  }, [leads, tab, q]);

  return (
    <main style={shell}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "8px 24px" }}>
        <div style={kicker}>Raw Draft · Leads</div>
        <div style={{ display: "flex", gap: 18, fontSize: 14 }}>
          <a href="/" style={{ color: C.mute }}>Site</a>
          <button onClick={async () => { await fetch("/api/admin/login", { method: "DELETE" }); location.reload(); }} style={{ background: "none", border: 0, color: C.mute, cursor: "pointer", fontSize: 14, padding: 0 }}>Sign out</button>
        </div>
      </div>
      <h1 style={{ margin: "10px 0 0", fontFamily: "'Clash Display',sans-serif", fontWeight: 500, fontSize: "clamp(44px,6vw,88px)", letterSpacing: "-.04em", lineHeight: 0.9 }}>Leads</h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: C.soft }}>
        {counts.new} need a decision · {counts.toSchedule} to schedule{overdue ? <span style={{ color: C.accent }}> · {overdue} past their call-by date</span> : null}
        {next ? <> · next call {dayTime(new Date(next.callAt!))} with {next.name}</> : null}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", alignItems: "flex-end", marginTop: 28, borderBottom: `1px solid ${C.line}` }}>
        <div role="tablist" style={{ display: "flex", flexWrap: "wrap", gap: "0 22px" }}>
          {TABS.map(([k, label]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} style={{ background: "none", border: 0, borderBottom: `2px solid ${tab === k ? C.accent : "transparent"}`, marginBottom: -1, color: tab === k ? C.ink : C.mute, minHeight: 44, padding: 0, cursor: "pointer", fontSize: 15 }}>
              {label} <span style={{ fontSize: 12, color: C.mute }}>{counts[k]}</span>
            </button>
          ))}
        </div>
        <input type="search" placeholder="Search leads" value={q} onChange={e => setQ(e.target.value)} style={{ ...input, marginLeft: "auto", marginBottom: 8, minWidth: 200 }} />
      </div>
      {msg ? <p role="alert" style={{ margin: "14px 0 0", color: C.accent, fontSize: 15 }}>{msg}</p> : null}

      <div style={{ marginTop: 8 }}>
        {shown.map(l => <LeadRow key={l._id} lead={l} save={save} />)}
        {!shown.length ? <p style={{ padding: "32px 0", color: C.mute, fontSize: 16 }}>{leads.length ? "Nothing here." : "No enquiries yet. They arrive from Book a workshop."}</p> : null}
      </div>
    </main>
  );
}

function LeadRow({ lead: l, save }: { lead: Lead; save: (id: string, p: Partial<Lead> & { callAt?: string | null }) => Promise<boolean> }) {
  const u = urgencyOf(l), by = callBy(l), late = (l.status === "new" || l.status === "toSchedule") && by.getTime() < Date.now();
  const [slot, setSlot] = useState(localInput(l.callAt ? new Date(l.callAt) : suggestedSlot()));
  const [mins, setMins] = useState(l.callMinutes || 30);
  const [note, setNote] = useState(l.decisionNote || "");
  const [open, setOpen] = useState(false);
  const start = new Date(slot);
  const facts = [l.length, l.people && l.people + " people", l.when, l.budget].filter(Boolean).join(" · ");

  function ics() {
    const url = URL.createObjectURL(new Blob([icsFile(l, start, mins)], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url; a.download = `discovery-call-${l.name.replace(/\W+/g, "-").toLowerCase()}.ics`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function book() {
    window.open(googleCalendarUrl(l, start, mins), "_blank", "noopener");
    await save(l._id, { status: "booked", callAt: start.toISOString(), callMinutes: mins });
  }

  return (
    <article style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "14px 32px", padding: "22px 0", borderBottom: `1px solid ${C.line}` }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 12px" }}>
          <span style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 500, fontSize: 24, letterSpacing: "-.015em" }}>{l.name}</span>
          <span style={{ fontSize: 13, color: C.mute }}>{STATUS_L[l.status]}</span>
        </div>
        <div style={{ marginTop: 2, fontSize: 15, color: C.soft }}>{[l.role, l.org].filter(Boolean).join(", ") || "No organisation given"}</div>
        <a href={emailUrl(l)} style={{ display: "inline-block", marginTop: 4, fontSize: 14, color: C.ink }}>{l.email}</a>
        <div style={{ marginTop: 6, fontSize: 13, color: C.mute }}>Received {ago(l.received)}{l.source ? ` · from ${l.source}` : ""}</div>
      </div>

      <div style={{ minWidth: 0, fontSize: 15, lineHeight: 1.45 }}>
        {l.topics ? <div><span style={{ color: C.mute }}>About </span>{l.topics}</div> : null}
        {l.help ? <div><span style={{ color: C.mute }}>Needs </span>{l.help}</div> : null}
        {facts ? <div style={{ color: C.soft }}>{facts}</div> : null}
        {l.notes ? (
          <div style={{ marginTop: 6 }}>
            <button onClick={() => setOpen(o => !o)} aria-expanded={open} style={{ background: "none", border: 0, padding: 0, color: C.mute, cursor: "pointer", fontSize: 14 }}>{open ? "Hide their note" : "Their note"}</button>
            {open ? <p style={{ margin: "4px 0 0", color: C.ink, whiteSpace: "pre-wrap" }}>{l.notes}</p> : null}
          </div>
        ) : null}
        <textarea aria-label="Private note" placeholder="Private note" value={note} onChange={e => setNote(e.target.value)} onBlur={() => note !== (l.decisionNote || "") && save(l._id, { decisionNote: note })} rows={1}
          style={{ ...input, display: "block", width: "100%", marginTop: 10, padding: "8px 10px", minHeight: 36, resize: "vertical", lineHeight: 1.4 }} />
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: C.mute }}>
            Urgency
            <select value={u} onChange={e => save(l._id, { urgency: e.target.value as Urgency })} style={{ ...input, minHeight: 34, color: URG[u][1], fontWeight: 500 }}>
              {(["high", "medium", "low"] as Urgency[]).map(k => <option key={k} value={k}>{URG[k][0]}{!l.urgency && k === suggestedUrgency(l) ? " (suggested)" : ""}</option>)}
            </select>
          </label>
          {l.status === "new" || l.status === "toSchedule" ? <span style={{ fontSize: 13, color: late ? C.accent : C.mute }}>Call by {day(by)}{late ? " · overdue" : ""}</span> : null}
        </div>

        {l.status === "new" ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <button onClick={() => save(l._id, { status: "toSchedule" })} style={btn(true)}>Schedule a call</button>
            <button onClick={() => save(l._id, { status: "notNow" })} style={btn()}>Not now</button>
            <button onClick={() => save(l._id, { status: "declined" })} style={btn()}>Decline</button>
          </div>
        ) : null}

        {l.status === "toSchedule" ? (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <input type="datetime-local" aria-label="Call time" value={slot} onChange={e => setSlot(e.target.value)} style={input} />
              <select aria-label="Length" value={mins} onChange={e => setMins(+e.target.value)} style={input}>{[20, 30, 45, 60].map(m => <option key={m} value={m}>{m} min</option>)}</select>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              <button onClick={book} disabled={Number.isNaN(start.getTime())} style={btn(true)}>Book in Google Calendar ↗</button>
              <button onClick={ics} style={btn()}>.ics</button>
              <a href={emailUrl(l, start)} style={btn()}>Email</a>
              <button onClick={() => save(l._id, { status: "notNow" })} style={btn()}>Not now</button>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: C.mute }}>Opens a calendar event with {l.email} as a guest. Save it there to send the invite.</p>
          </div>
        ) : null}

        {l.status === "booked" && l.callAt ? (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 15 }}>Call {dayTime(new Date(l.callAt))} · {l.callMinutes || 30} min</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              <button onClick={() => save(l._id, { status: "done" })} style={btn(true)}>Mark done</button>
              <button onClick={() => save(l._id, { status: "toSchedule" })} style={btn()}>Reschedule</button>
              <a href={googleCalendarUrl(l, new Date(l.callAt), l.callMinutes || 30)} target="_blank" rel="noopener" style={btn()}>Calendar ↗</a>
              <a href={emailUrl(l, new Date(l.callAt))} style={btn()}>Email</a>
            </div>
          </div>
        ) : null}

        {["done", "notNow", "declined"].includes(l.status) ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <button onClick={() => save(l._id, { status: "new" })} style={btn()}>Reopen</button>
            {l.status === "notNow" ? <button onClick={() => save(l._id, { status: "toSchedule" })} style={btn()}>Schedule now</button> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
