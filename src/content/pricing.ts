// Plans as configured in the product (brief §6). Prices in ₹ per month, excluding 18% GST.

export type PlanId = "basic" | "pro" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  monthly: number;
  yearly: number;
  bestFor: string;
  popular?: boolean;
  highlights: string[];
};

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    monthly: 799,
    yearly: 7990,
    bestFor: "Owner-run workshop with 1–2 helpers",
    highlights: ["1 workspace", "2 staff seats", "25 window templates", "40 quotations / month"],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 1999,
    yearly: 19990,
    bestFor: "Growing firm with office + site team, often a second branch",
    popular: true,
    highlights: [
      "2 workspaces (firms / branches)",
      "8 staff seats",
      "150 window templates",
      "200 quotations / month",
      "5 custom roles",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: 4999,
    yearly: 49990,
    bestFor: "Multi-branch fabricators and dealers",
    highlights: [
      "10 workspaces",
      "Unlimited staff seats",
      "Unlimited templates",
      "Unlimited documents",
      "Unlimited custom roles",
    ],
  },
];

export const comparisonRows: { label: string; values: [string, string, string] }[] = [
  { label: "Workspaces (firms / branches)", values: ["1", "2", "10"] },
  { label: "Staff seats", values: ["2", "8", "Unlimited"] },
  {
    label: "Custom roles",
    values: ["Built-in roles, editable", "5, with per-person overrides", "Unlimited, with delegation"],
  },
  { label: "Window templates", values: ["25", "150", "Unlimited"] },
  { label: "Window series", values: ["3", "15", "Unlimited"] },
  { label: "Customers", values: ["1,000", "10,000", "Unlimited"] },
  { label: "Estimation projects / month", values: ["40", "200", "Unlimited"] },
  { label: "Quotations / month", values: ["40", "200", "Unlimited"] },
  { label: "Invoices / month", values: ["30", "150", "Unlimited"] },
  { label: "Coating requests / month", values: ["15", "80", "Unlimited"] },
  { label: "Coating vendors", values: ["3", "15", "Unlimited"] },
  { label: "Accessory types", values: ["50", "300", "Unlimited"] },
];

export const pricingNotes = {
  headline: "All features on every plan",
  gstNote: "+18% GST",
  yearlyBadge: "2 months free",
  yearlyExplainer: "Yearly billing: pay for 10 months, get 12.",
};
