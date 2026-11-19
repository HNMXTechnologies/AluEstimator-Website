import { ogImage, ogSize } from "@/lib/og";

export const alt = "Book a free demo.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Book a free demo.", "Contact");
}
