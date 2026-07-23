import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyCallBar from "@/components/layout/StickyCallBar";
import FloatingQuoteButton from "@/components/layout/FloatingQuoteButton";
import { BUSINESS, SITE_URL } from "@/lib/constants";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Boise Basin Junk Removal | Fast & Affordable Junk Removal in the Treasure Valley",
    template: "%s | Boise Basin Junk Removal",
  },
  description:
    "Boise Basin Junk Removal provides fast, affordable junk removal throughout Boise, Meridian, Nampa, Eagle, Caldwell, Kuna, Star, and the surrounding Treasure Valley. Get your free instant quote today.",
  keywords: [
    "Boise Junk Removal",
    "Junk Removal Boise",
    "Treasure Valley Junk Removal",
    "Furniture Removal Boise",
    "Appliance Removal Boise",
    "Garage Cleanout Boise",
    "Estate Cleanout Boise",
  ],
  openGraph: {
    title: "Boise Basin Junk Removal | Fast & Affordable Junk Removal in the Treasure Valley",
    description:
      "Same-day and next-day junk removal across the Treasure Valley. Upfront pricing, licensed and insured. Get an instant quote in minutes.",
    url: siteUrl,
    siteName: "Boise Basin Junk Removal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boise Basin Junk Removal",
    description:
      "Fast, affordable junk removal throughout the Treasure Valley. Get your free instant quote today.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: siteUrl,
    areaServed: [
      "Boise, ID",
      "Meridian, ID",
      "Eagle, ID",
      "Nampa, ID",
      "Caldwell, ID",
      "Kuna, ID",
      "Star, ID",
      "Middleton, ID",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: "US",
    },
    priceRange: "$$",
  };

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-paper font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="pb-16 lg:pb-0">{children}</main>
        <Footer />
        <StickyCallBar />
        <FloatingQuoteButton />
      </body>
    </html>
  );
}
