import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { FaqAccordion } from "@/components/ui/Accordion";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";
import { faqs } from "@/content/faq";
import { canonicalPath, site } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ — questions about AluEstimator",
  description:
    "Answers about installing AluEstimator, using your own window designs, units including dora, GST quotations, WhatsApp sharing, staff access, branches, Excel import and data safety.",
  alternates: { canonical: canonicalPath("/faq") },
};

const groups = [
  { title: "Getting started", ids: [0, 7, 8] },
  { title: "Estimates & quotations", ids: [1, 2, 3, 4] },
  { title: "Team, branches & security", ids: [5, 6, 9] },
];

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <PageHero eyebrow="FAQ" title="Questions fabricators ask us." sub="Can't find your answer? Message us on WhatsApp — we reply during support hours." />

      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
          <aside className="h-fit lg:sticky lg:top-24">
            <nav aria-label="FAQ topics" className="hidden lg:block">
              <ul className="grid gap-1">
                {groups.map((g) => (
                  <li key={g.title}>
                    <a href={`#${g.title.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="block rounded-lg px-3 py-2 text-[15px] text-muted hover:bg-surface-2 hover:text-ink">
                      {g.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="rounded-2xl border border-line bg-surface p-5 lg:mt-6">
              <MessageCircle className="size-5 text-brand dark:text-accent" aria-hidden="true" />
              <p className="mt-3 font-display font-semibold">Still have a question?</p>
              <p className="mt-1 text-sm text-muted">{site.supportHours}</p>
              <div className="mt-4 grid gap-2">
                <ButtonLink href={site.whatsappUrl} variant="whatsapp"><WhatsAppIcon /> Chat on WhatsApp</ButtonLink>
                <a href={`mailto:${site.emails.support}`} className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-muted hover:text-ink">
                  <Mail className="size-4" aria-hidden="true" /> {site.emails.support}
                </a>
              </div>
            </div>
          </aside>
          <div className="grid gap-12">
            {groups.map((g) => (
              <section key={g.title} id={g.title.toLowerCase().replace(/[^a-z]+/g, "-")} aria-labelledby={`${g.title}-h`} className="scroll-mt-24">
                <h2 id={`${g.title}-h`} className="mb-4 text-2xl font-semibold">{g.title}</h2>
                <FaqAccordion items={g.ids.map((i) => faqs[i])} />
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
