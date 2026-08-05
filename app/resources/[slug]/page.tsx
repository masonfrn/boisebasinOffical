import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { RESOURCES } from "@/lib/resources";

export function generateStaticParams() {
  return RESOURCES.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = RESOURCES.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `/resources/${post.slug}`,
    },
  };
}

export default function ResourcePostPage({ params }: { params: { slug: string } }) {
  const post = RESOURCES.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    dateModified: post.updated,
    author: { "@type": "Organization", name: "Boise Basin Junk Removal" },
  };

  return (
    <section className="bg-white py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Container className="max-w-2xl">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-haul-500 hover:text-haul-600"
        >
          <ArrowLeft size={15} /> All Resources
        </Link>

        <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-8 space-y-6">
          {post.body.map((block, i) => (
            <div key={i}>
              {block.heading && (
                <h2 className="mb-2 font-display text-lg font-bold text-navy">{block.heading}</h2>
              )}
              {block.paragraphs.map((p, j) => (
                <p key={j} className="text-base leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-navy-50/50 p-8 text-center">
          <p className="font-display text-lg font-bold text-navy">Ready to clear the clutter?</p>
          <p className="mt-2 text-sm text-ink-muted">Get a free, no-obligation quote in just a couple of minutes.</p>
          <div className="mt-5 flex justify-center">
            <Button href="/quote" size="lg">
              Get My Instant Quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
