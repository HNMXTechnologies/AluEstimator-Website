"use client";

import { ChevronsLeftRight, CheckCircle2, Send } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { beforeAfter } from "@/content/home";

function NotebookScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fbf7ea] text-[#27324a]" aria-hidden="true">
      {/* ruled lines + margin */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0_31px,#bcd0ea_31px_32px)]" />
      <div className="absolute inset-y-0 left-10 w-px bg-[#e6a0a0] sm:left-14" />
      <div className="relative h-full pt-12 pb-3 pr-4 pl-14 font-hand text-[19px] leading-[32px] sm:pl-20 sm:text-[22px]">
        <p className="font-semibold">Mehta bungalow — 1st floor</p>
        <p>W1 = 60 × 48 &nbsp; (2 track)</p>
        <p>
          frame 60+60+48+48 = <span className="line-through decoration-2">206</span> 216
        </p>
        <p>shutter 31 × 4 = 124 &nbsp; 46 × 4 = 184</p>
        <p>
          total 524″ ÷ 144 = 3.6 → <span className="rounded-full border-2 border-[#c0392b] px-1">4 or 5??</span>
        </p>
        <p>
          glass 28 × 43 = <span className="text-[#c0392b]">? sq ft</span>
        </p>
        <p className="opacity-80">W2, W3, W4 … same again</p>
        <p>
          Total ₹ <span className="line-through decoration-2">17,9</span> 18,4?0 + GST??
        </p>
      </div>
      {/* calculator */}
      <div className="absolute right-4 bottom-4 hidden w-24 rotate-6 rounded-lg bg-[#2f3a4c] p-2 shadow-lg sm:block">
        <div className="mb-1.5 rounded bg-[#b9c7a5] px-1 text-right font-mono text-xs text-[#1d2a12]">524÷144</div>
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="h-3 rounded-sm bg-[#556178]" />
          ))}
        </div>
      </div>
      {/* coffee ring */}
      <div className="absolute top-6 right-8 size-20 rounded-full border-[6px] border-[#b07a3a]/20" />
    </div>
  );
}

function ResultScene() {
  const rows: [string, string][] = [
    ["Pipes used", "4 × 12 ft"],
    ["Waste", "9.0 %"],
    ["Glass", "2 pcs · 711 × 1092 mm"],
    ["Aluminium weight", "auto-calculated"],
    ["GST 18 %", "added with breakup"],
  ];
  return (
    <div className="absolute inset-0 overflow-hidden bg-blueprint bg-surface-2" aria-hidden="true">
      <div className="flex h-full items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-sm rounded-xl border border-line bg-surface p-4 shadow-lift sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="dim-label text-muted">Mehta bungalow · W1</p>
              <p className="mt-1 font-display text-lg font-semibold">1524 × 1219 mm · 2 Track</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
              <CheckCircle2 className="size-3.5" /> Calculated
            </span>
          </div>
          <dl className="mt-4 divide-y divide-line text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-medium tabular">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-navy px-3 py-2.5 text-on-navy">
            <span className="text-sm">Quotation ready</span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-whatsapp px-2.5 py-1 text-xs font-semibold text-white">
              <Send className="size-3.5" /> WhatsApp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div>
      <div
        ref={box}
        className="relative h-[440px] touch-pan-y overflow-hidden rounded-2xl border border-line shadow-lift select-none sm:h-[460px]"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <ResultScene />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <NotebookScene />
        </div>

        {/* labels */}
        <span className="absolute top-3 left-3 rounded-full bg-[#27324a] px-3 py-1 text-xs font-semibold text-white">
          Before · {beforeAfter.before.label}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
          After · {beforeAfter.after.label}
        </span>

        {/* handle */}
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(11,23,40,.2)]" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-lift">
            <ChevronsLeftRight className="size-5" aria-hidden="true" />
          </span>
        </div>

        {/* keyboard / screen-reader control */}
        <input
          type="range"
          min={4}
          max={96}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare notebook with AluEstimator"
          className="peer absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0"
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <p className="text-muted">
          <span className="font-semibold text-ink">{beforeAfter.before.label}:</span> {beforeAfter.before.caption}
        </p>
        <p className="text-right text-muted">
          <span className="font-semibold text-ink">{beforeAfter.after.label}:</span> {beforeAfter.after.caption}
        </p>
      </div>
    </div>
  );
}
