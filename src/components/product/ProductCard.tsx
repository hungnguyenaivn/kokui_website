import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Dictionary } from "@/content/i18n";
import type { Product } from "@/content/products";
import { colorways, fits } from "@/content/taxonomies";
import { href, type Locale } from "@/lib/i18n";

const SIZES = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw";

export function ProductCard({ product, locale, dict, priority }: { product: Product; locale: Locale; dict: Dictionary; priority?: boolean }) {
  const [first, second] = product.images;
  const color = colorways[product.colorway];
  return (
    <Link href={href(locale, `collection/${product.slug}`)} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        <Image src={first.src} alt={first.alt[locale]} fill sizes={SIZES} priority={priority} fetchPriority={priority ? "high" : undefined} className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.03]" />
        {second && (
          <Image src={second.src} alt="" aria-hidden="true" fill sizes={SIZES} className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        )}
        <div className="absolute top-3 left-3">
          <StatusBadge status={product.status} dict={dict} />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg leading-snug group-hover:text-teal">{product.name[locale]}</h3>
          <p className="mt-1 text-sm text-ink-3">
            {fits[product.fit].short[locale]} · {color.note[locale]}
          </p>
        </div>
        <span className="mt-1.5 h-4 w-4 shrink-0 rounded-full ring-1 ring-ink/15" style={{ background: color.hex }} aria-hidden="true" />
      </div>
    </Link>
  );
}
