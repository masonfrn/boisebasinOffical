import { LOAD_SIZES } from "./constants";

// ---------------------------------------------------------------------------
// Rates below are MARKET-RESEARCHED, not Boise Basin's confirmed costs.
// Sourced August 2026 from published Treasure Valley competitor charts and
// Ada County Landfill tipping fees — see RATE_SOURCES at the bottom of this
// file. Mason should sanity-check them against real job margins; the numbers
// are anchored to what the local market charges, not to what it costs us.
// ---------------------------------------------------------------------------
export const PRICING_CONFIGURED = true;

/** Usable capacity of a full truck load, in cubic yards. */
export const TRUCK_CAPACITY_YARDS = 16;

/**
 * Price anchors by volume.
 *
 * Junk removal does NOT price linearly per cubic yard, which is what an
 * earlier version of this file assumed. Every job pays for the same drive,
 * the same crew, and the same dump trip, so the marginal cost of the second
 * half of a truck is far below the first half. Locally that shows up as ~$33
 * per yard filling the first quarter and ~$19 per yard filling the last —
 * a flat per-yard rate priced full loads roughly $250 over market.
 *
 * These anchors are the midpoints of published Treasure Valley ranges. Prices
 * between them are interpolated.
 */
const LOAD_ANCHORS: ReadonlyArray<{ yards: number; price: number }> = [
  { yards: 0, price: 85 }, // minimum — local floor is $89 (Junk Holler)
  { yards: 2, price: 105 }, // ⅛ truck, local range $99–150
  { yards: 4, price: 200 }, // ¼ truck, local range $180–250
  { yards: 8, price: 340 }, // ½ truck, local range $260–400
  { yards: 12, price: 445 }, // ¾ truck, local range $400–500
  { yards: TRUCK_CAPACITY_YARDS, price: 525 }, // full, local range $450–600
];

/** Quoted range is the point estimate ± this fraction. */
const RANGE_SPREAD = 0.15;

/**
 * Flat add-ons for items that cost more to handle than the space they occupy.
 * Each one maps to a real fee or real labor — nothing here is padding.
 *
 * Mattresses are deliberately absent: Ada County has no separate mattress fee,
 * so a mattress is just its volume. Charging extra put standalone mattress
 * pickups ~$50 over what the local market quotes.
 */
export const SURCHARGES: Record<string, number> = {
  "Hot Tub": 200, // teardown + haul; lands jobs at ~$435 vs local $300–600
  Appliances: 30, // $25/item county fee + refrigerant handling
  Electronics: 20, // e-waste fees
};

/**
 * Dense debris is billed by weight at the landfill ($33/ton), and a cubic yard
 * of concrete or dirt runs ~2 tons — the tipping fee alone outruns the volume
 * charge. Applied per cubic yard when these item types are selected.
 */
export const HEAVY_MATERIAL_TYPES = ["Construction Debris", "Yard Waste"];
export const HEAVY_MATERIAL_PER_YARD = 35;

/**
 * The load sizes the public pricing page publishes, as fractions of a truck.
 *
 * Exported from here rather than written out on the page so the published table
 * and the Instant Quote form can never quote two different numbers for the same
 * load — the page runs these through `priceForCubicYards` like any other quote.
 */
export const PUBLISHED_LOAD_SIZES: ReadonlyArray<{
  label: string;
  fraction: string;
  yards: number;
  description: string;
}> = [
  {
    label: "Single Item",
    fraction: "Minimum",
    yards: 1,
    description: "One couch, one mattress, one appliance — the curbside pickup.",
  },
  {
    label: "Eighth Truck",
    fraction: "⅛",
    yards: 2,
    description: "A small bedroom set, or a few boxes and a chair.",
  },
  {
    label: "Quarter Truck",
    fraction: "¼",
    yards: 4,
    description: "A studio apartment's worth, or one corner of a full garage.",
  },
  {
    label: "Half Truck",
    fraction: "½",
    yards: 8,
    description: "A typical garage cleanout or a one-bedroom clear-out.",
  },
  {
    label: "Three-Quarter Truck",
    fraction: "¾",
    yards: 12,
    description: "A large garage, a small estate, or a full storage unit.",
  },
  {
    label: "Full Truck",
    fraction: "Full",
    yards: TRUCK_CAPACITY_YARDS,
    description: "A full storage unit, a whole basement, or a rental turnover.",
  },
];

export type PriceRange = {
  low: number;
  high: number;
  midpoint: number;
};

/** Convert a customer-selected load size into cubic yards via its truck fill. */
export function loadSizeToCubicYards(label: string): number | null {
  const size = LOAD_SIZES.find((l) => l.label === label);
  if (!size) return null;
  return Number(((size.fill / 100) * TRUCK_CAPACITY_YARDS).toFixed(1));
}

/** Walk the anchor table, interpolating between the two that bracket `yards`. */
function basePriceForVolume(yards: number): number {
  const capped = Math.max(0, yards);

  // Past a full truck it's multiple trips — each additional load is a fresh
  // drive and dump run, so it scales by the full-load price rather than tapering.
  if (capped >= TRUCK_CAPACITY_YARDS) {
    const fullLoad = LOAD_ANCHORS[LOAD_ANCHORS.length - 1].price;
    return (capped / TRUCK_CAPACITY_YARDS) * fullLoad;
  }

  for (let i = 1; i < LOAD_ANCHORS.length; i++) {
    const upper = LOAD_ANCHORS[i];
    if (capped > upper.yards) continue;

    const lower = LOAD_ANCHORS[i - 1];
    const span = upper.yards - lower.yards;
    const progress = span === 0 ? 0 : (capped - lower.yards) / span;
    return lower.price + progress * (upper.price - lower.price);
  }

  return LOAD_ANCHORS[LOAD_ANCHORS.length - 1].price;
}

/** Round to the nearest $5 so quotes read like prices, not calculations. */
function roundToFive(value: number): number {
  return Math.round(value / 5) * 5;
}

export function priceForCubicYards(cubicYards: number, items: string[] = []): PriceRange {
  const surcharge = items.reduce((sum, item) => sum + (SURCHARGES[item] ?? 0), 0);
  const heavy = items.some((item) => HEAVY_MATERIAL_TYPES.includes(item))
    ? cubicYards * HEAVY_MATERIAL_PER_YARD
    : 0;

  const midpoint = basePriceForVolume(cubicYards) + surcharge + heavy;

  return {
    low: roundToFive(midpoint * (1 - RANGE_SPREAD)),
    high: roundToFive(midpoint * (1 + RANGE_SPREAD)),
    midpoint: roundToFive(midpoint),
  };
}

export function formatPriceRange(range: PriceRange): string {
  return `$${range.low}–$${range.high}`;
}

/** Where the numbers above came from, so they can be re-checked later. */
export const RATE_SOURCES = [
  "treasurevalleyjunk.com/pricing — published local load + per-item chart",
  "topshelfpros.com/pricing — half-load range, Boise",
  "junkholler.com/pricing — Boise minimum through full load",
  "adacounty.id.gov/landfill — $33/ton MSW, $25/appliance, $5/vehicle entry",
  "homeguide.com/costs/hot-tub-removal-cost — national hot tub range",
];
