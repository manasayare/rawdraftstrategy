// Client leads from "Book a workshop": statuses, urgency and discovery-call scheduling.
// Shared by the enquiry API, the admin API and the admin dashboard.

export type LeadStatus = "new" | "toSchedule" | "booked" | "done" | "notNow" | "declined";
export type Urgency = "high" | "medium" | "low";

export type Lead = {
  _id: string;
  received: string;
  status: LeadStatus;
  urgency?: Urgency;
  name: string;
  email: string;
  org?: string;
  role?: string;
  help?: string;
  topics?: string;
  length?: string;
  people?: string;
  when?: string;
  budget?: string;
  notes?: string;
  source?: string;
  callAt?: string;
  callMinutes?: number;
  decisionNote?: string;
};

export const STATUSES: [LeadStatus, string][] = [
  ["new", "New"], ["toSchedule", "To schedule"], ["booked", "Call booked"], ["done", "Call done"], ["notNow", "Not now"], ["declined", "Declined"]
];

// Urgency follows when they need the session, nudged up by an approved budget.
const WHEN_SCORE: Record<string, number> = {
  "Within 2 to 4 weeks": 3, "Within 1 to 2 months": 2, "This quarter": 2, "Later this year": 1, "No date yet": 1
};
const BUDGET_BONUS: Record<string, number> = {
  "$7,500 to $15,000": 0.5, "$15,000 to $30,000": 1, "$30,000 or more": 1, "Not approved yet": -0.5, "No budget yet": -0.5
};
export function suggestedUrgency(l: Pick<Lead, "when" | "budget">): Urgency {
  const s = (WHEN_SCORE[l.when || ""] ?? 1.5) + (BUDGET_BONUS[l.budget || ""] ?? 0);
  return s >= 3 ? "high" : s >= 2 ? "medium" : "low";
}
export const urgencyOf = (l: Lead): Urgency => l.urgency || suggestedUrgency(l);

// When the discovery call should happen by, counted in working days from receipt.
const CALL_WITHIN: Record<Urgency, number> = { high: 2, medium: 5, low: 10 };
export function callBy(l: Lead): Date {
  const d = new Date(l.received);
  let left = CALL_WITHIN[urgencyOf(l)];
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) left--;
  }
  return d;
}

const pad = (n: number) => String(n).padStart(2, "0");
const gcalStamp = (d: Date) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

export function callDetails(l: Lead) {
  const lines = [
    `Discovery call with ${l.name}${l.org ? ` (${l.org})` : ""}.`, "",
    l.topics && `About: ${l.topics}`, l.help && `Needs: ${l.help}`,
    [l.length, l.people && `${l.people} people`, l.when].filter(Boolean).join(" · "),
    l.budget && `Budget: ${l.budget}`, l.notes && `\nTheir note: ${l.notes}`
  ];
  return lines.filter((x): x is string => typeof x === "string" && x !== "").join("\n");
}

// Google Calendar "create event" link with the client as a guest. Saving it in Calendar sends the invite.
export function googleCalendarUrl(l: Lead, start: Date, minutes: number) {
  const end = new Date(start.getTime() + minutes * 60000);
  const q = new URLSearchParams({
    action: "TEMPLATE", text: `Raw Draft discovery call · ${l.org || l.name}`,
    dates: `${gcalStamp(start)}/${gcalStamp(end)}`, details: callDetails(l), add: l.email
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

export function icsFile(l: Lead, start: Date, minutes: number) {
  const end = new Date(start.getTime() + minutes * 60000);
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, m => "\\" + m);
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Raw Draft//Leads//EN", "METHOD:PUBLISH", "BEGIN:VEVENT",
    `UID:${l._id}@rawdraft`, `DTSTAMP:${gcalStamp(new Date())}`, `DTSTART:${gcalStamp(start)}`, `DTEND:${gcalStamp(end)}`,
    `SUMMARY:${esc(`Raw Draft discovery call · ${l.org || l.name}`)}`, `DESCRIPTION:${esc(callDetails(l))}`,
    `ATTENDEE;CN=${esc(l.name)};RSVP=TRUE:mailto:${l.email}`, "END:VEVENT", "END:VCALENDAR", ""
  ].join("\r\n");
}

export function emailUrl(l: Lead, start?: Date) {
  const first = l.name.split(/\s+/)[0];
  const when = start ? start.toLocaleString(undefined, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "";
  const body = start
    ? `Hi ${first},\n\nThanks for getting in touch about ${l.topics ? l.topics.toLowerCase() : "your session"}. Could we have a short discovery call on ${when}? I've sent a calendar invite; if the time doesn't work, reply with a couple that do.\n\nManas`
    : `Hi ${first},\n\nThanks for getting in touch about ${l.topics ? l.topics.toLowerCase() : "your session"}.\n\nManas`;
  return `mailto:${l.email}?subject=${encodeURIComponent("Raw Draft · your workshop enquiry")}&body=${encodeURIComponent(body)}`;
}
