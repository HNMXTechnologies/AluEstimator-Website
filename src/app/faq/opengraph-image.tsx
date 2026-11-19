import { ogImage, ogSize } from "@/lib/og";

export const alt = "Questions fabricators ask us.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Questions fabricators ask us.", "FAQ");
}
