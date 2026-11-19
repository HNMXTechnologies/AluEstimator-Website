import { ogImage, ogSize } from "@/lib/og";

export const alt = "Everything an aluminium workshop needs, in one app.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Everything an aluminium workshop needs, in one app.", "Features");
}
