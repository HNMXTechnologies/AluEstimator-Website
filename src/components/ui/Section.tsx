import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className, onNavy }: { children: ReactNode; className?: string; onNavy?: boolean }) {
  return (
    <p
      className={cn(
        "dim-label inline-flex items-center gap-2",
        onNavy ? "text-[#9bb6e6]" : "text-brand dark:text-accent",
        className,
      )}
    >
      {/* dimension-line tick motif */}
      <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden="true" className="shrink-0">
        <path d="M1 1v8M21 1v8M1 5h20" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "left",
  onNavy,
  className,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  onNavy?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow onNavy={onNavy} className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        id={id}
        className={cn(
          "mt-3 text-[clamp(28px,4.2vw,44px)] leading-[1.08] font-semibold",
          onNavy ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {sub && (
        <p className={cn("mt-4 text-[17px] leading-relaxed", onNavy ? "text-on-navy-muted" : "text-muted")}>{sub}</p>
      )}
    </Reveal>
  );
}

export function Section({
  children,
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 sm:py-28", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}
