"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sofa,
  Refrigerator,
  Warehouse,
  Home,
  HardHat,
  Trees,
  PackageOpen,
  Building2,
  Briefcase,
  Waves,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SERVICES, SERVICE_PAGES } from "@/lib/constants";

const ICONS = [
  Sofa,
  Refrigerator,
  Warehouse,
  Home,
  HardHat,
  Trees,
  PackageOpen,
  Building2,
  Briefcase,
  Waves,
];

export default function ServicesGrid() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Haul"
          title="Junk Removal Services"
          subtitle="If it's heavy, awkward, or has been sitting there too long — we can probably take it."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            const servicePage = SERVICE_PAGES.find((s) => s.title === service.title);
            const card = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white transition-colors group-hover:bg-basin-500">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {service.desc}
                </p>
              </>
            );
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
                className="group rounded-2xl border border-navy/5 bg-paper p-5 shadow-card transition-shadow hover:shadow-cardHover"
              >
                {servicePage ? (
                  <Link href={`/services/${servicePage.slug}`}>{card}</Link>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/quote" size="lg">
            Get My Instant Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
