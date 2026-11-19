import type { ReactNode } from "react";
import Link from "next/link";
import { FileWarning } from "lucide-react";
import { PageHero } from "./PageHero";

const pages = [
  { href: "/legal/privacy", label: "Privacy policy" },
  { href: "/legal/terms", label: "Terms of service" },
  { href: "/legal/refund", label: "Refund policy" },
];

export function LegalPage({ title, current, children }: { title: string; current: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <div className="container-x py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Legal pages" className="lg:sticky lg:top-24 lg:h-fit">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={p.href === current ? "page" : undefined}
                    className="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-sm text-muted hover:text-ink aria-[current=page]:border-accent aria-[current=page]:bg-accent-soft aria-[current=page]:font-medium aria-[current=page]:text-brand lg:flex lg:border-transparent dark:aria-[current=page]:text-accent"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <article className="max-w-[72ch]">
            <p className="mb-8 flex items-start gap-3 rounded-xl border border-waste/40 bg-waste/10 p-4 text-sm text-ink-soft">
              <FileWarning className="mt-0.5 size-5 shrink-0 text-waste" aria-hidden="true" />
              <span>
                <b>Draft.</b> Placeholder text expanded from a short summary. It has not been reviewed by a lawyer and must be finalised before launch.
              </span>
            </p>
            <div className="prose-ae">{children}</div>
          </article>
        </div>
      </div>
    </>
  );
}
