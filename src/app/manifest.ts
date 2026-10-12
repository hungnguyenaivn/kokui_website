import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "kokui",
    short_name: "kokui",
    description: "The journey to rediscover classicism.",
    start_url: "/vi/",
    display: "standalone",
    background_color: "#F3EFE6",
    theme_color: "#232B4A",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
