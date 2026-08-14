import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SERVICE_PAGES, CITY_PAGES, BUSINESS } from "@/lib/constants";
import { localPagePath } from "@/lib/localPages";

export function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({ service: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { service: string };
}): Metadata {
  const service = SERVICE_PAGES.find((s) => s.slug === params.service);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const service = SERVICE_PAGES.find((s) => s.slug === params.service);
  if (!service) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
    },
    areaServed: "Treasure Valley, Idaho",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-basin-500">
            Treasure Valley
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{service.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote" size="lg">
              Get My Instant Quote
            </Button>
            <Button href="/service-areas" variant="outline" size="lg">
              View Service Areas
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="How It Works" title="Our Process" />
          <ol className="mt-8 space-y-4">
            {service.process.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-2xl bg-white p-5 shadow-card">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-basin-500 font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-ink-muted">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Questions" title={`${service.title} FAQ`} align="center" className="mx-auto" />
          <div className="mx-auto mt-10 divide-y divide-navy/10 rounded-2xl bg-paper shadow-card">
            {service.faqs.map((item) => (
              <div key={item.q} className="px-5 py-5 sm:px-7">
                <h3 className="flex items-start gap-2 font-display text-sm font-bold text-navy sm:text-base">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-haul-500" />
                  {item.q}
                </h3>
                <p className="mt-2 pl-6 text-sm leading-relaxed text-ink-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="By City"
            title={`${service.title} Near You`}
            align="center"
            className="mx-auto"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-ink-muted">
            Every city we serve has its own quirks — access, terrain, and where the
            load ends up. Pick yours for the local details.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CITY_PAGES.map((city) => (
              <Link
                key={city.slug}
                href={localPagePath(service.slug, city.slug)}
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
            Ready for {service.title.toLowerCase()}?
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
