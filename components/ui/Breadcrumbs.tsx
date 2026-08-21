import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type Crumb = {
  name: string;
  /** Omitted on the final crumb — the current page isn't a link to itself. */
  href?: string;
};

/**
 * The visible breadcrumb trail and its BreadcrumbList schema, emitted together.
 *
 * They're one component on purpose. Google wants the markup to describe a trail
 * the user can actually see, and when the two were maintained separately (the
 * service-by-city pages built each by hand) it was only a matter of time before
 * one gained a level the other didn't.
 *
 * Home is prepended automatically, so callers pass only the levels below it.
 */
export default function Breadcrumbs({
  trail,
  className,
}: {
  trail: Crumb[];
  className?: string;
}) {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, ...trail];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      // The last crumb has no href but still needs an `item` — it's the page
      // being viewed, so schema.org wants its own canonical URL there.
      item: crumb.href ? `${SITE_URL}${crumb.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={cn("mb-5", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
          {crumbs.map((crumb, i) => (
            <li key={crumb.name} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-basin-500">
                  {crumb.name}
                </Link>
              ) : (
                <span className="font-semibold text-navy" aria-current="page">
                  {crumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
