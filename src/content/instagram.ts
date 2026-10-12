// Curated grid for the home page. TODO(owner): replace `href` with each
// post's permalink (https://www.instagram.com/p/...).
import { site } from "./site";

export const instagramGrid = [
  "/images/lookbook/teal-door-2.jpg",
  "/images/products/wide-straight-flat.jpg",
  "/images/lookbook/alley-motorbike.jpg",
  "/images/story/swatch-books-kokui.jpg",
  "/images/lookbook/graffiti-cafe-1.jpg",
  "/images/lookbook/logo-wall-shirt-tie.jpg",
  "/images/story/raw-indigo-folded.jpg",
  "/images/lookbook/quarter-zip-indigo.jpg",
].map((src) => ({ src, href: site.instagram.url }));
