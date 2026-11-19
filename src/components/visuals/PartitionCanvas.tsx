"use client";

import { animate, motion, useInView, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { Columns3, Fan, MousePointer2, Rows3, SquareDashedMousePointer, AppWindow, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Illustrative partition configurator. One looping timeline (0 → 1) drives
 * every element, so the whole sequence moves as one continuous animation:
 * frame → glass → bays → transom → drag a mullion (sizes update live) →
 * drop a window into a pane → fit a fan → calculated summary.
 */

const X = 36;
const Y = 26;
const W = 408;
const H = 216;
const MM = 3048; // partition width in mm
const HMM = 2134;
const LOOP_S = 11;

const toMM = (px: number) => Math.round(((px / W) * MM) / 5) * 5;

function useT(v: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(v, input, output, { clamp: true });
}

const TOOLS = [
  { icon: SquareDashedMousePointer, label: "Frame", at: 0 },
  { icon: Columns3, label: "Split bay", at: 0.2 },
  { icon: Rows3, label: "Split pane", at: 0.32 },
  { icon: AppWindow, label: "Fit window", at: 0.55 },
  { icon: Fan, label: "Fan", at: 0.68 },
];

function Tool({ t, i, icon: Icon, label }: { t: MotionValue<number>; i: number; icon: typeof Fan; label: string }) {
  const start = TOOLS[i].at;
  const end = TOOLS[i + 1]?.at ?? 0.8;
  const bg = useTransform(t, (v) => (v >= start && v < end ? "var(--accent-soft)" : "rgba(0,0,0,0)"));
  const color = useTransform(t, (v) => (v >= start && v < end ? "var(--brand)" : "var(--muted)"));
  return (
    <motion.span style={{ backgroundColor: bg, color }} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium whitespace-nowrap">
      <Icon className="size-3.5" aria-hidden="true" />
      <span className="hidden md:inline">{label}</span>
    </motion.span>
  );
}

export function PartitionCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const t = useMotionValue(1);

  useEffect(() => {
    if (reduce) {
      t.set(0.9);
      return;
    }
    if (!inView) return;
    t.set(0);
    const c = animate(t, 1, { duration: LOOP_S, ease: "linear", repeat: Infinity });
    return () => c.stop();
  }, [inView, reduce, t]);

  // Whole-scene fade at the loop seam
  const scene = useT(t, [0, 0.02, 0.95, 1], [0, 1, 1, 0]);

  // 1. frame + glass
  const frameDraw = useT(t, [0.02, 0.1], [0, 1]);
  const glass = useT(t, [0.08, 0.16], [0, 1]);
  const sheenX = useT(t, [0.1, 0.22], [X - 120, X + W + 40]);

  // 2. bays slide in from the edges
  const m1 = useT(t, [0.2, 0.3, 0.44, 0.54], [X, X + W / 3, X + W / 3, X + W * 0.38]);
  const m2 = useT(t, [0.22, 0.32], [X + W, X + (2 * W) / 3]);
  const baysOn = useT(t, [0.19, 0.21], [0, 1]);

  // 3. transom across bays 2 + 3
  const transomY = useT(t, [0.32, 0.42], [Y, Y + H * 0.34]);
  const transomOn = useT(t, [0.31, 0.33], [0, 1]);

  // dimensions
  const dimsOn = useT(t, [0.3, 0.36], [0, 1]);
  const w1 = useTransform(() => `${toMM(m1.get() - X)}`);
  const w2 = useTransform(() => `${toMM(m2.get() - m1.get())}`);
  const w3 = useTransform(() => `${MM - toMM(m1.get() - X) - toMM(m2.get() - m1.get())}`);
  const c1 = useTransform(() => (X + m1.get()) / 2);
  const c2 = useTransform(() => (m1.get() + m2.get()) / 2);
  const c3 = useTransform(() => (m2.get() + X + W) / 2);
  const chain = useTransform(() => `M${X} ${Y + H + 16}H${X + W}M${X} ${Y + H + 10}v12M${m1.get()} ${Y + H + 10}v12M${m2.get()} ${Y + H + 10}v12M${X + W} ${Y + H + 10}v12`);

  // 4. cursor drags mullion 1
  const cursorOn = useT(t, [0.4, 0.43, 0.55, 0.58], [0, 1, 1, 0]);
  const cursorX = useTransform(() => m1.get() + 6);
  const cursorY = useT(t, [0.4, 0.44], [Y + H * 0.85, Y + H * 0.66]);
  const grab = useT(t, [0.43, 0.45, 0.53, 0.55], [1, 0.85, 0.85, 1]);
  const m1Glow = useT(t, [0.43, 0.45, 0.54, 0.57], [0, 1, 1, 0]);

  // 5. window drops into bay 2 lower pane
  const paneTop = Y + H * 0.34;
  const WIN_TOP = paneTop + 30; // window head height within the lower pane
  const WIN_H = H * 0.36;
  const winOn = useT(t, [0.56, 0.6], [0, 1]);
  const winDrop = useT(t, [0.56, 0.63, 0.655, 0.67], [-150, 6, -2, 0]);
  const winX = useTransform(() => m1.get() + 14);
  const winW = useTransform(() => Math.max(20, m2.get() - m1.get() - 28));
  const winHalf = useTransform(() => Math.max(10, (m2.get() - m1.get() - 28) / 2));
  const winMidX = useTransform(() => m1.get() + 14 + Math.max(10, (m2.get() - m1.get() - 28) / 2));
  const snapGlow = useT(t, [0.655, 0.67, 0.74], [0, 1, 0]);

  // 6. fan in bay 3 top pane
  const fanCx = useTransform(() => (m2.get() + X + W) / 2);
  const fanCy = Y + (H * 0.34) / 2;
  const fanOn = useT(t, [0.68, 0.72], [0, 1]);
  const fanX = useTransform(() => fanCx.get() - 240);
  const fanY = useT(t, [0.68, 0.73], [-30, 0]);
  const paneX1 = useTransform(() => winX.get() + 5);
  const paneW = useTransform(() => winHalf.get() - 5);
  const handleX = useTransform(() => winMidX.get() - 3);
  const glowX = useTransform(() => winX.get() - 4);
  const glowW = useTransform(() => winW.get() + 8);

  // 7. summary
  const sumOn = useT(t, [0.78, 0.82], [0, 1]);
  const sumY = useT(t, [0.78, 0.82], [12, 0]);

  // inspector
  const selBay2 = useT(t, [0.54, 0.56], [0, 1]);
  const fitted = useT(t, [0.66, 0.68], [0, 1]);
  const fanFitted = useT(t, [0.74, 0.76], [0, 1]);

  return (
    <div ref={ref} className={cn("overflow-hidden rounded-2xl border border-line bg-surface shadow-lift", className)}>
      {/* toolbar */}
      <div className="flex items-center gap-1 border-b border-line bg-surface-2 px-3 py-2" aria-hidden="true">
        <span className="mr-2 truncate text-xs font-medium text-ink">Partition · Office cabin</span>
        <span className="ml-auto flex items-center gap-0.5">
          {TOOLS.map((tool, i) => (
            <Tool key={tool.label} t={t} i={i} icon={tool.icon} label={tool.label} />
          ))}
        </span>
      </div>

      <div className="grid sm:grid-cols-[1fr_170px]">
        <svg
          viewBox="0 0 480 290"
          className="w-full bg-blueprint"
          role="img"
          aria-label="A partition drawn on a canvas: split into three bays, a transom added, a divider dragged to resize, a sliding window fitted into one pane and a fan into another"
        >
          <defs>
            <linearGradient id="pc-glass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#cfe2f8" />
              <stop offset="1" stopColor="#b3cff0" />
            </linearGradient>
            <linearGradient id="pc-sheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="pc-clip">
              <rect x={X} y={Y} width={W} height={H} />
            </clipPath>
            <filter id="pc-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <motion.g style={{ opacity: scene }}>
            {/* glass */}
            <motion.rect x={X} y={Y} width={W} height={H} fill="url(#pc-glass)" style={{ opacity: glass }} />
            <g clipPath="url(#pc-clip)">
              <motion.rect y={Y} width="70" height={H} fill="url(#pc-sheen)" transform="skewX(-18)" style={{ x: sheenX, opacity: glass }} />
            </g>

            {/* frame */}
            <motion.rect
              x={X}
              y={Y}
              width={W}
              height={H}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="5"
              strokeLinejoin="round"
              style={{ pathLength: frameDraw }}
            />

            {/* transom (bays 2 + 3) */}
            <motion.line x1={m1} x2={X + W} y1={transomY} y2={transomY} stroke="var(--ink)" strokeWidth="3" style={{ opacity: transomOn }} />

            {/* mullions */}
            <motion.line x1={m1} x2={m1} y1={Y} y2={Y + H} stroke="var(--accent)" strokeWidth="8" filter="url(#pc-glow)" style={{ opacity: m1Glow }} />
            <motion.line x1={m1} x2={m1} y1={Y} y2={Y + H} stroke="var(--ink)" strokeWidth="3.5" style={{ opacity: baysOn }} />
            <motion.line x1={m2} x2={m2} y1={Y} y2={Y + H} stroke="var(--ink)" strokeWidth="3.5" style={{ opacity: baysOn }} />

            {/* fitted window */}
            <motion.g style={{ opacity: winOn, y: winDrop }}>
              <motion.rect x={winX} y={WIN_TOP} width={winW} height={WIN_H} rx="1.5" fill="#e3e9f1" stroke="#5d6b80" strokeWidth="2" />
              <motion.rect x={paneX1} y={WIN_TOP + 5} width={paneW} height={WIN_H - 10} fill="#d6e6f8" stroke="#5d6b80" strokeWidth="1" />
              <motion.rect x={winMidX} y={WIN_TOP + 5} width={paneW} height={WIN_H - 10} fill="#d6e6f8" stroke="#5d6b80" strokeWidth="1" />
              <motion.rect x={handleX} y={WIN_TOP + WIN_H / 2 - 7} width="2.5" height="14" rx="1" fill="#2b3340" />
            </motion.g>
            <motion.rect
              x={glowX}
              y={WIN_TOP - 4}
              width={glowW}
              height={WIN_H + 8}
              rx="4"
              fill="none"
              stroke="var(--success)"
              strokeWidth="2.5"
              style={{ opacity: snapGlow }}
            />

            {/* fan */}
            <motion.g style={{ opacity: fanOn, x: fanX, y: fanY }}>
              <circle cx="240" cy={fanCy} r="24" fill="var(--surface)" stroke="#5d6b80" strokeWidth="2" />
              <g className="animate-[spin_1.6s_linear_infinite] motion-reduce:animate-none" style={{ transformOrigin: `240px ${fanCy}px`, transformBox: "view-box" }}>
                {[0, 120, 240].map((a) => (
                  <ellipse key={a} cx="240" cy={fanCy - 10} rx="5.5" ry="11" fill="#8a9bb4" transform={`rotate(${a} 240 ${fanCy})`} />
                ))}
              </g>
              <circle cx="240" cy={fanCy} r="3.5" fill="#5d6b80" />
            </motion.g>

            {/* dimension chain */}
            <motion.g style={{ opacity: dimsOn }} className="text-accent">
              <motion.path d={chain} stroke="currentColor" strokeWidth="1" fill="none" />
              {[
                { c: c1, v: w1 },
                { c: c2, v: w2 },
                { c: c3, v: w3 },
              ].map((d, i) => (
                <motion.text key={i} x={d.c} y={Y + H + 33} textAnchor="middle" fontSize="11" fill="currentColor" className="font-mono">
                  {d.v}
                </motion.text>
              ))}
              <path d={`M${X - 16} ${Y}V${Y + H}M${X - 22} ${Y}h12M${X - 22} ${Y + H}h12`} stroke="currentColor" strokeWidth="1" fill="none" />
              <text transform={`translate(${X - 22} ${Y + H / 2}) rotate(-90)`} textAnchor="middle" fontSize="11" fill="currentColor" className="font-mono">
                {HMM}
              </text>
            </motion.g>

            {/* cursor */}
            <motion.g style={{ opacity: cursorOn, x: cursorX, y: cursorY, scale: grab }}>
              <path d="M0 0 L0 17 L4.5 13 L7.5 20 L10.5 18.6 L7.6 11.8 L13 11.8 Z" fill="var(--ink)" stroke="var(--surface)" strokeWidth="1.2" />
            </motion.g>
          </motion.g>
        </svg>

        {/* inspector */}
        <aside className="hidden border-l border-line p-3 text-[11.5px] sm:block" aria-hidden="true">
          <p className="dim-label text-muted">Inspector</p>
          <div className="mt-2 rounded-lg border border-line bg-bg p-2">
            <p className="text-muted">Overall</p>
            <p className="font-mono font-medium">{MM} × {HMM}</p>
          </div>
          <motion.div style={{ opacity: selBay2 }} className="mt-2 rounded-lg border border-accent/50 bg-accent-soft/40 p-2">
            <p className="text-muted">Bay 2 · lower pane</p>
            <p className="font-mono font-medium">
              <motion.span>{w2}</motion.span> mm wide
            </p>
            <motion.p style={{ opacity: fitted }} className="mt-1 flex items-center gap-1 text-success">
              <MousePointer2 className="size-3" /> 2 Track window
            </motion.p>
          </motion.div>
          <motion.div style={{ opacity: fanFitted }} className="mt-2 rounded-lg border border-line bg-bg p-2">
            <p className="text-muted">Bay 3 · upper pane</p>
            <p className="font-medium">Exhaust fan</p>
          </motion.div>
        </aside>
      </div>

      {/* summary */}
      <div className="flex min-h-12 items-center border-t border-line bg-surface-2 px-4 py-2" aria-hidden="true">
        <motion.div style={{ opacity: sumOn, y: sumY }} className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium text-success">
            <CheckCircle2 className="size-4" /> Calculated with the project&apos;s windows
          </span>
          <span className="text-muted">Same cutting list · same quotation</span>
        </motion.div>
      </div>
    </div>
  );
}
