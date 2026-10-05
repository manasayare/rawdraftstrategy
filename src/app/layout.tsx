import type { Metadata, Viewport } from "next";
import ClientApp from "@/components/ClientApp";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raw Draft",
  description: "Build the workshop you actually need. Builder uses the Raw Draft Library to create a workshop or Sprint you can edit, run and adapt.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b0b0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&display=swap" />
      </head>
      <body>
        <ClientApp />
        {children}
      </body>
    </html>
  );
}
