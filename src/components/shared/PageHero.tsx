import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <section aria-labelledby="page-title" className={cn("relative overflow-hidden border-b border-line", className)}>
      <div
        className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_90%_80%_at_50%_0%,#000_35%,transparent_85%)]"
        aria-hidden="true"
      />
      <div className={cn("container-x relative pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-20", align === "center" && "text-center")}>
        <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
          <Eyebrow className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>
          <h1 id="page-title" className="mt-4 text-[clamp(34px,5.4vw,58px)] leading-[1.04] font-semibold text-gradient-steel">
            {title}
          </h1>
          {sub && <p className="mt-5 text-[17px] leading-relaxed text-muted sm:text-lg">{sub}</p>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
