# Boise Basin Junk Removal — marketing site

Next.js 14 (App Router) + TypeScript + Tailwind, deployed on Vercel at
https://www.boisebasinjunk.com. Real business, real customers, live site.

**This repository is public.** No secrets, keys, webhook URLs, or customer data
in committed code — ever, including as a "temporary fallback."

## Who you're working with

Mason owns the business; he is not a professional developer. Write explanations
in plain language, and when something needs doing outside the editor (Vercel,
Cloudinary, Google, Zapier), give the literal click-path rather than naming the
setting and assuming he'll find it. Don't assume familiarity with React,
TypeScript, or git internals — but don't over-explain what he's already doing
comfortably.

## Branches

- `main` — production. Vercel auto-deploys it. What customers see.
- `V3BBoffical` — current working branch. **New work lands here first.**
- `V2BBOfficial` — older fallback, leave alone.

Work on `V3BBoffical` unless told otherwise, and don't merge to `main` or push
without being asked.

## Content integrity — the rules that matter most

This site's copy makes claims to real customers about a real business. The
existing code enforces several norms deliberately, and several existing comments
explain the reasoning. Do not relax them to fill out a page.

- **Reviews are verbatim and real.** `TESTIMONIALS` in `lib/constants.ts`
  reproduces actual Google reviews including typos. Never write a testimonial,
  never fix a reviewer's spelling, never invent a reviewer. `location` is
  optional because a reviewer's city usually isn't public — a guessed city is a
  fabricated detail attached to a named person.
- **Photos are our own job photos only.** A service page shows a real photo of
  that service or it shows no photo section. Never use a stock image or a photo
  from a different job as a stand-in.
- **Service claims must be true.** If you're unsure whether Boise Basin actually
  does something, or what it costs, ask Mason instead of writing plausible copy.
- **The 80 service-by-city pages must stay genuinely differentiated.**
  `lib/localPages.ts` explains this: a page whose only difference is a
  find-and-replaced city name is a doorway page, and Google filters those —
  often dragging down the city pages that already rank. Each entry needs a real
  `intro` and a concrete `localNote`.
- **The AI estimator must not inflate.** The system prompt in
  `app/api/estimate/route.ts` deliberately tells the model to estimate only what
  it can see. An under-quote costs less than a dishonest one.

## Architecture

Content is **data, not markup.** Almost all site copy lives in typed arrays in
`lib/`, and pages compose from them. Adding a service or city means editing the
data, not writing a new page component.

- `lib/constants.ts` — the content spine. `BUSINESS`, `SERVICE_AREAS`,
  `SERVICES`, `SERVICE_PAGES` (10), `CITY_PAGES` (8), `FAQS`, `TESTIMONIALS`,
  `NAV_LINKS`. Nav dropdowns are *derived* from `SERVICES`/`CITY_PAGES` so menus
  can't drift from the pages that exist.
- `lib/localPages.ts` — the 10 × 8 = 80 service-by-city combinations.
- `lib/resources.ts` — the guide/blog posts.
- `lib/pricing.ts` — volume→price anchors. Rates are **market-researched from
  competitors, not Boise Basin's confirmed costs**; flag that when pricing comes
  up.
- `SITE_URL` in `lib/constants.ts` drives every canonical tag, `og:url`, schema
  block, sitemap, and robots entry. Changing it changes all of them — that's the
  point, don't hardcode the domain anywhere else.

Routes: `app/services/[service]`, `app/services/[service]/[city]`,
`app/junk-removal/[city]`, `app/resources/[slug]` — all statically generated
from the data above.

Components: `components/home/`, `components/layout/`, `components/quote/`,
`components/ui/`. Import via the `@/` alias.

## Quote flow

`components/quote/QuoteForm.tsx` → photos shrunk client-side by
`lib/photos.ts` (Vercel caps request bodies at ~4.5MB and Claude bills by image
size) → `app/api/estimate/route.ts` (Claude vision → cubic yards → price) →
`app/api/quote/route.ts` → Zapier Catch Hook → Go High Level.

The GHL/Zapier side belongs to Mason's mentor, not to this repo.

## Styling

Tailwind with a custom brand palette in `tailwind.config.ts` — `navy`, `haul`
(blue), `basin` (orange, the CTA color), `paper`, `ink`. Use these tokens rather
than raw hex or default Tailwind colors. Fonts are Space Grotesk (`font-display`)
and Inter (`font-body`). Custom shadows: `shadow-card`, `shadow-cardHover`,
`shadow-cta`.

## Commands

```bash
npm run dev     # local dev server
npm run build   # always run before considering a change done
npm run lint
```

There is no test suite. `npm run build` is the check that matters — it catches
type errors and bad static params across all ~100 generated pages.

## Environment

`.env.local` locally, mirrored in Vercel → Settings → Environment Variables:
`ZAPIER_WEBHOOK_URL`, `ANTHROPIC_API_KEY` (server-only, never `NEXT_PUBLIC_`),
`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

## Working notes

- iPhone photos arrive as `.HEIC` and won't render on the web or in the
  estimator. Convert to `.jpg` first — this box has no ImageMagick, so use
  PowerShell/WIC. `.gitignore` excludes `.HEIC` so originals never deploy;
  the ones sitting in `public/photos/` are camera originals awaiting conversion,
  not usable assets.
- Code comments here explain *why*, not *what*, and are unusually thorough.
  Match that when adding code — especially where a decision looks arbitrary or
  reverses something that was tried before.
- SEO is the point of most of this site. Changes that touch titles, meta
  descriptions, canonicals, headings, internal links, or the sitemap deserve
  more care than their size suggests.
