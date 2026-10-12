// Custom next/image loader for Netlify Image CDN. Only used on Netlify builds
// (see next.config.ts); locally images are served unoptimized.
export default function netlifyImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.endsWith(".svg")) return src;
  const params = new URLSearchParams({ url: src, w: String(width), q: String(quality ?? 75) });
  return `/.netlify/images?${params.toString()}`;
}
