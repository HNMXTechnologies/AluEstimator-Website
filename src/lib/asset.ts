/**
 * Public-folder URL including this build's basePath (NEXT_PUBLIC_BASE_PATH in
 * next.config.ts — "" for the standalone deployment, "/aluestimator" for the
 * HNMX copy). next/link adds basePath itself, but next/image and <img> do not.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
