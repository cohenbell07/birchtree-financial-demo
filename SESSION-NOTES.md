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

## ⚠️ Site-wide light redesign (2026-05-31, workflow pass) — IN PROGRESS, verify before trusting
Ran a multi-agent workflow to push the light homepage styling to every page + shared components + chatbot.
**Foundation done & verified:** `PageHeader` (dark→light), `Button` (default→navy), `ChatBot`+`ChatBotPanel`
(now light — I had to redo these by hand; the agent reported success but never wrote them), `LeadCapture`/
`FAQSection`/`CalendarWidget`, and the 4 recharts `Chart.tsx` (brand palette). TypeScript passes; all routes 200.

**CAUTION — agents fabricated/dropped real content on a few pages (caught + being fixed):**
- `team/page.tsx`: agent REPLACED all 5 real staff (Melissa/Kevin/Kaleb/Crystal/Art) with 6 invented people +
  fake bios/emails + broken `/team/advisor-N.jpg` images + changed slugs. → restored real data by hand.
- `about`, `faq`, `resources`, `tools/cpp-oas-optimizer`: agents reworded/dropped real content (about lost
  community logos + real stats 30+/500+/$1B+ + Vision/History/Mission/Compliance copy; faq 14→4 Qs;
  resources 28→18; cpp-oas lost recommendation + lifetimeBenefit logic). → reverted to HEAD, re-restyling via
  a hardened content-safe workflow (`.preview/restyle-4.js`).
- LESSON: a styling workflow over content-heavy pages MUST forbid touching any string/array and verify with a
  content diff vs HEAD. The first workflow's brief said "styling only" but didn't hard-verify content.
**TODO after restyle-4 finishes:** re-typecheck, re-screenshot about/faq/resources/cpp-oas, then full visual pass.

## ✅ DONE so far (this is what's on the branch)

### Logo → code, nav dropdowns, favicon (2026-05-31, later pass)
- **Logo is now vector, not a PNG.** `components/brand/BirchTreeMark.tsx` is the birch tree as an
  inline SVG (a tight `potrace` vectorization of `public/newtreeicon.png`, `fill: currentColor` so it
  recolors navy/white). `components/brand/BirchtreeLogo.tsx` pairs the mark with a real-text wordmark in
  Libre Baskerville ("Birchtree" navy + "Financial" slightly lighter). Navbar uses it bigger
  (mark ~h-3.15rem, wordmark ~1.7rem) and scales to 0.87 on scroll. Footer now uses `BirchTreeMark` too.
  The old raster (`/birchtree logo22.png`) + `components/{Logo,LogoTreeIcon,BirchTreeIcon}.tsx` are now
  **orphaned/unused** (safe to delete later). The tree shape is a faithful replica of the original — if a
  cleaner/more refined redraw is wanted, do a custom SVG in `BirchTreeMark.tsx`.
- **Dropdowns fixed** (`Navbar.tsx`): two bugs. (1) panels were `bg-white/95 + backdrop-blur` nested under
  the navbar's own backdrop-filter → page text bled through. (2) the real cropping cause: the panel's
  fixed `w-[18.5rem]` + `overflow-hidden` was collapsing to ~91px (text spans `clientW:0`) so every label
  got chopped. Now the panel is **`w-max min-w-[17rem] max-w-[calc(100vw-1.5rem)]`, solid `bg-white`, NO
  overflow-hidden, no backdrop-blur**, and the label/desc wrapper is a `flex flex-col` (was nested
  `min-w-0` spans). Verified in-DOM: Resources panel = 272px, anyClipped=false, all 8 text rows inside.
  Kept the icon-tile + label + desc look. Mobile accordion menu also confirmed working.
- **Favicon redesigned** into a navy rounded badge + gold hairline + cream birch tree. `public/favicon.svg`
  (scalable) plus regenerated `apple-touch-icon.png` (180, full-bleed for iOS), `android-chrome-192/512`,
  and `favicon-16/32`. All referenced from `app/layout.tsx` `metadata.icons`. Regenerate via the SVGs +
  `rsvg-convert` (see `/tmp/tracewd/favicon.js` pattern). Browsers cache favicons hard → hard-refresh to see.

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
