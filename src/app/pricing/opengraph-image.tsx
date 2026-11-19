import { ogImage, ogSize } from "@/lib/og";

export const alt = "All features on every plan — from ₹799/month.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("All features on every plan — from ₹799/month.", "Pricing");
}
