"use client";

export default function TruckLoadGauge({
  fill,
  label,
}: {
  fill: number;
  label?: string;
}) {
  const clamped = Math.max(4, Math.min(100, fill));

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 320 120"
        className="w-full max-w-sm"
        role="img"
        aria-label={label ? `Truck load level: ${label}` : "Truck load level"}
      >
        {/* cab */}
        <path
          d="M8 70 L8 96 L46 96 L46 52 L30 52 L8 70 Z"
          fill="#0B2545"
        />
        <rect x="14" y="58" width="14" height="12" rx="2" fill="#EAF1FB" />
        {/* bed frame */}
        <rect
          x="46"
          y="40"
          width="252"
          height="56"
          rx="6"
          fill="none"
          stroke="#0B2545"
          strokeWidth="4"
        />
        {/* fill clip */}
        <clipPath id="bedClip">
          <rect x="49" y="43" width="246" height="50" rx="4" />
        </clipPath>
        <g clipPath="url(#bedClip)">
          <rect x="49" y="43" width="246" height="50" fill="#FDECE3" />
          <rect
            x="49"
            y="43"
            width={(246 * clamped) / 100}
            height="50"
            fill="#F2662D"
            style={{
              transition: "width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </g>
        {/* wheels */}
        <circle cx="34" cy="96" r="10" fill="#16232E" />
        <circle cx="34" cy="96" r="4" fill="#F6F7F9" />
        <circle cx="110" cy="96" r="10" fill="#16232E" />
        <circle cx="110" cy="96" r="4" fill="#F6F7F9" />
        <circle cx="250" cy="96" r="10" fill="#16232E" />
        <circle cx="250" cy="96" r="4" fill="#F6F7F9" />
      </svg>
      {label && (
        <p className="mt-2 font-display text-sm font-bold text-navy">
          {label} <span className="text-ink-muted font-normal">selected</span>
        </p>
      )}
    </div>
  );
}
