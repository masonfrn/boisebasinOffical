"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Loader2,
  MapPin,
  PartyPopper,
  User,
  X,
} from "lucide-react";
import { ITEM_TYPES, LOAD_SIZES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import TruckLoadGauge from "./TruckLoadGauge";

type FormState = {
  items: string[];
  loadSize: string;
  photos: File[];
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

// TODO: Replace with your real Formspree endpoint (or any form backend).
// Sign up free at https://formspree.io, create a form, and paste the ID below.
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const totalSteps = STEP_TITLES.length;
  const selectedLoad = useMemo(
    () => LOAD_SIZES.find((l) => l.label === form.loadSize),
    [form.loadSize]
  );

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

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 6);
    update("photos", files);
  }

  function removePhoto(index: number) {
    setForm((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  }

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
      const data = new FormData();
      data.append("items", form.items.join(", "));
      data.append("loadSize", form.loadSize);
      data.append("street", form.street);
      data.append("city", form.city);
      data.append("zip", form.zip);
      data.append("preferredDate", form.dateOption === "Specific Date" ? form.specificDate : form.dateOption);
      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("email", form.email);
      data.append("notes", form.notes);
      form.photos.forEach((file, i) => data.append(`photo_${i + 1}`, file));

      if (FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
        // No backend connected yet — simulate success so the flow is demo-able.
        await new Promise((r) => setTimeout(r, 700));
      } else {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Submission failed");
      }
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
                    Optional, but photos help us quote more accurately (up to 6)
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
                    {form.photos.map((file, i) => (
                      <div
                        key={i}
                        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-navy-50 text-[11px] font-medium text-ink-muted"
                      >
                        <span className="px-2 text-center leading-tight">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          aria-label={`Remove ${file.name}`}
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
