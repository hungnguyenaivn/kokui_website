import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SizeChart } from "@/components/product/SizeChart";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/i18n";
import { site } from "@/content/site";
import { fits } from "@/content/taxonomies";
import { href } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/params";
import { pageMetadata } from "@/lib/seo";

function MeasureDiagram() {
  // Simple trouser outline with the three measurement lines.
  return (
    <svg viewBox="0 0 200 260" className="h-auto w-full max-w-[260px] text-ink" aria-hidden="true">
      <path d="M50 20 H150 L162 240 H112 L100 95 L88 240 H38 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <g stroke="#2E7C72" strokeWidth="1.5" strokeDasharray="4 3">
        <line x1="50" y1="20" x2="150" y2="20" />
        <line x1="44" y1="70" x2="156" y2="70" />
        <line x1="100" y1="100" x2="100" y2="238" />
      </g>
      <g fill="#2E7C72" fontSize="10" fontFamily="system-ui">
        <text x="100" y="14" textAnchor="middle">1</text>
        <text x="166" y="73">2</text>
        <text x="106" y="175">3</text>
      </g>
    </svg>
  );
}

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "size-guide", title: dict.sizeGuide.title, description: dict.sizeGuide.intro });
}

export default async function SizeGuidePage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.sizeGuide;
  return (
    <div className="container-k pt-10 pb-24 lg:pt-16 lg:pb-32">
      <SectionHeading as="h1" size="xl" title={t.title} intro={t.intro} />

      <section className="mt-16 grid items-center gap-12 border-t border-line pt-12 md:grid-cols-12">
        <div className="flex justify-center md:col-span-4">
          <MeasureDiagram />
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <h2 className="text-display-md">{t.howTitle}</h2>
          <ol className="mt-8 space-y-6">
            {t.how.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-teal text-sm text-teal">{i + 1}</span>
                <div>
                  <h3 className="font-sans text-base font-medium">{step.title}</h3>
                  <p className="mt-1 text-ink-2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-display-md">{t.chartTitle}</h2>
        <div className="mt-8">
          <SizeChart dict={dict} />
        </div>
        <ButtonLink href={site.instagram.dm} external variant="secondary" className="mt-8">
          {dict.common.dmUs}
        </ButtonLink>
      </section>

      <section className="mt-24">
        <h2 className="text-display-md">{t.fitsTitle}</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {Object.entries(fits).map(([key, fit]) => (
            <Link key={key} href={`${href(locale, "collection")}?fit=${key}`} className="group block">
              <div className="relative aspect-[4/5] bg-white">
                <Image src={fit.image} alt={fit.name[locale]} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain p-6" />
              </div>
              <h3 className="mt-4 text-2xl group-hover:text-teal">{fit.name[locale]}</h3>
              <p className="mt-2 text-ink-2">{fit.blurb[locale]}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
