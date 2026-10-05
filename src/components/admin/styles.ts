// Shared inline styles for the admin pages, in the site's palette.
import type { CSSProperties } from "react";

export const C = { bg: "#0b0b0a", ink: "#ece9e0", soft: "#c9c5ba", mute: "#8f8b80", line: "#2a2925", line2: "#34332e", card: "#111110", accent: "#ff4b23" };

export const shell: CSSProperties = { minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: "'Satoshi',sans-serif", padding: "clamp(24px,4vw,56px) clamp(16px,3vw,40px)" };
export const kicker: CSSProperties = { fontSize: 13, letterSpacing: ".06em", color: C.mute, textTransform: "uppercase" };
export const btn = (primary = false): CSSProperties => ({
  whiteSpace: "nowrap", background: primary ? C.accent : "none", color: primary ? C.bg : C.ink, border: primary ? 0 : `1px solid ${C.line2}`,
  minHeight: 40, padding: "0 14px", cursor: "pointer", fontSize: 14, fontWeight: primary ? 500 : 400, fontFamily: "inherit", textDecoration: "none",
  display: "inline-flex", alignItems: "center"
});
export const input: CSSProperties = { background: C.card, border: `1px solid ${C.line2}`, color: C.ink, minHeight: 40, padding: "0 10px", fontFamily: "inherit", fontSize: 14, colorScheme: "dark" };
