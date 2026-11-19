import { cn } from "@/lib/utils";

/** Recreated text logo — swap for /brand/logo.svg when the asset is supplied. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8 shrink-0", className)}>
      <defs>
        <linearGradient id="ae-tile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1A2E57" />
          <stop offset="1" stopColor="#0F1F3D" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#ae-tile)" />
      {/* Stylised sliding window: frame + two shutters */}
      <rect x="7" y="8" width="18" height="16" rx="1.2" fill="none" stroke="#E8EEF8" strokeWidth="1.8" />
      <rect x="9.5" y="10.5" width="7.5" height="11" fill="#7EA6FF" fillOpacity=".35" stroke="#7EA6FF" strokeWidth="1.2" />
      <rect x="15" y="10.5" width="7.5" height="11" fill="#7EA6FF" fillOpacity=".18" stroke="#E8EEF8" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo({ className, onNavy = false }: { className?: string; onNavy?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-[19px] font-bold leading-none tracking-tight",
          onNavy ? "text-on-navy" : "text-ink-soft dark:text-ink",
        )}
      >
        <span className={onNavy ? "text-[#7EA6FF]" : "text-brand"}>Alu</span>Estimator
      </span>
    </span>
  );
}
