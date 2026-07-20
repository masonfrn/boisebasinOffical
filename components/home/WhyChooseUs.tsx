import { Zap, MapPin, PiggyBank, ThumbsUp, HeartHandshake, Leaf } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const REASONS = [
  { icon: Zap, title: "Fast Response", desc: "Same-day and next-day appointments across the Treasure Valley." },
  { icon: MapPin, title: "Locally Owned", desc: "Boise-based crew who actually knows the area." },
  { icon: PiggyBank, title: "Affordable Pricing", desc: "Upfront quotes with no surprise fees added later." },
  { icon: ThumbsUp, title: "Reliable", desc: "We show up when we say we will, every time." },
  { icon: HeartHandshake, title: "Respectful Crew", desc: "Careful with your property and easy to work with." },
  { icon: Leaf, title: "Eco-Friendly Disposal", desc: "We donate and recycle whenever possible." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-navy py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Boise Basin"
          title="Why Choose Us"
          subtitle="A local crew that treats your home, your time, and your junk with respect."
          light
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-basin-500 text-white">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-white">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
