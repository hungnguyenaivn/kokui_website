export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export type L10n = { vi: string; en: string };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Pick the string for a locale from a bilingual value. */
export function l(value: L10n, locale: Locale): string {
  return value[locale];
}

/** Build an internal URL with locale prefix and trailing slash. */
export function href(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const [pathname, hash] = clean.split("#");
  const base = pathname ? `/${locale}/${pathname}/` : `/${locale}/`;
  return hash ? `${base}#${hash}` : base;
}

/** Replace {tokens} in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}

export const localeNames: Record<Locale, string> = { vi: "Tiếng Việt", en: "English" };
export const ogLocale: Record<Locale, string> = { vi: "vi_VN", en: "en_US" };
