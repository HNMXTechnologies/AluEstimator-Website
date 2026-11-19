import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Crawlers only read /robots.txt at the domain root, which the HNMX site
  // serves. This file is reachable at /aluestimator/robots.txt and is kept
  // for the standalone deployment; the HNMX robots.txt is what search
  // engines actually use, so the sitemap is listed there too.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}${site.basePath}/sitemap.xml`,
  };
}
