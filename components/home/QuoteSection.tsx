import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import QuoteForm from "@/components/quote/QuoteForm";

export default function QuoteSection() {
  return (
    <section id="quote" className="bg-paper py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Get Started"
          title="Get Your Instant Quote"
          subtitle="Snap a few photos and see your price on this page in minutes — no waiting on a callback to find out what it costs. We'll reach out to confirm the details, and there's no obligation to book."
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-10 max-w-2xl">
          <QuoteForm />
        </div>
      </Container>
    </section>
  );
}
