import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/journal/PostCard";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, InstagramIcon, PinIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/i18n";
import { instagramGrid } from "@/content/instagram";
import { lookbook } from "@/content/lookbook";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { colorways, fits } from "@/content/taxonomies";
import { href } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/params";
import { getPosts } from "@/lib/journal";

export default async function HomePage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.home;
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const posts = getPosts(locale).slice(0, 3);
  const lookRow = lookbook.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="container-k pt-6 pb-20 lg:pt-10 lg:pb-32">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-6 lg:pb-16">
            <p className="eyebrow mb-6">{t.heroEyebrow}</p>
            <h1 className="text-display-xl text-indigo">{t.heroTitle}</h1>
            <p className="mt-6 max-w-md text-lg text-ink-2">{t.heroSub}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={href(locale, "collection")}>{dict.common.explore}</ButtonLink>
              <ButtonLink href={site.instagram.dm} external variant="secondary" arrow>
                {dict.common.orderOnInstagram}
              </ButtonLink>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 lg:col-span-6">
            <Photo
              src="/images/lookbook/white-wall-black-tee.jpg"
              alt={locale === "vi" ? "Người mẫu mặc quần kokui ống rộng, áo phông đen, đứng trước tường trắng" : "Model in wide kokui trousers and a black tee against a white wall"}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="ml-auto lg:w-[86%]"
            />
            <div className="absolute -bottom-10 left-0 hidden w-[38%] border-[6px] border-paper lg:block">
              <Photo src="/images/story/raw-indigo-folded.jpg" alt={locale === "vi" ? "Denim chàm gấp gọn" : "Folded indigo denim"} sizes="18vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Three fits */}
      <section className="border-t border-line bg-paper-2/60 py-20 lg:py-32">
        <div className="container-k">
          <SectionHeading eyebrow={t.fitsEyebrow} title={t.fitsTitle} intro={t.fitsIntro} />
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
            {Object.entries(fits).map(([key, fit], i) => (
              <Link key={key} href={`${href(locale, "collection")}?fit=${key}`} className="group block" data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <Image src={fit.image} alt={`${fit.name[locale]}, ${fit.short[locale]}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain p-6 transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.03]" />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl">{fit.name[locale]}</h3>
                  <span className="text-sm text-ink-3">{fit.short[locale]}</span>
                </div>
                <p className="mt-3 text-ink-2">{fit.blurb[locale]}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium group-hover:text-teal">
                  {dict.common.viewAll} <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Colorways + featured */}
      <section className="container-k py-20 lg:py-32">
        <SectionHeading
          eyebrow={t.colorsEyebrow}
          title={t.colorsTitle}
          action={<ButtonLink href={href(locale, "collection")} variant="text" arrow>{dict.common.viewAll}</ButtonLink>}
        />
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4" data-reveal>
          {Object.entries(colorways).map(([key, c]) => (
            <li key={key}>
              <Link href={`${href(locale, "collection")}?color=${key}`} className="group flex items-center gap-3">
                <span className="h-7 w-7 rounded-full ring-1 ring-ink/15 transition-transform group-hover:scale-110" style={{ background: c.hex }} aria-hidden="true" />
                <span className="text-sm">
                  <span className="font-medium group-hover:text-teal">{c.name[locale]}</span>
                  <span className="text-ink-3"> · {c.note[locale]}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:gap-x-8">
          {featured.map((p, i) => (
            <div key={p.slug} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className={i === 2 ? "col-span-2 md:col-span-1" : ""}>
              <ProductCard product={p} locale={locale} dict={dict} />
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink-3">{dict.common.priceNote}</p>
      </section>

      {/* Fabric story */}
      <section className="bg-indigo text-cream">
        <div className="container-k grid items-center gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-5" data-reveal>
            <Photo src="/images/story/swatch-books-kokui.jpg" alt={locale === "vi" ? "Bàn đầy sổ mẫu vải Nhật Bản với logo kokui" : "A table of Japanese fabric swatch books with the kokui logo"} ratio="4/5" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <p className="mb-5 text-xs font-medium tracking-[0.16em] text-cream/65 uppercase">{t.fabricEyebrow}</p>
            <h2 className="text-display-lg">{t.fabricTitle}</h2>
            <p className="mt-6 max-w-lg text-lg text-cream/80">{t.fabricBody}</p>
            <ButtonLink href={href(locale, "story")} variant="light" arrow className="mt-10">
              {t.fabricCta}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Lookbook row */}
      <section className="py-20 lg:py-32">
        <div className="container-k">
          <SectionHeading
            eyebrow={t.lookbookEyebrow}
            title={t.lookbookTitle}
            action={<ButtonLink href={href(locale, "lookbook")} variant="text" arrow>{t.lookbookCta}</ButtonLink>}
          />
        </div>
        <div className="mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:scroll-px-6 sm:px-6 lg:scroll-px-10 lg:px-10 [scrollbar-width:thin]">
          {lookRow.map((img) => (
            <figure key={img.src} className="w-[68vw] shrink-0 snap-start sm:w-[40vw] lg:w-[24vw]">
              <Photo src={img.src} alt={img.alt[locale]} sizes="(min-width: 1024px) 24vw, 68vw" />
              <figcaption className="mt-3 text-sm text-ink-3">{img.caption[locale]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Journal */}
      {posts.length > 0 && (
        <section className="border-t border-line py-20 lg:py-32">
          <div className="container-k">
            <SectionHeading
              eyebrow={t.journalEyebrow}
              title={t.journalTitle}
              action={<ButtonLink href={href(locale, "journal")} variant="text" arrow>{dict.common.viewAll}</ButtonLink>}
            />
            <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instagram */}
      <section className="bg-paper-2/60 py-20 lg:py-28">
        <div className="container-k">
          <SectionHeading
            eyebrow={t.igEyebrow}
            title={t.igTitle}
            action={
              <ButtonLink href={site.instagram.url} external variant="secondary">
                <InstagramIcon className="h-4 w-4" /> {dict.common.followUs}
              </ButtonLink>
            }
          />
          <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {instagramGrid.map((item) => (
              <li key={item.src}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`Instagram @kokui.vn`}>
                  <Photo src={item.src} alt="" ratio="1/1" hover sizes="(min-width: 640px) 25vw, 50vw" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visit strip */}
      <section className="container-k py-20 lg:py-28">
        <div className="grid items-center gap-8 border-y border-line py-12 md:grid-cols-12" data-reveal>
          <div className="md:col-span-7">
            <p className="eyebrow mb-4 flex items-center gap-2">
              <PinIcon className="h-4 w-4" /> {t.visitEyebrow} · {site.store.building}
            </p>
            <h2 className="text-display-lg">{t.visitTitle}</h2>
            <p className="mt-4 max-w-lg text-ink-2">{t.visitBody}</p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <ButtonLink href={href(locale, "visit")} arrow>
              {t.visitCta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
