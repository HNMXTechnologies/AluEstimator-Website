"use client";

import { motion, useInView } from "motion/react";
import {
  BarChart3,
  Bell,
  Boxes,
  Check,
  ChevronDown,
  Download,
  FileText,
  LayoutDashboard,
  LayoutGrid,
  Receipt,
  Search,
  Share2,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { WindowElevation } from "@/components/visuals/WindowElevation";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Illustrative app screens. Each is laid out at a real app size (readable
 * 12–14px type) and scaled to fit its device frame, so it reads like a
 * screenshot. Replace with real screenshots when available.
 */

function Scaled({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={box} className="relative w-full overflow-hidden" style={{ aspectRatio: `${w} / ${h}` }}>
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: w, height: h, transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}

function useShow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  return { ref, on: inView || reduce, reduce };
}

/* ---------------- Laptop: dashboard ---------------- */

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: LayoutGrid, label: "Estimates" },
  { icon: FileText, label: "Quotations" },
  { icon: Receipt, label: "Invoices" },
  { icon: Boxes, label: "Inventory" },
  { icon: Users, label: "Customers" },
  { icon: BarChart3, label: "Reports" },
];

const sales = [42, 48, 45, 56, 52, 61, 58, 70, 66, 74, 71, 82];
const paid = [30, 38, 36, 44, 47, 50, 49, 58, 60, 63, 66, 70];
const toPath = (vals: number[], w: number, h: number) =>
  vals.map((v, i) => `${i ? "L" : "M"}${(i / (vals.length - 1)) * w} ${h - (v / 100) * h}`).join(" ");

const quotes = [
  { no: "QT/25-26/0142", cust: "Mehta Builders", amt: "₹1,84,500", st: "Approved" },
  { no: "QT/25-26/0141", cust: "Shah Interiors", amt: "₹62,300", st: "Sent" },
  { no: "QT/25-26/0140", cust: "Patel Residency", amt: "₹2,41,800", st: "Sent" },
  { no: "QT/25-26/0139", cust: "Desai Clinic", amt: "₹38,900", st: "Draft" },
];
const stCls: Record<string, string> = {
  Approved: "bg-[#dcfce7] text-[#15803d]",
  Sent: "bg-[#e4ebf7] text-[#1e40af]",
  Draft: "bg-[#f1f5f9] text-[#475569]",
};

function DashboardScreen({ on, reduce }: { on: boolean; reduce: boolean }) {
  const CW = 520;
  const CH = 150;
  return (
    <div className="flex h-full bg-[#f7f8fa] font-sans text-[13px] text-[#0b1728]">
      <aside className="flex w-[188px] shrink-0 flex-col bg-[#0f1f3d] px-3 py-4 text-[#b4c3de]">
        <div className="mb-5 flex items-center gap-2 px-2">
          <span className="size-6 rounded-md bg-[#7ea6ff]" />
          <span className="font-display text-[15px] font-bold text-white">
            <span className="text-[#7ea6ff]">Alu</span>Estimator
          </span>
        </div>
        {nav.map((n) => (
          <span key={n.label} className={cn("mb-0.5 flex items-center gap-2.5 rounded-lg px-2.5 py-2", n.active && "bg-white/10 text-white")}>
            <n.icon className="size-4" /> {n.label}
          </span>
        ))}
        <div className="mt-auto rounded-lg bg-white/5 p-2.5 text-[11.5px]">
          <p className="text-white">Setup 4 of 5 done</p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-4/5 rounded-full bg-[#4ade80]" />
          </div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-[#d7dee8] bg-white px-5 py-3">
          <span className="flex items-center gap-1.5 rounded-lg border border-[#d7dee8] px-2.5 py-1.5 font-medium">
            Shree Aluminium · Ahmedabad <ChevronDown className="size-3.5 text-[#4a5a72]" />
          </span>
          <span className="ml-auto flex w-56 items-center gap-2 rounded-lg border border-[#d7dee8] bg-[#f7f8fa] px-2.5 py-1.5 text-[#4a5a72]">
            <Search className="size-3.5" /> Search customers, quotes…
          </span>
          <Bell className="size-4 text-[#4a5a72]" />
          <span className="flex size-7 items-center justify-center rounded-full bg-[#1e40af] text-[11px] font-semibold text-white">RP</span>
        </header>
        <div className="grid flex-1 grid-cols-[1fr_250px] gap-4 p-5">
          <div className="grid content-start gap-4">
            <div className="grid grid-cols-4 gap-3">
              {[
                ["Sales · Nov", "₹8,42,500", "+12%"],
                ["Quotations", "38", "+6"],
                ["Unpaid", "₹1,12,400", "9 invoices"],
                ["Win rate", "64%", "+4%"],
              ].map(([k, v, d]) => (
                <div key={k} className="rounded-xl border border-[#d7dee8] bg-white p-3">
                  <p className="text-[11.5px] text-[#4a5a72]">{k}</p>
                  <p className="mt-1 font-display text-[19px] font-semibold">{v}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-[#15803d]">{d}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-[#d7dee8] bg-white p-4">
              <div className="mb-2 flex items-center gap-4">
                <p className="font-semibold">Sales vs payments</p>
                <span className="flex items-center gap-1.5 text-[11.5px] text-[#4a5a72]"><span className="size-2 rounded-full bg-[#316be0]" /> Sales</span>
                <span className="flex items-center gap-1.5 text-[11.5px] text-[#4a5a72]"><span className="size-2 rounded-full bg-[#15803d]" /> Payments</span>
                <span className="ml-auto rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[11px] text-[#4a5a72]">Last 12 months</span>
              </div>
              <svg viewBox={`0 0 ${CW} ${CH + 4}`} className="h-[150px] w-full overflow-visible">
                {[0.25, 0.5, 0.75].map((g) => (
                  <line key={g} x1="0" x2={CW} y1={CH * g} y2={CH * g} stroke="#eef2f8" />
                ))}
                <motion.path
                  d={`${toPath(sales, CW, CH)} L${CW} ${CH} L0 ${CH} Z`}
                  fill="#316be0"
                  initial={false}
                  animate={{ opacity: on ? 0.1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                />
                <motion.path
                  d={toPath(sales, CW, CH)}
                  fill="none"
                  stroke="#316be0"
                  strokeWidth="2.5"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={on ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
                <motion.path
                  d={toPath(paid, CW, CH)}
                  fill="none"
                  stroke="#15803d"
                  strokeWidth="2"
                  strokeDasharray="0"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={on ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1.4, delay: 0.25, ease: "easeInOut" }}
                />
              </svg>
            </div>
            <div className="rounded-xl border border-[#d7dee8] bg-white">
              <p className="border-b border-[#eef2f8] px-4 py-2.5 font-semibold">Recent quotations</p>
              {quotes.map((q, i) => (
                <motion.div
                  key={q.no}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={on ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="grid grid-cols-[150px_1fr_110px_90px] items-center border-b border-[#eef2f8] px-4 py-2 last:border-0"
                >
                  <span className="font-mono text-[12px] text-[#4a5a72]">{q.no}</span>
                  <span>{q.cust}</span>
                  <span className="text-right font-medium">{q.amt}</span>
                  <span className={cn("justify-self-end rounded-full px-2 py-0.5 text-[11px] font-medium", stCls[q.st])}>{q.st}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="grid content-start gap-4">
            <div className="rounded-xl border border-[#d7dee8] bg-white p-4">
              <p className="font-semibold">Top customers</p>
              {[
                ["Mehta Builders", "₹3,20,400"],
                ["Shah Interiors", "₹1,86,000"],
                ["Patel Residency", "₹1,42,300"],
                ["Desai Clinic", "₹96,500"],
              ].map(([c, v]) => (
                <div key={c} className="flex justify-between border-b border-[#eef2f8] py-2 last:border-0">
                  <span>{c}</span>
                  <span className="text-[#4a5a72]">{v}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-[#d7dee8] bg-white p-4">
              <p className="font-semibold">At the coater</p>
              <p className="mt-1 text-[12px] text-[#4a5a72]">RAL 9016 white · 120 pipes</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eef2f8]">
                <motion.span
                  className="block h-full rounded-full bg-[#316be0]"
                  initial={reduce ? false : { width: "0%" }}
                  animate={on ? { width: "67%" } : undefined}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
              </div>
              <p className="mt-1.5 text-[12px] text-[#4a5a72]">80 of 120 returned</p>
            </div>
            <div className="rounded-xl border border-[#d7dee8] bg-white p-4">
              <p className="font-semibold">Follow-ups today</p>
              {["Site visit · Patel Residency", "Call · Shah Interiors"].map((f) => (
                <p key={f} className="mt-2 flex items-center gap-2 text-[12.5px]">
                  <span className="size-1.5 rounded-full bg-[#d9822b]" /> {f}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Tablet: window builder ---------------- */

const parts = [
  ["Outer frame — top & bottom", "W", "60.0″", "2"],
  ["Outer frame — sides", "H", "48.0″", "2"],
  ["Shutter — top & bottom", "W/3 + 1", "21.0″", "6"],
  ["Shutter — interlock", "H − 2", "46.0″", "6"],
  ["Net shutter — top & bottom", "W/3 + 1", "21.0″", "2"],
  ["Glass (5mm clear)", "(W/3 − 2) × (H − 5)", "18 × 43″", "3"],
];

function BuilderScreen({ on, reduce }: { on: boolean; reduce: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#f7f8fa] text-[13px] text-[#0b1728]">
      <header className="flex items-center gap-3 border-b border-[#d7dee8] bg-white px-5 py-3">
        <span className="dim-label text-[#4a5a72]">27mm series</span>
        <span className="font-display text-[16px] font-semibold">3 Track + Net</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-2.5 py-1 text-[11.5px] font-medium text-[#15803d]">
          <Check className="size-3.5" /> Design complete
        </span>
      </header>
      <div className="flex gap-1.5 border-b border-[#d7dee8] bg-white px-5 py-2">
        {["Profiles", "Glass", "Accessories", "Locks", "Variants"].map((t, i) => (
          <span key={t} className={cn("rounded-md px-2.5 py-1 text-[12px]", i === 0 ? "bg-[#1e40af] text-white" : "text-[#4a5a72]")}>{t}</span>
        ))}
        <span className="ml-auto text-[11.5px] text-[#4a5a72]">Sample size 60 × 48″</span>
      </div>
      <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-4 p-4">
        <div className="grid content-start gap-1.5">
          {parts.map(([n, f, v, q], i) => (
            <motion.div
              key={n}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={on ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg border border-[#d7dee8] bg-white px-3 py-2"
            >
              <span className="truncate">{n}</span>
              <span className="rounded bg-[#e4ebf7] px-1.5 py-0.5 font-mono text-[11.5px] text-[#1e40af]">{f}</span>
              <span className="w-[86px] text-right font-mono text-[12px] text-[#4a5a72]">
                {v} <span className="text-[#8a9bb4]">×{q}</span>
              </span>
            </motion.div>
          ))}
          <div className="mt-1 grid grid-cols-5 gap-1">
            {["Profiles", "Glass", "Locks", "Accessories", "Coating"].map((c) => (
              <span key={c} className="flex items-center gap-1 rounded-md bg-[#dcfce7] px-1.5 py-1 text-[10.5px] text-[#15803d]">
                <Check className="size-3" /> {c}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl border border-[#d7dee8] bg-white bg-blueprint p-3">
          <WindowElevation width={60} height={48} shutters={3} net widthLabel="60″" heightLabel="48″" idPrefix="dev-tab" title="" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Phone: cutting list ---------------- */

const pipes = [
  [{ l: 60, k: "f" }, { l: 60, k: "f" }],
  [{ l: 48, k: "f" }, { l: 48, k: "f" }, { l: 46, k: "s" }],
  [{ l: 46, k: "s" }, { l: 46, k: "s" }, { l: 46, k: "s" }],
  [{ l: 31, k: "s" }, { l: 31, k: "s" }, { l: 31, k: "s" }, { l: 31, k: "s" }],
];

function PhoneScreen({ on, reduce }: { on: boolean; reduce: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#f7f8fa] text-[13px] text-[#0b1728]">
      <div className="bg-[#0f1f3d] px-4 pt-3 pb-4 text-white">
        <div className="flex items-center justify-between text-[11px] font-semibold">
          <span>10:42</span>
          <span className="h-5 w-20 rounded-full bg-black" />
          <span>5G ▮▮▮</span>
        </div>
        <p className="mt-4 text-[11.5px] text-[#b4c3de]">Mehta bungalow · W1</p>
        <p className="font-display text-[19px] font-semibold">Cutting list</p>
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-lg bg-white/10 p-1 text-center text-[11.5px]">
          <span className="rounded-md bg-white py-1 font-medium text-[#0f1f3d]">Cuts</span>
          <span className="py-1 text-[#b4c3de]">Glass</span>
          <span className="py-1 text-[#b4c3de]">Purchase</span>
        </div>
      </div>
      <div className="grid flex-1 content-start gap-2.5 p-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-[#d7dee8] bg-white p-2.5">
            <p className="text-[11px] text-[#4a5a72]">Pipes</p>
            <p className="font-display text-[18px] font-semibold">4 × 12 ft</p>
          </div>
          <div className="rounded-xl border border-[#d7dee8] bg-white p-2.5">
            <p className="text-[11px] text-[#4a5a72]">Waste</p>
            <p className="font-display text-[18px] font-semibold">9.0%</p>
          </div>
        </div>
        <div className="grid gap-1.5 rounded-xl border border-[#d7dee8] bg-white p-2.5">
          {pipes.map((p, i) => (
            <div key={i} className="flex h-[18px] gap-[2px] overflow-hidden rounded bg-brushed p-[2px]">
              {p.map((c, j) => (
                <motion.span
                  key={j}
                  className="flex items-center justify-center rounded-[2px] font-mono text-[9px] text-white"
                  style={{ width: `${(c.l / 144) * 100}%`, background: c.k === "f" ? "#0f1f3d" : "#316be0" }}
                  initial={reduce ? false : { x: 120, opacity: 0 }}
                  animate={on ? { x: 0, opacity: 1 } : undefined}
                  transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.4 + i * 0.15 + j * 0.06 }}
                >
                  {c.l}″
                </motion.span>
              ))}
              <span className="flex-1 rounded-[2px] bg-hatch" />
            </div>
          ))}
        </div>
        {[
          ["Outer frame", "1524 mm", "2"],
          ["Outer frame", "1219 mm", "2"],
          ["Shutter top", "787 mm", "4"],
          ["Shutter side", "1168 mm", "4"],
        ].map(([n, l, q]) => (
          <div key={n + l} className="flex items-center justify-between rounded-lg border border-[#d7dee8] bg-white px-3 py-2">
            <span>{n}</span>
            <span className="font-mono text-[12px]">
              {l} <span className="text-[#8a9bb4]">× {q}</span>
            </span>
          </div>
        ))}
        <span className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#128c4a] py-2.5 font-semibold text-white">
          <Share2 className="size-4" /> Share on WhatsApp
        </span>
      </div>
      <nav className="grid grid-cols-4 border-t border-[#d7dee8] bg-white px-2 pt-2 pb-4 text-center text-[10.5px] text-[#4a5a72]">
        {[
          { icon: LayoutDashboard, label: "Home" },
          { icon: LayoutGrid, label: "Estimates", active: true },
          { icon: FileText, label: "Quotes" },
          { icon: Users, label: "Customers" },
        ].map((n) => (
          <span key={n.label} className={cn("flex flex-col items-center gap-0.5", n.active && "font-semibold text-[#1e40af]")}>
            <n.icon className="size-[18px]" /> {n.label}
          </span>
        ))}
      </nav>
    </div>
  );
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
              <Scaled w={1180} h={720}>
                <DashboardScreen on={on} reduce={reduce} />
              </Scaled>
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
              <Scaled w={880} h={560}>
                <BuilderScreen on={on} reduce={reduce} />
              </Scaled>
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
              <Scaled w={360} h={740}>
                <PhoneScreen on={on} reduce={reduce} />
              </Scaled>
            </div>
          </div>
        </motion.div>
      </div>
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
