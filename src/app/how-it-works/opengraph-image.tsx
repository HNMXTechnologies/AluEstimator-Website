import { ogImage, ogSize } from "@/lib/og";

export const alt = "Sizes in. Quotation out.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Sizes in. Quotation out.", "How it works");
}
