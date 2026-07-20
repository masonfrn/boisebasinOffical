import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import QuoteSection from "@/components/home/QuoteSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Reviews from "@/components/home/Reviews";
import ServiceAreaMap from "@/components/home/ServiceAreaMap";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
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
