// The six quotation designs shipped in the product (brief §5.2).

export type QuotationFormatId =
  | "classic-gst"
  | "window-schedule"
  | "per-sqft"
  | "room-gallery"
  | "elevation-sheet"
  | "formal-letter";

export type FormatTag = "drawings" | "compact" | "formal" | "branded";

export const formatFilters: { id: "all" | FormatTag; label: string }[] = [
  { id: "all", label: "All formats" },
  { id: "drawings", label: "With drawings" },
  { id: "branded", label: "Branded" },
  { id: "compact", label: "Compact" },
  { id: "formal", label: "Formal" },
];

export type QuotationFormat = {
  id: QuotationFormatId;
  name: string;
  description: string;
  orientation: "portrait" | "landscape";
  tags: FormatTag[];
  bestFor: string;
  /** Real preview image in /public/quotation-formats when supplied; stylised SVG is drawn until then. */
  image?: string;
};

export const quotationFormats: QuotationFormat[] = [
  {
    id: "classic-gst",
    name: "Classic GST",
    description: "Traditional bordered GST bill in black and white; prints and photocopies cleanly.",
    orientation: "portrait",
    tags: ["compact", "formal"],
    bestFor: "Customers who want a traditional bill they can photocopy",
  },
  {
    id: "window-schedule",
    name: "Window Schedule",
    description:
      "Branded header band, a large specification card per window and partition, then a commercial summary.",
    orientation: "portrait",
    tags: ["drawings", "branded"],
    bestFor: "Bungalows and projects where every window needs its own spec",
  },
  {
    id: "per-sqft",
    name: "Per Sq. Ft.",
    description:
      "Compact one-page table priced by area — area, total area and rate per sq ft for every item.",
    orientation: "portrait",
    tags: ["compact"],
    bestFor: "Quick quotes priced by area, on a single page",
  },
  {
    id: "room-gallery",
    name: "Room-wise Gallery",
    description: "Windows grouped by floor with subtotals, shown as a gallery of room tiles with drawings.",
    orientation: "portrait",
    tags: ["drawings", "branded"],
    bestFor: "Homes where the customer thinks room by room",
  },
  {
    id: "elevation-sheet",
    name: "Elevation Sheet",
    description:
      "Landscape architect-style drawing sheet: every item drawn to one true scale with callouts, scale bar and title block.",
    orientation: "landscape",
    tags: ["drawings", "branded"],
    bestFor: "Architects, builders and large elevations",
  },
  {
    id: "formal-letter",
    name: "Formal Letter + Annexures",
    description:
      "A business letter stating scope and price, with drawings and terms as annexures and an order acceptance form.",
    orientation: "portrait",
    tags: ["drawings", "formal"],
    bestFor: "Companies, institutions and tenders that expect a letter",
  },
];
