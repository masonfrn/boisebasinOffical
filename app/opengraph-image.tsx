import { ImageResponse } from "next/og";
import { OG_SIZE, ogElement } from "@/lib/ogImage";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Boise Basin Junk Removal — Fast & Affordable Junk Removal in the Treasure Valley";

export default async function Image() {
  return new ImageResponse(ogElement(), { ...size });
}
