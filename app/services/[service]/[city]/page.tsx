import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BUSINESS, SITE_URL, CITY_PAGES, SERVICE_PAGES } from "@/lib/constants";
import { LOCAL_PAGE_PARAMS, getLocalPage, localPagePath } from "@/lib/localPages";

// Returns both segments (service *and* city) rather than just city. The parent
// [service] segment is a page.tsx, not a layout.tsx, so its generateStaticParams
// does not cascade down to this route — returning only { city } here silently
// prerenders nothing.
export function generateStaticParams() {
  return LOCAL_PAGE_PARAMS;
}

type Params = { service: string; city: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const resolved = getLocalPage(params.service, params.city);
  if (!resolved) return {};

  const { service, city, content } = resolved;
  const title = `${service.title} in ${city.name}, ID`;

  // Derived from the page's own unique intro, so no two of the 80 descriptions
  // match. Cut at the first sentence to avoid a mid-clause truncation.
  const firstSentence = content.intro.split(/(?<=\.)\s+/)[0];
  const description =
    firstSentence.length > 165
      ? `${firstSentence.slice(0, 162).trimEnd()}…`
      : firstSentence;

  return {
    title,
    description,
    alternates: {
      canonical: localPagePath(service.slug, city.slug),
    },
    openGraph: {
      title: `${title} | ${BUSINESS.name}`,
      description,
      url: `${SITE_URL}${localPagePath(service.slug, city.slug)}`,
      type: "website",
    },
  };
}

export default function ServiceCityPage({ params }: { params: Params }) {
  const resolved = getLocalPage(params.service, params.city);
  if (!resolved) notFound();

  const { service, city, content } = resolved;
  const path = localPagePath(service.slug, city.slug);

  const otherCities = CITY_PAGES.filter((c) => c.slug !== city.slug);
  const otherServices = SERVICE_PAGES.filter((s) => s.slug !== service.slug);

  // The lead question is answered with this page's own localNote, so the FAQ
  // block isn't identical across the eight cities that share a service.
  const faqs = [
    {
      q: `What should I know about ${service.title.toLowerCase()} in ${city.name}?`,
      a: content.localNote,
    },
    ...service.faqs,
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} in ${city.name}, ID`,
    description: content.intro,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      areaServed: BUSINESS.serviceRegion,
    },
    areaServed: {
      "@type": "City",
      name: `${city.name}, ID`,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${city.county} County, Idaho`,
      },
    },
    url: `${SITE_URL}${path}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
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
          <Breadcrumbs
            trail={[
              { name: "Services", href: "/services" },
              { name: service.title, href: `/services/${service.slug}` },
              { name: city.name },
            ]}
          />

          <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-basin-500">
            {city.name}, Idaho
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
            {service.title} in {city.name}, ID
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{content.intro}</p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">{content.localNote}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote" size="lg">
              Get My Instant Quote
            </Button>
            <Button href={BUSINESS.phoneHref} variant="outline" size="lg">
              Call {BUSINESS.phone}
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-14 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Where We Work"
            title={`${city.name} Areas We Cover`}
          />
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
          <p className="mt-6 text-sm leading-relaxed text-ink-muted">
            {city.name} sits in {city.county} County, so loads from this area go to{" "}
            {city.disposalSite}. We sort for donation and recycling before anything
            is disposed of.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="How It Works"
            title={`Our ${city.name} ${service.title} Process`}
          />
          <ol className="mt-8 space-y-4">
            {service.process.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-2xl bg-paper p-5 shadow-card">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-basin-500 font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-ink-muted">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="Questions"
            title={`${service.title} in ${city.name} — FAQ`}
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-10 divide-y divide-navy/10 rounded-2xl bg-white shadow-card">
            {faqs.map((item) => (
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

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Other Services"
            title={`More We Haul in ${city.name}`}
          />
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={localPagePath(other.slug, city.slug)}
                className="flex items-center justify-between gap-3 rounded-2xl border border-navy/5 bg-paper p-4 shadow-card transition-shadow hover:shadow-cardHover"
              >
                <span className="font-display text-sm font-bold text-navy">
                  {other.title} in {city.name}
                </span>
                <ArrowRight size={16} className="shrink-0 text-basin-500" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Nearby"
            title={`${service.title} Elsewhere in the Treasure Valley`}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {otherCities.map((other) => (
              <Link
                key={other.slug}
                href={localPagePath(service.slug, other.slug)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-navy shadow-card transition-shadow hover:shadow-cardHover"
              >
                <MapPin size={14} className="text-basin-500" />
                {other.name}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            Looking for something broader? See all{" "}
            <Link href={`/junk-removal/${city.slug}`} className="font-semibold text-basin-500 hover:underline">
              junk removal in {city.name}
            </Link>{" "}
            or our valley-wide{" "}
            <Link href={`/services/${service.slug}`} className="font-semibold text-basin-500 hover:underline">
              {service.title.toLowerCase()} page
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 text-center sm:py-20">
        <Container className="max-w-xl">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Need {service.title.toLowerCase()} in {city.name}?
          </h2>
          <p className="mt-3 text-ink-muted">
            Get a free, no-obligation quote in just a couple of minutes.
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
