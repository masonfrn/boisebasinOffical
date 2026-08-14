# Boise Basin Junk Removal — Website

A modern, mobile-first Next.js site built for Facebook Ads traffic, with the
Instant Quote form as the primary conversion path.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide Icons

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Things to edit before launch

1. **Where quote leads go** — the form posts to `app/api/quote/route.ts`,
   which forwards each lead as JSON to a Zapier Catch Hook that creates the
   contact in Go High Level. The hook URL is hardcoded in that route as a
   fallback and can be overridden with a `ZAPIER_WEBHOOK_URL` environment
   variable (set it in Vercel → Settings → Environment Variables to point at
   a different Zap). Photo *files* are not forwarded — only their filenames,
   so the crew knows to ask for them.
2. **Set your real prices** — `lib/pricing.ts` holds `RATES` (minimum charge,
   per-cubic-yard rate, surcharges). The values in there are placeholders, so
   `PRICING_CONFIGURED` is `false` and the quote form shows the estimated
   volume without a dollar figure. Put your real numbers in and flip that flag
   to show customers a price range.
3. **AI photo estimate** — photos upload to Cloudinary, then `app/api/estimate/route.ts`
   asks Claude to size the load in cubic yards and flag anything hazardous.
   Needs `ANTHROPIC_API_KEY` plus the two `NEXT_PUBLIC_CLOUDINARY_*` variables
   (see `.env.example`). Without them the form works exactly as it did before —
   no estimate panel, lead still submits.
4. **Google Business Profile URL** — `lib/constants.ts` → `BUSINESS.googleReviewUrl`
   is already set from your QR code. Swap it out any time your review link
   changes.
5. **Facebook page URL** — `lib/constants.ts` → `BUSINESS.facebookUrl` is a
   placeholder; update it to your real Facebook page.
6. **Hero & illustration graphics** — `components/home/HeroIllustration.tsx`
   is an original SVG illustration used as a placeholder for real crew /
   truck photography. Swap it for an `<Image>` of your actual crew when you
   have photos (drop files in `/public` and reference them).
7. **Site URL for SEO** — `app/layout.tsx`, `app/sitemap.ts`, and
   `app/robots.ts` all reference `https://boisebasinjunkremoval.com`.
   Update this once you know your real domain.
8. **Testimonials** — `lib/constants.ts` → `TESTIMONIALS` are placeholders.
   Replace with real customer quotes (with permission) as you collect them.

## Project structure

```
app/                Pages (Home, Instant Quote, About, Service Areas, Contact)
components/layout/  Navbar, Footer, sticky mobile call bar, floating quote button
components/home/    Home page sections (Hero, Services, Reviews, FAQ, etc.)
components/quote/   The multi-step Instant Quote form + truck load gauge
components/ui/      Shared primitives (Button, Container, SectionHeading)
lib/                Business info, nav links, and page content in one place
```

Most copy and business details live in `lib/constants.ts` — start there for
quick edits.

## Deploying to GitHub + Vercel

1. Create a new, empty repository on GitHub (don't initialize it with a
   README).
2. From this project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com), click **Add New → Project**, and
   import the GitHub repo you just pushed. Vercel auto-detects Next.js —
   leave the default build settings and click **Deploy**.
4. Once deployed, add your custom domain under the project's **Settings →
   Domains** tab if you have one.

Every future `git push` to `main` will automatically redeploy the site.
