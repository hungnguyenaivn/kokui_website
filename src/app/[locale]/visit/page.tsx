import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon, PinIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/i18n";
import { sameAs, site } from "@/content/site";
import { href } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/params";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "visit", title: dict.visit.title, description: dict.visit.intro });
}

export default async function VisitPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.visit;
  const s = site.store;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&z=16&output=embed`;

  return (
    <div className="container-k pt-10 pb-24 lg:pt-16 lg:pb-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: s.name,
          url: absoluteUrl(href(locale, "visit")),
          image: absoluteUrl("/images/lookbook/travertine-reading.jpg"),
          address: {
            "@type": "PostalAddress",
            streetAddress: `${s.building}, ${s.street}`,
            addressLocality: s.district,
            addressRegion: s.city,
            addressCountry: s.country,
          },
          sameAs,
        }}
      />
      <SectionHeading as="h1" size="xl" title={t.title} intro={t.intro} />

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-5">
          <div>
            <h2 className="eyebrow mb-3">{t.address}</h2>
            <address className="flex gap-3 text-lg not-italic">
              <PinIcon className="mt-1 h-5 w-5 shrink-0 text-teal" />
              <span>
                {s.building}
                <br />
                {s.street}, {s.district}
                <br />
                {s.city}
              </span>
            </address>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-u mt-4 inline-block text-sm">
              {t.directions}
            </a>
          </div>
          <div>
            <h2 className="eyebrow mb-3">{t.hours}</h2>
            {s.hours ? (
              <table className="w-full max-w-sm text-sm">
                <tbody>
                  {s.hours.map((h) => (
                    <tr key={h.days.en} className="border-b border-line">
                      <th scope="row" className="py-2 text-left font-normal text-ink-2">{h.days[locale]}</th>
                      <td className="py-2 text-right tabular-nums">{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-ink-2">{t.byAppointment}</p>
            )}
          </div>
          <div>
            <h2 className="eyebrow mb-4">{t.howTitle}</h2>
            <ol className="space-y-3">
              {t.how.map((step, i) => (
                <li key={step} className="flex gap-4 text-ink-2">
                  <span className="font-display text-ochre">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <ButtonLink href={site.instagram.dm} external>
            <InstagramIcon className="h-4 w-4" /> {t.book}
          </ButtonLink>
        </div>

        <div className="space-y-4 lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
            <iframe
              title={t.mapTitle}
              src={embedUrl}
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.6] sepia-[0.15]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {/* TODO(owner): replace with photos of the fitting room */}
          <div className="grid grid-cols-2 gap-4">
            <Photo src="/images/lookbook/travertine-reading.jpg" alt="" ratio="4/5" sizes="(min-width: 1024px) 28vw, 50vw" />
            <Photo src="/images/story/indigo-pile.jpg" alt="" ratio="4/5" sizes="(min-width: 1024px) 28vw, 50vw" />
          </div>
        </div>
      </div>
    </div>
  );
}
