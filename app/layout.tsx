import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyCallBar from "@/components/layout/StickyCallBar";
import FloatingQuoteButton from "@/components/layout/FloatingQuoteButton";
import { BUSINESS, BUSINESS_HOURS, SITE_URL } from "@/lib/constants";

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
    default: "Junk Removal in Boise, ID | Boise Basin",
    template: "%s | Boise Basin Junk Removal",
  },
  description:
    "Same-day junk removal across the Treasure Valley — Boise, Meridian, Nampa, Eagle & more. Upfront pricing. Get a free instant quote today.",
  keywords: [
    "Boise Junk Removal",
    "Junk Removal Boise",
    "Treasure Valley Junk Removal",
    "Furniture Removal Boise",
    "Appliance Removal Boise",
    "Garage Cleanout Boise",
    "Estate Cleanout Boise",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Junk Removal in Boise, ID | Boise Basin",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
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
    image: `${siteUrl}/opengraph-image`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: siteUrl,
    sameAs: [BUSINESS.facebookUrl, BUSINESS.googleReviewUrl],
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: BUSINESS_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.opens,
      closes: h.closes,
    })),
    priceRange: "$$",
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-paper font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1974919679878223');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1974919679878223&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Navbar />
        <main className="pb-16 lg:pb-0">{children}</main>
        <Footer />
        <StickyCallBar />
        <FloatingQuoteButton />
      </body>
    </html>
  );
}