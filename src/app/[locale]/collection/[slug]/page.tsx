import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderPanel } from "@/components/product/OrderPanel";
import { ProductCard } from "@/components/product/ProductCard";
import { SizeChart } from "@/components/product/SizeChart";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLeft } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getDictionary } from "@/content/i18n";
import { getProduct, products, relatedProducts } from "@/content/products";
import { site } from "@/content/site";
import { colorways, fits } from "@/content/taxonomies";
import { href, isLocale } from "@/lib/i18n";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

async function load(params: Params) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!isLocale(locale) || !product) notFound();
  return { locale, product };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, product } = await load(params);
  return pageMetadata({
    locale,
    path: `collection/${product.slug}`,
    title: product.name[locale],
    description: product.description[locale],
    image: product.images[0].src,
  });
}

export default async function ProductPage({ params }: { params: Params }) {
  const { locale, product } = await load(params);
  const dict = getDictionary(locale);
  const t = dict.product;
  const fit = fits[product.fit];
  const color = colorways[product.colorway];
  const related = relatedProducts(product, 4);

  return (
    <article className="container-k pt-6 pb-24 lg:pt-10">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name[locale],
            description: product.description[locale],
            image: product.images.map((i) => absoluteUrl(i.src)),
            brand: { "@type": "Brand", name: "kokui" },
            color: color.name[locale],
            material: product.fabric[locale],
            url: absoluteUrl(href(locale, `collection/${product.slug}`)),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: dict.nav.home, item: absoluteUrl(href(locale)) },
              { "@type": "ListItem", position: 2, name: dict.nav.collection, item: absoluteUrl(href(locale, "collection")) },
              { "@type": "ListItem", position: 3, name: product.name[locale] },
            ],
          },
        ]}
      />
      <Link href={href(locale, "collection")} className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-teal">
        <ArrowLeft /> {t.back}
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Gallery: swipe row on mobile, stacked grid on desktop */}
        <section aria-label={t.gallery} className="min-w-0 lg:col-span-7">
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:px-0">
            {product.images.map((img, i) => (
              <div key={img.src} className={`w-[82vw] shrink-0 snap-center sm:w-[60vw] lg:w-auto ${i === 0 || (i === product.images.length - 1 && product.images.length % 2 === 0) ? "lg:col-span-2" : ""}`}>
                <Photo
                  src={img.src}
                  alt={img.alt[locale]}
                  priority={i === 0}
                  sizes={i === 0 ? "(min-width: 1024px) 55vw, 82vw" : "(min-width: 1024px) 27vw, 82vw"}
                  imgClassName={img.kind === "flat" ? "!object-contain bg-white p-6" : ""}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Details */}
        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <p className="eyebrow">
                {fit.name[locale]} · {color.name[locale]}
              </p>
              <StatusBadge status={product.status} dict={dict} />
            </div>
            <h1 className="mt-4 text-display-lg">{product.name[locale]}</h1>
            <p className="mt-6 text-lg text-ink-2">{product.description[locale]}</p>
            <p className="mt-4 flex items-center gap-3 text-sm text-ink-2">
              <span className="h-4 w-4 rounded-full ring-1 ring-ink/15" style={{ background: color.hex }} aria-hidden="true" />
              {product.fabric[locale]}
            </p>
            <p className="mt-6 text-sm font-medium text-ink">{dict.common.priceNote}</p>

            <div className="mt-8 border-t border-line pt-8">
              <OrderPanel
                productName={product.name[locale]}
                sizes={product.sizes}
                dmUrl={site.instagram.dm}
                disabled={product.status === "sold-out"}
                t={{
                  size: t.size,
                  selectSize: t.selectSize,
                  order: t.order,
                  copyMessage: t.copyMessage,
                  copied: t.copied,
                  message: t.message,
                  messageNoSize: t.messageNoSize,
                  orderHelp: t.orderHelp,
                }}
              />
            </div>

            <div className="mt-10 border-t border-line">
              <Accordion title={t.details} open>
                <ul className="list-disc space-y-1 pl-5">
                  {product.details.map((d) => (
                    <li key={d.en}>{d[locale]}</li>
                  ))}
                </ul>
                <p className="mt-3">{fit.blurb[locale]}</p>
              </Accordion>
              <Accordion title={t.fitAndSize}>
                <SizeChart dict={dict} />
                <Link href={href(locale, "size-guide")} className="link-u mt-4 inline-block text-sm text-ink">
                  {t.sizeGuide}
                </Link>
              </Accordion>
              <Accordion title={t.care}>
                <p>{t.careBody}</p>
              </Accordion>
              <Accordion title={t.shipping}>
                <p>{t.shippingBody}</p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-line pt-16 lg:mt-32">
          <h2 className="text-display-md">{t.related}</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 lg:gap-x-8">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
