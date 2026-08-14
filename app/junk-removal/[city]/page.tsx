import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { CITY_PAGES, SERVICES, FAQS } from "@/lib/constants";
import { localPagePath } from "@/lib/localPages";

export function generateStaticParams() {
  return CITY_PAGES.map((city) => ({ city: city.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { city: string };
}): Metadata {
  const city = CITY_PAGES.find((c) => c.slug === params.city);
  if (!city) return {};

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `/junk-removal/${city.slug}`,
    },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = CITY_PAGES.find((c) => c.slug === params.city);
  if (!city) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Junk Removal",
    provider: {
      "@type": "LocalBusiness",
      name: "Boise Basin Junk Removal",
    },
    areaServed: {
      "@type": "City",
      name: `${city.name}, ID`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-basin-500">
            {city.name}, Idaho
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
            Junk Removal in {city.name}, ID
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{city.intro}</p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">{city.detail}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote" size="lg">
              Get My Instant Quote
            </Button>
            <Button href="/service-areas" variant="outline" size="lg">
              View All Service Areas
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Where We Work" title={`Areas of ${city.name} We Serve`} />
          <div className="mt-8 flex flex-wrap gap-3">
            {city.highlights.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-navy shadow-card"
              >
                <MapPin size={14} className="text-basin-500" /> {area}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="What We Haul" title={`${city.name} Junk Removal Services`} />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Link
                key={service.title}
                href={localPagePath(service.slug, city.slug)}
                className="flex items-start gap-3 rounded-2xl border border-navy/5 bg-paper p-5 shadow-card transition-shadow hover:shadow-cardHover"
              >
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-haul-500" />
                <div>
                  <h3 className="font-display text-sm font-bold text-navy">
                    {service.title} in {city.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Questions" title={`${city.name} Junk Removal FAQ`} align="center" className="mx-auto" />
          <div className="mx-auto mt-10 divide-y divide-navy/10 rounded-2xl bg-white shadow-card">
            {FAQS.slice(0, 3).map((item) => (
              <div key={item.q} className="px-5 py-5 sm:px-7">
                <h3 className="font-display text-sm font-bold text-navy sm:text-base">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 text-center sm:py-20">
        <Container className="max-w-xl">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Ready to clear the clutter in {city.name}?
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
