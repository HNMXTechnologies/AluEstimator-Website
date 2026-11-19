"use client";

import { motion, useScroll, useSpring, type TargetAndTransition } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Check, FileText } from "lucide-react";
import { useRef } from "react";
import { WhatsAppIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WindowElevation } from "@/components/visuals/WindowElevation";
import { steps } from "@/content/home";

function loop(reduce: boolean | null, animate: TargetAndTransition, duration = 2.4, delay = 0) {
  return reduce
    ? {}
    : { animate, transition: { duration, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const, delay } };
}

function IllTemplate() {
  const reduce = useReducedMotion();
  return (
    <div className="relative grid h-full grid-cols-[1fr_auto] items-center gap-3 p-4">
      <div className="flex h-full min-h-0 items-center justify-center">
        <WindowElevation width={60} height={48} idPrefix="hiw1" title="" className="h-full max-h-full w-auto" />
      </div>
      <div className="grid gap-1.5 font-mono text-[10.5px]">
        {["W", "H", "w/2 − 0.5", "h − 2"].map((f, i) => (
          <motion.span
            key={f}
            className="rounded bg-accent-soft px-1.5 py-0.5 text-brand dark:text-accent"
            {...loop(reduce, { opacity: [0.45, 1] }, 1.6, i * 0.35)}
          >
            {f}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function IllGrid() {
  const reduce = useReducedMotion();
  const rows = [
    ["W1", "1524", "1219", "Hall"],
    ["W2", "1220", "1219", "Bed 1"],
    ["W3", "915", "610", "Bath"],
    ["W4", "1830", "1372", "Bed 2"],
  ];
  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-md border border-line bg-surface font-mono text-[10.5px]">
        <div className="grid grid-cols-4 bg-surface-2 px-2 py-1 text-muted">
          <span>#</span><span>W mm</span><span>H mm</span><span>Floor</span>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={r[0]}
            className="grid grid-cols-4 border-t border-line px-2 py-1"
            initial={reduce ? false : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ delay: i * 0.25 }}
          >
            {r.map((c, j) => <span key={j}>{c}</span>)}
          </motion.div>
        ))}
        <div className="flex items-center gap-1 border-t border-line px-2 py-1 text-muted">
          W5 <motion.span className="inline-block h-3 w-px bg-accent" {...loop(reduce, { opacity: [1, 0] }, 0.6)} />
        </div>
      </div>
    </div>
  );
}

function IllPlan() {
  const reduce = useReducedMotion();
  const pipes = [
    [42, 42],
    [33, 33, 32],
    [32, 32, 32],
    [22, 22, 22, 22],
  ];
  return (
    <div className="grid gap-1.5 p-4">
      {pipes.map((cuts, i) => (
        <div key={i} className="relative flex h-5 gap-[2px] overflow-hidden rounded-sm bg-brushed p-[2px]">
          {cuts.map((c, j) => (
            <motion.span
              key={j}
              className="rounded-[2px]"
              style={{ width: `${c}%`, background: i === 0 ? "var(--cut-4)" : "var(--cut-1)" }}
              initial={reduce ? false : { x: "300%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 140, damping: 18, delay: i * 0.15 + j * 0.08 }}
            />
          ))}
          <span className="flex-1 rounded-[2px] bg-hatch" />
        </div>
      ))}
      <div className="mt-1 flex justify-between font-mono text-[10.5px] text-muted">
        <span>4 pipes</span><span>waste 9.0%</span>
      </div>
    </div>
  );
}

function IllSend() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-full items-center justify-around p-4">
      <div className="w-20 rounded-md border border-line bg-surface p-2 shadow-card">
        <div className="h-2 w-10 rounded-full bg-brand" />
        <div className="mt-2 grid gap-1">
          <span className="h-1 rounded bg-line" /><span className="h-1 rounded bg-line" /><span className="h-1 w-2/3 rounded bg-line" />
        </div>
        <div className="mt-2 h-6 rounded-sm border border-line bg-surface-2" />
      </div>
      <motion.div
        className="absolute top-1/2 left-1/2 text-accent"
        {...(reduce ? {} : {
          animate: { x: [-40, 24], opacity: [0, 1, 1, 0] },
          transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        })}
      >
        <FileText className="size-5 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
      </motion.div>
      <div className="relative w-24 rounded-lg bg-[#e7f6ec] p-2 text-[10px] text-[#0b4d2a] shadow-card dark:bg-[#123524] dark:text-[#bdf0cf]">
        <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-whatsapp text-white">
          <WhatsAppIcon className="size-3.5" />
        </span>
        Quotation_QT-0142.pdf
        <span className="mt-1 flex justify-end gap-0.5 text-[#34b7f1]"><Check className="size-3" /><Check className="-ml-2 size-3" /></span>
      </div>
    </div>
  );
}

const ills = [IllTemplate, IllGrid, IllPlan, IllSend];

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative mt-14 grid gap-10 sm:gap-14">
      {/* progress rail */}
      <div className="absolute top-2 bottom-2 left-[19px] w-px bg-line sm:left-[23px]" aria-hidden="true">
        <motion.div className="h-full w-full origin-top bg-accent" style={{ scaleY }} />
      </div>
      {steps.map((s, i) => {
        const Ill = ills[i];
        return (
          <li key={s.title} className="relative grid gap-5 pl-14 sm:pl-20 md:grid-cols-[1fr_minmax(0,360px)] md:items-center md:gap-10">
            <span className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface font-display text-base font-semibold text-brand shadow-card sm:size-12 sm:text-lg dark:text-accent">
              {i + 1}
            </span>
            <Reveal>
              <h3 className="text-2xl font-semibold sm:text-[28px]">{s.title}</h3>
              <p className="mt-3 max-w-lg text-[16.5px] leading-relaxed text-muted">{s.body}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="aspect-[16/9] overflow-hidden rounded-xl border border-line bg-surface-2 bg-blueprint shadow-card" aria-hidden="true">
                <Ill />
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
