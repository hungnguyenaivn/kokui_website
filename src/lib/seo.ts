import type { Metadata } from "next";
import { site } from "@/content/site";
import { getDictionary } from "@/content/i18n";
import { href, locales, ogLocale, type Locale } from "./i18n";

type PageMeta = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
};

/** Canonical, hreflang alternates and Open Graph for a localized page. */
export function pageMetadata({ locale, path = "", title, description, image, type = "website" }: PageMeta): Metadata {
  const dict = getDictionary(locale);
  const desc = description ?? dict.meta.description;
  const languages = Object.fromEntries(locales.map((l) => [l, href(l, path)])) as Record<string, string>;
  languages["x-default"] = href("vi", path);
  const ogImage = image ?? `/brand/og-${locale}.png`;
  return {
    title: title ? { absolute: `${title} · kokui` } : { absolute: dict.meta.title },
    description: desc,
    alternates: { canonical: href(locale, path), languages },
    openGraph: {
      type,
      siteName: site.name,
      locale: ogLocale[locale],
      url: href(locale, path),
      title: title ? `${title} · kokui` : dict.meta.title,
      description: desc,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
