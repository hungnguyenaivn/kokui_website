import type { Metadata } from "next";
import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/content/i18n";
import { href } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/params";

export const metadata: Metadata = { robots: { index: false } };

export default async function ContactSuccessPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).contact;
  return (
    <div className="container-k flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <LogoMark className="w-20 text-indigo" />
      <h1 className="mt-8 text-display-lg">{t.successTitle}</h1>
      <p className="mt-4 max-w-md text-lg text-ink-2">{t.successBody}</p>
      <ButtonLink href={href(locale)} className="mt-10">{t.backHome}</ButtonLink>
    </div>
  );
}
