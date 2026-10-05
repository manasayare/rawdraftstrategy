// Leads dashboard. Password-protected (ADMIN_PASSWORD); reads leads from Sanity on every visit.
import type { Metadata } from "next";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { configured, query, sanity } from "@/sanity/env.mjs";
import type { Lead } from "@/lib/leads";
import AdminLogin from "@/components/admin/AdminLogin";
import LeadsDashboard from "@/components/admin/LeadsDashboard";
import { shell, kicker } from "@/components/admin/styles";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Leads · Raw Draft", robots: { index: false, follow: false } };

const LEADS = `*[_type == "lead"] | order(received desc) {
  _id, received, status, urgency, name, email, org, role, help, topics, length, people, when, budget, notes, source, callAt, callMinutes, decisionNote
}`;

export default async function AdminPage() {
  if (!adminConfigured()) return <Notice title="Set a password first">Add <code>ADMIN_PASSWORD</code> (8+ characters) to the Vercel project's environment variables and redeploy.</Notice>;
  if (!(await isAdmin())) return <AdminLogin />;
  if (!configured() || !sanity.writeToken) return <Notice title="Connect Sanity">Leads are stored in Sanity. Add <code>SANITY_API_WRITE_TOKEN</code> in Vercel and redeploy. See docs/sanity.md.</Notice>;
  let leads: Lead[] = [], error = "";
  try {
    leads = (await query(LEADS, {}, { cache: "no-store" })) || [];
  } catch (e) {
    error = (e as Error).message;
  }
  return <LeadsDashboard initial={leads} error={error} />;
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main style={shell}>
      <div style={kicker}>Raw Draft · Leads</div>
      <h1 style={{ margin: "12px 0 0", fontFamily: "'Clash Display',sans-serif", fontWeight: 500, fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-.035em", lineHeight: 0.95 }}>{title}</h1>
      <p style={{ marginTop: 16, maxWidth: "52ch", fontSize: 18, lineHeight: 1.5, color: "#c9c5ba" }}>{children}</p>
    </main>
  );
}
