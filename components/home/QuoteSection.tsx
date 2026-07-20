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
          subtitle="Tell us what you need removed and we'll get back to you fast with an upfront price — no pushy sales calls."
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
