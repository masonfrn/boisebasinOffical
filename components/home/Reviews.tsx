import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { TESTIMONIALS, BUSINESS } from "@/lib/constants";

export default function Reviews() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Customer Stories"
          title="What the Treasure Valley Is Saying"
          align="center"
          className="mx-auto"
        />
        <p className="mx-auto mt-2 max-w-md text-center text-xs text-ink-muted">
          Placeholder testimonials shown for design purposes — replace with your real reviews.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl bg-white p-6 shadow-card">
              <div className="flex gap-0.5 text-basin-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-basin-500" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5">
                <p className="font-display text-sm font-bold text-navy">{t.name}</p>
                <p className="text-xs text-ink-muted">{t.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            href={BUSINESS.googleReviewUrl}
            variant="outline"
            size="md"
            icon={<Star size={16} className="fill-basin-500 text-basin-500" />}
          >
            Leave Us a Google Review
          </Button>
        </div>
      </Container>
    </section>
  );
}
