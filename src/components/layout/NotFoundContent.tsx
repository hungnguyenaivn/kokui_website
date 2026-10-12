import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/content/i18n";
import { href, type Locale } from "@/lib/i18n";

export function NotFoundContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div className="container-k flex min-h-[65vh] flex-col items-center justify-center py-24 text-center">
      <LogoMark className="w-24 text-indigo" />
      <p className="mt-8 font-display text-7xl text-paper-3">404</p>
      <h1 className="mt-4 text-display-lg">{dict.notFound.title}</h1>
      <p className="mt-4 max-w-md text-lg text-ink-2">{dict.notFound.body}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href={href(locale)}>{dict.notFound.home}</ButtonLink>
        <ButtonLink href={href(locale, "collection")} variant="secondary">{dict.nav.collection}</ButtonLink>
      </div>
    </div>
  );
}
