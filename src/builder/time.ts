// Minutes-of-day helpers. All schedule maths in Builder is in whole minutes.

export const pad = (n: number) => String(n).padStart(2, "0");

/** 570 → "09:30". Wraps past midnight. */
export const clock = (m: number) => pad(Math.floor((((m % 1440) + 1440) % 1440) / 60)) + ":" + pad(((m % 60) + 60) % 60);

/** 45 → "45 min", 200 → "3h 20m", 120 → "2h". */
export const hm = (m: number) => (m < 60 ? m + " min" : Math.floor(m / 60) + "h" + (m % 60 ? " " + pad(m % 60) + "m" : ""));

/** "09:30" → 570. */
export const parseStart = (s: string | undefined) => {
  const [h, m] = (s || "09:30").split(":");
  return (+h || 0) * 60 + (+m || 0);
};

/** "3:07" style countdown from milliseconds, sign dropped. */
export const mmss = (ms: number) => {
  const s = Math.round(Math.abs(ms) / 1000);
  return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
};

export const ago = (t?: number) => {
  if (!t) return "";
  const d = (Date.now() - t) / 864e5;
  return d < 1 / 24 ? "just now" : d < 1 ? Math.round(d * 24) + " hours ago" : d < 2 ? "yesterday" : d < 7 ? Math.round(d) + " days ago" : d < 14 ? "last week" : Math.round(d / 7) + " weeks ago";
};
