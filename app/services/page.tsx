import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  BUSINESS,
  SITE_URL,
  SERVICES,
  SERVICE_PAGES,
  CITY_PAGES,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Junk Removal Services in the Treasure Valley",
  description:
    "Furniture, appliance, hot tub, construction debris, and yard waste removal plus garage, estate, storage, office, and rental cleanouts across the Treasure Valley. Upfront pricing.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  // Card copy comes from SERVICES, the page it links to from SERVICE_PAGES.
  // Matched on slug rather than title because the short card labels ("Yard
  // Waste") don't equal the page titles ("Yard Waste Removal") — the same
  // reason the nav dropdown matches on slug.
  const services = SERVICES.map((service) => ({
    ...service,
    page: SERVICE_PAGES.find((p) => p.slug === service.slug),
  })).filter((service) => service.page);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Junk Removal Services",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.page!.title,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Breadcrumbs trail={[{ name: "Services" }]} />
          <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-basin-500">
            What We Haul
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
            Junk Removal Services in the Treasure Valley
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            If it fits in the truck and isn&rsquo;t hazardous, we take it. Below is
            everything we do, from a single couch out of a second-floor walkup to
            a full estate cleared room by room — each with upfront pricing before
            anything gets loaded.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote" size="lg">
              Get My Instant Quote
            </Button>
            <Button href="/pricing" variant="outline" size="lg">
              See Pricing
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Every Service"
            title="Pick What You Need Gone"
            align="center"
            className="mx-auto"
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-cardHover"
              >
                <h2 className="font-display text-base font-bold text-navy">
                  {service.page!.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {service.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-haul-500">
                  Learn more
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="How It Works" title="The Same Four Steps Every Time" />
          <ol className="mt-8 space-y-4">
            {[
              "Send photos or describe what you need gone — the Instant Quote form takes about two minutes.",
              "We give you an upfront price before anything is scheduled. No hourly surprises.",
              "Our crew arrives in the booked window, does all the lifting, and sweeps up behind the load.",
              "Usable items go to donation partners and recyclables get sorted out rather than everything hitting the landfill.",
            ].map((step, i) => (
              <li key={step} className="flex gap-4 rounded-2xl bg-paper p-5 shadow-card">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-basin-500 font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-ink-muted">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl border border-navy/5 bg-paper p-6">
            <h2 className="flex items-start gap-2 font-display text-base font-bold text-navy">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-haul-500" />
              What we can&rsquo;t take
            </h2>
            <p className="mt-2 pl-7 text-sm leading-relaxed text-ink-muted">
              Hazardous materials — paint, solvents, chemicals, asbestos, and
              biohazard waste — need a licensed facility rather than a hauling
              crew. Everything else is fair game. Read the{" "}
              <Link
                href="/resources/what-junk-removal-cant-take"
                className="font-semibold text-haul-500 hover:text-haul-600"
              >
                full breakdown of what junk removal companies can&rsquo;t haul
              </Link>{" "}
              if you&rsquo;re unsure about something specific.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="By City"
            title="Where We Work"
            align="center"
            className="mx-auto"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-ink-muted">
            Every service above is available across the valley. Pick your city for
            the local details — access, disposal site, and scheduling.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CITY_PAGES.map((city) => (
              <Link
                key={city.slug}
                href={`/junk-removal/${city.slug}`}
                className="flex items-center justify-between gap-2 rounded-2xl bg-white p-4 shadow-card transition-shadow hover:shadow-cardHover"
              >
                <span className="flex items-center gap-2 font-display text-sm font-bold text-navy">
                  <MapPin size={15} className="shrink-0 text-basin-500" />
                  {city.name}, ID
                </span>
                <ArrowRight size={15} className="shrink-0 text-basin-500" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 text-center sm:py-20">
        <Container className="max-w-xl">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Not sure which one you need?
          </h2>
          <p className="mt-3 text-ink-muted">
            Send a photo and we&rsquo;ll tell you what it takes to clear it — no
            obligation either way.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/quote" size="lg">
              Get My Instant Quote
            </Button>
            <Button href={BUSINESS.phoneHref} variant="outline" size="lg">
              Call {BUSINESS.phone}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
