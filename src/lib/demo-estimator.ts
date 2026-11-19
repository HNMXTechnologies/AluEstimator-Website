/**
 * Website demo only — simplified, illustrative formulas (brief §8.7).
 * NOT the product's real engine: real templates are fully customisable.
 * All internal maths is in inches.
 */

export type Unit = "mm" | "in" | "ft" | "dora";
/** Glass shutters = tracks; a mosquito-net shutter can be added on its own track. */
export type WindowConfig = { tracks: 2 | 3; net: boolean };

export const UNITS: { id: Unit; label: string }[] = [
  { id: "mm", label: "mm" },
  { id: "in", label: "inch" },
  { id: "ft", label: "ft" },
  { id: "dora", label: "dora" },
];

export const STOCK_LENGTH_IN = 144; // 12 ft
export const SAW_KERF_IN = 0.125;
export const MIN_IN = 12;
export const MAX_IN = 140; // a single cut must fit on one 12 ft pipe

export const DEFAULTS = { widthIn: 60, heightIn: 48, config: { tracks: 2, net: false } as WindowConfig };

export type PartKind = "frame" | "shutter" | "net" | "glass";

export type Part = {
  id: string;
  name: string;
  kind: PartKind;
  qty: number;
  /** Cut length in inches (profiles only). */
  length?: number;
  /** Glass size in inches. */
  size?: { w: number; h: number };
};

/**
 * Brief §8.7 formulas, generalised to n glass shutters:
 * shutter top/bottom W/n + 1, sides H − 2, glass (W/n − 2) × (H − 5).
 * The net shutter covers one shutter width. With n = 2 + net this is exactly
 * the brief's "3 Track" (two glass shutters plus a net shutter).
 */
export function buildParts(w: number, h: number, { tracks: n, net }: WindowConfig): Part[] {
  const parts: Part[] = [
    { id: "frame-tb", name: "Outer frame — top & bottom", kind: "frame", qty: 2, length: w },
    { id: "frame-s", name: "Outer frame — sides", kind: "frame", qty: 2, length: h },
    { id: "sh-tb", name: "Shutter — top & bottom", kind: "shutter", qty: 2 * n, length: w / n + 1 },
    { id: "sh-s", name: "Shutter — sides (interlock / handle)", kind: "shutter", qty: 2 * n, length: h - 2 },
  ];
  if (net) {
    parts.push(
      { id: "net-tb", name: "Net shutter — top & bottom", kind: "net", qty: 2, length: w / n + 1 },
      { id: "net-s", name: "Net shutter — sides", kind: "net", qty: 2, length: h - 2 },
    );
  }
  parts.push({ id: "glass", name: "Glass", kind: "glass", qty: n, size: { w: w / n - 2, h: h - 5 } });
  return parts;
}

export function configLabel({ tracks, net }: WindowConfig) {
  return `${tracks} Track${net ? " + net" : ""}`;
}

export type Cut = { key: string; partId: string; kind: PartKind; length: number };
export type Pipe = { index: number; cuts: (Cut & { offset: number })[]; used: number };

export type CuttingPlan = {
  pipes: Pipe[];
  totalCutLength: number;
  totalStock: number;
  waste: number;
  wastePct: number;
};

/** First-fit decreasing onto 144 in pipes, 0.125 in saw allowance per cut. */
export function planCuts(parts: Part[]): CuttingPlan {
  const cuts: Cut[] = [];
  for (const p of parts) {
    if (p.length == null) continue;
    for (let i = 0; i < p.qty; i++) {
      cuts.push({ key: `${p.id}-${i}`, partId: p.id, kind: p.kind, length: p.length });
    }
  }
  cuts.sort((a, b) => b.length - a.length);

  const pipes: Pipe[] = [];
  for (const cut of cuts) {
    const need = cut.length + SAW_KERF_IN;
    let pipe = pipes.find((pp) => STOCK_LENGTH_IN - pp.used >= need - 1e-9);
    if (!pipe) {
      pipe = { index: pipes.length, cuts: [], used: 0 };
      pipes.push(pipe);
    }
    pipe.cuts.push({ ...cut, offset: pipe.used });
    pipe.used += need;
  }

  const totalCutLength = cuts.reduce((s, c) => s + c.length, 0);
  const totalStock = pipes.length * STOCK_LENGTH_IN;
  const waste = totalStock - totalCutLength;
  return {
    pipes,
    totalCutLength,
    totalStock,
    waste,
    wastePct: totalStock ? (waste / totalStock) * 100 : 0,
  };
}

/* ---------------- Units ---------------- */

const MM_PER_IN = 25.4;

export function toInches(value: number, unit: Unit): number {
  switch (unit) {
    case "mm":
      return value / MM_PER_IN;
    case "ft":
      return value * 12;
    default:
      return value;
  }
}

export function fromInches(inches: number, unit: Unit): number {
  switch (unit) {
    case "mm":
      return inches * MM_PER_IN;
    case "ft":
      return inches / 12;
    default:
      return inches;
  }
}

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

/** Dora: inches with the fraction rounded to the nearest 1/8 — e.g. 48 3/8. */
export function formatDora(inches: number): string {
  const eighths = Math.round(inches * 8);
  const whole = Math.floor(eighths / 8);
  const rem = eighths - whole * 8;
  if (rem === 0) return `${whole}`;
  const g = gcd(rem, 8);
  return `${whole} ${rem / g}/${8 / g}`;
}

function trim(n: number, dp: number) {
  return Number(n.toFixed(dp)).toString();
}

/** Value for an input box (no unit suffix). */
export function formatInput(inches: number, unit: Unit): string {
  switch (unit) {
    case "mm":
      return String(Math.round(fromInches(inches, "mm")));
    case "ft":
      return trim(fromInches(inches, "ft"), 3);
    case "dora":
      return formatDora(inches);
    default:
      return trim(inches, 3);
  }
}

/** Value with unit suffix for tables. */
export function formatLength(inches: number, unit: Unit): string {
  switch (unit) {
    case "mm":
      return `${Math.round(fromInches(inches, "mm"))} mm`;
    case "ft":
      return `${fromInches(inches, "ft").toFixed(2)} ft`;
    case "dora":
      return `${formatDora(inches)}″`;
    default:
      return `${trim(inches, 2)} in`;
  }
}

/** Parses "1524", "60.5", "48 3/8", "48-3/8", "3/8". Returns inches, or null if invalid. */
export function parseLength(raw: string, unit: Unit): number | null {
  const s = raw.trim().replace(/[″"']/g, "").replace(/\s*-\s*(?=\d+\/)/, " ");
  if (!s) return null;
  if (unit === "dora" || unit === "in") {
    const m = s.match(/^(\d+(?:\.\d+)?)?(?:\s+)?(?:(\d+)\/(\d+))?$/);
    if (m && (m[1] || m[2])) {
      const whole = m[1] ? parseFloat(m[1]) : 0;
      const frac = m[2] && m[3] && Number(m[3]) !== 0 ? Number(m[2]) / Number(m[3]) : 0;
      if (m[2] && m[1]?.includes(".")) return null;
      return whole + frac;
    }
    return null;
  }
  if (!/^\d+(\.\d+)?$/.test(s)) return null;
  return toInches(parseFloat(s), unit);
}

export function sqft(wIn: number, hIn: number) {
  return (wIn * hIn) / 144;
}
