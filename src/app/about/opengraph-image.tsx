import { ogImage, ogSize } from "@/lib/og";

export const alt = "Built in Ahmedabad for aluminium fabricators.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Built in Ahmedabad for aluminium fabricators.", "About");
}
