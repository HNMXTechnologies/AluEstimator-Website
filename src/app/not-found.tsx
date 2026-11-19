import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="dim-label text-brand dark:text-accent">Error 404</p>
        <h1 className="mt-4 text-[clamp(32px,5vw,52px)] leading-tight font-semibold">This page didn&apos;t make the cutting list.</h1>
        <p className="mt-4 max-w-md text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row">
          <ButtonLink href="/" size="lg">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">Book a free demo</ButtonLink>
        </div>
      </div>
    </section>
  );
}
