"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    _uxa?: unknown[][];
  }
}

/**
 * Reports client-side route changes to Contentsquare.
 *
 * The tag snippet in app/layout.tsx only runs once, on the first document
 * load. Every navigation after that is a React render, not a page load — so
 * without this, a visitor who lands on the homepage and then clicks through to
 * /quote is recorded as one single pageview on `/`, and the quote funnel (the
 * thing we actually want to watch) never shows up as a step.
 *
 * Contentsquare's documented SPA fix is to push `trackPageview` yourself on
 * each route change, which is what this does.
 */
export default function ContentsquarePageviews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // The tag's own snippet already counts the page it loaded on. Firing again
  // here on first mount would double-count that first pageview, so skip it.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const query = searchParams.toString();
    window._uxa = window._uxa || [];
    window._uxa.push(["trackPageview", pathname + (query ? `?${query}` : "")]);
  }, [pathname, searchParams]);

  return null;
}
