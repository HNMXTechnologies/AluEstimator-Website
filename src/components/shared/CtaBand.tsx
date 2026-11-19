import { ArrowRight, BadgeIndianRupee } from "lucide-react";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";
import { finalCta } from "@/content/home";
import { site } from "@/content/site";

export function CtaBand({ title = finalCta.title, sub = finalCta.sub }: { title?: string; sub?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-navy-gradient py-20 sm:py-24">
      <div className="bg-blueprint-navy pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative text-center">
        <BadgeIndianRupee className="mx-auto size-10 text-[#7ea6ff]" aria-hidden="true" />
        <h2 id="cta-title" className="mx-auto mt-4 max-w-3xl text-[clamp(30px,4.6vw,50px)] leading-[1.06] font-semibold text-white">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] text-on-navy-muted">{sub}</p>
        <div className="mx-auto mt-8 flex max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
          <ButtonLink href="/contact" size="lg" className="bg-white text-navy hover:bg-[#e8eef8] dark:bg-white dark:text-navy">
            Book a free demo <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={site.whatsappUrl} variant="whatsapp" size="lg">
            <WhatsAppIcon /> Chat on WhatsApp
          </ButtonLink>
        </div>
        <p className="mt-5 text-sm text-on-navy-muted">
          Or call <a href={`tel:${site.phoneE164}`} className="underline-offset-2 hover:text-white hover:underline">{site.phoneDisplay}</a> · {site.supportHours}
        </p>
      </div>
    </section>
  );
}
