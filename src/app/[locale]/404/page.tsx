import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { resolveLocale, type LocaleParams } from "@/lib/params";

// Served by Netlify for unknown paths (see netlify.toml 404 rules).
export const metadata: Metadata = { title: "404 · kokui", robots: { index: false } };

export default async function LocalizedNotFound({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  return <NotFoundContent locale={locale} />;
}
