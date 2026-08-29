/**
 * Meta Pixel conversion events.
 *
 * The pixel snippet itself lives in app/layout.tsx and fires PageView on every
 * route. PageView alone is not enough to run ads on: Facebook can only optimize
 * delivery toward events it actually receives, so a pixel that reports nothing
 * but page views leaves the ad account optimizing for *clicks*. That is how you
 * end up paying for traffic that never fills anything out. The Lead event below
 * is what lets Meta learn which clicks became real quote requests.
 *
 * Fired from QuoteForm when the quote is generated — the customer has reached
 * the price screen and their details are already in GHL. Deliberately not at
 * the submit click: that fires before the estimate settles, so the value would
 * be whatever had happened to land rather than the price actually shown.
 *
 * Every call is a no-op when fbq is missing — ad blockers strip it, and the
 * script loads with strategy="afterInteractive" so it may not be ready yet.
 * Analytics is never worth breaking a submission over.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type LeadParams = {
  /** Estimate midpoint in dollars, when the estimator produced one. */
  value?: number;
  /** Label so different lead sources stay distinguishable in Events Manager. */
  contentName?: string;
};

export function trackLead({ value, contentName }: LeadParams = {}) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  window.fbq("track", "Lead", {
    ...(contentName ? { content_name: contentName } : {}),
    // A value lets Facebook bid toward the leads worth more rather than merely
    // the cheapest ones. Omitted entirely when the estimator failed or was
    // skipped — feeding the algorithm a made-up number trains it on fiction.
    ...(value && value > 0 ? { value, currency: "USD" } : {}),
  });
}
