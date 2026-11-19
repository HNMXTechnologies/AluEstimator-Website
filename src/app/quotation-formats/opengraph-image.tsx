import { ogImage, ogSize } from "@/lib/og";

export const alt = "Six GST quotation designs with window drawings.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Six GST quotation designs with window drawings.", "Quotation formats");
}
