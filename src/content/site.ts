// SAMPLE — replace before launch.
// Company and contact details are sample data (brief §11.1). Swap them here only.

export const site = {
  isSample: true,
  name: "AluEstimator",
  tagline: "Smart estimates for aluminium works",
  legalName: "AluEstimator Technologies Pvt. Ltd.",
  // Canonical host. The site is served from the HNMX domain at
  // /aluestimator/, so canonicals, Open Graph URLs and the sitemap all point
  // there rather than at a second domain competing for the same pages.
  url: "https://www.hnmxtechnologies.com",
  // Must match `basePath` in next.config.ts and the HNMX rewrite.
  basePath: "/aluestimator",
  appUrl: "https://app.aluestimator.in",
  address: {
    line1: "Office 402, Example Business Centre",
    line2: "S.G. Highway, Ahmedabad, Gujarat 380054",
    country: "India",
  },
  phoneDisplay: "+91 98765 43210",
  phoneE164: "+919876543210",
  emails: {
    sales: "sales@aluestimator.in",
    support: "support@aluestimator.in",
    general: "hello@aluestimator.in",
  },
  supportHours: "Monday–Saturday, 10:00 am – 7:00 pm IST",
  gstin: "24AAAAA0000A1Z5",
  founded: "2025, Ahmedabad",
  whatsappUrl:
    "https://wa.me/919876543210?text=Hi%20AluEstimator%2C%20I%27d%20like%20a%20demo",
  socials: [
    { label: "Instagram", href: "https://instagram.com/aluestimator" },
    { label: "YouTube", href: "https://youtube.com/@aluestimator" },
    { label: "LinkedIn", href: "https://linkedin.com/company/aluestimator" },
    { label: "Facebook", href: "https://facebook.com/aluestimator" },
  ],
  offer: {
    isSample: true,
    trialDays: 14,
    demoMinutes: 30,
    summary:
      "14-day free trial with every feature, set up by our team after a 30-minute demo — online or at your workshop in Gujarat.",
    importHelp: "Free help importing your existing window designs and stock from Excel.",
  },
} as const;

/**
 * Absolute path for a route, including the base path.
 *
 * Next prefixes next/link hrefs and asset URLs with basePath automatically,
 * but NOT metadata: `alternates.canonical` is resolved against metadataBase
 * alone. Without this, every canonical would claim the page lives at the
 * domain root.
 */
export const canonicalPath = (path: string) =>
  path === "/" || path === ""
    ? `${site.basePath}/`
    : `${site.basePath}${path}/`;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Quotation formats", href: "/quotation-formats" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Estimator", href: "/features#estimator" },
      { label: "Quotations", href: "/features#quotations" },
      { label: "Partitions", href: "/features#partitions" },
      { label: "Inventory & coating", href: "/features#inventory" },
      { label: "Billing & CRM", href: "/features#billing" },
      { label: "Multi-branch & team", href: "/features#team" },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "Quotation formats", href: "/quotation-formats" },
      { label: "Pricing", href: "/pricing" },
      { label: "How it works", href: "/how-it-works" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Book a demo", href: "/contact" },
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms of service", href: "/legal/terms" },
      { label: "Refund policy", href: "/legal/refund" },
    ],
  },
];
