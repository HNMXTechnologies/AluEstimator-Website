// SAMPLE — replace before launch.
// Stats are sample data (brief §11.3).

export type Stat = {
  value: number;
  /** Decimal places shown while counting. */
  decimals?: number;
  suffix: string;
  label: string;
};

export const stats = {
  isSample: true,
  items: [
    { value: 500, suffix: "+", label: "fabricators" },
    { value: 120000, suffix: "+", label: "windows estimated" },
    { value: 35000, suffix: "+", label: "quotations sent" },
    { value: 4.8, decimals: 1, suffix: " / 5", label: "average rating from customers" },
  ] satisfies Stat[],
};
