"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Loader2,
  MapPin,
  PartyPopper,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { ITEM_TYPES, LOAD_SIZES } from "@/lib/constants";
import { CLOUDINARY_CONFIGURED, toEstimateUrl, uploadPhoto } from "@/lib/cloudinary";
import { PRICING_CONFIGURED, formatPriceRange, type PriceRange } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import TruckLoadGauge from "./TruckLoadGauge";

type Photo = {
  name: string;
  /** Cloudinary URL once the upload lands. */
  url: string | null;
  /**
   * "local" means we never tried to upload because Cloudinary isn't configured —
   * the form then behaves exactly as it did before photos were hosted, showing
   * filenames. Without this the site would show "Upload failed" on every photo.
   */
  status: "uploading" | "ready" | "failed" | "local";
};

type Estimate = {
  cubicYards: number;
  confidence: "low" | "medium" | "high";
  items: Array<{ name: string; quantity: number; cubicYards: number }>;
  accessNotes: string;
  cannotHaul: string[];
  price: PriceRange;
};

type FormState = {
  items: string[];
  loadSize: string;
  photos: Photo[];
  street: string;
  city: string;
  zip: string;
  dateOption: string;
  specificDate: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const STEP_TITLES = [
  "What needs to go?",
  "How much junk?",
  "Add photos",
  "Where are you located?",
  "When works best?",
  "Your contact info",
];

const DATE_OPTIONS = ["ASAP", "Today", "Tomorrow", "Specific Date"];

const initialState: FormState = {
  items: [],
  loadSize: "",
  photos: [],
  street: "",
  city: "",
  zip: "",
  dateOption: "ASAP",
  specificDate: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

// Submissions go to our own API route, which forwards the lead to the Zapier
// Catch Hook wired into Go High Level. See app/api/quote/route.ts.
const FORM_ENDPOINT = "/api/quote";

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [estimateState, setEstimateState] = useState<"idle" | "loading" | "done" | "failed">(
    "idle"
  );

  const totalSteps = STEP_TITLES.length;
  const selectedLoad = useMemo(
    () => LOAD_SIZES.find((l) => l.label === form.loadSize),
    [form.loadSize]
  );
  const uploading = form.photos.some((photo) => photo.status === "uploading");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleItem(item: string) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.includes(item)
        ? prev.items.filter((i) => i !== item)
        : [...prev.items, item],
    }));
  }

  async function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 6);
    if (files.length === 0) return;

    setEstimateState("idle");
    setEstimate(null);

    // No Cloudinary configured — keep the pre-hosting behaviour rather than
    // showing the customer an upload error for something they can't fix.
    if (!CLOUDINARY_CONFIGURED) {
      setForm((prev) => ({
        ...prev,
        photos: files.map((file) => ({ name: file.name, url: null, status: "local" as const })),
      }));
      return;
    }

    // Show the filenames right away, then fill in each URL as its upload lands.
    setForm((prev) => ({
      ...prev,
      photos: files.map((file) => ({
        name: file.name,
        url: null,
        status: "uploading" as const,
      })),
    }));

    await Promise.all(
      files.map(async (file, index) => {
        const settle = (photo: Photo) =>
          setForm((prev) => {
            const photos = [...prev.photos];
            if (photos[index]?.name === file.name) photos[index] = photo;
            return { ...prev, photos };
          });

        try {
          const url = await uploadPhoto(file);
          settle({ name: file.name, url, status: "ready" });
        } catch {
          settle({ name: file.name, url: null, status: "failed" });
        }
      })
    );
  }

  function removePhoto(index: number) {
    setForm((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  }

  const runEstimate = useCallback(async () => {
    setEstimateState("loading");
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoUrls: form.photos
            .map((photo) => photo.url)
            .filter((url): url is string => url !== null)
            .map(toEstimateUrl),
          items: form.items,
          loadSize: form.loadSize,
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error("Estimate failed");
      const data = (await res.json()) as { estimate: Estimate };
      setEstimate(data.estimate);
      setEstimateState("done");
    } catch {
      // A failed estimate is cosmetic — the lead still submits without it.
      setEstimateState("failed");
    }
  }, [form.photos, form.items, form.loadSize, form.notes]);

  // Estimate once the customer reaches the last step, so the wait overlaps with
  // them filling in their contact details.
  useEffect(() => {
    if (step === totalSteps - 1 && estimateState === "idle" && !uploading) {
      void runEstimate();
    }
  }, [step, totalSteps, estimateState, uploading, runEstimate]);

  const canAdvance = (() => {
    switch (step) {
      case 0:
        return form.items.length > 0;
      case 1:
        return form.loadSize !== "";
      case 2:
        return true;
      case 3:
        return form.street.trim() !== "" && form.city.trim() !== "" && form.zip.trim() !== "";
      case 4:
        return form.dateOption !== "ASAP" ? true : true;
      default:
        return true;
    }
  })();

  function next() {
    if (step < totalSteps - 1) setStep((s) => s + 1);
  }
  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus("submitting");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: form.items,
          loadSize: form.loadSize,
          street: form.street,
          city: form.city,
          zip: form.zip,
          preferredDate:
            form.dateOption === "Specific Date" ? form.specificDate : form.dateOption,
          name: form.name,
          phone: form.phone,
          email: form.email,
          notes: form.notes,
          photoNames: form.photos.map((photo) => photo.name),
          photoUrls: form.photos
            .map((photo) => photo.url)
            .filter((url): url is string => url !== null),
          estimate,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-white p-10 text-center shadow-card">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-haul-50 text-haul-500">
          <PartyPopper size={30} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-navy">Thank you!</h3>
        <p className="mt-2 max-w-sm text-ink-muted">
          We&apos;ll contact you shortly with your estimate. If it&apos;s urgent, feel free to call
          or text us directly.
        </p>
        <button
          onClick={() => {
            setForm(initialState);
            setStep(0);
            setStatus("idle");
            setEstimate(null);
            setEstimateState("idle");
          }}
          className="mt-6 font-display text-sm font-semibold text-haul-500 hover:text-haul-600"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-card sm:p-8">
      {/* progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-basin-500">
            Step {step + 1} of {totalSteps}
          </span>
          <span className="text-xs font-medium text-ink-muted">{STEP_TITLES[step]}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-50">
          <motion.div
            className="h-full rounded-full bg-basin-500"
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">
              {STEP_TITLES[step]}
            </h3>

            {step === 0 && (
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {ITEM_TYPES.map((item) => {
                  const active = form.items.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleItem(item)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-xl border-2 px-3.5 py-3 text-left text-sm font-semibold transition-colors",
                        active
                          ? "border-basin-500 bg-basin-50 text-basin-600"
                          : "border-navy/10 text-ink-soft hover:border-haul-300"
                      )}
                    >
                      {item}
                      {active && <Check size={16} className="shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {step === 1 && (
              <div className="mt-5">
                <div className="mb-6 flex justify-center">
                  <TruckLoadGauge fill={selectedLoad?.fill ?? 0} label={form.loadSize || undefined} />
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {LOAD_SIZES.map((size) => {
                    const active = form.loadSize === size.label;
                    return (
                      <button
                        type="button"
                        key={size.label}
                        onClick={() => update("loadSize", size.label)}
                        aria-pressed={active}
                        className={cn(
                          "rounded-xl border-2 px-3.5 py-3 text-left text-sm font-semibold transition-colors",
                          active
                            ? "border-basin-500 bg-basin-50 text-basin-600"
                            : "border-navy/10 text-ink-soft hover:border-haul-300"
                        )}
                      >
                        {size.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-5">
                <label
                  htmlFor="photo-upload"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy/20 px-6 py-10 text-center transition-colors hover:border-haul-400 hover:bg-haul-50/40"
                >
                  <Camera size={28} className="text-haul-500" />
                  <span className="font-display text-sm font-bold text-navy">
                    Tap to add photos
                  </span>
                  <span className="text-xs text-ink-muted">
                    {CLOUDINARY_CONFIGURED
                      ? "Optional — photos let us estimate your price instantly (up to 6)"
                      : "Optional, but photos help us quote more accurately (up to 6)"}
                  </span>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onPhotoChange}
                    className="hidden"
                  />
                </label>

                {form.photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                    {form.photos.map((photo, i) => (
                      <div
                        key={`${photo.name}-${i}`}
                        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-navy-50 text-[11px] font-medium text-ink-muted"
                      >
                        {photo.status === "ready" && photo.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={photo.url}
                            alt={photo.name}
                            className="h-full w-full object-cover"
                          />
                        ) : photo.status === "uploading" ? (
                          <Loader2 size={18} className="animate-spin text-haul-500" />
                        ) : (
                          <span className="px-2 text-center leading-tight">{photo.name}</span>
                        )}
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          aria-label={`Remove ${photo.name}`}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-white"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="mt-5 space-y-4">
                <Field label="Street Address" htmlFor="street">
                  <input
                    id="street"
                    value={form.street}
                    onChange={(e) => update("street", e.target.value)}
                    placeholder="123 Main St"
                    className={inputClass}
                    autoComplete="street-address"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="City" htmlFor="city">
                    <input
                      id="city"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="Boise"
                      className={inputClass}
                      autoComplete="address-level2"
                    />
                  </Field>
                  <Field label="ZIP Code" htmlFor="zip">
                    <input
                      id="zip"
                      value={form.zip}
                      onChange={(e) => update("zip", e.target.value)}
                      placeholder="83702"
                      className={inputClass}
                      inputMode="numeric"
                      autoComplete="postal-code"
                    />
                  </Field>
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <MapPin size={14} /> We serve the entire Treasure Valley
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="mt-5">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {DATE_OPTIONS.map((opt) => {
                    const active = form.dateOption === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => update("dateOption", opt)}
                        aria-pressed={active}
                        className={cn(
                          "rounded-xl border-2 px-3.5 py-3 text-sm font-semibold transition-colors",
                          active
                            ? "border-basin-500 bg-basin-50 text-basin-600"
                            : "border-navy/10 text-ink-soft hover:border-haul-300"
                        )}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {form.dateOption === "Specific Date" && (
                  <div className="mt-4">
                    <Field label="Pick a date" htmlFor="specificDate">
                      <input
                        id="specificDate"
                        type="date"
                        value={form.specificDate}
                        onChange={(e) => update("specificDate", e.target.value)}
                        className={inputClass}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </Field>
                  </div>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="mt-5 space-y-4">
                <EstimatePanel state={estimateState} estimate={estimate} />
                <Field label="Full Name" htmlFor="name" required>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Jane Doe"
                    className={inputClass}
                    autoComplete="name"
                    required
                  />
                </Field>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Phone" htmlFor="phone" required>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(208) 555-0123"
                      className={inputClass}
                      autoComplete="tel"
                      required
                    />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="jane@email.com"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </Field>
                </div>
                <Field label="Additional Notes" htmlFor="notes">
                  <textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Gate code, parking instructions, anything else we should know"
                    rows={3}
                    className={cn(inputClass, "resize-none")}
                  />
                </Field>
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <User size={14} /> We&apos;ll never share your info or spam you.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* nav buttons */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2.5 font-display text-sm font-semibold text-navy transition-opacity",
              step === 0 ? "opacity-0 pointer-events-none" : "opacity-100 hover:bg-navy-50"
            )}
          >
            <ArrowLeft size={16} /> Back
          </button>

          {step < totalSteps - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canAdvance}
              className="flex items-center gap-1.5 rounded-full bg-navy px-6 py-3 font-display text-sm font-bold text-white shadow-card transition-all hover:bg-navy-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex items-center gap-2 rounded-full bg-basin-500 px-7 py-3.5 font-display text-base font-bold text-white shadow-cta transition-all hover:bg-basin-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : (
                "Get My Free Quote"
              )}
            </button>
          )}
        </div>

        {status === "error" && (
          <p className="mt-4 text-center text-sm font-medium text-basin-600">
            Something went wrong sending your request — please call or text us directly instead.
          </p>
        )}
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-navy/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-colors focus:border-haul-400";

function EstimatePanel({
  state,
  estimate,
}: {
  state: "idle" | "loading" | "done" | "failed";
  estimate: Estimate | null;
}) {
  // A failed estimate stays silent — the customer still gets a callback, and an
  // error here would only make them doubt the quote request went through.
  if (state === "failed" || state === "idle") return null;

  if (state === "loading") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border-2 border-haul-200 bg-haul-50/60 px-4 py-3.5">
        <Loader2 size={18} className="animate-spin text-haul-500" />
        <span className="text-sm font-medium text-ink-soft">
          Sizing up your load — this takes a few seconds.
        </span>
      </div>
    );
  }

  if (!estimate) return null;

  const rough = estimate.confidence === "low";

  return (
    <div className="rounded-2xl border-2 border-haul-200 bg-haul-50/60 p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-haul-500" />
        <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-haul-600">
          {rough ? "Rough estimate" : "Your estimate"}
        </span>
      </div>

      {PRICING_CONFIGURED ? (
        <>
          <p className="mt-2 font-display text-3xl font-bold text-navy">
            {formatPriceRange(estimate.price)}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            About {estimate.cubicYards} cubic yards. Final price is confirmed on site before we
            load anything.
          </p>
        </>
      ) : (
        <>
          <p className="mt-2 font-display text-2xl font-bold text-navy">
            About {estimate.cubicYards} cubic yards
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            We&apos;ll confirm your price when we call — usually within the hour.
          </p>
        </>
      )}

      {estimate.items.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-haul-200 pt-3">
          {estimate.items.map((item, i) => (
            <li key={`${item.name}-${i}`} className="flex justify-between gap-3 text-sm">
              <span className="text-ink-soft">
                {item.quantity > 1 && `${item.quantity}× `}
                {item.name}
              </span>
              <span className="shrink-0 text-ink-muted">{item.cubicYards} yd³</span>
            </li>
          ))}
        </ul>
      )}

      {estimate.accessNotes && (
        <p className="mt-3 text-xs text-ink-muted">{estimate.accessNotes}</p>
      )}

      {estimate.cannotHaul.length > 0 && (
        <div className="mt-3 flex gap-2 rounded-xl bg-white/70 px-3 py-2.5">
          <AlertTriangle size={15} className="mt-0.5 shrink-0 text-basin-500" />
          <p className="text-xs text-ink-soft">
            We can&apos;t haul {estimate.cannotHaul.join(", ")} — your local household hazardous
            waste facility takes those. Everything else we&apos;ll handle.
          </p>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
  required,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-muted">
        {label} {required && <span className="text-basin-500">*</span>}
      </label>
      {children}
    </div>
  );
}
