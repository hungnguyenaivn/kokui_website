import type { NextConfig } from "next";

// On Netlify builds (NETLIFY_IMAGE_CDN=true in netlify.toml), images are resized by the Netlify Image CDN through a
// custom loader. Locally (next dev / plain static serve) images are served raw.
const onNetlify = process.env.NETLIFY_IMAGE_CDN === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: onNetlify
    ? { loader: "custom", loaderFile: "./src/lib/image-loader.ts" }
    : { unoptimized: true },
};

export default nextConfig;
