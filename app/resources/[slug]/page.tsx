import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RichText from "@/components/ui/RichText";
import { BUSINESS, SITE_URL } from "@/lib/constants";
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

  // Every other guide, newest first, capped at three. Keeps each article linked
  // into the rest of the hub instead of dead-ending at the quote CTA.
  const related = RESOURCES.filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.updated,
    dateModified: post.updated,
    author: { "@type": "Organization", name: BUSINESS.name },
    publisher: { "@type": "Organization", name: BUSINESS.name },
    mainEntityOfPage: `${SITE_URL}/resources/${post.slug}`,
  };

  return (
    <section className="bg-white py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Container className="max-w-2xl">
        <Breadcrumbs
          trail={[
            { name: "Resources", href: "/resources" },
            { name: post.title },
          ]}
        />

        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-8 space-y-6">
          {post.body.map((block, i) => (
            <div key={i}>
              {block.heading && (
                <h2 className="mb-2 font-display text-lg font-bold text-navy">{block.heading}</h2>
              )}
              {block.paragraphs.map((p, j) => (
                <p key={j} className="mt-3 text-base leading-relaxed text-ink-muted first:mt-0">
                  <RichText text={p} />
                </p>
              ))}
            </div>
          ))}
        </div>

        {related.length > 0 && (
          <div className="mt-12 border-t border-navy/10 pt-8">
            <h2 className="font-display text-lg font-bold text-navy">Keep reading</h2>
            <ul className="mt-4 space-y-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/resources/${other.slug}`}
                    className="group flex items-start justify-between gap-4 rounded-2xl border border-navy/5 bg-paper p-5 shadow-card transition-shadow hover:shadow-cardHover"
                  >
                    <div>
                      <span className="font-display text-sm font-bold text-navy">
                        {other.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                        {other.excerpt}
                      </span>
                    </div>
                    <ArrowRight
                      size={18}
                      className="mt-0.5 shrink-0 text-haul-500 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

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
