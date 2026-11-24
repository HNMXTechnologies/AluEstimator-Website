"use client";

import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { CheckCheck, FileText } from "lucide-react";
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
