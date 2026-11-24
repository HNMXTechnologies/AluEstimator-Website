import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/** Official AluEstimator logo (public/brand), with the dark variant in dark mode and on navy. */
export function Logo({ className, onNavy = false }: { className?: string; onNavy?: boolean }) {
  const cls = cn("h-8 w-auto", className);
  if (onNavy) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset("/brand/logo-dark.svg")} alt="AluEstimator" width={133} height={32} className={cls} />;
  }
  return (
    <span className="inline-flex">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/brand/logo.svg")} alt="AluEstimator" width={133} height={32} className={cn(cls, "dark:hidden")} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/brand/logo-dark.svg")} alt="" aria-hidden="true" width={133} height={32} className={cn(cls, "hidden dark:block")} />
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset("/brand/mark.svg")} alt="" aria-hidden="true" width={32} height={32} className={cn("size-8 shrink-0", className)} />;
}
