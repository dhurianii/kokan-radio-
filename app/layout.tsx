import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kokan Radio",
  description:
    "Nostalgia music from the Konkan coast — Marathi classics, Ganpati specials, and Kokan vibes.",
  applicationName: "Kokan Radio",
};

export const viewport: Viewport = {
  themeColor: "#1a0e08",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr" className="text-white antialiased">
      <body
        className="min-h-dvh font-sans"
        style={{
          // Warm dark plum — frames the artwork when the letterbox bars show
          // on extreme aspect ratios, instead of a black slab.
          backgroundColor: "#1a0d08",
        }}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
