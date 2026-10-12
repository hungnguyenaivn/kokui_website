import type { L10n } from "@/lib/i18n";

export const fits = {
  "wide-straight": {
    name: { vi: "Wide Straight", en: "Wide Straight" },
    short: { vi: "Ống suông rộng", en: "Wide, straight leg" },
    blurb: {
      vi: "Cạp cao, ống suông rộng rơi thẳng xuống giày. Phom dáng cổ điển, mặc được từ sơ mi cà vạt đến áo phông.",
      en: "High rise with a wide leg that falls straight to the shoe. A classic line that works with a shirt and tie or a plain tee.",
    },
    image: "/images/products/wide-straight-flat.jpg",
  },
  barrel: {
    name: { vi: "Barrel", en: "Barrel" },
    short: { vi: "Ống cong", en: "Curved leg" },
    blurb: {
      vi: "Đường may cong tạo dáng ống tròn ở gối, thu nhẹ ở gấu. Chỉ vàng tương phản theo truyền thống denim.",
      en: "Curved seams give a rounded leg through the knee that narrows at the hem. Contrast gold stitching in the denim tradition.",
    },
    image: "/images/products/barrel-flat.jpg",
  },
  tapered: {
    name: { vi: "Tapered", en: "Tapered" },
    short: { vi: "Ống côn nhẹ", en: "Gently tapered" },
    blurb: {
      vi: "Rộng ở hông và đùi, thon dần về gấu. Gọn gàng hơn khi đi giày loafer hay derby.",
      en: "Roomy through the hip and thigh, tapering to the hem. Neater over loafers and derbies.",
    },
    image: "/images/products/tapered-flat.jpg",
  },
} satisfies Record<string, { name: L10n; short: L10n; blurb: L10n; image: string }>;

export type Fit = keyof typeof fits;

export const colorways = {
  charcoal: { name: { vi: "Charcoal", en: "Charcoal" }, note: { vi: "Xám than", en: "Charcoal grey" }, hex: "#3A3B40" },
  "black-prince": { name: { vi: "Black Prince", en: "Black Prince" }, note: { vi: "Đen sâu", en: "Deep black" }, hex: "#16171B" },
  indigo: { name: { vi: "Indigo", en: "Indigo" }, note: { vi: "Chàm nguyên bản", en: "Raw indigo" }, hex: "#1F2A4D" },
  "light-wash": { name: { vi: "Light Wash", en: "Light Wash" }, note: { vi: "Xanh wash nhạt", en: "Pale vintage wash" }, hex: "#9FB2C4" },
  distressed: { name: { vi: "Distressed", en: "Distressed" }, note: { vi: "Wash rách", en: "Worn and repaired" }, hex: "#7D8794" },
} satisfies Record<string, { name: L10n; note: L10n; hex: string }>;

export type Colorway = keyof typeof colorways;
