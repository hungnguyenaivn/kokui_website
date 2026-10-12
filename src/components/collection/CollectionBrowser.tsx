"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import type { Dictionary } from "@/content/i18n";
import type { Product } from "@/content/products";
import { colorways, fits } from "@/content/taxonomies";
import { fill, type Locale } from "@/lib/i18n";

type Props = { products: Product[]; locale: Locale; dict: Dictionary };

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
        active ? "border-indigo bg-indigo text-cream" : "border-line text-ink-2 hover:border-ink/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

/** Product grid with fit / colour filters stored in the URL (?fit=&color=). */
export function CollectionBrowser({ products, locale, dict }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const fit = params.get("fit");
  const color = params.get("color");

  const setFilter = (key: "fit" | "color", value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const visible = products.filter((p) => (!fit || p.fit === fit) && (!color || p.colorway === color));
  const t = dict.collection;

  return (
    <>
      <div className="flex flex-col gap-5 border-y border-line py-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-3 w-24">{t.fit}</span>
          <Chip active={!fit} onClick={() => setFilter("fit", null)}>{t.all}</Chip>
          {Object.entries(fits).map(([key, f]) => (
            <Chip key={key} active={fit === key} onClick={() => setFilter("fit", fit === key ? null : key)}>
              {f.name[locale]}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-3 w-24">{t.color}</span>
          <Chip active={!color} onClick={() => setFilter("color", null)}>{t.all}</Chip>
          {Object.entries(colorways).map(([key, c]) => (
            <Chip key={key} active={color === key} onClick={() => setFilter("color", color === key ? null : key)}>
              <span className="h-3 w-3 rounded-full ring-1 ring-ink/15" style={{ background: c.hex }} aria-hidden="true" />
              {c.name[locale]}
            </Chip>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-ink-3" aria-live="polite">
        {fill(t.count, { n: visible.length })}
      </p>
      {visible.length === 0 ? (
        <p className="py-24 text-center text-ink-2">{t.empty}</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          {visible.map((p, i) => (
            <ProductCard key={p.slug} product={p} locale={locale} dict={dict} priority={i < 4} />
          ))}
        </div>
      )}
    </>
  );
}
