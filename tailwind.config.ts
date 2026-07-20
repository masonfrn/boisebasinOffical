import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B2545",
          50: "#EEF2F7",
          100: "#D6E0EC",
          400: "#2E4A6E",
          500: "#173A63",
          600: "#0B2545",
          700: "#081C36",
          800: "#051327",
        },
        haul: {
          50: "#EAF1FB",
          100: "#CFE1F7",
          300: "#6FA3DE",
          400: "#3E7FCB",
          500: "#1E5AA8",
          600: "#164784",
          700: "#103763",
        },
        basin: {
          50: "#FDECE3",
          100: "#FBD3BE",
          300: "#F79A6C",
          400: "#F57F49",
          500: "#F2662D",
          600: "#DA531E",
          700: "#B24118",
        },
        paper: "#F6F7F9",
        ink: {
          DEFAULT: "#16232E",
          soft: "#3B4A59",
          muted: "#5B6B7A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 2px 10px -2px rgba(11,37,69,0.08), 0 8px 24px -8px rgba(11,37,69,0.10)",
        cardHover: "0 8px 20px -4px rgba(11,37,69,0.14), 0 16px 40px -12px rgba(11,37,69,0.18)",
        cta: "0 10px 30px -8px rgba(242,102,45,0.55)",
      },
      keyframes: {
        fillTruck: {
          "0%": { width: "0%" },
          "100%": { width: "var(--fill, 50%)" },
        },
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fillTruck: "fillTruck 1s ease-out forwards",
        floatUp: "floatUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
