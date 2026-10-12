import type { Metadata } from "next";
import { Suspense } from "react";
import { CollectionBrowser } from "@/components/collection/CollectionBrowser";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/i18n";
import { products } from "@/content/products";
import { resolveLocale, type LocaleParams } from "@/lib/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "collection", title: dict.collection.title, description: dict.collection.intro });
}

export default async function CollectionPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  // The static HTML renders the unfiltered grid; filters hydrate on the client.
  const fallback = (
    <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 border-t border-line pt-8 md:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} locale={locale} dict={dict} priority={i < 4} />
      ))}
    </div>
  );
  return (
    <div className="container-k pt-10 pb-24 lg:pt-16 lg:pb-32">
      <SectionHeading as="h1" size="xl" title={dict.collection.title} intro={dict.collection.intro} />
      <div className="mt-12">
        <h2 className="sr-only">{dict.collection.count.replace("{n}", String(products.length))}</h2>
        <Suspense fallback={fallback}>
          <CollectionBrowser products={products} locale={locale} dict={dict} />
        </Suspense>
      </div>
      <p className="mt-16 text-sm text-ink-3">{dict.collection.note}</p>
    </div>
  );
}
