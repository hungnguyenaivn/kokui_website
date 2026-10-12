"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

/** VI | EN toggle that keeps the current page. */
export function LocaleSwitcher({ locale, label, className = "" }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${locale}/`;
  const rest = pathname.replace(/^\/(vi|en)(?=\/|$)/, "");
  return (
    <nav aria-label={label} className={`flex items-center gap-1 text-xs font-medium tracking-[0.14em] ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink-3" aria-hidden="true">/</span>}
          <Link
            href={`/${l}${rest || "/"}`}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`px-1 py-1 uppercase transition-colors ${l === locale ? "text-ink" : "text-ink-3 hover:text-teal"}`}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}
