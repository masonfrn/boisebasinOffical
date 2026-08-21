import type { Metadata } from "next";
import Link from "next/link";
import { Check, Info, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BUSINESS, SITE_URL } from "@/lib/constants";
import {
  PUBLISHED_LOAD_SIZES,
  SURCHARGES,
  HEAVY_MATERIAL_TYPES,
  HEAVY_MATERIAL_PER_YARD,
  priceForCubicYards,
  formatPriceRange,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Junk Removal Prices in Boise & the Treasure Valley",
  description:
    "What junk removal actually costs in Boise, Meridian, and Nampa — published price ranges by load size, what's included, and what drives the number up or down.",
  alternates: {
    canonical: "/pricing",
  },
};

const PRICING_FAQS = [
  {
    q: "How much does junk removal cost in Boise?",
    a: "Most Treasure Valley jobs land between $80 for a single item and $605 for a full truck. Price is driven by how much space your items take up in the truck, not by the hour — a quarter-truck load runs roughly $170 to $230 including labor and disposal.",
  },
  {
    q: "Is the price based on weight or volume?",
    a: "Volume, in almost every case. We price by how much of the truck your items fill, because that's what determines how many trips we make. The exception is dense material like concrete, dirt, sod, and rock, which hits a truck's weight limit long before it fills the space — those are priced by weight instead.",
  },
  {
    q: "Are labor and disposal fees included?",
    a: "Yes. The quoted price covers the crew, the lifting and carrying, the drive, landfill or recycling fees, and sweeping up afterward. There is no separate hourly labor charge and no surprise dump fee added at the end.",
  },
  {
    q: "Do I get a firm price before you start?",
    a: "Yes. You get an upfront quote before anything is scheduled, and our crew confirms it on site before loading a single item. If the job is genuinely bigger than what you described, we tell you the new number and you decide — we don't load first and invoice after.",
  },
  {
    q: "Is there a minimum charge?",
    a: "Yes. Single-item pickups start around $80. Every job pays for the same drive out and the same trip to the disposal site, so there's a floor below which we can't run a truck.",
  },
  {
    q: "Do you charge extra for stairs or a long carry?",
    a: "No. Carrying items out is the service — stairs, basements, back yards, and long driveways are part of a normal job, not an upcharge. Just mention them when you request a quote so we bring the right crew size.",
  },
];

export default function PricingPage() {
  const rows = PUBLISHED_LOAD_SIZES.map((size) => ({
    ...size,
    range: formatPriceRange(priceForCubicYards(size.yards)),
  }));

  // Bounds for the AggregateOffer come off the same computed rows, so a change
  // to the rate table moves the schema with the published table.
  const allPrices = PUBLISHED_LOAD_SIZES.map((size) => priceForCubicYards(size.yards));
  const lowPrice = Math.min(...allPrices.map((p) => p.low));
  const highPrice = Math.max(...allPrices.map((p) => p.high));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Junk Removal",
    name: "Junk Removal Pricing",
    url: `${SITE_URL}/pricing`,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
    },
    areaServed: BUSINESS.serviceRegion,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice,
      highPrice,
      offerCount: PUBLISHED_LOAD_SIZES.length,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((faq) => ({
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
          <Breadcrumbs trail={[{ name: "Pricing" }]} />
          <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-basin-500">
            Upfront Pricing
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
            Junk Removal Prices in Boise &amp; the Treasure Valley
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Most junk removal companies make you call before they&rsquo;ll tell you
            anything. Here are our actual ranges. You pay for the space your
            items take up in the truck — labor, driving, disposal fees, and
            cleanup are already in the number.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote" size="lg">
              Get My Exact Quote
            </Button>
            <Button href={BUSINESS.phoneHref} variant="outline" size="lg">
              Call {BUSINESS.phone}
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="By Load Size" title="What It Costs" />
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            A full truck holds about 16 cubic yards — roughly six pickup-truck
            loads. Here&rsquo;s what each portion of it runs:
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse overflow-hidden rounded-2xl bg-white shadow-card">
              <caption className="sr-only">
                Junk removal price ranges by load size in the Treasure Valley
              </caption>
              <thead>
                <tr className="bg-navy text-left text-white">
                  <th scope="col" className="px-5 py-4 font-display text-sm font-bold">
                    Load Size
                  </th>
                  <th scope="col" className="px-5 py-4 font-display text-sm font-bold">
                    What Fits
                  </th>
                  <th scope="col" className="px-5 py-4 text-right font-display text-sm font-bold">
                    Price Range
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="px-5 py-4 text-left align-top">
                      <span className="block font-display text-sm font-bold text-navy">
                        {row.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-muted">
                        {row.fraction} &middot; ~{row.yards} cu yd
                      </span>
                    </th>
                    <td className="px-5 py-4 align-top text-sm leading-relaxed text-ink-muted">
                      {row.description}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right align-top font-display text-sm font-bold text-navy">
                      {row.range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
            <Info size={16} className="mt-0.5 shrink-0 text-basin-500" />
            These are real ranges, not teaser rates — but they&rsquo;re still
            estimates. Access, stairs, and what&rsquo;s actually in the pile move the
            final number, which is why we confirm the price on site before
            loading anything.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="No Asterisks" title="What's Already Included" />
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "All labor — we do every bit of the lifting and carrying",
              "Stairs, basements, back yards, and long driveways",
              "Landfill and disposal fees",
              "Recycling and donation drop-offs",
              "Sweeping up the space when the load is out",
              "The drive to and from your address",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-paper p-4 shadow-card"
              >
                <Check size={18} className="mt-0.5 shrink-0 text-haul-500" />
                <span className="text-sm leading-relaxed text-ink-muted">{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-xl font-bold text-navy">
            The two things that cost extra
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            We&rsquo;d rather publish these than surprise you with them. Both exist
            because the item costs more to handle than the space it occupies.
          </p>

          <div className="mt-6 space-y-3">
            {Object.entries(SURCHARGES).map(([item, amount]) => (
              <div
                key={item}
                className="flex items-start justify-between gap-4 rounded-2xl border border-navy/5 bg-paper p-5"
              >
                <div>
                  <p className="font-display text-sm font-bold text-navy">{item}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {item === "Hot Tub" &&
                      "Draining, teardown, and hauling a hot tub is most of a crew's afternoon before it ever reaches the truck."}
                    {item === "Appliances" &&
                      "Ada County charges a per-appliance fee, and units with refrigerant need specific handling."}
                    {item === "Electronics" &&
                      "E-waste goes to certified recycling rather than the landfill, which carries its own fee."}
                  </p>
                </div>
                <span className="whitespace-nowrap font-display text-sm font-bold text-navy">
                  +${amount}
                </span>
              </div>
            ))}

            <div className="flex items-start justify-between gap-4 rounded-2xl border border-navy/5 bg-paper p-5">
              <div>
                <p className="font-display text-sm font-bold text-navy">
                  Heavy material ({HEAVY_MATERIAL_TYPES.join(", ").toLowerCase()})
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  Concrete, dirt, sod, and rock are billed by weight because a
                  single cubic yard runs close to two tons — the landfill&rsquo;s
                  tipping fee outruns the volume charge well before the truck
                  looks full.
                </p>
              </div>
              <span className="whitespace-nowrap font-display text-sm font-bold text-navy">
                +${HEAVY_MATERIAL_PER_YARD}/yd
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="Questions"
            title="Junk Removal Pricing FAQ"
            align="center"
            className="mx-auto"
          />
          <div className="mx-auto mt-10 divide-y divide-navy/10 rounded-2xl bg-white shadow-card">
            {PRICING_FAQS.map((item) => (
              <div key={item.q} className="px-5 py-5 sm:px-7">
                <h3 className="font-display text-sm font-bold text-navy sm:text-base">
                  {item.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-ink-muted">
            Want the reasoning behind a bigger job?{" "}
            <Link
              href="/resources/estate-cleanout-cost-guide"
              className="font-semibold text-haul-500 hover:text-haul-600"
            >
              Read our estate cleanout cost guide
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 text-center sm:py-20">
        <Container className="max-w-xl">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Get your actual number
          </h2>
          <p className="mt-3 text-ink-muted">
            Send a couple of photos and the Instant Quote form sizes the load and
            prices it in about two minutes. No obligation, no phone tag.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/quote" size="lg">
              Get My Instant Quote
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Browse All Services
            </Button>
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            Serving{" "}
            <Link href="/junk-removal/boise-id" className="font-semibold text-haul-500 hover:text-haul-600">
              Boise
            </Link>
            ,{" "}
            <Link href="/junk-removal/meridian-id" className="font-semibold text-haul-500 hover:text-haul-600">
              Meridian
            </Link>
            ,{" "}
            <Link href="/junk-removal/nampa-id" className="font-semibold text-haul-500 hover:text-haul-600">
              Nampa
            </Link>
            , and the{" "}
            <Link href="/service-areas" className="inline-flex items-center gap-1 font-semibold text-haul-500 hover:text-haul-600">
              rest of the Treasure Valley <ArrowRight size={14} />
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
