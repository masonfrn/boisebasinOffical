import { LOAD_SIZES } from "./constants";

// ---------------------------------------------------------------------------
// ⚠️  PLACEHOLDER RATES — these are NOT Boise Basin's real prices.
//
// Until RATES below hold the real numbers, keep PRICING_CONFIGURED false: the
// quote form shows the AI volume estimate and item breakdown but no dollar
// figure, so we never quote a customer a price we can't honor. Flip it to true
// once the rates are right and the price range appears in the form.
// ---------------------------------------------------------------------------
export const PRICING_CONFIGURED = false;

/** Usable capacity of a full truck load, in cubic yards. */
export const TRUCK_CAPACITY_YARDS = 16;

const RATES = {
  /** Charged on every job before volume — covers drive time, labor, dump run. */
  minimumCharge: 95,
  /** Marginal cost per cubic yard hauled. */
  perCubicYard: 45,
  /** Quoted range is the point estimate ± this fraction. */
  rangeSpread: 0.2,
};

/** Items that cost extra to dispose of regardless of the space they take up. */
const SURCHARGES: Record<string, number> = {
  Mattress: 35,
  "Hot Tub": 150,
  Appliances: 25,
  Electronics: 20,
};

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

/** Round to the nearest $5 so quotes read like prices, not calculations. */
function roundToFive(value: number): number {
  return Math.round(value / 5) * 5;
}

export function priceForCubicYards(cubicYards: number, items: string[] = []): PriceRange {
  const surcharge = items.reduce((sum, item) => sum + (SURCHARGES[item] ?? 0), 0);
  const base = Math.max(
    RATES.minimumCharge,
    RATES.minimumCharge + cubicYards * RATES.perCubicYard
  );
  const midpoint = base + surcharge;

  return {
    low: roundToFive(midpoint * (1 - RATES.rangeSpread)),
    high: roundToFive(midpoint * (1 + RATES.rangeSpread)),
    midpoint: roundToFive(midpoint),
  };
}

export function formatPriceRange(range: PriceRange): string {
  return `$${range.low}–$${range.high}`;
}
