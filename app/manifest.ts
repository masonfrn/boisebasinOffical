import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: BUSINESS.shortName,
    description: "Fast, affordable junk removal across the Treasure Valley.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F7F9",
    theme_color: "#0B2545",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
