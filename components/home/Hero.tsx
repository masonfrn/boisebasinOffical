"use client";

import { motion } from "framer-motion";
import { Phone, Star, ShieldCheck, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeroIllustration from "./HeroIllustration";
import { BUSINESS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-haul-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-basin-50 blur-3xl" />

      <Container className="relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-navy">
            <Star size={13} className="fill-basin-500 text-basin-500" />
            Treasure Valley&apos;s Local Haulers
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]">
            Treasure Valley&apos;s Fast &amp; Affordable Junk Removal
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
            We remove furniture, appliances, construction debris, yard waste,
            hot tubs, mattresses, garage junk, estate cleanouts, storage
            units, and more.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote" size="lg">
              Get My Instant Quote
            </Button>
            <Button href={BUSINESS.phoneHref} variant="outline" size="lg" icon={<Phone size={18} />}>
              Call {BUSINESS.phone}
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
              <ShieldCheck size={18} className="text-haul-500" /> Licensed &amp; Insured
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
              <Clock size={18} className="text-haul-500" /> Same-Day Service
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
              <Star size={18} className="text-haul-500" /> Upfront Pricing
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="flex justify-center lg:justify-end"
        >
          <HeroIllustration />
        </motion.div>
      </Container>
    </section>
  );
}
