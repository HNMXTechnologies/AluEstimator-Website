"use client";

import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { AlertTriangle, CheckCircle2, PackageCheck, Truck, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { QuotePreview } from "@/components/visuals/QuotePreview";
import { quotationFormats } from "@/content/quotation-formats";
import { cn } from "@/lib/utils";

/** Cycles 0..steps-1 while in view (static final state for reduced motion). */
function usePhase(steps: number, interval: number, hold = 2) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (reduce || !inView) return;
    let p = 0;
    let held = 0;
    const id = setInterval(() => {
      if (p < steps - 1) {
        p += 1;
        setPhase(p);
      } else if (++held > hold) {
        held = 0;
        p = 0;
        setPhase(0);
      }
    }, interval);
    return () => {
      clearInterval(id);
      setPhase(0);
    };
  }, [inView, reduce, steps, interval, hold]);
  return { ref, phase: reduce ? steps - 1 : phase, reduce };
}

/* ---------------- Calculation engine: stacked result tables ---------------- */

const tables = [
  {
    title: "Per-window cost",
    head: ["Window", "Size (mm)", "Sq ft", "Amount"],
    rows: [
      ["W1 · Hall", "1524 × 1219", "20.0", "₹14,220"],
      ["W2 · Bed 1", "1220 × 1219", "16.0", "₹11,560"],
      ["W3 · Bath", "915 × 610", "6.0", "₹4,880"],
    ],
  },
  {
    title: "Pipe allocation",
    head: ["Section", "Cuts", "Pipes", "Waste"],
    rows: [
      ["Outer frame", "12", "4 × 12 ft", "6.1%"],
      ["Shutter", "24", "6 × 12 ft", "8.4%"],
      ["Interlock", "6", "2 × 12 ft", "11.2%"],
    ],
  },
  {
    title: "Glass",
    head: ["Glass", "Pcs", "Size (mm)", "Sq ft"],
    rows: [
      ["5mm clear", "4", "711 × 1092", "33.4"],
      ["5mm frosted", "2", "407 × 483", "4.2"],
    ],
  },
];

export function EngineVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="relative pt-2 pb-14" aria-hidden="true">
      {tables.map((t, i) => (
        <motion.div
          key={t.title}
          className={cn(
            "relative rounded-xl border border-line bg-surface p-3 shadow-lift sm:p-4",
            i > 0 && "-mt-4 sm:-mt-5",
          )}
          style={{ marginLeft: `${i * 6}%`, marginRight: `${(2 - i) * 6}%`, zIndex: i }}
          initial={reduce ? false : { opacity: 0, y: 40, rotate: -1.5 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 0 } : undefined}
          transition={{ duration: 0.7, delay: i * 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="font-display text-sm font-semibold">{t.title}</p>
            <span className="dim-label text-muted">Mehta bungalow</span>
          </div>
          <table className="w-full text-[12px] sm:text-[13px]">
            <thead className="text-left text-muted">
              <tr>{t.head.map((h) => <th key={h} className="pb-1 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-line">
              {t.rows.map((r) => (
                <tr key={r[0]}>{r.map((c, j) => <td key={j} className={cn("py-1.5 tabular", j === r.length - 1 && "font-medium")}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ))}
      <motion.div
        className="absolute right-0 bottom-0 flex items-center gap-2 rounded-lg border border-waste/40 bg-surface px-3 py-2 text-xs shadow-card"
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ delay: 0.9 }}
      >
        <AlertTriangle className="size-4 text-waste" />
        <span>Price missing: <b>Multipoint lock</b> — set a rate</span>
      </motion.div>
    </div>
  );
}

/* ---------------- Quotation formats: fanned stack ---------------- */

export function FormatFan() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const spread = hover || inView || reduce;
  const n = quotationFormats.length;
  const mid = (n - 1) / 2;

  return (
    <div>
      <div
        ref={ref}
        className="relative mx-auto aspect-[4/3] w-full max-w-[520px] overflow-x-clip"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        {quotationFormats.map((f, i) => {
          const d = i - mid;
          return (
            <motion.div
              key={f.id}
              className="absolute top-[6%] left-1/2 w-[30%] origin-bottom"
              style={{ zIndex: 10 - Math.abs(Math.round(d)) }}
              initial={false}
              animate={
                spread
                  ? { x: `calc(-50% + ${d * 44}%)`, rotate: d * 6, y: Math.abs(d) * 8 }
                  : { x: `calc(-50% + ${d * 6}%)`, rotate: d * 2, y: 0 }
              }
              whileHover={reduce ? undefined : { y: -16, scale: 1.04, zIndex: 20 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <div className={cn("flex aspect-[210/297] items-center bg-transparent", f.orientation === "landscape" && "px-0")}>
                <QuotePreview id={f.id} name={f.name} landscape={f.orientation === "landscape"} />
              </div>
            </motion.div>
          );
        })}
      </div>
      <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
        {quotationFormats.map((f) => (
          <li key={f.id} className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted">{f.name}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Partition configurator ---------------- */

export { PartitionCanvas as PartitionVisual } from "@/components/visuals/PartitionCanvas";

/* ---------------- Coating workflow ---------------- */

const coatSteps = [
  { label: "Sent to coater", detail: "120 pipes · RAL 9016 white", returned: 0, icon: Truck },
  { label: "Partially returned", detail: "80 pipes back", returned: 80, icon: Undo2 },
  { label: "Partially returned", detail: "40 more pipes back", returned: 120, icon: Undo2 },
  { label: "Completed", detail: "All 120 pipes in stock", returned: 120, icon: PackageCheck },
];

export function CoatingVisual() {
  const { ref, phase } = usePhase(coatSteps.length, 1300, 2);
  const returned = coatSteps[phase].returned;
  const pct = returned / 120;
  const R = 46;
  const C = 2 * Math.PI * R;

  return (
    <div ref={ref} className="grid items-center gap-6 rounded-2xl border border-line bg-surface p-5 shadow-lift sm:grid-cols-[auto_1fr] sm:p-6">
      <div className="relative mx-auto size-36">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={R} fill="none" stroke="var(--line)" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r={R} fill="none" stroke={phase === 3 ? "var(--success)" : "var(--accent)"} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={C}
            initial={false}
            animate={{ strokeDashoffset: C * (1 - pct) }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-semibold tabular">{returned}</span>
          <span className="text-xs text-muted">of 120 back</span>
        </div>
      </div>
      <ol className="grid gap-1" aria-label="Coating job timeline">
        {coatSteps.map((s, i) => {
          const done = i <= phase;
          const Icon = i === 3 && done ? CheckCircle2 : s.icon;
          return (
            <li key={i} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-colors", i === phase && "bg-accent-soft")}>
              <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors", done ? (i === 3 ? "border-success bg-success text-white" : "border-accent bg-accent text-white dark:text-[#0a1220]") : "border-line text-muted")}>
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className={cn("block text-sm font-medium", done ? "text-ink" : "text-muted")}>{s.label}</span>
                <span className="block truncate text-xs text-muted">{s.detail}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
