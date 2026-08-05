import type { Metadata } from "next";
import { ShieldCheck, HeartHandshake, Leaf, Clock3 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Boise Basin Junk Removal is a locally owned, licensed, and insured junk removal company serving the Treasure Valley with upfront pricing and a respectful crew.",
  alternates: {
    canonical: "/about",
  },
};

const VALUES = [
  { icon: ShieldCheck, title: "Trustworthy", desc: "Licensed, insured, and upfront about pricing before we ever pick anything up." },
  { icon: Clock3, title: "Dependable", desc: "We show up on time and finish the job the same day whenever we can." },
  { icon: HeartHandshake, title: "Respectful", desc: "Careful with your property, and understanding during hard transitions like estate cleanouts." },
  { icon: Leaf, title: "Responsible", desc: "We sort every load and donate or recycle as much as possible." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-basin-500">
            Our Story
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
            Locally Owned, Treasure Valley Proud
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            {BUSINESS.name} was started with a simple idea: junk removal
            should be fast, fairly priced, and handled by people who
            actually care about your home. We&apos;re based right here in
            Boise, and every job — from a single old couch to a full estate
            cleanout — gets the same level of care.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            No hidden fees, no bait-and-switch pricing, and no leaving a mess
            behind. Just a friendly crew, a clear quote, and your space
            cleared out.
          </p>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="What We Stand For" title="Our Values" align="center" className="mx-auto" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white p-6 text-center shadow-card">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-haul-50 text-haul-500">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 text-center sm:py-20">
        <Container className="max-w-xl">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Ready to clear the clutter?
          </h2>
          <p className="mt-3 text-ink-muted">
            Get a free, no-obligation quote in just a couple of minutes.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/quote" size="lg">
              Get My Instant Quote
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
