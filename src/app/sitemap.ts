import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { href, locales } from "@/lib/i18n";
import { getPosts } from "@/lib/journal";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const STATIC = ["", "collection", "story", "lookbook", "journal", "visit", "contact", "size-guide"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC,
    ...products.map((p) => `collection/${p.slug}`),
    ...getPosts("vi").map((p) => `journal/${p.slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(href(locale, path)),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path.startsWith("collection") ? 0.8 : 0.6,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(href(l, path))])) },
    })),
  );
}
