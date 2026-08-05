export const OG_SIZE = { width: 1200, height: 630 };

export function ogElement() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#0B2545",
        backgroundImage:
          "radial-gradient(circle at 82% 18%, rgba(242,102,45,0.35), transparent 42%), radial-gradient(circle at 8% 88%, rgba(30,90,168,0.35), transparent 45%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            width: 76,
            height: 76,
            borderRadius: 20,
            background: "#F2662D",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.25">
            <path d="M10 17h4V5H2v12h3" />
            <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
            <circle cx="7.5" cy="17.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: "white", lineHeight: 1 }}>
            Boise Basin
          </div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: 4,
              color: "#F79A6C",
              marginTop: 6,
            }}
          >
            JUNK REMOVAL
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
        <div
          style={{
            fontSize: 66,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.08,
            letterSpacing: -1,
          }}
        >
          Fast &amp; Affordable Junk Removal
        </div>
        <div style={{ fontSize: 30, fontWeight: 600, color: "#CFE1F7", marginTop: 22 }}>
          Treasure Valley, Idaho — Same-Day Service
        </div>
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        {["Licensed & Insured", "Upfront Pricing", "Same-Day Service"].map((label) => (
          <div
            key={label}
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 600,
              color: "#0B2545",
              background: "white",
              padding: "10px 20px",
              borderRadius: 999,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
