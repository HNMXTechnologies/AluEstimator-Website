import { cn } from "@/lib/utils";

type Props = {
  /** Real proportions (any unit). */
  width: number;
  height: number;
  /** Glass shutters across the opening. */
  shutters?: 2 | 3;
  net?: boolean;
  className?: string;
  /** Labels for dimension lines; omit to hide them. */
  widthLabel?: string;
  heightLabel?: string;
  title?: string;
  /** Unique per instance when several drawings share a page. */
  idPrefix?: string;
};

/**
 * Front elevation of an aluminium sliding window drawn in SVG.
 * Used as the hero fallback, in the mini-estimator and in mock screens.
 */
export function WindowElevation({
  width,
  height,
  shutters = 2,
  net = false,
  className,
  widthLabel,
  heightLabel,
  title = "Front elevation of an aluminium sliding window",
  idPrefix = "we",
}: Props) {
  const p = `${idPrefix}-`;
  const dims = Boolean(widthLabel || heightLabel);
  const pad = dims ? 44 : 6;
  const maxW = 360;
  const maxH = 300;
  const s = Math.min(maxW / width, maxH / height);
  const W = Math.max(60, width * s);
  const H = Math.max(60, height * s);
  const vbW = W + pad * 2;
  const vbH = H + pad * 2;
  const x0 = pad;
  const y0 = dims ? pad - 8 : pad;
  const f = Math.max(6, Math.min(W, H) * 0.045); // frame thickness
  const innerX = x0 + f;
  const innerY = y0 + f;
  const innerW = W - f * 2;
  const innerH = H - f * 2;
  const overlap = f * 0.9;
  const shW = innerW / shutters + overlap * ((shutters - 1) / shutters);
  const sf = f * 0.75; // shutter frame

  const shutterRects = Array.from({ length: shutters }, (_, i) => ({
    x: innerX + i * (shW - overlap),
    y: innerY,
    w: shW,
    h: innerH,
  }));

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      role="img"
      aria-label={title}
      className={cn("h-auto w-full overflow-visible", className)}
    >
      <defs>
        <linearGradient id={`${p}alu-v`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9d2de" />
          <stop offset=".45" stopColor="#f1f4f8" />
          <stop offset="1" stopColor="#aeb9c8" />
        </linearGradient>
        <linearGradient id={`${p}alu-h`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef2f7" />
          <stop offset="1" stopColor="#b3bfcd" />
        </linearGradient>
        <linearGradient id={`${p}glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bcd6f5" stopOpacity=".75" />
          <stop offset=".5" stopColor="#dbe9fa" stopOpacity=".45" />
          <stop offset="1" stopColor="#9fc1ec" stopOpacity=".7" />
        </linearGradient>
        <pattern id={`${p}mesh`} width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M0 0H4M0 0V4" stroke="#3a4658" strokeWidth=".6" opacity=".55" />
        </pattern>
      </defs>

      {/* Outer frame */}
      <rect x={x0} y={y0} width={W} height={H} rx="2" fill={`url(#${p}alu-h)`} stroke="#7d8ba0" strokeWidth="1" />
      <rect x={innerX} y={innerY} width={innerW} height={innerH} fill="#1b2a44" opacity=".08" />

      {/* Glass shutters */}
      {shutterRects.map((r, i) => (
        <g key={i}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={`url(#${p}alu-v)`} stroke="#7d8ba0" strokeWidth=".8" />
          <rect
            x={r.x + sf}
            y={r.y + sf}
            width={r.w - sf * 2}
            height={r.h - sf * 2}
            fill={`url(#${p}glass)`}
            stroke="#8796ab"
            strokeWidth=".6"
          />
          {/* reflection streaks */}
          <path
            d={`M${r.x + sf + r.w * 0.18} ${r.y + sf + 4} l${-r.w * 0.12} ${r.h * 0.32}`}
            stroke="#fff"
            strokeOpacity=".7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d={`M${r.x + sf + r.w * 0.3} ${r.y + sf + 4} l${-r.w * 0.06} ${r.h * 0.16}`}
            stroke="#fff"
            strokeOpacity=".5"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* handle on outer shutters */}
          {(i === 0 || i === shutters - 1) && (
            <rect
              x={i === 0 ? r.x + 1.5 : r.x + r.w - sf + 1.5}
              y={r.y + r.h / 2 - Math.min(16, r.h * 0.09)}
              width={Math.max(2, sf - 3)}
              height={Math.min(32, r.h * 0.18)}
              rx="1.2"
              fill="#2b3340"
            />
          )}
        </g>
      ))}

      {/* Mosquito net shutter (in front, right side) */}
      {net && (
        <g>
          <rect
            x={innerX + innerW - shW}
            y={innerY - 1}
            width={shW}
            height={innerH + 2}
            fill={`url(#${p}alu-v)`}
            stroke="#5d6b80"
            strokeWidth=".8"
          />
          <rect
            x={innerX + innerW - shW + sf}
            y={innerY + sf - 1}
            width={shW - sf * 2}
            height={innerH - sf * 2 + 2}
            fill="#44516a"
            fillOpacity=".25"
          />
          <rect
            x={innerX + innerW - shW + sf}
            y={innerY + sf - 1}
            width={shW - sf * 2}
            height={innerH - sf * 2 + 2}
            fill={`url(#${p}mesh)`}
          />
        </g>
      )}

      {/* Dimension lines */}
      {widthLabel && (
        <g className="text-muted" stroke="currentColor" fill="currentColor">
          <path d={`M${x0} ${y0 + H + 10}v18M${x0 + W} ${y0 + H + 10}v18`} strokeWidth=".8" fill="none" />
          <path d={`M${x0} ${y0 + H + 22}H${x0 + W}`} strokeWidth=".8" fill="none" />
          <path d={`M${x0 + 4} ${y0 + H + 18}l-4 4 4 4M${x0 + W - 4} ${y0 + H + 18}l4 4-4 4`} strokeWidth=".8" fill="none" />
          <rect x={x0 + W / 2 - 38} y={y0 + H + 14} width="76" height="16" rx="3" className="fill-surface" stroke="none" />
          <text
            x={x0 + W / 2}
            y={y0 + H + 26}
            textAnchor="middle"
            stroke="none"
            className="fill-ink font-mono text-[11px]"
          >
            W {widthLabel}
          </text>
        </g>
      )}
      {heightLabel && (
        <g className="text-muted" stroke="currentColor" fill="currentColor">
          <path d={`M${x0 + W + 10} ${y0}h18M${x0 + W + 10} ${y0 + H}h18`} strokeWidth=".8" fill="none" />
          <path d={`M${x0 + W + 22} ${y0}V${y0 + H}`} strokeWidth=".8" fill="none" />
          <path d={`M${x0 + W + 18} ${y0 + 4}l4 -4 4 4M${x0 + W + 18} ${y0 + H - 4}l4 4 4 -4`} strokeWidth=".8" fill="none" />
          <g transform={`translate(${x0 + W + 22} ${y0 + H / 2}) rotate(-90)`}>
            <rect x="-38" y="-8" width="76" height="16" rx="3" className="fill-surface" stroke="none" />
            <text y="4" textAnchor="middle" stroke="none" className="fill-ink font-mono text-[11px]">
              H {heightLabel}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}
