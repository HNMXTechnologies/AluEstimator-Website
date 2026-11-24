import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // This repo is the standalone deployment (alu-estimator-website.vercel.app),
  // served from the root of its own address, so there is no basePath. The
  // copy shown at hnmxtechnologies.com/aluestimator/ is built from the
  // aluestimator/ folder of the HNMX-Technologies repo, with
  // basePath "/aluestimator".

  // Same URL style as the HNMX site, so canonicals match the URLs there.
  trailingSlash: true,

  // Exposed to the client so asset() can prefix public/ files with the build's
  // basePath ("" here; "/aluestimator" in the HNMX copy). next/image and <img>
  // don't add basePath on their own.
  env: { NEXT_PUBLIC_BASE_PATH: "" },

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
