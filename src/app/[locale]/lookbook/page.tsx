import type { Metadata } from "next";
import { LookbookGrid } from "@/components/lookbook/LookbookGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/content/i18n";
import { lookbook } from "@/content/lookbook";
import { resolveLocale, type LocaleParams } from "@/lib/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "lookbook", title: dict.lookbook.title, description: dict.lookbook.intro, image: lookbook[0].src });
}

export default async function LookbookPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <div className="container-k pt-10 pb-24 lg:pt-16 lg:pb-32">
      <SectionHeading as="h1" size="xl" title={dict.lookbook.title} intro={dict.lookbook.intro} />
      <div className="mt-14">
        <LookbookGrid images={lookbook} locale={locale} t={{ ...dict.lookbook, seeProduct: dict.common.seeProduct }} />
      </div>
    </div>
  );
}
