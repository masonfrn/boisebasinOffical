import { Fragment } from "react";
import Link from "next/link";

/**
 * Renders a paragraph that may contain `[label](/path)` links.
 *
 * Article bodies were plain strings, which meant the guides couldn't link to
 * the service and city pages they talk about — the one place on the site where
 * contextual internal links are worth the most. Rather than move the whole
 * content file to MDX, paragraphs support this single markdown-style marker and
 * nothing else.
 */
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

const LINK_CLASS = "font-semibold text-haul-500 underline-offset-2 hover:text-haul-600 hover:underline";

export default function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  // matchAll rather than replace: the output is React elements, not a string.
  for (const match of text.matchAll(LINK_PATTERN)) {
    const [full, label, href] = match;
    const start = match.index ?? 0;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    // Anything not starting with "/" is treated as off-site and gets the
    // noreferrer treatment; every link written so far is internal.
    nodes.push(
      href.startsWith("/") ? (
        <Link key={start} href={href} className={LINK_CLASS}>
          {label}
        </Link>
      ) : (
        <a
          key={start}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>
      )
    );

    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return (
    <>
      {nodes.map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
    </>
  );
}
