# Boise Basin Junk Removal — Website

The live marketing site for Boise Basin Junk Removal, at
**https://www.boisebasinjunk.com**. Mobile-first, built to capture both paid
social traffic and local search, with the Instant Quote form as the primary
conversion path.

> **This repository is public.** No secrets, API keys, webhook URLs, or customer
> data belong in committed code — not even as a temporary fallback. Everything
> sensitive is an environment variable.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS — custom brand palette in `tailwind.config.ts`
  (`navy`, `haul`, `basin`, `paper`, `ink`)
- Framer Motion (animations)
- Lucide Icons
- Deployed on Vercel

## Run it locally

```bash
npm install
npm run dev     # http://localhost:3000
```

Before considering any change done:

```bash
npm run build
```

There is no test suite. `npm run build` is the check that matters — it compiles
all 120 statically generated pages and catches type errors and
broken route params that never show up in dev.

## How the content works

**Content is data, not markup.** Almost all site copy lives in typed arrays
under `lib/`, and the page components compose themselves from it. Adding a
service or a city means editing the data — not writing a new page component.

| File | What's in it |
|---|---|
| `lib/constants.ts` | The content spine: `BUSINESS`, `SERVICE_AREAS` (22), `SERVICES` (10), `SERVICE_PAGES` (10), `CITY_PAGES` (8), `FAQS`, `TESTIMONIALS`, `NAV_LINKS` |
| `lib/localPages.ts` | The 10 × 8 = 80 service-by-city combinations |
| `lib/resources.ts` | The guide / blog posts (6) |
| `lib/pricing.ts` | Volume → price anchors used by the quote estimator |

Nav dropdowns are *derived* from `SERVICES` and `CITY_PAGES`, so the menus can't
drift out of sync with the pages that actually exist.

`SITE_URL` in `lib/constants.ts` drives every canonical tag, `og:url`, schema
block, sitemap entry, and robots rule. It is set in exactly one place on
purpose — if the domain ever changes, change it there and nowhere else.

## Project structure

```
app/
  page.tsx                        Home
  quote/                          Instant Quote form
  services/                       Service index
  services/[service]/             10 service pages
  services/[service]/[city]/      80 service-by-city pages
  junk-removal/[city]/            8 city pages
  resources/                      Guides index
  resources/[slug]/               Individual guides
  about/  contact/  pricing/
  service-areas/  privacy-policy/
  sitemap.ts  robots.ts  manifest.ts
  opengraph-image.tsx  twitter-image.tsx
  api/estimate/                   Claude vision → cubic yards → price
  api/quote/                      Lead → Zapier → Go High Level

components/layout/   Navbar, Footer, sticky mobile call bar, floating quote button
components/home/     Hero, ServicesGrid, Reviews, FAQ, WhyChooseUs, ServiceAreaMap…
components/quote/    Multi-step Instant Quote form + truck load gauge
components/ui/       Shared primitives (Button, Container, SectionHeading, Breadcrumbs…)

lib/                 All business info and page content (see table above)
```

Import via the `@/` alias.

## The quote flow

```
QuoteForm.tsx
  → lib/photos.ts          shrinks photos in the browser
  → api/estimate/route.ts  Claude sizes the load in cubic yards
  → api/quote/route.ts     forwards the lead as JSON
  → Zapier Catch Hook      → Go High Level
```

Photos are shrunk client-side before upload because Vercel caps request bodies
at roughly 4.5 MB and Claude bills by image size. Photo *files* aren't forwarded
to the lead hook — only their filenames, so the crew knows to ask for them.

The Zapier and Go High Level side of this lives outside this repo.

## Environment variables

Set these in `.env.local` locally and mirror them in
**Vercel → Settings → Environment Variables**. See `.env.example`.

| Variable | Purpose |
|---|---|
| `ZAPIER_WEBHOOK_URL` | Where leads go. No fallback — see below |
| `ANTHROPIC_API_KEY` | AI photo estimate. **Server-only — never `NEXT_PUBLIC_`** |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Photo uploads |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Photo uploads |

There is deliberately **no hardcoded webhook fallback**. An earlier one was
rebuilt on Zapier's side and started returning 404 while still looking correctly
configured, so leads bounced with nothing pointing at the cause. A hook URL is
also effectively a write credential, and this repo is public. If
`ZAPIER_WEBHOOK_URL` is missing the route logs it loudly rather than silently
pretending to deliver.

Without the Anthropic and Cloudinary variables the quote form still works — it
just skips the estimate panel. The lead still submits.

## Content rules

This site makes claims to real customers about a real business. Several of these
constraints look like gaps to fill in; they aren't.

- **Reviews are verbatim and real.** `TESTIMONIALS` reproduces actual Google
  reviews, typos included. Never write one, never fix a reviewer's spelling,
  never invent a reviewer. `location` is optional because a reviewer's city
  usually isn't public — a guessed city is a fabricated detail attached to a
  named person.
- **Photos are our own job photos only.** A service page shows a real photo of
  that service, or it shows no photo section. No stock images, no photo from a
  different job standing in.
- **Service claims must be true.** If it's unclear whether Boise Basin actually
  does something, or what it costs, ask — don't write plausible copy.
- **The 80 service-by-city pages must stay genuinely differentiated.** A page
  whose only difference is a find-and-replaced city name is a doorway page.
  Google filters those, and it can drag down the city pages that already rank.
  Each entry needs a real `intro` and a concrete `localNote`.
- **The AI estimator must not inflate.** Its system prompt tells the model to
  estimate only what it can actually see. An under-quote costs less than a
  dishonest one.

## Still open

- **Hero graphic** — `components/home/HeroIllustration.tsx` is an original SVG
  standing in for real crew and truck photography. Swap it for an `<Image>` of
  the actual crew once photos exist (drop files in `/public`).
- **Pricing rates** — `lib/pricing.ts` is live (`PRICING_CONFIGURED` is `true`),
  but the rates in it were researched from competitors rather than confirmed
  against Boise Basin's own costs. Worth revisiting with real numbers.
- **iPhone photos** — `.HEIC` files won't render on the web or in the estimator
  and have to be converted to `.jpg` first. `.gitignore` excludes them so camera
  originals never deploy; the ones sitting in `public/photos/` are originals
  awaiting conversion, not usable assets.

## Branches and deploying

| Branch | Role |
|---|---|
| `main` | Production, and the working branch. Vercel auto-deploys every push |
| `V3BBoffical` | Retired 2026-08-27, fully merged into `main` |
| `V2BBOfficial` | Older fallback. Leave it alone |

Work happens directly on `main`. There is no staging branch, so `main` is the
only thing between an edit and a customer reading it — **run `npm run build`
before every push.** A push is live on the site in about a minute.

SEO is the point of most of this site. Changes touching titles, meta
descriptions, canonicals, headings, internal links, or the sitemap deserve more
care than their size suggests.
