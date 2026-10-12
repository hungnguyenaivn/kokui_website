import type { L10n } from "@/lib/i18n";
import type { Colorway, Fit } from "./taxonomies";

export type ProductImage = { src: string; alt: L10n; kind: "flat" | "model" };

export type Product = {
  slug: string;
  name: L10n;
  fit: Fit;
  colorway: Colorway;
  description: L10n;
  fabric: L10n;
  details: L10n[];
  sizes: string[];
  images: ProductImage[];
  status: "available" | "coming-soon" | "sold-out";
  featured?: boolean;
};

const SIZES = ["28", "29", "30", "31", "32", "33", "34"];

// TODO(owner): confirm product names, fits, colorways, fabric facts and status.
// Images are placeholders cropped from Instagram; swap files in public/images.
export const products: Product[] = [
  {
    slug: "wide-straight-charcoal",
    name: { vi: "Wide Straight Charcoal", en: "Wide Straight Charcoal" },
    fit: "wide-straight",
    colorway: "charcoal",
    description: {
      vi: "Chiếc quần làm nên kokui. Cạp cao, ống suông rộng, vải denim xám than có bề mặt lốm đốm như đá. Đứng phom khi đi, rủ mềm khi ngồi.",
      en: "The pair kokui is built on. High rise, wide straight leg, charcoal denim with a stone-like heathered face. Holds its line when you walk, softens when you sit.",
    },
    fabric: { vi: "Denim xám than, sợi Nhật Bản", en: "Charcoal denim, Japanese yarn" }, // TODO verify
    details: [
      { vi: "Cạp cao, khóa kéo", en: "High rise, zip fly" },
      { vi: "Chỉ vàng tương phản", en: "Contrast gold topstitching" },
      { vi: "Nhãn giấy kraft in logo", en: "Kraft paper logo label" },
    ],
    sizes: SIZES,
    images: [
      { src: "/images/lookbook/white-wall-black-tee.jpg", alt: { vi: "Wide Straight Charcoal mặc cùng áo phông đen trước tường trắng", en: "Wide Straight Charcoal with a black tee against a white wall" }, kind: "model" },
      { src: "/images/products/charcoal-waist-detail.jpg", alt: { vi: "Cận cạp quần và thắt lưng da", en: "Close-up of the waistband with a leather belt" }, kind: "model" },
      { src: "/images/lookbook/charcoal-seated.jpg", alt: { vi: "Ngồi trên bậc gỗ, quần rủ mềm", en: "Seated on a wooden step, the leg drapes softly" }, kind: "model" },
      { src: "/images/lookbook/concrete-wall-charcoal.jpg", alt: { vi: "Đứng trước tường bê tông", en: "Standing against a concrete wall" }, kind: "model" },
    ],
    status: "available",
    featured: true,
  },
  {
    slug: "wide-straight-black-prince",
    name: { vi: "Wide Straight Black Prince", en: "Wide Straight Black Prince" },
    fit: "wide-straight",
    colorway: "black-prince",
    description: {
      vi: "Phiên bản đen sâu với hàng cúc lộ. Đủ trang trọng cho sơ mi cà vạt, đủ thoải mái cho áo khoác da cuối tuần.",
      en: "A deep black version with an exposed button fly. Formal enough for a shirt and tie, easy enough for a leather jacket at the weekend.",
    },
    fabric: { vi: "Denim đen, sợi Nhật Bản", en: "Black denim, Japanese yarn" }, // TODO verify
    details: [
      { vi: "Hàng cúc kim loại lộ", en: "Exposed metal button fly" },
      { vi: "Cạp cao, ống suông rộng", en: "High rise, wide straight leg" },
      { vi: "Nhãn giấy kraft in logo", en: "Kraft paper logo label" },
    ],
    sizes: SIZES,
    images: [
      { src: "/images/products/wide-straight-flat.jpg", alt: { vi: "Ảnh trải phẳng Wide Straight với hàng cúc lộ", en: "Flat lay of the Wide Straight with exposed button fly" }, kind: "flat" },
      { src: "/images/lookbook/leather-jacket-tall.jpg", alt: { vi: "Mặc cùng áo khoác da nâu trước tường xám", en: "Worn with a brown leather jacket against a grey wall" }, kind: "model" },
      { src: "/images/lookbook/leather-jacket.jpg", alt: { vi: "Tư thế bắt chéo chân, áo khoác da", en: "Crossed legs, leather jacket" }, kind: "model" },
      { src: "/images/lookbook/logo-wall-shirt-tie.jpg", alt: { vi: "Sơ mi kẻ, cà vạt cam, ngồi trước tường logo kokui", en: "Striped shirt and orange tie in front of the kokui logo wall" }, kind: "model" },
    ],
    status: "available",
    featured: true,
  },
  {
    slug: "wide-straight-indigo",
    name: { vi: "Wide Straight Indigo", en: "Wide Straight Indigo" },
    fit: "wide-straight",
    colorway: "indigo",
    description: {
      vi: "Denim chàm nguyên bản, chưa wash. Màu sẽ phai theo cách bạn mặc, mỗi chiếc quần dần trở thành của riêng một người.",
      en: "Raw, unwashed indigo denim. It fades to the way you wear it, so every pair slowly becomes one person's own.",
    },
    fabric: { vi: "Denim chàm nguyên bản (raw)", en: "Raw indigo denim" }, // TODO verify weight / mill
    details: [
      { vi: "Chưa wash, phai màu theo thời gian", en: "Unwashed, fades with wear" },
      { vi: "Chỉ vàng tương phản", en: "Contrast gold topstitching" },
      { vi: "Có thể ra màu khi mới mặc", en: "May transfer dye when new" },
    ],
    sizes: SIZES,
    images: [
      { src: "/images/lookbook/teal-door-1.jpg", alt: { vi: "Đứng quay lưng trước cánh cửa sắt xanh", en: "Back view in front of a teal iron door" }, kind: "model" },
      { src: "/images/story/raw-indigo-folded.jpg", alt: { vi: "Quần denim chàm gấp trên mặt gỗ", en: "Folded indigo denim on a wooden surface" }, kind: "flat" },
      { src: "/images/lookbook/quarter-zip-indigo.jpg", alt: { vi: "Mặc cùng áo len cổ khóa kéo", en: "Worn with a quarter-zip knit" }, kind: "model" },
      { src: "/images/lookbook/teal-door-2.jpg", alt: { vi: "Phom quần nhìn từ phía sau", en: "The leg seen from behind" }, kind: "model" },
    ],
    status: "available",
    featured: true,
  },
  {
    slug: "wide-straight-light-wash",
    name: { vi: "Wide Straight Light Wash", en: "Wide Straight Light Wash" },
    fit: "wide-straight",
    colorway: "light-wash",
    description: {
      vi: "Màu xanh nhạt như chiếc quần đã theo bạn nhiều năm. Hợp với áo len xám, giày loafer và những ngày nắng nhẹ.",
      en: "A pale blue that looks like it has been with you for years. Made for grey knits, loafers and mild sunny days.",
    },
    fabric: { vi: "Denim wash nhạt", en: "Light-wash denim" }, // TODO verify
    details: [
      { vi: "Wash thủ công từng chiếc", en: "Each pair washed individually" },
      { vi: "Cạp cao, ống suông rộng", en: "High rise, wide straight leg" },
    ],
    sizes: SIZES,
    images: [
      { src: "/images/lookbook/light-wash-concrete.jpg", alt: { vi: "Light Wash mặc cùng áo phông đen", en: "Light Wash with a black tee" }, kind: "model" },
      { src: "/images/lookbook/quarter-zip-stairs.jpg", alt: { vi: "Bước xuống cầu thang đá, áo len xám", en: "Walking down stone steps in a grey knit" }, kind: "model" },
    ],
    status: "available",
  },
  {
    slug: "barrel-charcoal",
    name: { vi: "Barrel Charcoal", en: "Barrel Charcoal" },
    fit: "barrel",
    colorway: "charcoal",
    description: {
      vi: "Đường may cong ôm lấy chuyển động của đầu gối. Dáng tròn đầy nhưng vẫn gọn ở gấu, đi cùng giày da rất đẹp.",
      en: "Curved seams that follow the knee. A full, rounded leg that still finishes neatly at the hem, made for leather shoes.",
    },
    fabric: { vi: "Denim xám than, sợi Nhật Bản", en: "Charcoal denim, Japanese yarn" }, // TODO verify
    details: [
      { vi: "Đường may cong hai bên", en: "Curved side seams" },
      { vi: "Chỉ vàng tương phản", en: "Contrast gold topstitching" },
    ],
    sizes: SIZES,
    images: [
      { src: "/images/products/barrel-flat.jpg", alt: { vi: "Ảnh trải phẳng dáng Barrel", en: "Flat lay of the Barrel fit" }, kind: "flat" },
      { src: "/images/lookbook/courtyard-white-tee.jpg", alt: { vi: "Đứng trong sân nhà cũ, áo phông trắng", en: "In an old courtyard, white tee" }, kind: "model" },
    ],
    status: "available",
  },
  {
    slug: "tapered-charcoal",
    name: { vi: "Tapered Charcoal", en: "Tapered Charcoal" },
    fit: "tapered",
    colorway: "charcoal",
    description: {
      vi: "Rộng rãi ở hông, thon dần về gấu. Lựa chọn gọn gàng nhất trong ba phom, hợp đi làm lẫn đi chơi.",
      en: "Generous at the hip, tapering to the hem. The neatest of the three fits, at home in the office and out.",
    },
    fabric: { vi: "Denim xám than, sợi Nhật Bản", en: "Charcoal denim, Japanese yarn" }, // TODO verify
    details: [
      { vi: "Thon dần từ gối", en: "Tapers from the knee" },
      { vi: "Chỉ vàng tương phản", en: "Contrast gold topstitching" },
    ],
    sizes: SIZES,
    images: [
      { src: "/images/products/tapered-flat.jpg", alt: { vi: "Ảnh trải phẳng dáng Tapered", en: "Flat lay of the Tapered fit" }, kind: "flat" },
      { src: "/images/lookbook/travertine-reading.jpg", alt: { vi: "Đọc sách trong không gian đá travertine", en: "Reading in a travertine interior" }, kind: "model" },
    ],
    status: "available",
  },
  {
    slug: "wide-straight-distressed",
    name: { vi: "Wide Straight Distressed", en: "Wide Straight Distressed" },
    fit: "wide-straight",
    colorway: "distressed",
    description: {
      vi: "Wash bạc màu với những vết rách được vá lại. Dành cho những ai thích chiếc quần đã có sẵn một câu chuyện.",
      en: "A faded wash with worn and repaired patches. For anyone who likes a pair that already has a story.",
    },
    fabric: { vi: "Denim wash rách", en: "Distressed-wash denim" }, // TODO verify
    details: [
      { vi: "Rách và vá thủ công", en: "Hand-distressed and repaired" },
      { vi: "Cạp cao, ống suông rộng", en: "High rise, wide straight leg" },
    ],
    sizes: SIZES,
    images: [
      { src: "/images/lookbook/graffiti-cafe-2.jpg", alt: { vi: "Đứng trước tường graffiti, quán cà phê vỉa hè", en: "In front of a graffiti wall at a street café" }, kind: "model" },
      { src: "/images/lookbook/graffiti-cafe-1.jpg", alt: { vi: "Cúi người chỉnh ống quần", en: "Leaning down to adjust the hem" }, kind: "model" },
      { src: "/images/lookbook/garden-gate-distressed.jpg", alt: { vi: "Bước ra từ cổng gỗ", en: "Stepping out of a wooden gate" }, kind: "model" },
    ],
    status: "coming-soon",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, count = 4): Product[] {
  const others = products.filter((p) => p.slug !== product.slug);
  const sameFit = others.filter((p) => p.fit === product.fit);
  const rest = others.filter((p) => p.fit !== product.fit);
  return [...sameFit, ...rest].slice(0, count);
}
