# Birchtree Financial — project memory

Next.js 14 App Router · Tailwind · framer-motion · lucide-react · TypeScript.
Marketing/advisory site for Birchtree Financial (Olds, AB). Body is the scroll
container (`html,body{height:100%}` in globals.css) — in Playwright/devtools use
`document.body.scrollTop`, NOT `window.scrollTo`, and avoid `fullPage`
screenshots (they expose the dark `html` bg as a fake dark band — use viewport
shots or scroll).

## Where we are right now (2026-06-04)
The light "private-bank" redesign is done AND a full **SEO + AI/answer-engine
optimization pass** has landed on top of it. Verified production-ready.

- **Branch:** `seo/optimization` (HEAD = `bbe0e05`), pushed to origin, **12
  commits ahead of `main`** (0 behind). **NEVER commit to or touch `main`** — it
  stays at the safe/live commit `7e979a8`. Don't push/merge without the user
  explicitly asking.
- Working tree clean. Verified 2026-06-04: `npx tsc --noEmit` → 0 errors;
  `npm run build` → exit 0, "Compiled successfully", 69/69 static pages. Served
  the prod build and confirmed all routes 200, robots.txt/sitemap.xml(42 urls)/
  manifest/opengraph-image all render, homepage emits canonical + OG + 2 JSON-LD
  blocks (`FinancialService` etc.). Only build noise is one cosmetic Tailwind
  "ambiguous `ease-[cubic-bezier(...)]`" warning — not a failure.
- **Lineage since redesign:** `30ed27b` light redesign → `3c6eabb` design
  touch-ups → `c80ad93` mobile-menu rebuild → `bbe0e05` SEO/AEO pass.

### What's live in production (LAUNCHED 2026-06-04)
Deploys via **Vercel** project `birchtree-financial-demo`
(`prj_gSZt8TR9Duai2Ly3UZMJ9fuc6XDA`, team `team_hTXfnqbSw3ULuJOTORDEzME9`).
- **LIVE = redesign + SEO + designed OG image (`9e43d3b`).** Shipped this session;
  `main` = `origin/main` = `9e43d3b`. Verified on `www.birchtreefinancial.ca`:
  hero "...Elevated", title "Financial Advisor in Olds, Alberta",
  FinancialService+WebSite JSON-LD, 42-url www sitemap, AI-crawler robots,
  `/financial-advisor-olds-alberta`→200, `/opengraph-image.jpg`→200 (1200×630
  designed share card; see `app/opengraph-image.jpg` + `.alt.txt`).
- Canonical host = **`www`** (apex 307-redirects to www; all SEO signals use www —
  `lib/siteConfig.ts`, `sitemap.ts`, `robots.ts`).
- **CRITICAL deploy gotcha — production is "instant-rollback" pinned.** Because
  prod was instant-rolled-back earlier, the production domain is PINNED to a
  chosen deployment. Pushing to `main` builds a **READY production deployment but
  does NOT auto-take the domain** — the old one keeps serving. To actually go
  live you must **`vercel promote <deployment-url>`** (CLI authed as
  cohenbell07-5541). That's how `9e43d3b` launched. Expect this on every release
  until the pinned-rollback state is cleared in the Vercel dashboard.
- Post-launch SEO TODO: submit `https://www.birchtreefinancial.ca/sitemap.xml` in
  Google Search Console; confirm the GSC property is the **www** host.

### Run it
```bash
cd "/Users/marnibell/Documents/Birch tree financial"
PORT=3000 npm run dev        # → http://localhost:3000  (port 3000 is free here)
```

## The design system (match this for any new UI)
Light, airy, refined. Brand tokens (Tailwind names): `midnight` #0B1A2C (text +
navy buttons; `midnight-light` #152439), `gold` #D7C38A / `gold-dark` #C4B076
(ACCENTS ONLY — eyebrows, hairlines, small icons, rules), paper #FBFAF6 /
alt #F7F5EF, white. Fonts: **Libre Baskerville** headings (`font-heading`),
**Inter** body. **Primary buttons are NAVY** (`bg-midnight text-white`), never
gold-filled. Section bgs alternate `bg-white` / `bg-[#F7F5EF]`, rhythm
`py-20 sm:py-24`. Cards: `rounded-2xl border border-midnight/10 bg-white p-6`
with hover `-translate-y-1 ... hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]`.
Eyebrows gold-dark; gold hairline rule under headings
(`linear-gradient(to right, rgba(215,195,138,0.85), transparent)`).
Reference implementation = `app/page.tsx` (the homepage — the source of truth).
Reuse primitives in `components/ui/` (Container, Section, SectionHeader,
Eyebrow, Reveal/RevealStagger, Card, Button) and `components/layout/PageHeader`
(now light). No dark section backgrounds anywhere except the footer/nav.

## Key files
- `app/page.tsx` — homepage, the canonical light design
- `components/layout/{Navbar,Footer,PageHeader}.tsx` — Navbar has the vector logo
  + fixed dropdowns; PageHeader is the shared light page-hero band
- `components/brand/{BirchTreeMark,BirchtreeLogo}.tsx` — logo is now SVG+text
  (not a PNG); recolors via currentColor
- `components/{ChatBot,ChatBotPanel}.tsx` — light chatbot (navy launcher w/ gold
  icon; white panel, navy user bubbles)
- `app/globals.css` — tokens + `.bt-*` utilities + `.bt-section--*` tonal bgs
- `public/favicon.svg` + `favicon-16/32`, `apple-touch-icon`, `android-chrome-*`
  — redesigned navy badge favicon (regenerate via rsvg-convert; browsers cache
  favicons hard, hard-refresh to see)

## SEO / AEO system (the `bbe0e05` pass)
- **Single source of truth = `lib/siteConfig.ts`** — all NAP/brand facts (name,
  url `https://birchtreefinancial.ca`, address 4914 50 Ave Olds AB T4H 1P5, phone
  (403) 556-7777, team, services, areaServed, hours, geo). Mirrors
  `docs/seo/BRAND_SOURCE_OF_TRUTH.md`. **Don't invent facts not verified live.**
- `lib/schema.ts` builds JSON-LD graphs from siteConfig; rendered via
  `components/seo/JsonLd.tsx`. Homepage = `FinancialService`+`WebSite`; the
  `/financial-advisor-olds-alberta` local landing page adds `FAQPage` +
  `BreadcrumbList`. Per-page `metadata` lives in each route's `layout.tsx`.
- `app/sitemap.ts` (42 urls), `app/robots.ts` (welcomes AI crawlers — GPTBot,
  ClaudeBot, PerplexityBot, etc.; disallows /admin /api), `app/manifest.ts`,
  `app/opengraph-image.tsx`. Root metadata + `metadataBase` in `app/layout.tsx`.
- **If you change the live domain, base URL is hardcoded in `app/sitemap.ts` and
  `app/robots.ts`** (not just siteConfig) — update all three.

## Gotchas / lessons (IMPORTANT)
- **Multi-agent workflows fabricated/dropped real content** on content-heavy
  pages during the redesign (team page had ALL real staff replaced with invented
  people; about/faq/resources/cpp-oas lost real copy/data/logic). These were
  caught and fixed by reverting to original content then re-styling with a
  content-locked pass. **If you run a styling workflow over content pages again,
  forbid touching any string/array and verify with a `git diff HEAD` content
  check.** Real data lives in arrays at the top of each page (teamMembers, stats,
  faqs, etc.) — never reword or invent these.
- Real team = Melissa Birch, Kevin Birch, Kaleb Birch, Crystal Smith, Art Birch
  (slugs melissa-birch/kevin-birch/kaleb-birch/crystal/art-birch; photos
  `/melissaupdate.webp`,`/Kevinupdate.webp`,`/kalebbirchtreenew.webp`,
  `/crystalteamimg.webp`,`/artbirchnew.webp`). Real about stats: 30+/500+/$1B+.
- Orphaned/unused since the logo rebuild (safe to delete): `components/Logo.tsx`,
  `components/LogoTreeIcon.tsx`, `components/BirchTreeIcon.tsx`,
  `public/birchtree logo22.png`, `public/newtreeicon.png`.
- `.preview/` and `.playwright-mcp/` are gitignored local scratch (screenshots,
  the workflow scripts `.preview/*.js`). Fuller history: `SESSION-NOTES.md`.
- `npm audit`: transitive vulns were patched in `45376c5` (`npm audit fix`, no
  app/code change). Re-run `npm audit` if you need the current count.

## Next up — POST-LAUNCH
The redesign + SEO + OG image are LIVE (`9e43d3b`). Open follow-ups:
1. **Submit the sitemap in Google Search Console** (www property) and watch
   indexing of the new pages (esp. `/financial-advisor-olds-alberta`).
2. **Clear the instant-rollback pin** in the Vercel dashboard so future
   `main` pushes auto-promote again (until then, every release needs a manual
   `vercel promote` — see the deploy gotcha above).
3. More **design touch-ups** are fair game against the design system above; keep
   content/data byte-identical (see Gotchas). Each release: push `main`, wait for
   READY, then `vercel promote <url>` to actually go live.
