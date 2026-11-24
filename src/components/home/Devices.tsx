"use client";

import { motion, useInView } from "motion/react";
import { Download } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { shots, type Shot } from "@/components/shared/ScreenPair";
import { asset } from "@/lib/asset";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Real AluEstimator screens (captured from the app) in laptop, tablet and phone frames. */

function useShow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  return { ref, on: inView || reduce, reduce };
}

/* ---------------- Device frames ---------------- */

export function Devices() {
  const { ref, on, reduce } = useShow();
  return (
    <div ref={ref} className="relative mx-auto max-w-5xl pb-10 sm:pb-14" role="img" aria-label="AluEstimator on a laptop, tablet and phone (illustrative screens)">
      <div aria-hidden="true">
        {/* laptop */}
        <div className="relative mx-auto w-[92%] sm:w-[76%]">
          <div className="rounded-t-[14px] bg-gradient-to-b from-[#2a3446] to-[#161d2a] p-[1.2%] pb-0 shadow-lift">
            <div className="mx-auto mb-[0.6%] size-1.5 rounded-full bg-[#3a4558]" />
            <div className="overflow-hidden rounded-t-[4px] ring-1 ring-black/40">
              <RealScreen shot={shots.appQuotations} aspect="16 / 10" sizes="(min-width: 1024px) 760px, 92vw" />
            </div>
          </div>
          <div className="relative -mx-[8%] h-[14px] rounded-b-[14px] bg-gradient-to-b from-[#dfe5ed] via-[#c3ccd8] to-[#8f9bad] shadow-[0_18px_30px_-12px_rgba(11,23,40,.45)]">
            <span className="absolute top-0 left-1/2 h-[5px] w-[16%] -translate-x-1/2 rounded-b-md bg-[#a4afbf]" />
          </div>
        </div>

        {/* tablet */}
        <motion.div
          className="absolute -bottom-2 left-0 w-[44%] sm:-left-3 sm:w-[33%]"
          initial={reduce ? false : { opacity: 0, x: -30, rotate: -3 }}
          animate={on ? { opacity: 1, x: 0, rotate: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-[18px] bg-gradient-to-b from-[#2a3446] to-[#161d2a] p-[2.2%] shadow-lift ring-1 ring-white/5">
            <div className="overflow-hidden rounded-[10px]">
              <RealScreen shot={shots.appWindowGroup} aspect="16 / 10" sizes="(min-width: 1024px) 380px, 44vw" />
            </div>
          </div>
        </motion.div>

        {/* phone */}
        <motion.div
          className="absolute right-0 -bottom-6 w-[26%] sm:-right-2 sm:w-[16.5%]"
          initial={reduce ? false : { opacity: 0, x: 30, rotate: 3 }}
          animate={on ? { opacity: 1, x: 0, rotate: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-[28px] bg-gradient-to-b from-[#2a3446] to-[#161d2a] p-[4%] shadow-lift ring-1 ring-white/5">
            <div className="overflow-hidden rounded-[22px]">
              <RealScreen shot={shots.mTemplates} aspect="9 / 19" sizes="(min-width: 1024px) 190px, 27vw" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** Real app screenshot filling a device screen (top-aligned crop). */
function RealScreen({ shot, aspect, sizes }: { shot: Shot; aspect: string; sizes: string }) {
  return (
    <div className="relative w-full bg-white" style={{ aspectRatio: aspect }}>
      <Image src={asset(shot.src)} alt={shot.alt} fill sizes={sizes} className="object-cover object-top" />
    </div>
  );
}

export function InstallBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium shadow-card">
      <Download className="size-4 text-brand dark:text-accent" aria-hidden="true" /> Install app — no app store needed
    </span>
  );
}
