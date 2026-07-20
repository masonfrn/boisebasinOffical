import { MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SERVICE_AREAS } from "@/lib/constants";

// Rough relative positions to suggest geography without claiming survey accuracy.
const PINS: Record<string, { x: number; y: number }> = {
  Star: { x: 70, y: 90 },
  Eagle: { x: 130, y: 110 },
  Middleton: { x: 40, y: 150 },
  Boise: { x: 200, y: 150 },
  Meridian: { x: 150, y: 175 },
  Nampa: { x: 90, y: 210 },
  Caldwell: { x: 40, y: 210 },
  Kuna: { x: 160, y: 240 },
};

export default function ServiceAreaMap() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Where We Work"
            title="Proudly Serving the Treasure Valley"
            subtitle="From Star to Kuna, we're on the road every day across these communities."
          />
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SERVICE_AREAS.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2 rounded-xl bg-navy-50 px-3.5 py-2.5 font-display text-sm font-semibold text-navy"
              >
                <MapPin size={15} className="text-basin-500" /> {area}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/service-areas" variant="outline" size="md">
              View Full Service Area
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <svg viewBox="0 0 260 280" className="w-full max-w-sm">
            <rect width="260" height="280" rx="24" fill="#EAF1FB" />
            <path
              d="M25 100 L235 80 L245 220 L60 250 Z"
              fill="#F6F7F9"
              stroke="#0B2545"
              strokeOpacity="0.12"
              strokeWidth="2"
            />
            {Object.entries(PINS).map(([name, pos]) => (
              <g key={name}>
                <circle cx={pos.x} cy={pos.y} r="6" fill="#F2662D" />
                <circle cx={pos.x} cy={pos.y} r="10" fill="#F2662D" fillOpacity="0.25" />
                <text
                  x={pos.x}
                  y={pos.y - 12}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="#0B2545"
                  fontFamily="var(--font-display)"
                >
                  {name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </Container>
    </section>
  );
}
