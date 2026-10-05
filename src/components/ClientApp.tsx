"use client";
import dynamic from "next/dynamic";

// The engine scripts and pages read window at module load, so the app renders in the browser only.
const App = dynamic(() => import("./App"), { ssr: false, loading: () => <div style={{ minHeight: "100vh", background: "#0b0b0a" }} /> });

export default function ClientApp() {
  return <App />;
}
