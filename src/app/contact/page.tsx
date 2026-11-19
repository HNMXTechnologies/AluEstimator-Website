import type { Metadata } from "next";
import { BadgeCheck, CalendarCheck, Clock, FileSpreadsheet, Mail, MapPin, Phone } from "lucide-react";
import { DemoForm } from "@/components/contact/DemoForm";
import { PageHero } from "@/components/shared/PageHero";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a free demo",
  description:
    "Book a free 30-minute AluEstimator demo, online or at your workshop. We set up your 14-day free trial and help import your designs and stock from Excel.",
  alternates: { canonical: "/contact" },
};

const expect = [
  { icon: CalendarCheck, title: `${site.offer.demoMinutes}-minute demo`, body: "Online, or at your workshop in Gujarat." },
  { icon: BadgeCheck, title: `${site.offer.trialDays}-day free trial`, body: "Full features, set up by our team after the demo." },
  { icon: FileSpreadsheet, title: "Free Excel import", body: site.offer.importHelp.replace(/^Free help /, "Help ") },
];

export default function ContactPage() {
  // SAMPLE — contact details come from src/content/site.ts (isSample: true)
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="See AluEstimator on your own windows."
        sub="Tell us a little about your workshop. We'll call you within one working day to fix a time."
      />
      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
          <DemoForm />

          <aside className="grid h-fit gap-6">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="font-display text-lg font-semibold">Prefer WhatsApp?</h2>
              <p className="mt-1 text-sm text-muted">Most fabricators reach us this way. Send a message and we&apos;ll reply during support hours.</p>
              <ButtonLink href={site.whatsappUrl} variant="whatsapp" size="lg" className="mt-4 w-full">
                <WhatsAppIcon /> Chat on WhatsApp
              </ButtonLink>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="font-display text-lg font-semibold">What to expect</h2>
              <ul className="mt-4 grid gap-4">
                {expect.map((e) => (
                  <li key={e.title} className="flex gap-3">
                    <e.icon className="mt-0.5 size-5 shrink-0 text-brand dark:text-accent" aria-hidden="true" />
                    <span>
                      <span className="block font-medium">{e.title}</span>
                      <span className="block text-sm text-muted">{e.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="font-display text-lg font-semibold">Contact details</h2>
              <ul className="mt-4 grid gap-3 text-[15px]">
                <li className="flex gap-3"><Phone className="mt-0.5 size-4.5 shrink-0 text-muted" aria-hidden="true" /><a href={`tel:${site.phoneE164}`} className="hover:text-brand dark:hover:text-accent">{site.phoneDisplay}</a></li>
                <li className="flex gap-3"><Mail className="mt-0.5 size-4.5 shrink-0 text-muted" aria-hidden="true" /><span className="min-w-0">Sales: <a href={`mailto:${site.emails.sales}`} className="break-words hover:text-brand dark:hover:text-accent">{site.emails.sales}</a><br />Support: <a href={`mailto:${site.emails.support}`} className="break-words hover:text-brand dark:hover:text-accent">{site.emails.support}</a></span></li>
                <li className="flex gap-3"><Clock className="mt-0.5 size-4.5 shrink-0 text-muted" aria-hidden="true" />{site.supportHours}</li>
                <li className="flex gap-3"><MapPin className="mt-0.5 size-4.5 shrink-0 text-muted" aria-hidden="true" />{site.address.line1}, {site.address.line2}</li>
              </ul>
              <p className="mt-4 border-t border-line pt-4 text-sm text-muted">
                Already a customer? <a href={site.appUrl} className="font-medium text-brand underline-offset-2 hover:underline dark:text-accent">Log in to the app</a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
