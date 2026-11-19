import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { footerNav, site } from "@/content/site";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-gradient text-on-navy">
      <div className="bg-blueprint-navy pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative grid gap-10 pt-16 pb-12 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo onNavy />
          <p className="mt-4 text-[15px] text-on-navy-muted">{site.tagline}. Estimation, quotation and business software for aluminium window, door and partition fabricators in India.</p>
          <ul className="mt-6 grid gap-3 text-[14.5px] text-on-navy-muted">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-[#7EA6FF]" aria-hidden="true" />
              <a href={`tel:${site.phoneE164}`} className="hover:text-white">{site.phoneDisplay}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-[#7EA6FF]" aria-hidden="true" />
              <a href={`mailto:${site.emails.sales}`} className="hover:text-white">{site.emails.sales}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-[#7EA6FF]" aria-hidden="true" />
              <span>{site.supportHours}</span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#7EA6FF]" aria-hidden="true" />
              <span>
                {site.address.line1}, {site.address.line2}
              </span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="dim-label text-[#9bb6e6]">{col.title}</h2>
              <ul className="mt-4 grid gap-1">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-flex min-h-9 items-center text-[14.5px] text-on-navy-muted hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 pb-28 text-[13px] text-on-navy-muted md:flex-row md:items-center md:justify-between md:pb-6">
          <p>
            © <Year /> {site.legalName} · GSTIN {site.gstin}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
