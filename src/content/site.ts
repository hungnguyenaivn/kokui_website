// Site-wide facts. Fields marked TODO need the owner's real details.
export const site = {
  name: "kokui",
  legalName: "kokui", // TODO: registered business name, if any
  url: process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000",
  instagram: {
    handle: "kokui.vn",
    url: "https://www.instagram.com/kokui.vn/",
    dm: "https://ig.me/m/kokui.vn",
  },
  threads: "https://www.threads.net/@kokui.vn",
  facebook: null as string | null, // TODO: Facebook page URL (page name "KoKui")
  email: null as string | null, // TODO: contact email
  phone: null as string | null, // TODO: phone / Zalo number
  store: {
    name: "kokui · Fitting room",
    building: "FLC Hausman", // TODO: tower and unit number
    street: "Lê Quang Đạo", // TODO: confirm street address
    district: "Nam Từ Liêm",
    city: "Hà Nội",
    country: "VN",
    mapQuery: "FLC Hausman, Lê Quang Đạo, Nam Từ Liêm, Hà Nội",
    // TODO: real opening hours. null = by appointment only.
    hours: null as null | { days: { vi: string; en: string }; time: string }[],
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || null,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || null,
  },
};

export const sameAs = [site.instagram.url, site.threads, site.facebook].filter(Boolean) as string[];
