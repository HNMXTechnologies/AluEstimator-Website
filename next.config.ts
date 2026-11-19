import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Served inside hnmxtechnologies.com at /aluestimator/, proxied there by
  // the HNMX site's vercel.json. next/link and /_next assets are prefixed
  // automatically; keep this in step with site.basePath in
  // src/content/site.ts and with the HNMX rewrite.
  basePath: "/aluestimator",

  // The HNMX site uses trailingSlash: true, and its vercel.json redirects
  // /aluestimator to /aluestimator/. Next defaults to the opposite and 308s
  // /aluestimator/ back to /aluestimator, which against that redirect is an
  // infinite loop. Matching the convention also keeps canonicals pointing at
  // the URL that actually returns 200.
  trailingSlash: true,

  experimental: {
    serverActions: {
      // A Server Action compares the request Origin against the Host. Behind
      // the HNMX proxy the browser sends the hnmxtechnologies.com origin while
      // this deployment sees its own vercel.app host, so without these the
      // demo form POST is rejected as a CSRF mismatch.
      allowedOrigins: [
        "www.hnmxtechnologies.com",
        "hnmxtechnologies.com",
        "*.vercel.app",
      ],
    },
  },

  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
