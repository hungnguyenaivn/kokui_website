import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FacebookIcon, InstagramIcon, ThreadsIcon } from "@/components/ui/Icons";
import type { Dictionary } from "@/content/i18n";
import { site } from "@/content/site";
import { fits } from "@/content/taxonomies";
import { href, type Locale } from "@/lib/i18n";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const columns = [
    {
      title: dict.footer.shop,
      links: [
        { href: href(locale, "collection"), label: dict.nav.collection },
        ...Object.entries(fits).map(([key, fit]) => ({ href: `${href(locale, "collection")}?fit=${key}`, label: fit.name[locale] })),
      ],
    },
    {
      title: dict.footer.brand,
      links: [
        { href: href(locale, "story"), label: dict.nav.story },
        { href: href(locale, "lookbook"), label: dict.nav.lookbook },
        { href: href(locale, "journal"), label: dict.nav.journal },
        { href: href(locale, "visit"), label: dict.nav.visit },
      ],
    },
    {
      title: dict.footer.help,
      links: [
        { href: href(locale, "size-guide"), label: dict.nav.sizeGuide },
        { href: href(locale, "contact"), label: dict.nav.contact },
      ],
    },
  ];
  const socials = [
    { href: site.instagram.url, label: "Instagram", Icon: InstagramIcon },
    { href: site.threads, label: "Threads", Icon: ThreadsIcon },
    ...(site.facebook ? [{ href: site.facebook, label: "Facebook", Icon: FacebookIcon }] : []),
  ];

  return (
    <footer className="bg-navy text-cream">
      <div className="container-k grid gap-14 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <Logo size="lg" className="text-cream" />
          <p className="mt-6 max-w-xs font-display text-xl text-cream/85">{dict.footer.tagline}</p>
          <div className="mt-8 flex gap-4">
            {socials.map(({ href: url, label, Icon }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-cream/70 transition-colors hover:text-cream">
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-5 text-xs font-medium tracking-[0.16em] text-cream/55 uppercase">{col.title}</p>
              <ul className="space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-cream/85 transition-colors hover:text-cream">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-k flex flex-col gap-2 py-6 text-xs text-cream/55 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} kokui. {dict.footer.rights}</p>
          <p>{dict.footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
