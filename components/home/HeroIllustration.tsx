export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 560 460"
      className="w-full max-w-lg drop-shadow-[0_30px_60px_rgba(11,37,69,0.25)]"
      role="img"
      aria-label="Illustration of a Boise Basin Junk Removal crew loading a truck"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAF1FB" />
          <stop offset="100%" stopColor="#F6F7F9" />
        </linearGradient>
      </defs>

      <rect width="560" height="460" rx="28" fill="url(#sky)" />

      {/* sun */}
      <circle cx="470" cy="80" r="38" fill="#FDECE3" />
      <circle cx="470" cy="80" r="24" fill="#F79A6C" />

      {/* ground */}
      <rect x="0" y="372" width="560" height="88" fill="#0B2545" opacity="0.06" />
      <rect x="0" y="372" width="560" height="4" fill="#0B2545" opacity="0.15" />

      {/* junk pile */}
      <g>
        <rect x="60" y="318" width="70" height="54" rx="6" fill="#1E5AA8" />
        <rect x="132" y="336" width="46" height="36" rx="5" fill="#F2662D" />
        <circle cx="70" cy="310" r="16" fill="#0B2545" opacity="0.85" />
        <rect x="96" y="296" width="30" height="22" rx="4" fill="#6FA3DE" />
      </g>

      {/* truck body */}
      <g>
        {/* cargo box */}
        <rect x="210" y="176" width="230" height="150" rx="10" fill="#F6F7F9" stroke="#0B2545" strokeWidth="5" />
        <rect x="222" y="188" width="206" height="126" rx="4" fill="#EAF1FB" />
        {/* junk silhouette inside truck */}
        <rect x="236" y="228" width="40" height="86" rx="4" fill="#1E5AA8" />
        <rect x="284" y="246" width="46" height="68" rx="4" fill="#F2662D" />
        <circle cx="366" cy="270" r="30" fill="#0B2545" opacity="0.9" />
        <rect x="200" y="286" width="34" height="40" rx="4" fill="#F79A6C" />

        {/* cab */}
        <path d="M440 236 L440 326 L500 326 L500 268 L468 236 Z" fill="#0B2545" />
        <path d="M448 246 L448 268 L484 268 L468 246 Z" fill="#EAF1FB" />
        <rect x="448" y="278" width="42" height="8" rx="3" fill="#F2662D" />

        {/* wheels */}
        <circle cx="248" cy="330" r="20" fill="#16232E" />
        <circle cx="248" cy="330" r="8" fill="#F6F7F9" />
        <circle cx="470" cy="330" r="20" fill="#16232E" />
        <circle cx="470" cy="330" r="8" fill="#F6F7F9" />
      </g>

      {/* crew member 1 - carrying box toward truck */}
      <g>
        <circle cx="150" cy="238" r="15" fill="#F2662D" />
        <rect x="132" y="254" width="36" height="52" rx="10" fill="#0B2545" />
        <rect x="112" y="258" width="80" height="46" rx="8" fill="#1E5AA8" />
        <rect x="128" y="306" width="14" height="34" rx="6" fill="#16232E" />
        <rect x="156" y="306" width="14" height="34" rx="6" fill="#16232E" />
      </g>

      {/* crew member 2 - near truck bed */}
      <g>
        <circle cx="205" cy="252" r="15" fill="#3B4A59" />
        <rect x="187" y="268" width="36" height="52" rx="10" fill="#1E5AA8" />
        <rect x="182" y="320" width="14" height="30" rx="6" fill="#16232E" />
        <rect x="210" y="320" width="14" height="30" rx="6" fill="#16232E" />
      </g>

      {/* motion lines */}
      <g stroke="#1E5AA8" strokeWidth="4" strokeLinecap="round" opacity="0.35">
        <line x1="30" y1="200" x2="60" y2="200" />
        <line x1="20" y1="220" x2="55" y2="220" />
      </g>
    </svg>
  );
}
