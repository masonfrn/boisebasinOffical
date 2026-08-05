import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import QuoteSection from "@/components/home/QuoteSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Reviews from "@/components/home/Reviews";
import ServiceAreaMap from "@/components/home/ServiceAreaMap";
import FAQ from "@/components/home/FAQ";
import { FAQS } from "@/lib/constants";

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <TrustBadges />
      <QuoteSection />
      <ServicesGrid />
      <WhyChooseUs />
      <Reviews />
      <ServiceAreaMap />
      <FAQ />
    </>
  );
}
