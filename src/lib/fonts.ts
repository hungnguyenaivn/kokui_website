import { Be_Vietnam_Pro, Fraunces } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext", "vietnamese"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});

export const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-be-vietnam",
});

export const fontVariables = `${fraunces.variable} ${beVietnam.variable}`;
