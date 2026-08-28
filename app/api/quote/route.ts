import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Zapier Catch Hook feeding Go High Level. Set ZAPIER_WEBHOOK_URL in the
// environment — there is deliberately no hardcoded fallback. The previous one
// was rebuilt on Zapier's side and started returning 404 while still looking
// configured, so leads bounced with nothing pointing at the cause. A hook URL
// is also effectively a write credential, and this repo is public.
const WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL?.trim() ?? "";

type Estimate = {
  cubicYards?: number;
  confidence?: string;
  items?: Array<{ name?: string; quantity?: number; cubicYards?: number }>;
  accessNotes?: string;
  cannotHaul?: string[];
  price?: { low?: number; high?: number; midpoint?: number };
};

type QuotePayload = {
  items?: string[];
  loadSize?: string;
  street?: string;
  city?: string;
  zip?: string;
  preferredDate?: string;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  photoNames?: string[];
  photoUrls?: string[];
  estimate?: Estimate | null;
  /**
   * Which of the two posts this is. The form delivers the lead the moment the
   * contact details are in ("lead"), then posts again with the price once the
   * estimator finishes ("estimate"), so a customer who closes the tab during
   * the analyzing screen is still a lead we can call. Both carry the same
   * identifying fields; the Zap matches them on phone_e164.
   */
  stage?: string;
  pageUrl?: string;
};

/** GHL wants first/last separately when it creates the contact. */
function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

/** GHL matches contacts on E.164, so send a normalized copy alongside the raw. */
function toE164(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits ? `+${digits}` : "";
}

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function list(value: unknown) {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export async function POST(request: Request) {
  let body: QuotePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const name = str(body.name);
  const phone = str(body.phone);
  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required" },
      { status: 400 }
    );
  }

  const { firstName, lastName } = splitName(name);
  const street = str(body.street);
  const city = str(body.city);
  const zip = str(body.zip);
  const items = list(body.items);
  const photoNames = list(body.photoNames);
  const photoUrls = list(body.photoUrls);
  const estimate = body.estimate ?? null;

  // Flat, snake_case keys so each one maps straight to a GHL field in Zapier.
  const payload = {
    full_name: name,
    first_name: firstName,
    last_name: lastName,
    phone,
    phone_e164: toE164(phone),
    email: str(body.email),
    address: street,
    city,
    state: "ID",
    postal_code: zip,
    full_address: [street, city, zip && `ID ${zip}`].filter(Boolean).join(", "),
    items: items.join(", "),
    // The "How much junk?" question was retired from the form — photos and the
    // item list size the load now. The key still ships (blank) so the existing
    // field mapping in the Zap doesn't break on a missing property.
    load_size: str(body.loadSize),
    preferred_date: str(body.preferredDate),
    notes: str(body.notes),
    photo_count: photoNames.length,
    photo_names: photoNames.join(", "),
    // Hosted photo links, so the crew can actually look at the job from GHL.
    photo_urls: photoUrls.join(", "),
    photo_url_1: photoUrls[0] ?? "",
    // AI estimate — blank when the customer skipped photos or the estimate failed.
    estimated_cubic_yards: estimate?.cubicYards ?? "",
    estimate_confidence: estimate?.confidence ?? "",
    estimated_price_low: estimate?.price?.low ?? "",
    estimated_price_high: estimate?.price?.high ?? "",
    estimated_items: (estimate?.items ?? [])
      .map((item) => `${item.quantity ?? 1}× ${item.name ?? "item"}`)
      .join(", "),
    estimate_access_notes: estimate?.accessNotes ?? "",
    cannot_haul: (estimate?.cannotHaul ?? []).join(", "),
    source: "Website — Instant Quote Form",
    // "lead" is the first post and always carries the contact details; the
    // "estimate_update" that follows repeats them with the price attached.
    // A Zap that ignores this field entirely still works — it just processes
    // the same contact twice, second one winning.
    submission_type: str(body.stage) === "estimate" ? "estimate_update" : "lead",
    page_url: str(body.pageUrl),
    submitted_at: new Date().toISOString(),
  };

  // A lead that can't be delivered is worse than one that's merely late, so
  // write the whole thing to the logs before giving up. It's recoverable from
  // the Vercel dashboard that way instead of gone. This does put customer
  // contact details in the runtime logs — an acceptable trade against losing
  // paying work, but it's why the logs shouldn't be shared around.
  function recordUndelivered(reason: string) {
    // Labelled by stage on purpose. A failed estimate_update means the contact
    // is already in GHL and only the price is missing — logging that as an
    // undelivered lead would send someone re-entering a customer who is
    // already there.
    const label =
      payload.submission_type === "estimate_update"
        ? "UNDELIVERED ESTIMATE (lead itself already sent)"
        : "UNDELIVERED LEAD";
    console.error(`${label} (${reason}) — recover manually:`, JSON.stringify(payload));
  }

  if (!WEBHOOK_URL) {
    recordUndelivered("ZAPIER_WEBHOOK_URL is not set");
    return NextResponse.json({ ok: false, error: "Lead delivery failed" }, { status: 503 });
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      // Zapier answers 404 "please unsubscribe me!" whenever the Zap behind the
      // hook is switched off or deleted — the same response a genuinely wrong
      // URL gives. Log a masked fingerprint of the hook we actually used so the
      // two can be told apart without guessing which URL is deployed.
      console.error(
        `Zapier webhook responded ${res.status} (hook …${WEBHOOK_URL.slice(-12)})`,
        detail
      );
      recordUndelivered(`webhook returned ${res.status}`);
      return NextResponse.json({ ok: false, error: "Lead delivery failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Zapier webhook request failed", error);
    recordUndelivered("webhook request threw");
    return NextResponse.json({ ok: false, error: "Lead delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
