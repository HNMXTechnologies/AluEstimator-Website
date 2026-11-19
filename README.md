# AluEstimator — marketing website

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Radix UI · Motion · Lenis · React Three Fiber · MDX · React Hook Form + Zod · Resend.

Every page is statically prerendered. Target host: Vercel (with Vercel Analytics, which is cookie-free).

## Setup

```bash
npm install
cp .env.example .env.local   # optional — see "Environment variables"
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

Requires Node.js 20.9+.

## Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends demo-form leads by email. **If unset, leads are logged to the server console** (useful in development). |
| `LEAD_TO_EMAIL` | Where leads go. Defaults to `sales@aluestimator.in` (from `src/content/site.ts`). |
| `LEAD_FROM_EMAIL` | Sender address. Must be on a domain verified in Resend. |

Set the same variables in the Vercel project settings for production.

## Pages

| Route | File |
|---|---|
| `/` Home | `src/app/page.tsx` (sections in `src/components/home/`) |
| `/features` (anchors: `#estimator #quotations #partitions #inventory #billing #team #platform`) | `src/app/features/page.tsx` |
| `/quotation-formats` gallery + lightbox + customiser | `src/app/quotation-formats/page.tsx` |
| `/pricing` cards + comparison table | `src/app/pricing/page.tsx` |
| `/how-it-works` | `src/app/how-it-works/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/faq` | `src/app/faq/page.tsx` |
| `/contact` demo form | `src/app/contact/page.tsx`, Server Action in `src/app/contact/actions.ts` |
| `/legal/privacy`, `/legal/terms`, `/legal/refund` | MDX in `src/content/legal/*.mdx` |

SEO: per-page titles and descriptions, an `opengraph-image.tsx` per route (shared design in `src/lib/og.tsx`), `src/app/sitemap.ts`, `src/app/robots.ts`, and JSON-LD (`SoftwareApplication` on Home, `FAQPage` on Home and FAQ).

## Editing content

All copy lives in typed files in `src/content/`. You can change them without touching components:

| File | What's in it |
|---|---|
| `site.ts` | Company, contact, WhatsApp link, socials, trial offer, navigation |
| `home.ts` | Home page copy (hero, steps, feature rows, pipeline, India grid) |
| `features.ts` | Feature catalogue for `/features` |
| `pricing.ts` | Plans, prices and comparison rows |
| `faq.ts` | FAQ questions and answers (also used for JSON-LD) |
| `quotation-formats.ts` | The six formats, filters and optional real preview images |
| `social-proof.ts` | Stats counters and testimonials |
| `about.ts` | Story, timeline and principles |
| `legal/*.mdx` | Legal pages (Markdown) |

Brand colours and the responsive page gutter (`--gutter`: 20px phone, 32px tablet, 40px desktop) are in `src/app/globals.css`.

The live mini-estimator's maths is in `src/lib/demo-estimator.ts`. These are simplified website-only formulas, and the widget is labelled "Demo".

## Replace before launch

**Sample data.** Search for `isSample` or `SAMPLE — replace before launch`:

- `src/content/site.ts`: legal name, address, phone/WhatsApp, emails, GSTIN, socials, offer
- `src/content/social-proof.ts`: stats and testimonials
- `src/content/about.ts`: story and timeline

**Legal pages** are drafts expanded from short summaries. Each page shows a "Draft" notice. Have them reviewed, then delete the notice in `src/components/shared/LegalPage.tsx`.

**Illustrative figures.** Some example amounts and sizes in the visuals are made up: the engine tables, notebook scene, mock screens, customiser and ledger. They're labelled as illustrative where shown.

## Replacing assets

- **Logo.** `src/components/brand/Logo.tsx` is a recreated text logo, and `src/app/icon.svg` is the favicon. Copy `logo.svg`, `logo-dark.svg` and `mark.svg` into `public/brand/`, then swap the component to use `next/image`.
- **Quotation previews.** Copy the six `.webp` files into `public/quotation-formats/` and set `image: "/quotation-formats/classic-gst.webp"` (and so on) on each entry in `src/content/quotation-formats.ts`. The gallery switches to the real images automatically.
- **App screenshots.** The placeholder screens are drawn in HTML/SVG:
  - `src/components/home/Devices.tsx` (Home)
  - `src/components/how/StepScreens.tsx` (How it works)
  - `src/components/features/ModuleVisuals.tsx` (Features)

  Put screenshots in `public/screens/` and replace the screen components with `next/image`.
- **Demo video.** None yet (brief §11.7).

## Notes

- **3D hero.** `src/components/visuals/Window3D.tsx` loads only after the page is idle, and only on capable devices. It is skipped for reduced motion, Save-Data and low memory or CPU, which get the SVG drawing instead. Drag-to-rotate is turned off on touch so the page still scrolls.
- **Reduced motion.** All animations respect `prefers-reduced-motion`.
- **FAQ format.** The FAQ is kept in TypeScript rather than MDX because the same data feeds the accordion and the `FAQPage` structured data.
- **Translations.** Content is kept separate from components so Hindi and Gujarati versions can be added later.
