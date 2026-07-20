import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageSquare, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call, text, or email Boise Basin Junk Removal to schedule fast, affordable junk removal anywhere in the Treasure Valley.",
};

const METHODS = [
  {
    icon: Phone,
    title: "Call",
    value: BUSINESS.phone,
    href: BUSINESS.phoneHref,
    desc: "Fastest way to reach us during business hours.",
  },
  {
    icon: MessageSquare,
    title: "Text",
    value: BUSINESS.phone,
    href: BUSINESS.smsHref,
    desc: "Send us a message or a photo of your junk.",
  },
  {
    icon: Mail,
    title: "Email",
    value: BUSINESS.email,
    href: BUSINESS.emailHref,
    desc: "Best for detailed questions or attachments.",
  },
];

export default function ContactPage() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Boise Basin Junk Removal"
          subtitle="Reach out however is easiest — or skip straight to a free instant quote."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {METHODS.map(({ icon: Icon, title, value, href, desc }) => (
            <a
              key={title}
              href={href}
              className="rounded-2xl border border-navy/5 bg-paper p-6 text-center shadow-card transition-shadow hover:shadow-cardHover"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-haul-50 text-haul-500">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-navy">{title}</h3>
              <p className="mt-1 break-words font-display text-sm font-semibold text-haul-500">{value}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-navy-50/50 p-8 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white">
            <MapPin size={20} />
          </span>
          <p className="font-display text-lg font-bold text-navy">
            Serving all of {BUSINESS.serviceRegion}
          </p>
          <p className="max-w-md text-sm text-ink-muted">
            Boise, Meridian, Eagle, Nampa, Caldwell, Kuna, Star, and
            Middleton.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/quote" size="lg">
            Get My Instant Quote
          </Button>
          <Button
            href={BUSINESS.googleReviewUrl}
            variant="outline"
            size="lg"
            icon={<Star size={18} className="fill-basin-500 text-basin-500" />}
          >
            Leave Us a Google Review
          </Button>
        </div>
      </Container>
    </section>
  );
}
