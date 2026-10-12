import type { Metadata } from "next";
import { PostCard } from "@/components/journal/PostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/i18n";
import { getPosts } from "@/lib/journal";
import { resolveLocale, type LocaleParams } from "@/lib/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "journal", title: dict.journal.title, description: dict.journal.intro });
}

export default async function JournalPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const posts = getPosts(locale);
  return (
    <div className="container-k pt-10 pb-24 lg:pt-16 lg:pb-32">
      <SectionHeading as="h1" size="xl" title={dict.journal.title} intro={dict.journal.intro} />
      {posts.length === 0 ? (
        <p className="py-24 text-ink-2">{dict.journal.empty}</p>
      ) : (
        <div className="mt-14 grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
