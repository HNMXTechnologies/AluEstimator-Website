import type { Metadata } from "next";
import { canonicalPath } from "@/content/site";
import { FileCheck2, Hash, Send, ArrowRightLeft } from "lucide-react";
import { FormatCustomiser } from "@/components/formats/FormatCustomiser";
import { FormatGallery } from "@/components/formats/FormatGallery";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Quotation formats — six GST quotation designs for aluminium fabricators",
  description:
    "Six professional GST quotation designs with window drawings: Classic GST, Window Schedule, Per Sq. Ft., Room-wise Gallery, Elevation Sheet and Formal Letter.",
  alternates: { canonical: canonicalPath("/quotation-formats") },
};

const lifecycle = ["Draft", "Sent", "Approved", "Converted to invoice"];

const extras = [
  { icon: Hash, title: "GST-correct", body: "Tax breakup, amount in words and financial-year document numbering." },
  { icon: Send, title: "Send anywhere", body: "Share by link, WhatsApp or email, or download the PDF." },
  { icon: FileCheck2, title: "Track every quote", body: "Extend validity, record rejection reasons and see an activity timeline." },
  { icon: ArrowRightLeft, title: "Convert in one click", body: "Turn an approved quotation into a GST invoice — nothing re-typed." },
];

export default function QuotationFormatsPage() {
  return (
    <>
      <PageHero
        eyebrow="Quotation formats"
        title="Six quotation designs. Pick the one that wins the job."
        sub="Every format is branded with your logo and details, GST-correct, and can include a drawing of every window. Tap any design to zoom in."
      />

      <Section labelledBy="gallery-title" className="pt-12 sm:pt-16">
        <h2 id="gallery-title" className="sr-only">Gallery</h2>
        <FormatGallery />
        <p className="mt-6 text-xs text-muted">Previews are illustrative; your quotations carry your own logo, items and prices.</p>
      </Section>

      <Section labelledBy="cust-title" className="border-y border-line bg-surface">
        <SectionHeader
          id="cust-title"
          eyebrow="Customise"
          title="Show exactly what each customer needs to see."
          sub="Switch sections on and off for every format — logo, drawings, HSN, discount, tax breakup, amount in words, bank details, terms, acceptance block, signature and page numbers. Edit the subject line and opening text too."
          className="mb-12"
        />
        <FormatCustomiser />
      </Section>

      <Section labelledBy="life-title">
        <SectionHeader id="life-title" eyebrow="Lifecycle" title="From draft to invoice, without re-typing." className="mb-12" />
        <Reveal>
          <ol className="grid gap-3 sm:grid-cols-4">
            {lifecycle.map((s, i) => (
              <li key={s} className="relative rounded-xl border border-line bg-surface p-4 shadow-card">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <p className="mt-1 font-display text-lg font-semibold">{s}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-muted">A quotation can also be marked Rejected or Expired — with the reason recorded.</p>
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {extras.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 0.05}>
              <e.icon className="size-6 text-brand dark:text-accent" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg font-semibold">{e.title}</h3>
              <p className="mt-1 text-[15px] text-muted">{e.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand title="See your own quotation in all six designs." />
    </>
  );
}
