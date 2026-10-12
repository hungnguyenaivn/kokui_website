import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { InstagramIcon, ThreadsIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/i18n";
import { site } from "@/content/site";
import { href } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "contact", title: dict.contact.title, description: dict.contact.intro });
}

export default async function ContactPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = dict.contact;
  const channels = [
    { label: "Instagram · @kokui.vn", href: site.instagram.dm, Icon: InstagramIcon },
    { label: "Threads · @kokui.vn", href: site.threads, Icon: ThreadsIcon },
    ...(site.email ? [{ label: site.email, href: `mailto:${site.email}`, Icon: null }] : []),
    ...(site.phone ? [{ label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, Icon: null }] : []),
  ];
  return (
    <div className="container-k pt-10 pb-24 lg:pt-16 lg:pb-32">
      <SectionHeading as="h1" size="xl" title={t.title} intro={t.intro} />
      <div className="mt-14 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ContactForm successHref={href(locale, "contact/success")} t={t} />
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="eyebrow mb-5">{t.channels}</h2>
          <ul className="space-y-4">
            {channels.map(({ label, href: url, Icon }) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg hover:text-teal">
                  {Icon && <Icon />} {label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-ink-3">
            {site.store.building}, {site.store.district}, {site.store.city}
          </p>
        </aside>
      </div>
    </div>
  );
}
