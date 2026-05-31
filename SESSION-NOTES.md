# Birchtree Financial — Redesign Handoff Notes

_Updated: 2026-05-31. **Work in progress — more to do.** Read this first when resuming._

---

## ⚡ Quick start (new session, low context)

```bash
cd "/Users/marnibell/Documents/Birch tree financial"
git branch                       # you should be on: redesign/site-refresh
PORT=3001 npm run dev            # port 3000 is taken by another project ("The Site Guy")
# → http://localhost:3001
```

- **Branch:** all redesign work is committed on **`redesign/site-refresh`** (NOT pushed).
  `main` is left untouched at the live/safe commit `7e979a8` (= `origin/main`). Do NOT push without the user saying so.
- **Stack:** Next.js 14 App Router, Tailwind, framer-motion, lucide-react. TS.
- **Gotcha — scroll container is `<body>`**, not the window (`html,body{height:100%}` in globals.css).
  In Playwright/devtools use `document.body.scrollTop`, NOT `window.scrollTo`. The navbar reads scroll via
  a capture-phase listener for this reason. Below-the-fold sections use `whileInView` reveals (need a real scroll).

---

## 🎯 The redesign direction (brand kept intact)

Light, airy **private-bank** aesthetic. Tokens: midnight `#0B1A2C`, gold `#D7C38A` (accent only),
paper/cream `#FBFAF6`/`#FCFBF8`, white. Fonts: **Libre Baskerville** (headings) + **Inter** (body).
**Primary buttons are NAVY** (`bg-midnight`); gold is reserved for accents/hairlines/eyebrows.

Driven by user-provided mockups (light homepage + light footer + mockup header with dropdowns).

---

## ✅ DONE so far (this is what's on the branch)

### Homepage — `app/page.tsx` (full light rebuild)
Two-col hero (copy + navy/outline CTAs + "Fiduciary advice" line | 3D growth image + live Markets card)
→ 5-up divided stats bar → "Our Financial Services" (intro + 5 cards) → Mission (birch image) + Why-Choose
(2×2) two-panel row → testimonials 3-up w/ carousel affordance → mountains CTA band.
- Hero image + Markets card are **side-by-side ≥1280px**, **stacked below 1280px** (so the image never gets
  squeezed and the card never overlaps the chart).
- `"Elevated"` in the H1 is **gold** (`text-gold-dark`). Mockup showed navy — OPEN: user may want it navy.

### Live "Markets at a glance" card — `components/home/MarketsCard.tsx` + `app/api/markets/route.ts`
- Client component polls `/api/markets` every **20s**, with a green **● LIVE** pulse, flash-on-change, and an
  "Updated HH:MM:SS" stamp. Seeded with fallback values so it's never empty.
- API pulls **6 indices** (matching the original ticker banner) from Yahoo Finance free chart API (no key):
  S&P/TSX Composite `^GSPTSE`, S&P 500 `^GSPC`, Nasdaq 100 `^NDX`, Dow Jones `^DJI`, Gold `GC=F`, Silver `SI=F`.
  Server-side `revalidate: 20` to stay under Yahoo limits. NOTE: Yahoo can rate-limit datacenter IPs in prod →
  card falls back to last-known values (LIVE dot goes neutral). Values only move during market hours.

### Header / Navbar — `components/layout/Navbar.tsx` (full rebuild)
- **Bigger logo** (h-3.5rem / 56px top, shrinks on scroll). Horizontal wordmark (NOT stacked — user requirement).
- Mockup-style **dropdown nav**: **About ▾ · Services · Blog · Resources ▾ · Contact**
  - About ▾ → About Us, Our Team (icon + label + 1-line description; `whitespace-nowrap` so labels never wrap).
  - Services → plain tab (was a cramped dropdown — user wanted it flat).
  - Blog → its own tab.
  - Resources ▾ → Resource Library (`/resources`), Calculators (`/tools`), Helpful Tools (`/helpful-tools`), FAQ (`/faq`).
  - Contact → plain link.
- Phone (xl) + **navy** "Book a Consultation" CTA. Active item gets a gold underline.
- Mobile: full-screen dark overlay; About & Resources are **accordions**, others are plain links.
- Header is always light/frosted now (the old transparent-over-dark-hero logic was removed since the homepage
  is light). Uses standard Tailwind widths (`w-72`) for dropdowns — earlier arbitrary `w-[440px]` caused wrap bugs.

### Calculators hub — `app/tools/page.tsx` + `app/tools/layout.tsx` (NEW page)
`/tools` had no index — created one. Dark `PageHeader` band + 3-col card grid of all 9 calculators
(retirement, savings, tfsa-rrsp, tax-optimization, cpp-oas, resp, net-worth, bank-loan, risk-profiler).
"Calculators" in the nav points here. The 9 `/tools/*` subpages were untouched and still work.

### Footer — `components/layout/Footer.tsx` (full light rebuild)
Cream bg + birch-leaf watermark (`public/footer-leaves.webp`, `mix-blend-multiply`). Brand+tagline | Company |
Resources link columns (gold eyebrows + gold underline) | Contact as bordered cards (gold icon, PHONE/EMAIL/OFFICE).
Divider + centered copyright. Same links/info as before, restyled.

### Premium CSS utilities — `app/globals.css`
Added `.bt-frame` (engraved inset gold frame — still used by the navbar mobile overlay), `.bt-numeral`,
`.bt-draw`, `.bt-sheen`, `.bt-float`, `.bt-scroll-cue`. Additive only.

### Images added/processed (`public/`)
- `birchtree-hero.webp` — 3D growth chart, hero. (User's transparent PNG `birchtree-hero-section-img.png`,
  trimmed + webp. NOTE: the original 622 KB PNG is still in public, UNUSED — ok to delete.)
- `mission-birch.webp` — birch trees (mission panel). `cta-mountains.webp` — CTA band bg.
- `footer-leaves.webp` — footer watermark.
- (An earlier hero `hero-growth.webp`/`hero-chart.webp` had a transparency **checkerboard baked into the bg** —
  fixed via `magick … -level 0,96%`. Final hero is the clean transparent `birchtree-hero.webp`.)

---

## 🔧 OPEN decisions (ask the user)
1. **"Elevated"** in the hero H1: gold (current) vs navy (mockup). One-word change.
2. **Helpful Tools vs Calculators**: both in the Resources dropdown. `/helpful-tools` = gov resources/guides;
   `/tools` = calculators. Keep separate (current) or merge?
3. Dropdown item descriptions ("Plan with our tools" etc.) — keep or strip for a more minimal look.
4. Delete the unused 622 KB `public/birchtree-hero-section-img.png`?

---

## 📋 NEXT — remaining redesign work (not started)
The homepage, header, and footer are the new LIGHT look. **The rest of the site still uses the OLD style**
(dark `PageHeader` bands + older section treatments). To finish the redesign, bring the light private-bank
aesthetic to the other pages and decide how the dark `PageHeader` band fits (restyle it light, or keep dark as
an intentional contrast):
- `/about`, `/team`, `/services` + the 6 service detail pages (`app/services/*`)
- `/resources` (+ `[slug]`), `/blog` (+ posts), `/faq`, `/contact`
- `/helpful-tools`, `/why-you-need-a-will`, `/ai-advisor`, `/referral`
- the 9 `/tools/*` calculator pages (UI consistency with the new look)
- Consider restyling `components/layout/PageHeader.tsx` to match the light theme (it's shared by most pages).

Also pending: commit is **not pushed**; the recovered repo + redesign are only local. Push when the user OKs.
`npm audit` reported 14 vulns (7 moderate / 7 high) — untouched.

---

## 🛟 Repo history note (why .git looked weird)
When this work started, the working folder was a **partial copy**: 93 tracked files (incl. `package.json`,
`globals.css`, configs, `lib/`, components/pages) were missing from disk AND `.git` was corrupted (no `HEAD`).
It was repaired: recreated `HEAD`+`refs/heads/main` → `7e979a8`, `git fetch origin`, restored the 93 deleted
files, `npm install`. Local `main == origin/main == 7e979a8`. The redesign branched off that.

---

## File map (most-touched)
```
app/page.tsx                      ← homepage (light)
app/api/markets/route.ts          ← live quotes (Yahoo)
app/tools/page.tsx + layout.tsx   ← calculators hub (NEW)
app/globals.css                   ← tokens + premium utilities
components/layout/Navbar.tsx       ← dropdown nav, bigger logo
components/layout/Footer.tsx       ← light footer + leaf watermark
components/home/MarketsCard.tsx     ← live markets card (NEW)
components/ui/{section,container,reveal,...}.tsx   ← primitives (unchanged)
design-system/MASTER.md            ← original design system doc (pre-light-redesign)
```
