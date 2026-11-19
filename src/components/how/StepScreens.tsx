"use client";

import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Check, CheckCheck, FileText, Plus } from "lucide-react";
import { useRef } from "react";
import { WhatsAppIcon } from "@/components/ui/Button";
import { WindowElevation } from "@/components/visuals/WindowElevation";
import { cn } from "@/lib/utils";

/** Illustrative mock screens for each step — placeholders until real screenshots arrive. */

function Screen({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-surface shadow-lift", className)} role="img" aria-label={`Illustrative screen: ${title}`}>
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="ml-1 truncate text-xs font-medium text-muted">{title}</span>
      </div>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

function useIn() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const fx = (i: number) => ({
    initial: reduce ? false : ({ opacity: 0, x: -10 } as const),
    animate: inView ? { opacity: 1, x: 0 } : undefined,
    transition: { delay: 0.15 + i * 0.12, duration: 0.45 },
  });
  return { ref, fx };
}

export function BuilderStep() {
  const { ref, fx } = useIn();
  const parts = [
    ["Outer frame — top", "W", "2"],
    ["Outer frame — side", "H", "2"],
    ["Shutter — top", "w/2 − 0.5", "4"],
    ["Shutter — interlock", "h − 2", "4"],
    ["Glass", "(w/2 − 2) × (h − 5)", "2"],
  ];
  return (
    <div ref={ref}>
      <Screen title="Window builder · 27mm · 2 Track">
        <div className="grid gap-4 p-4 sm:grid-cols-[1fr_1fr] sm:p-5">
          <div className="grid content-start gap-1.5">
            {parts.map(([n, f, q], i) => (
              <motion.div key={n} {...fx(i)} className="flex items-center justify-between gap-2 rounded-lg border border-line bg-bg px-3 py-2 text-[13px]">
                <span className="truncate">{n}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[11px] text-brand dark:text-accent">{f}</span>
                  <span className="font-mono text-[11px] text-muted">×{q}</span>
                </span>
              </motion.div>
            ))}
            <div className="mt-1 flex items-center gap-2 text-xs text-success"><Check className="size-4" /> Design complete — ready to use</div>
          </div>
          <div className="rounded-xl border border-line bg-bg bg-blueprint p-3">
            <WindowElevation width={60} height={48} widthLabel="W" heightLabel="H" idPrefix="how1" title="" />
          </div>
        </div>
      </Screen>
    </div>
  );
}

export function GridStep() {
  const { ref, fx } = useIn();
  const rows = [
    ["W1", "Ground", "Hall", "1524", "1219"],
    ["W2", "Ground", "Kitchen", "915", "1067"],
    ["W3", "First", "Bedroom 1", "1220", "1219"],
    ["W4", "First", "Bedroom 2", "1220", "1219"],
    ["W5", "First", "Bath", "610", "457"],
  ];
  return (
    <div ref={ref}>
      <Screen title="Mehta bungalow · Window group: 27mm 2 Track">
        <div className="flex flex-wrap gap-1.5 border-b border-line px-4 py-3 text-[11px]">
          {["Profile: 27mm Mill", "Glass: 5mm clear", "Coating: White", "Lock: Handle"].map((c) => (
            <span key={c} className="rounded-full bg-surface-2 px-2 py-1 text-muted">{c}</span>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-[13px]">
            <thead className="bg-surface-2 text-left text-[11px] text-muted">
              <tr>{["#", "Floor", "Location", "W (mm)", "H (mm)"].map((h) => <th key={h} className="px-4 py-2 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-line font-mono text-[12.5px]">
              {rows.map((r, i) => (
                <motion.tr key={r[0]} {...fx(i)}>
                  {r.map((c, j) => <td key={j} className={cn("px-4 py-2", j < 3 && "font-sans")}>{c}</td>)}
                </motion.tr>
              ))}
              <tr><td colSpan={5} className="px-4 py-2 font-sans text-muted"><Plus className="mr-1 inline size-3.5" /> Add row · or import from Excel</td></tr>
            </tbody>
          </table>
        </div>
      </Screen>
    </div>
  );
}

export function PriceStep() {
  const { ref, fx } = useIn();
  const lines = [
    ["Material cost (pipes, glass, accessories, coating)", "₹18,640"],
    ["Labour · ₹45 / sq ft", "₹2,970"],
    ["Installation · ₹20 / sq ft", "₹1,320"],
    ["Profit margin 15%", "₹3,440"],
    ["Transport", "₹800"],
    ["Discount", "− ₹1,000"],
  ];
  return (
    <div ref={ref}>
      <Screen title="Calculation · Mehta bungalow">
        <div className="grid gap-4 p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-2">
            {[["Pipes", "14 × 12 ft"], ["Waste", "7.8%"], ["Glass", "38.6 sq ft"]].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-line bg-bg p-2.5">
                <p className="text-[11px] text-muted">{k}</p>
                <p className="font-display text-base font-semibold tabular sm:text-lg">{v}</p>
              </div>
            ))}
          </div>
          <dl className="divide-y divide-line rounded-lg border border-line text-[13px]">
            {lines.map(([k, v], i) => (
              <motion.div key={k} {...fx(i)} className="flex justify-between gap-3 px-3 py-2">
                <dt className="text-muted">{k}</dt>
                <dd className="shrink-0 tabular">{v}</dd>
              </motion.div>
            ))}
            <div className="flex justify-between bg-surface-2 px-3 py-2.5 font-semibold">
              <dt>Selling price + GST 18%</dt>
              <dd className="tabular">₹30,881</dd>
            </div>
          </dl>
        </div>
      </Screen>
    </div>
  );
}

export function SendStep() {
  const { ref, fx } = useIn();
  return (
    <div ref={ref}>
      <Screen title="Share quotation · QT/25-26/0142">
        <div className="grid gap-4 p-4 sm:grid-cols-[1fr_1.1fr] sm:p-5">
          <div className="rounded-lg border border-line bg-white p-3 text-[#1f2937] shadow-card">
            <div className="flex items-center justify-between border-b-2 border-[#1e40af] pb-2">
              <span className="text-[12px] font-semibold">Shree Aluminium</span>
              <span className="text-[10px] font-semibold text-[#1e40af]">QUOTATION</span>
            </div>
            {[0, 1].map((i) => (
              <div key={i} className="mt-2 flex gap-2">
                <div className="w-10"><WindowElevation width={60} height={48} net={i === 1} idPrefix={`how4-${i}`} title="" /></div>
                <div className="flex-1 space-y-1 pt-1">
                  <span className="block h-1.5 w-3/4 rounded bg-[#e2e8f0]" />
                  <span className="block h-1.5 w-1/2 rounded bg-[#e2e8f0]" />
                </div>
              </div>
            ))}
            <div className="mt-3 flex justify-end"><span className="rounded bg-[#0f1f3d] px-2 py-1 text-[10px] font-semibold text-white">Total ₹30,881</span></div>
          </div>
          <div className="flex flex-col justify-end gap-2 rounded-lg bg-[#efeae2] p-3 dark:bg-[#0b141a]">
            <motion.div {...fx(0)} className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#d9fdd3] p-2 text-[12px] text-[#111b21] shadow-sm dark:bg-[#005c4b] dark:text-white">
              <span className="flex items-center gap-2 rounded bg-black/5 p-2"><FileText className="size-5 text-[#c0392b]" /> Quotation_Mehta.pdf</span>
              <span className="mt-1 block">Namaste Mehta ji, please find the quotation for your windows.</span>
              <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-[#667781] dark:text-[#aebac1]">10:42 <CheckCheck className="size-3.5 text-[#53bdeb]" /></span>
            </motion.div>
            <motion.div {...fx(2)} className="max-w-[75%] rounded-lg rounded-tl-none bg-white p-2 text-[12px] text-[#111b21] shadow-sm dark:bg-[#202c33] dark:text-white">
              Looks good. Please go ahead.
            </motion.div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#0b4d2a] dark:text-[#bdf0cf]"><WhatsAppIcon className="size-4" /> Shared from AluEstimator as a PDF</div>
          </div>
        </div>
      </Screen>
    </div>
  );
}
