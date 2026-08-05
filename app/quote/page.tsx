import type { Metadata } from "next";
import { Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import QuoteForm from "@/components/quote/QuoteForm";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get an Instant Quote",
  description:
    "Get a fast, free, no-obligation junk removal quote anywhere in the Treasure Valley. Tell us what you need removed and we'll respond quickly.",
  alternates: {
    canonical: "/quote",
  },
};

export default function QuotePage() {
  return (
    <section className="bg-paper py-14 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Free & Fast"
          title="Get Your Instant Quote"
          subtitle="Answer a few quick questions and we'll follow up with an upfront price — usually within minutes during business hours."
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-10 max-w-2xl">
          <QuoteForm />
          <p className="mt-6 text-center text-sm text-ink-muted">
            Prefer to talk it through?{" "}
            <a href={BUSINESS.phoneHref} className="inline-flex items-center gap-1 font-display font-bold text-haul-500 hover:text-haul-600">
              <Phone size={14} /> Call {BUSINESS.phone}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
