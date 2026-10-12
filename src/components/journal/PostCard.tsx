import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { href, type Locale } from "@/lib/i18n";
import { formatDate, type PostMeta } from "@/lib/journal";

export function PostCard({ post, locale }: { post: PostMeta; locale: Locale }) {
  return (
    <Link href={href(locale, `journal/${post.slug}`)} className="group block" data-reveal>
      <Photo src={post.cover} alt="" ratio="3/2" hover sizes="(min-width: 1024px) 33vw, 100vw" />
      <p className="mt-5 text-xs font-medium tracking-[0.14em] text-ochre uppercase">
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
      </p>
      <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-teal">{post.title}</h3>
      <p className="mt-3 text-ink-2">{post.excerpt}</p>
    </Link>
  );
}
