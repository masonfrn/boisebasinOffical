import { MapPin, ShieldCheck, Tag, Clock3, Smile, Ban } from "lucide-react";
import Container from "@/components/ui/Container";

const BADGES = [
  { icon: MapPin, label: "Locally Owned" },
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Tag, label: "Upfront Pricing" },
  { icon: Clock3, label: "Same-Day & Next-Day Service" },
  { icon: Smile, label: "Friendly Professional Crew" },
  { icon: Ban, label: "No Hidden Fees" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-navy/5 bg-navy-50/40 py-10">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2.5 rounded-2xl bg-white px-3 py-5 text-center shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-haul-50 text-haul-500">
                <Icon size={20} />
              </span>
              <span className="font-display text-xs font-bold leading-tight text-navy sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
