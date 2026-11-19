import { ogImage, ogSize } from "@/lib/og";

export const alt = "From site measurement to GST quotation — in minutes.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("From site measurement to GST quotation — in minutes.", "Estimation software for aluminium fabricators");
}
