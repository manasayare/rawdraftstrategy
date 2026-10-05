import type { Metadata } from "next";
import Present from "@/builder/Present";

export const metadata: Metadata = { title: "Raw Draft · Participant view", robots: { index: false, follow: false } };

export default function PresentPage() {
  return <Present />;
}
