import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Birchtree Financial",
    short_name: "Birchtree",
    description:
      "Family-run financial advisory firm in Olds, Alberta — retirement, investment, insurance, tax, and estate planning.",
    start_url: "/",
    // "browser" (not "standalone") keeps the manifest's metadata — theme color,
    // name, home-screen icon — WITHOUT making the site an installable PWA, so
    // Chrome/Edge no longer show the "install app / download" prompt.
    display: "browser",
    background_color: "#FBFAF6",
    theme_color: "#0B1A2C",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
