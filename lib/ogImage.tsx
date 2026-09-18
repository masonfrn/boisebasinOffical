import BrandMark from "@/components/ui/BrandMark";

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
      {/* The real lockup, same as the header — this image is what Facebook
          shows when someone shares a link, so the badge-plus-typed-text
          version meant the share preview didn't quite match the ad running
          beside it. White in place of the logo's navy, since this sits on the
          navy card; the orange carries over as-is. */}
      <div style={{ display: "flex" }}>
        <BrandMark width={260} markColor="#FFFFFF" />
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
