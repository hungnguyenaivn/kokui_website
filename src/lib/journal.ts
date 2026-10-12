import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import type { Locale } from "./i18n";

const DIR = path.join(process.cwd(), "src/content/journal");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  minutes: number;
};

export type Post = PostMeta & { html: string };

function readRaw(slug: string, locale: Locale) {
  const file = path.join(DIR, `${slug}.${locale}.md`);
  if (!fs.existsSync(file)) return null;
  return matter(fs.readFileSync(file, "utf8"));
}

function slugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return [...new Set(fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).map((f) => f.split(".")[0]))];
}

function toMeta(slug: string, data: Record<string, unknown>, body: string): PostMeta {
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(data.title),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    excerpt: String(data.excerpt ?? ""),
    cover: String(data.cover ?? ""),
    minutes: Math.max(1, Math.round(words / 220)),
  };
}

/** Published posts (draft: true is excluded), newest first. */
export function getPosts(locale: Locale): PostMeta[] {
  return slugs()
    .map((slug) => {
      const raw = readRaw(slug, locale);
      if (!raw || raw.data.draft === true) return null;
      return toMeta(slug, raw.data, raw.content);
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string, locale: Locale): Promise<Post | null> {
  const raw = readRaw(slug, locale);
  if (!raw || raw.data.draft === true) return null;
  const processed = await remark().use(remarkGfm).use(html).process(raw.content);
  return { ...toMeta(slug, raw.data, raw.content), html: String(processed) };
}

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
