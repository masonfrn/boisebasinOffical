import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { TESTIMONIALS, BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Just the review cards, no section chrome.
 *
 * Split out from the full section so the quote page can show proof beside the
 * form without also inheriting the "Leave Us a Google Review" button — that CTA
 * belongs on pages where sending someone to Google is a win, not on the one
 * page where the goal is finishing the form.
 */
export function ReviewCards({
  limit,
  className,
}: {
  limit?: number;
  className?: string;
}) {
  const shown = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;
  const count = shown.length;

  if (count === 0) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-dashed border-navy/15 bg-white p-8 text-center text-sm text-ink-muted",
          className
        )}
      >
        Testimonials will appear here once you have real customer reviews to share.
      </div>
    );
  }

  return (
    // The grid tracks the review count rather than always claiming three
    // columns. At three-up a single review sat in the left third with two empty
    // cells beside it, which read as something failing to load.
    //
    // items-start because real reviews vary wildly in length — the longest here
    // is four times the shortest, and stretching every card in the row to match
    // left the short ones as mostly empty boxes.
    <div
      className={cn(
        "grid grid-cols-1 items-start gap-5",
        count === 1 && "mx-auto max-w-lg",
        // Two and four both balance on two columns; four at three-up strands a
        // lone card under two empty cells.
        (count === 2 || count === 4) && "mx-auto max-w-3xl sm:grid-cols-2",
        count !== 2 && count !== 4 && count >= 3 && "sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {shown.map((t) => (
        <figure key={t.name} className="rounded-2xl bg-white p-6 shadow-card">
          <div
            className="flex gap-0.5 text-basin-500"
            aria-label={`${t.rating} out of 5 stars`}
          >
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={16} className="fill-basin-500" aria-hidden="true" />
            ))}
          </div>
          <blockquote className="mt-4 text-sm leading-relaxed text-ink-soft">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5">
            <span className="block font-display text-sm font-bold text-navy">
              {t.name}
            </span>
            {/* Only rendered when we actually know the city — see the note on
                TESTIMONIALS about not inventing one. */}
            {t.location && (
              <span className="block text-xs text-ink-muted">{t.location}</span>
            )}
            <span className="mt-1 block text-xs text-ink-muted">via Google</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

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
        {TESTIMONIALS.length === 0 && (
          <p className="mx-auto mt-2 max-w-md text-center text-xs text-ink-muted">
            Real customer stories will appear here as you collect permission to share them.
          </p>
        )}

        <ReviewCards className="mt-10" />

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
