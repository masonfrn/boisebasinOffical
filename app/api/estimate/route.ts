import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { NextResponse } from "next/server";
import { z } from "zod";
import { TRUCK_CAPACITY_YARDS, loadSizeToCubicYards, priceForCubicYards } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Vision requests with several photos routinely run past the default 10s cap.
export const maxDuration = 60;

const EstimateSchema = z.object({
  cubicYards: z
    .number()
    .describe("Total volume of everything being hauled, in cubic yards."),
  confidence: z
    .enum(["low", "medium", "high"])
    .describe(
      "How reliable this estimate is. Use low when photos are dark, partial, or absent."
    ),
  items: z
    .array(
      z.object({
        name: z.string().describe("What the item is, in the words a customer would use."),
        quantity: z.number().describe("How many of this item are visible."),
        cubicYards: z.number().describe("Volume this line contributes."),
      })
    )
    .describe("Line-by-line breakdown of what drives the volume."),
  accessNotes: z
    .string()
    .describe(
      "Anything about the job that affects crew or time — stairs, tight gates, very heavy items. Empty string if nothing stands out."
    ),
  cannotHaul: z
    .array(z.string())
    .describe(
      "Items visible that we cannot legally take: paint, solvents, chemicals, asbestos, biohazard waste. Empty array if none."
    ),
});

const SYSTEM_PROMPT = `You estimate junk removal volume for Boise Basin Junk Removal in the Treasure Valley, Idaho.

You are given the customer's own description of the job and, usually, photos of the items. Estimate the total volume in cubic yards. A full truck load is ${TRUCK_CAPACITY_YARDS} cubic yards; a standard couch is roughly 3 cubic yards, a refrigerator roughly 2, a queen mattress set roughly 2.5.

Estimate what you can actually see or what the customer explicitly listed. Do not inflate the volume to be safe and do not invent items to fill out the breakdown — a crew will confirm on site, and a quote that comes in far under the real job costs the business more than an honest one. When the photos are unclear or missing, say so with a low confidence rather than guessing precisely.

Flag anything we cannot legally haul: paint, solvents, chemicals, asbestos, or biohazard waste.`;

const anthropic = new Anthropic();

function toJson(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "Estimator is not configured" },
      { status: 503 }
    );
  }

  let body: {
    photoUrls?: string[];
    inlinePhotos?: Array<{ data?: string; mediaType?: string }>;
    items?: string[];
    loadSize?: string;
    notes?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const photoUrls = (Array.isArray(body.photoUrls) ? body.photoUrls : [])
    .filter((url): url is string => typeof url === "string")
    .slice(0, 6);

  // Photos sent as raw data instead of links — the path used when Cloudinary
  // isn't configured. Claude sizes the load either way; only the hosted route
  // leaves a link behind for the crew.
  const inlinePhotos = (Array.isArray(body.inlinePhotos) ? body.inlinePhotos : [])
    .filter(
      (photo): photo is { data: string; mediaType: string } =>
        typeof photo?.data === "string" && typeof photo?.mediaType === "string"
    )
    .slice(0, 6);
  const items = (Array.isArray(body.items) ? body.items : []).filter(
    (item): item is string => typeof item === "string"
  );
  const loadSize = toJson(body.loadSize);
  const notes = toJson(body.notes);

  const photoCount = photoUrls.length + inlinePhotos.length;
  if (photoCount === 0 && items.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Need photos or item types to estimate" },
      { status: 400 }
    );
  }

  const customerGuess = loadSizeToCubicYards(loadSize);
  const description = [
    items.length > 0 && `Item types selected: ${items.join(", ")}.`,
    loadSize &&
      `Customer estimated the load at "${loadSize}"${
        customerGuess ? ` (roughly ${customerGuess} cubic yards)` : ""
      } — treat this as a hint, not a fact.`,
    notes && `Customer notes: ${notes}`,
    photoCount === 0 && "No photos were provided.",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await anthropic.messages.parse({
      model: "claude-opus-5",
      max_tokens: 16000,
      system: SYSTEM_PROMPT,
      output_config: {
        effort: "medium",
        format: zodOutputFormat(EstimateSchema),
      },
      messages: [
        {
          role: "user",
          content: [
            ...photoUrls.map((url) => ({
              type: "image" as const,
              source: { type: "url" as const, url },
            })),
            ...inlinePhotos.map((photo) => ({
              type: "image" as const,
              source: {
                type: "base64" as const,
                media_type: photo.mediaType as "image/jpeg",
                data: photo.data,
              },
            })),
            { type: "text" as const, text: description },
          ],
        },
      ],
    });

    if (response.stop_reason === "refusal") {
      console.error("Estimate refused", response.stop_details);
      return NextResponse.json({ ok: false, error: "Could not estimate" }, { status: 502 });
    }

    const estimate = response.parsed_output;
    if (!estimate) {
      return NextResponse.json({ ok: false, error: "Could not estimate" }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      estimate: {
        ...estimate,
        price: priceForCubicYards(estimate.cubicYards, items),
      },
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      console.error("Estimate rate limited", error.message);
      return NextResponse.json({ ok: false, error: "Busy — try again" }, { status: 429 });
    }
    console.error("Estimate request failed", error);
    return NextResponse.json({ ok: false, error: "Could not estimate" }, { status: 502 });
  }
}
