import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { getDictionary } from "@/content/i18n";
import { site } from "@/content/site";
import { href } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "story", title: dict.story.title, description: dict.story.intro, image: "/images/story/swatch-books-kokui.jpg" });
}

// TODO(owner): verify brand claims (mills, batch sizes) before launch.
export default async function StoryPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.story;
  const vi = locale === "vi";

  return (
    <>
      {/* Manifesto */}
      <section className="container-k pt-10 pb-20 lg:pt-20 lg:pb-28">
        <p className="eyebrow mb-6">{t.eyebrow}</p>
        <h1 className="max-w-5xl text-display-xl text-indigo">{t.manifesto}</h1>
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <p className="text-xl leading-relaxed text-ink-2 lg:col-span-6 lg:col-start-7">{t.intro}</p>
        </div>
      </section>

      <section className="container-k grid gap-4 md:grid-cols-12">
        <Photo src="/images/lookbook/alley-motorbike.jpg" alt={vi ? "Ngõ khu tập thể ở Hà Nội" : "A housing-block alley in Hanoi"} className="md:col-span-7" ratio="4/5" priority sizes="(min-width: 768px) 58vw, 100vw" />
        <div className="flex flex-col gap-4 md:col-span-5">
          <Photo src="/images/story/raw-indigo-folded.jpg" alt={vi ? "Denim chàm gấp gọn" : "Folded indigo denim"} ratio="4/5" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
      </section>

      {/* Pillars */}
      <section className="container-k py-20 lg:py-32">
        <h2 className="eyebrow mb-12">{t.pillarsTitle}</h2>
        <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
          {t.pillars.map((p, i) => (
            <li key={p.title} className="border-t border-ink/30 pt-6" data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
              <span className="font-display text-sm text-ochre">0{i + 1}</span>
              <h3 className="mt-3 text-display-md">{p.title}</h3>
              <p className="mt-4 text-ink-2">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Fabric */}
      <section className="bg-paper-2/70 py-20 lg:py-32">
        <div className="container-k grid items-center gap-12 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <Photo src="/images/story/swatch-books-kokui.jpg" alt={vi ? "Sổ mẫu vải Nhật Bản, thẻ bài và cúc kim loại" : "Japanese swatch books, hang tags and metal buttons"} ratio="3/4" sizes="(min-width: 1024px) 28vw, 50vw" />
            <Photo src="/images/story/swatch-books-table.jpg" alt={vi ? "Bàn trải đầy sổ mẫu vải" : "A table spread with swatch books"} ratio="3/4" sizes="(min-width: 1024px) 28vw, 50vw" className="mt-12" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9" data-reveal>
            <h2 className="text-display-lg">{t.fabricTitle}</h2>
            <p className="mt-6 text-lg text-ink-2">{t.fabricBody}</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-k py-20 lg:py-32">
        <h2 className="text-display-lg">{t.processTitle}</h2>
        <ol className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {t.process.map((step, i) => (
            <li key={step.title} className="bg-paper p-8 lg:p-10" data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
              <span className="font-display text-5xl text-paper-3">{i + 1}</span>
              <h3 className="mt-6 text-2xl">{step.title}</h3>
              <p className="mt-3 text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why wide */}
      <section className="bg-indigo text-cream">
        <div className="container-k grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6" data-reveal>
            <h2 className="text-display-lg">{t.wideTitle}</h2>
            <p className="mt-6 max-w-lg text-lg text-cream/80">{t.wideBody}</p>
          </div>
          <Photo src="/images/lookbook/teal-door-white-tee.jpg" alt={vi ? "Quần ống rộng nhìn từ phía sau trước cửa sắt xanh" : "Wide trousers from behind at a teal iron door"} className="lg:col-span-5 lg:col-start-8" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </section>

      <section className="container-k py-20 text-center lg:py-28">
        <h2 className="text-display-lg">{t.ctaTitle}</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={href(locale, "collection")}>{dict.common.explore}</ButtonLink>
          <ButtonLink href={site.instagram.dm} external variant="secondary" arrow>{dict.common.orderOnInstagram}</ButtonLink>
        </div>
      </section>
    </>
  );
}
