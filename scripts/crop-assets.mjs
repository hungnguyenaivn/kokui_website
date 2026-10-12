// One-off: crops the Instagram screenshots in assets/ into placeholder photos
// under public/images/. Replace any output file with an original photo of the
// same name (any size, ideally 4:5 portrait) and the site picks it up.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "public/images";
const Q = 84;

// Feed grids: 4 columns x 2 rows. Coordinates measured from the gutters.
const grids = {
  "assets/image.png": { xs: [9, 568, 1128, 1687], ys: [3, 748], w: 557, h: 742 },
  "assets/image copy 2.png": { xs: [7, 567, 1126, 1685], ys: [0, 745], w: 557, h: 741 },
  "assets/image copy 3.png": { xs: [3, 563, 1122, 1681], ys: [0, 746], w: 557, h: 743 },
};

// [file, col, row, output path]
const tiles = [
  ["assets/image.png", 0, 0, "lookbook/travertine-reading.jpg"],
  ["assets/image.png", 1, 0, "lookbook/white-wall-black-tee.jpg"],
  ["assets/image.png", 2, 0, "lookbook/courtyard-white-tee.jpg"],
  ["assets/image.png", 3, 0, "products/charcoal-waist-detail.jpg"],
  ["assets/image.png", 0, 1, "lookbook/teal-door-1.jpg"],
  ["assets/image.png", 1, 1, "lookbook/teal-door-2.jpg"],
  ["assets/image.png", 2, 1, "lookbook/teal-door-white-tee.jpg"],
  ["assets/image.png", 3, 1, "lookbook/park-evening.jpg"],
  ["assets/image copy 2.png", 0, 0, "products/wide-straight-flat.jpg"],
  ["assets/image copy 2.png", 1, 0, "products/barrel-flat.jpg"],
  ["assets/image copy 2.png", 2, 0, "products/tapered-flat.jpg"],
  ["assets/image copy 2.png", 3, 0, "lookbook/concrete-wall-charcoal.jpg"],
  ["assets/image copy 2.png", 0, 1, "lookbook/leather-jacket.jpg"],
  ["assets/image copy 2.png", 1, 1, "lookbook/logo-wall-shirt-tie.jpg"],
  ["assets/image copy 2.png", 2, 1, "lookbook/light-wash-concrete.jpg"],
  ["assets/image copy 2.png", 3, 1, "lookbook/quarter-zip-stairs.jpg"],
  ["assets/image copy 3.png", 0, 0, "story/raw-indigo-folded.jpg"],
  ["assets/image copy 3.png", 1, 0, "lookbook/garden-gate-distressed.jpg"],
  ["assets/image copy 3.png", 2, 0, "lookbook/alley-motorbike.jpg"],
  ["assets/image copy 3.png", 3, 0, "lookbook/quarter-zip-indigo.jpg"],
  ["assets/image copy 3.png", 0, 1, "lookbook/graffiti-cafe-1.jpg"],
  ["assets/image copy 3.png", 1, 1, "lookbook/graffiti-cafe-2.jpg"],
  ["assets/image copy 3.png", 2, 1, "story/coming-soon-poster.jpg"],
];

// Instagram draws carousel/pin icons in the top ~55px of each tile, so tiles
// are trimmed from the top, which also brings them close to 4:5.
const TOP_TRIM = 52;
const INSET = 2;

// Story screenshots: trim the progress bar / header UI at the top.
const stories = [
  ["assets/image copy 4.png", 150, "story/swatch-books-table.jpg"],
  ["assets/image copy 5.png", 140, "story/swatch-books-kokui.jpg"],
  ["assets/image copy 6.png", 140, "lookbook/charcoal-seated.jpg"],
  ["assets/image copy 7.png", 140, "lookbook/leather-jacket-tall.jpg"],
  ["assets/image copy 8.png", 140, "story/indigo-pile.jpg"],
];

const save = async (pipeline, rel) => {
  const path = `${OUT}/${rel}`;
  mkdirSync(dirname(path), { recursive: true });
  await pipeline.flatten({ background: "#F3EFE6" }).jpeg({ quality: Q, mozjpeg: true }).toFile(path);
  console.log("wrote", path);
};

for (const [file, c, r, rel] of tiles) {
  const g = grids[file];
  const left = g.xs[c] + INSET;
  const top = g.ys[r] + TOP_TRIM;
  const width = g.w - INSET * 2;
  const height = g.h - TOP_TRIM - INSET;
  await save(sharp(file).extract({ left, top, width, height }), rel);
}

for (const [file, top, rel] of stories) {
  const meta = await sharp(file).metadata();
  const left = 8;
  const width = meta.width - 16;
  const height = meta.height - top - 8;
  await save(sharp(file).extract({ left, top, width, height }), rel);
}
