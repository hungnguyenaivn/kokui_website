"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { CloseIcon, InstagramIcon, MenuIcon } from "@/components/ui/Icons";
import type { Dictionary } from "@/content/i18n";
import { site } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the route changes (render-time state sync).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock page scroll while the menu is open; Escape closes it.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { path: "collection", label: dict.nav.collection },
    { path: "story", label: dict.nav.story },
    { path: "lookbook", label: dict.nav.lookbook },
    { path: "journal", label: dict.nav.journal },
    { path: "visit", label: dict.nav.visit },
  ];
  const isActive = (path: string) => pathname?.startsWith(href(locale, path));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-indigo focus:px-4 focus:py-2 focus:text-cream">
        {dict.nav.skip}
      </a>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-500 ${
          scrolled || open ? "bg-paper/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur-sm" : "bg-paper/0"
        }`}
      >
        <div className="container-k flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link href={href(locale)} className="flex items-end gap-2 text-indigo" aria-label="kokui, home">
            <LogoMark className="mb-1.5 w-8" strokeWidth={5} />
            <span className="font-display text-2xl leading-none font-semibold tracking-[-0.02em]" style={{ fontVariationSettings: '"SOFT" 100' }}>
              kokui
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={href(locale, link.path)}
                    aria-current={isActive(link.path) ? "page" : undefined}
                    className={`relative py-2 transition-colors hover:text-teal ${isActive(link.path) ? "text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-ink" : "text-ink-2"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <LocaleSwitcher locale={locale} label={dict.nav.language} />
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram @kokui.vn" className="hidden p-1 text-ink-2 transition-colors hover:text-teal sm:block">
              <InstagramIcon />
            </a>
            <button
              type="button"
              className="-mr-2 p-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.nav.close : dict.nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="container-k flex min-h-full flex-col justify-between py-10">
          <ul className="space-y-1">
            {[...links, { path: "contact", label: dict.nav.contact }, { path: "size-guide", label: dict.nav.sizeGuide }].map((link) => (
              <li key={link.path}>
                <Link href={href(locale, link.path)} className="block py-2 font-display text-4xl text-ink hover:text-teal">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.instagram.dm} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3 bg-indigo px-6 py-4 text-sm font-medium text-cream">
            <InstagramIcon /> {dict.common.orderOnInstagram}
          </a>
        </nav>
      </div>
    </>
  );
}
