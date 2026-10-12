import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLeft } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { getDictionary } from "@/content/i18n";
import { fill, href, isLocale, locales } from "@/lib/i18n";
import { formatDate, getPost, getPosts } from "@/lib/journal";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string; slug: string }>;

export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : locales[0];
  return getPosts(locale).map((p) => ({ slug: p.slug }));
}

async function load(params: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = await getPost(slug, locale);
  if (!post) notFound();
  return { locale, post };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, post } = await load(params);
  return pageMetadata({ locale, path: `journal/${post.slug}`, title: post.title, description: post.excerpt, image: post.cover, type: "article" });
}

export default async function PostPage({ params }: { params: Params }) {
  const { locale, post } = await load(params);
  const dict = getDictionary(locale);
  return (
    <article className="pt-10 pb-24 lg:pt-16 lg:pb-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          image: absoluteUrl(post.cover),
          inLanguage: locale,
          author: { "@type": "Organization", name: "kokui" },
          mainEntityOfPage: absoluteUrl(href(locale, `journal/${post.slug}`)),
        }}
      />
      <div className="container-k">
        <Link href={href(locale, "journal")} className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-teal">
          <ArrowLeft /> {dict.journal.back}
        </Link>
        <header className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.14em] text-ochre uppercase">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time> · {fill(dict.journal.minutes, { n: post.minutes })}
          </p>
          <h1 className="mt-5 text-display-lg">{post.title}</h1>
          <p className="mt-5 text-lg text-ink-2">{post.excerpt}</p>
        </header>
        <Photo src={post.cover} alt="" ratio="16/9" priority className="mx-auto mt-12 max-w-5xl" sizes="(min-width: 1024px) 64rem, 100vw" />
        <div className="prose-k mx-auto mt-14" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </article>
  );
}
