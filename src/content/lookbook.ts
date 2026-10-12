import type { L10n } from "@/lib/i18n";

export type LookbookImage = { src: string; alt: L10n; caption: L10n; product?: string; wide?: boolean };

// Captions describe the scene; TODO(owner): add real locations if wanted.
export const lookbook: LookbookImage[] = [
  { src: "/images/lookbook/teal-door-1.jpg", alt: { vi: "Quay lưng trước cánh cửa sắt xanh, chậu sứ hai bên", en: "Back view at a teal iron door with ceramic pots" }, caption: { vi: "Cửa sắt xanh, phố cũ", en: "Teal door, old quarter" }, product: "wide-straight-indigo" },
  { src: "/images/lookbook/leather-jacket-tall.jpg", alt: { vi: "Áo khoác da, quần đen ống rộng", en: "Leather jacket, wide black trousers" }, caption: { vi: "Black Prince", en: "Black Prince" }, product: "wide-straight-black-prince" },
  { src: "/images/lookbook/alley-motorbike.jpg", alt: { vi: "Ngồi trên xe máy trong ngõ khu tập thể", en: "Sitting on a motorbike in a housing-block alley" }, caption: { vi: "Ngõ khu tập thể", en: "Housing-block alley" } },
  { src: "/images/lookbook/white-wall-black-tee.jpg", alt: { vi: "Áo phông đen, tường trắng loang", en: "Black tee, weathered white wall" }, caption: { vi: "Tường vôi", en: "Lime-washed wall" }, product: "wide-straight-charcoal" },
  { src: "/images/lookbook/graffiti-cafe-2.jpg", alt: { vi: "Tường graffiti và ghế nhựa quán cà phê", en: "Graffiti wall and plastic café stools" }, caption: { vi: "Cà phê vỉa hè", en: "Street café" }, product: "wide-straight-distressed" },
  { src: "/images/lookbook/courtyard-white-tee.jpg", alt: { vi: "Sân nhà cũ, nắng chiều", en: "Old courtyard in afternoon sun" }, caption: { vi: "Sân nhà cũ", en: "Old courtyard" }, product: "barrel-charcoal" },
  { src: "/images/lookbook/logo-wall-shirt-tie.jpg", alt: { vi: "Sơ mi, cà vạt cam trước tường logo", en: "Shirt and orange tie at the logo wall" }, caption: { vi: "Sơ mi và denim", en: "Shirt and denim" } },
  { src: "/images/lookbook/quarter-zip-stairs.jpg", alt: { vi: "Áo len xám bước xuống cầu thang đá", en: "Grey knit on stone steps" }, caption: { vi: "Cầu thang đá", en: "Stone steps" }, product: "wide-straight-light-wash" },
  { src: "/images/lookbook/teal-door-white-tee.jpg", alt: { vi: "Áo phông trắng, túi đeo chéo, cửa xanh", en: "White tee and crossbody bag at the teal door" }, caption: { vi: "Cửa sắt xanh", en: "Teal door" } },
  { src: "/images/lookbook/travertine-reading.jpg", alt: { vi: "Đọc sách trong không gian đá", en: "Reading in a stone interior" }, caption: { vi: "Một buổi chiều đọc sách", en: "An afternoon with a book" }, product: "tapered-charcoal" },
  { src: "/images/lookbook/quarter-zip-indigo.jpg", alt: { vi: "Áo len cổ khóa, quần chàm, số nhà 38/67", en: "Quarter-zip knit and indigo jeans by house number 38/67" }, caption: { vi: "Số nhà 38/67", en: "No. 38/67" }, product: "wide-straight-indigo" },
  { src: "/images/lookbook/park-evening.jpg", alt: { vi: "Đứng giữa bãi cỏ lúc hoàng hôn", en: "Standing on a lawn at dusk" }, caption: { vi: "Ngoại ô, chiều muộn", en: "Outskirts, late afternoon" } },
  { src: "/images/lookbook/light-wash-concrete.jpg", alt: { vi: "Quần wash nhạt trước tường bê tông", en: "Light-wash jeans against concrete" }, caption: { vi: "Tường bê tông", en: "Concrete wall" }, product: "wide-straight-light-wash" },
  { src: "/images/lookbook/garden-gate-distressed.jpg", alt: { vi: "Bước qua cổng gỗ, tai nghe có dây", en: "Through a wooden gate with wired earphones" }, caption: { vi: "Cổng gỗ", en: "Wooden gate" } },
  { src: "/images/lookbook/charcoal-seated.jpg", alt: { vi: "Ngồi trên bậc gỗ cạnh tách cà phê", en: "Seated on a wooden step beside a coffee" }, caption: { vi: "Cà phê sáng", en: "Morning coffee" }, product: "wide-straight-charcoal" },
  { src: "/images/lookbook/leather-jacket.jpg", alt: { vi: "Áo khoác da, bắt chéo chân", en: "Leather jacket, legs crossed" }, caption: { vi: "Áo khoác da", en: "Leather jacket" } },
];
