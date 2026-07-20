import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Star, Truck } from "lucide-react";
import Container from "@/components/ui/Container";
import { BUSINESS, NAV_LINKS, SERVICE_AREAS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-basin-500 text-white">
              <Truck size={20} strokeWidth={2.25} />
            </span>
            <span className="font-display leading-tight">
              <span className="block text-base font-bold">Boise Basin</span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-basin-300">
                Junk Removal
              </span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Fast, upfront junk removal for the Treasure Valley. Licensed,
            insured, and locally owned.
          </p>
          <a
            href={BUSINESS.facebookUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Boise Basin Junk Removal on Facebook"
            className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-basin-500"
          >
            <Facebook size={18} />
          </a>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-basin-300">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-basin-300">
            Service Area
          </h3>
          <p className="mt-4 flex items-start gap-2 text-sm text-white/70">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            {BUSINESS.serviceRegion}
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-white/60">
            {SERVICE_AREAS.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-basin-300">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2 text-white/80 hover:text-white">
                <Phone size={16} /> {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a href={BUSINESS.emailHref} className="flex items-center gap-2 text-white/80 hover:text-white break-all">
                <Mail size={16} className="shrink-0" /> {BUSINESS.email}
              </a>
            </li>
          </ul>
          <a
            href={BUSINESS.googleReviewUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 font-display text-sm font-semibold transition-colors hover:bg-basin-500"
          >
            <Star size={16} className="fill-basin-400 text-basin-400" />
            Leave Us a Google Review
          </a>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <p>&copy; {year} {BUSINESS.name}. All rights reserved.</p>
          <p>Serving {BUSINESS.serviceRegion}</p>
        </Container>
      </div>
    </footer>
  );
}
