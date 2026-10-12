// Renders PNG icons from public/favicon.svg.
import sharp from "sharp";
const svg = "public/favicon.svg";
for (const [name, size] of [["icon-32.png", 32], ["icon-192.png", 192], ["icon-512.png", 512], ["apple-touch-icon.png", 180]]) {
  await sharp(svg, { density: 600 }).resize(size, size).png().toFile(`public/icons/${name}`);
  console.log("wrote", name);
}
