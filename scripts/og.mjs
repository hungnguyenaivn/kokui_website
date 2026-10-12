// Renders the Open Graph share images (1200x630) for each locale into
// public/brand/. Run once with `npm run og`; the PNGs are committed.
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";

const fraunces = readFileSync("scripts/fonts/Fraunces-SemiBold.ttf");
const beVietnam = readFileSync("scripts/fonts/BeVietnamPro-Regular.ttf");
const photo = `data:image/jpeg;base64,${readFileSync("public/images/lookbook/white-wall-black-tee.jpg").toString("base64")}`;
const MOUNTAIN = "M3 29 C 13 23, 28 8, 39 5 C 45 3.5, 50 11, 56.5 17.5 C 59.5 14, 63 10.5, 67 10.5 C 74 11, 86 21.5, 97 27";

const copy = {
  vi: { line: "Hành trình tìm lại tinh thần cổ điển.", sub: "Denim · Hà Nội" },
  en: { line: "The journey to rediscover classicism.", sub: "Denim · Hanoi" },
};

const h = (type, style, children) => ({ type, props: { style, children } });

for (const [locale, t] of Object.entries(copy)) {
  const tree = h("div", { display: "flex", width: 1200, height: 630, background: "#232B4A", color: "#EDE6D6" }, [
    h("div", { display: "flex", flexDirection: "column", justifyContent: "space-between", width: 696, padding: "64px 72px" }, [
      h("div", { display: "flex", flexDirection: "column", alignItems: "flex-start" }, [
        { type: "svg", props: { width: 150, height: 51, viewBox: "0 0 100 34", children: { type: "path", props: { d: MOUNTAIN, fill: "none", stroke: "#EDE6D6", strokeWidth: 4.5, strokeLinecap: "round" } } } },
        h("div", { fontFamily: "Fraunces", fontSize: 96, lineHeight: 1, marginTop: -6 }, "kokui"),
      ]),
      h("div", { display: "flex", flexDirection: "column" }, [
        h("div", { fontFamily: "Fraunces", fontSize: 50, lineHeight: 1.12 }, t.line),
        h("div", { fontFamily: "Be Vietnam Pro", fontSize: 22, marginTop: 28, letterSpacing: 3, textTransform: "uppercase", opacity: 0.7 }, t.sub),
      ]),
    ]),
    { type: "img", props: { src: photo, width: 504, height: 630, style: { objectFit: "cover" } } },
  ]);
  const svg = await satori(tree, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
      { name: "Be Vietnam Pro", data: beVietnam, weight: 400, style: "normal" },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  writeFileSync(`public/brand/og-${locale}.png`, png);
  console.log(`wrote public/brand/og-${locale}.png`);
}
