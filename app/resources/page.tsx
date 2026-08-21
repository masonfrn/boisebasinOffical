import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { RESOURCES } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources & Guides",
  description:
    "Practical guides on junk removal, estate cleanouts, and what can and can't be hauled away — from Boise Basin Junk Removal.",
  alternates: {
    canonical: "/resources",
  },
};

export default function ResourcesPage() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Breadcrumbs trail={[{ name: "Resources" }]} />
        <SectionHeading
          as="h1"
          eyebrow="Guides"
          title="Resources & Guides"
          subtitle="Practical answers to the questions we hear most, before you ever request a quote."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 space-y-4">
          {RESOURCES.map((post) => (
            <Link
              key={post.slug}
              href={`/resources/${post.slug}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-navy/5 bg-paper p-6 shadow-card transition-shadow hover:shadow-cardHover"
            >
              <div>
                <h2 className="font-display text-lg font-bold text-navy">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
              </div>
              <ArrowRight
                size={20}
                className="shrink-0 text-haul-500 transition-transform group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
