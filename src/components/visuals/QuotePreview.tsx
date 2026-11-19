import type { QuotationFormatId } from "@/content/quotation-formats";
import { cn } from "@/lib/utils";

/**
 * Stylised previews of the six quotation formats, drawn in SVG.
 * Replace with the real /quotation-formats/*.webp images when supplied.
 */

const INK = "#1f2937";
const RULE = "#cbd5e1";
const SOFT = "#e2e8f0";
const NAVY = "#0f1f3d";
const BLUE = "#1e40af";

function Lines({ x, y, w, n, gap = 6, last = 0.6 }: { x: number; y: number; w: number; n: number; gap?: number; last?: number }) {
  return (
    <g fill={SOFT}>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x} y={y + i * gap} width={i === n - 1 ? w * last : w} height="2.2" rx="1" />
      ))}
    </g>
  );
}

function MiniWindow({ x, y, w, h, net = false }: { x: number; y: number; w: number; h: number; net?: boolean }) {
  const f = Math.max(1.5, Math.min(w, h) * 0.07);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#dfe6ef" stroke="#64748b" strokeWidth=".6" />
      <rect x={x + f} y={y + f} width={w / 2 - f} height={h - 2 * f} fill="#cfe0f5" stroke="#64748b" strokeWidth=".4" />
      <rect x={x + w / 2} y={y + f} width={w / 2 - f} height={h - 2 * f} fill={net ? "#94a3b8" : "#cfe0f5"} stroke="#64748b" strokeWidth=".4" opacity={net ? 0.6 : 1} />
    </g>
  );
}

function TableGrid({ x, y, w, rows, cols, rh = 8, header = true, headFill = SOFT }: { x: number; y: number; w: number; rows: number; cols: number[]; rh?: number; header?: boolean; headFill?: string }) {
  const total = cols.reduce((a, b) => a + b, 0);
  const xs = cols.map((_, i) => x + (cols.slice(0, i).reduce((a, b) => a + b, 0) / total) * w);
  return (
    <g>
      {header && <rect x={x} y={y} width={w} height={rh} fill={headFill} />}
      <rect x={x} y={y} width={w} height={rows * rh} fill="none" stroke={RULE} strokeWidth=".6" />
      {Array.from({ length: rows - 1 }, (_, i) => (
        <line key={i} x1={x} x2={x + w} y1={y + (i + 1) * rh} y2={y + (i + 1) * rh} stroke={RULE} strokeWidth=".4" />
      ))}
      {xs.slice(1).map((xx, i) => (
        <line key={i} x1={xx} x2={xx} y1={y} y2={y + rows * rh} stroke={RULE} strokeWidth=".4" />
      ))}
      {Array.from({ length: rows - 1 }, (_, r) =>
        xs.map((xx, c) => (
          <rect key={`${r}-${c}`} x={xx + 2} y={y + (r + 1) * rh + rh / 2 - 1} width={Math.max(4, (cols[c] / total) * w * 0.55)} height="2" rx="1" fill={SOFT} />
        )),
      )}
    </g>
  );
}

function Classic() {
  return (
    <g>
      <rect x="10" y="10" width="190" height="277" fill="none" stroke={INK} strokeWidth="1.2" />
      <rect x="10" y="10" width="190" height="16" fill="none" stroke={INK} strokeWidth=".8" />
      <text x="105" y="21" textAnchor="middle" fontSize="7" fontWeight="700" fill={INK} fontFamily="ui-sans-serif">QUOTATION</text>
      <line x1="105" x2="105" y1="26" y2="62" stroke={INK} strokeWidth=".6" />
      <line x1="10" x2="200" y1="62" y2="62" stroke={INK} strokeWidth=".6" />
      <Lines x={16} y={32} w={80} n={4} />
      <Lines x={111} y={32} w={80} n={4} />
      <TableGrid x={10} y={62} w={190} rows={14} cols={[1, 6, 2, 2, 2, 3]} rh={9} headFill="#f1f5f9" />
      <rect x="120" y="194" width="80" height="40" fill="none" stroke={INK} strokeWidth=".6" />
      <Lines x={124} y={200} w={70} n={5} />
      <Lines x={16} y={200} w={95} n={3} />
      <Lines x={16} y={244} w={110} n={4} />
      <rect x="150" y="262" width="44" height="2" fill={INK} />
    </g>
  );
}

function Schedule() {
  return (
    <g>
      <rect x="0" y="0" width="210" height="34" fill={NAVY} />
      <rect x="12" y="11" width="12" height="12" rx="2" fill="#7ea6ff" />
      <rect x="28" y="13" width="52" height="4" rx="1" fill="#e8eef8" />
      <rect x="28" y="20" width="34" height="2.5" rx="1" fill="#93a8cc" />
      <rect x="150" y="13" width="46" height="8" rx="1" fill="#1e40af" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(12 ${46 + i * 66})`}>
          <rect width="186" height="58" rx="3" fill="#fff" stroke={RULE} strokeWidth=".7" />
          <rect width="186" height="10" rx="3" fill="#eef2f8" />
          <rect x="6" y="3.5" width="28" height="3" rx="1" fill={BLUE} />
          <MiniWindow x={8} y={16} w={50} h={36} net={i === 1} />
          <Lines x={68} y={18} w={60} n={5} gap={7} />
          <rect x="140" y="38" width="38" height="12" rx="2" fill="#eef2f8" />
          <rect x="146" y="43" width="26" height="3" rx="1" fill={INK} />
        </g>
      ))}
      <rect x="12" y="250" width="186" height="30" rx="3" fill="#eef2f8" />
      <Lines x={18} y={258} w={90} n={3} />
      <rect x="150" y="262" width="42" height="6" rx="1" fill={NAVY} />
    </g>
  );
}

function PerSqft() {
  return (
    <g>
      <rect x="12" y="12" width="40" height="8" rx="1" fill={BLUE} />
      <Lines x={12} y={26} w={70} n={3} />
      <Lines x={140} y={14} w={58} n={4} />
      <rect x="12" y="52" width="186" height="10" fill={NAVY} />
      <TableGrid x={12} y={52} w={186} rows={22} cols={[1, 5, 2, 2, 2, 2, 3]} rh={8.2} header={false} />
      <rect x="120" y="238" width="78" height="26" fill="#eef2f8" />
      <Lines x={126} y={243} w={66} n={3} />
      <Lines x={12} y={242} w={90} n={4} />
    </g>
  );
}

function Gallery() {
  return (
    <g>
      <rect x="12" y="12" width="60" height="8" rx="1" fill={NAVY} />
      <Lines x={12} y={26} w={90} n={2} />
      {["Ground floor", "First floor"].map((_, f) => (
        <g key={f} transform={`translate(12 ${44 + f * 112})`}>
          <rect width="186" height="9" rx="1.5" fill="#eef2f8" />
          <rect x="4" y="3" width="36" height="3" rx="1" fill={BLUE} />
          <rect x="150" y="3" width="32" height="3" rx="1" fill={INK} />
          {[0, 1, 2, 3, 4, 5].map((t) => (
            <g key={t} transform={`translate(${(t % 3) * 63} ${14 + Math.floor(t / 3) * 47})`}>
              <rect width="60" height="43" rx="2.5" fill="#fff" stroke={RULE} strokeWidth=".6" />
              <MiniWindow x={14} y={6} w={32} h={22} net={(t + f) % 3 === 0} />
              <rect x="6" y="33" width="26" height="2.5" rx="1" fill={SOFT} />
              <rect x="40" y="33" width="14" height="2.5" rx="1" fill={INK} />
            </g>
          ))}
        </g>
      ))}
      <rect x="120" y="268" width="78" height="10" rx="1.5" fill={NAVY} />
    </g>
  );
}

function Elevation() {
  const items = [
    { w: 46, h: 38 },
    { w: 34, h: 38 },
    { w: 22, h: 16 },
    { w: 56, h: 44 },
    { w: 28, h: 38 },
  ];
  let x = 18;
  return (
    <g>
      <rect x="6" y="6" width="285" height="198" fill="none" stroke={INK} strokeWidth=".9" />
      <line x1="16" x2="230" y1="130" y2="130" stroke="#94a3b8" strokeWidth=".5" strokeDasharray="3 2" />
      {items.map((it, i) => {
        const g = (
          <g key={i}>
            <MiniWindow x={x} y={130 - it.h} w={it.w} h={it.h} net={i === 3} />
            <line x1={x} x2={x + it.w} y1={136} y2={136} stroke={BLUE} strokeWidth=".5" />
            <line x1={x} x2={x} y1={133} y2={139} stroke={BLUE} strokeWidth=".5" />
            <line x1={x + it.w} x2={x + it.w} y1={133} y2={139} stroke={BLUE} strokeWidth=".5" />
            <circle cx={x + it.w / 2} cy={130 - it.h - 8} r="4" fill="none" stroke={INK} strokeWidth=".5" />
            <text x={x + it.w / 2} y={130 - it.h - 6.5} textAnchor="middle" fontSize="4.5" fill={INK}>{`W${i + 1}`}</text>
          </g>
        );
        x += it.w + 10;
        return g;
      })}
      <g transform="translate(18 158)">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={i * 12} width="12" height="3" fill={i % 2 ? "#fff" : INK} stroke={INK} strokeWidth=".4" />
        ))}
        <text x="0" y="10" fontSize="4.5" fill={INK}>0</text>
        <text x="44" y="10" fontSize="4.5" fill={INK}>2 m</text>
      </g>
      <TableGrid x={18} y={172} w={150} rows={4} cols={[1, 3, 2, 2]} rh={7} />
      <rect x="236" y="150" width="55" height="54" fill="none" stroke={INK} strokeWidth=".7" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="236" x2="291" y1={164 + i * 10} y2={164 + i * 10} stroke={INK} strokeWidth=".4" />
      ))}
      <rect x="240" y="154" width="22" height="6" rx="1" fill={BLUE} />
      <Lines x={240} y={168} w={46} n={4} gap={10} />
    </g>
  );
}

function Letter() {
  return (
    <g>
      <rect x="12" y="12" width="12" height="12" rx="2" fill={NAVY} />
      <rect x="28" y="14" width="56" height="4" rx="1" fill={NAVY} />
      <rect x="28" y="21" width="40" height="2.5" rx="1" fill="#94a3b8" />
      <line x1="12" x2="198" y1="32" y2="32" stroke={BLUE} strokeWidth="1" />
      <Lines x={12} y={42} w={60} n={4} />
      <rect x="150" y="42" width="48" height="2.5" rx="1" fill={SOFT} />
      <rect x="12" y="74" width="120" height="3.5" rx="1" fill={INK} />
      <Lines x={12} y={86} w={186} n={6} gap={6.5} last={0.7} />
      <Lines x={12} y={132} w={186} n={5} gap={6.5} last={0.45} />
      <rect x="12" y="170" width="186" height="20" rx="2" fill="#eef2f8" />
      <rect x="18" y="178" width="70" height="4" rx="1" fill={INK} />
      <rect x="148" y="177" width="44" height="6" rx="1" fill={BLUE} />
      <Lines x={12} y={202} w={130} n={3} gap={6.5} />
      <path d="M14 238c8-8 14 4 22-3s10 2 18-2" stroke={INK} strokeWidth=".8" fill="none" />
      <rect x="12" y="244" width="50" height="2.5" rx="1" fill={SOFT} />
      {/* annexure tabs */}
      {["A", "B", "C"].map((a, i) => (
        <g key={a} transform={`translate(${120 + i * 26} 236)`}>
          <rect width="22" height="30" rx="2" fill="#fff" stroke={RULE} strokeWidth=".7" />
          <text x="11" y="10" textAnchor="middle" fontSize="5" fontWeight="700" fill={BLUE}>{a}</text>
          <rect x="4" y="15" width="14" height="2" rx="1" fill={SOFT} />
          <rect x="4" y="20" width="10" height="2" rx="1" fill={SOFT} />
        </g>
      ))}
    </g>
  );
}

const DRAW: Record<QuotationFormatId, () => React.ReactElement> = {
  "classic-gst": Classic,
  "window-schedule": Schedule,
  "per-sqft": PerSqft,
  "room-gallery": Gallery,
  "elevation-sheet": Elevation,
  "formal-letter": Letter,
};

export function QuotePreview({
  id,
  name,
  landscape = false,
  className,
}: {
  id: QuotationFormatId;
  name: string;
  landscape?: boolean;
  className?: string;
}) {
  const Draw = DRAW[id];
  return (
    <svg
      viewBox={landscape ? "0 0 297 210" : "0 0 210 297"}
      role="img"
      aria-label={`${name} quotation format preview`}
      className={cn("h-auto w-full rounded-[3px] bg-white shadow-[0_1px_2px_rgba(0,0,0,.08),0_10px_30px_-10px_rgba(11,23,40,.35)]", className)}
    >
      <Draw />
    </svg>
  );
}
