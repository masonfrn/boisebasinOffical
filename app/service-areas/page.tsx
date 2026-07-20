import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceAreaMap from "@/components/home/ServiceAreaMap";
import { SERVICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Boise Basin Junk Removal proudly serves Boise, Meridian, Eagle, Nampa, Caldwell, Kuna, Star, and Middleton, Idaho.",
};

const AREA_COPY: Record<string, string> = {
  Boise: "Same-day junk removal across the City of Trees, from downtown condos to North End homes.",
  Meridian: "Fast garage and estate cleanouts throughout Meridian's growing neighborhoods.",
  Eagle: "Careful, professional hauling for Eagle's larger properties and acreages.",
  Nampa: "Reliable junk removal for Nampa homes, rentals, and small businesses.",
  Caldwell: "Furniture, appliance, and yard waste removal across Caldwell.",
  Kuna: "Full-service hauling for Kuna, including construction debris and cleanouts.",
  Star: "Prompt pickup service for Star's homes and new construction sites.",
  Middleton: "Dependable junk removal for the Middleton community.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-2xl text-center mx-auto">
          <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-basin-500">
            Coverage Area
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
            Serving the Entire Treasure Valley
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Wherever you are between Star and Kuna, we can get a truck to
            you — usually the same day.
          </p>
        </Container>
      </section>

      <ServiceAreaMap />

      <section className="bg-navy-50/40 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="City by City" title="Local Junk Removal, Wherever You Are" align="center" className="mx-auto" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_AREAS.map((area) => (
              <div key={area} className="rounded-2xl bg-white p-6 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-basin-50 text-basin-500">
                  <MapPin size={18} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{area}, ID</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{AREA_COPY[area]}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/quote" size="lg">
              Get My Instant Quote
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
