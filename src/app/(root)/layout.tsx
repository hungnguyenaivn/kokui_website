import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "kokui",
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/vi/", languages: { vi: "/vi/", en: "/en/", "x-default": "/vi/" } },
  robots: { index: false, follow: true },
};

// Root "/" is normally redirected by Netlify (netlify.toml). This layout only
// serves the fallback page when the site is hosted elsewhere.
export default function RootFallbackLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
