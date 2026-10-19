import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "ಕನ್ನಡದ ಬೇರು · Kannadada Beru",
    short_name: "ಕನ್ನಡದ ಬೇರು",
    description: "Explore and preserve the living regional diversity of Kannada.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fff8ec",
    theme_color: "#7a1f2b",
    orientation: "portrait-primary",
    lang: "kn",
    categories: ["education", "reference", "culture"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
