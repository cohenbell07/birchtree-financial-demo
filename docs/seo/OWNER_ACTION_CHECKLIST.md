# Birchtree Financial — Owner Action Checklist (SEO/AEO)

The code-side SEO/AEO work is done on the `seo/optimization` branch. A few high-impact
items can only be completed by the business owner (they involve verifying facts,
claiming external profiles, or off-site work). They're listed here so nothing is lost.

The full strategy and content roadmap lives in **`docs/seo/SEO_AEO_PLAYBOOK.md`**.
The locked brand facts live in **`docs/seo/BRAND_SOURCE_OF_TRUTH.md`**.

---

## 1. ⚠️ Verify regulatory wording (truthfulness — needs owner confirmation)

The existing `/faq` and `/about` pages describe the firm as a **"fee-only fiduciary"** and a
**"registered investment advisor … held to a fiduciary standard."** Our verified facts show the
firm is **LLQP-licensed** (life + accident & sickness insurance) and a **registered financial
advisory firm in Canada** — but "registered investment advisor" (an American term) and "fee-only
fiduciary" may not accurately describe the firm's actual registrations.

- **We did NOT change this copy** — it's a regulatory/compliance claim only the owner can confirm.
- **Action:** Melissa to confirm the firm's exact registrations and licensing. If the firm is
  LLQP-only, update the wording on `/faq`, `/about`, and `/services` to something accurate, e.g.
  *"We act in a client-first way; our advisors hold the Life License Qualification Program (LLQP)
  license and we are a registered financial advisory firm in Canada. We're compensated through the
  company, not by direct fees to you."*
- **Important:** Do not claim CFP, CFA, CIM, or other designations the firm doesn't hold.
- All **new** content we created already uses the safe, verified wording.

## 2. Add real social/profile URLs (entity resolution for AI search)

`lib/siteConfig.ts` → `sameAs` is intentionally empty. Once these are claimed/verified, paste the
real URLs into that array (the Organization JSON-LD picks them up automatically):

- [ ] Google Business Profile URL
- [ ] Facebook business page
- [ ] LinkedIn company page
- [ ] Instagram (if active)

## 3. Google Business Profile (the #1 local lever)

- [ ] Claim + verify the listing for **4914 50 Ave, Olds, AB T4H 1P5**.
- [ ] Primary category **Financial Planner**; secondary: Financial Consultant, Insurance Agency, Investment Service.
- [ ] Fill every field: exact NAP, hours (Mon–Fri 9–5 MST), website, booking link, full description (name Olds + central Alberta + the 6 services), and list all 6 services.
- [ ] Post monthly (RRSP/TFSA deadlines, sponsorship news, blog reshares); seed the Q&A ("Do you serve Sundre/Red Deer?"); upload real office/team/community photos.

## 4. Reviews routine (compliant)

- [ ] Get the GBP "review us" short-link; add it to a post-meeting email template.
- [ ] Email **every** client (CRM rotation) after onboarding/annual reviews — genuine, no incentives, no selective solicitation. Aim for a steady drip.

## 5. Citations / directories (identical NAP everywhere)

Build manually with byte-identical NAP (Birchtree Financial / 4914 50 Ave, Olds, AB T4H 1P5 / (403) 556-7777 / https://birchtreefinancial.ca):

- [ ] Tier 1: Apple Business Connect, Bing Places, Facebook, YellowPages.ca, Yelp.ca, Foursquare
- [ ] Tier 2 (Canada): n49, Cylex.ca, HotFrog.ca, Brownbook, ProfileCanada, Canada411
- [ ] Better Business Bureau

## 6. Local backlinks (authentic, hard to replicate)

- [ ] Ask each real sponsorship to add a logo + link: **Olds Grizzlys, BGC Olds & Area, 4-H, MVESS**.
- [ ] Join the **Olds & District Chamber of Commerce** (member directory listing).
- [ ] Pursue InvestOlds.ca and local Olds news/event sites.

## 7. Google Search Console

- [ ] Verify the `birchtreefinancial.ca` property.
- [ ] Submit `https://birchtreefinancial.ca/sitemap.xml`.
- [ ] After deploy, confirm AI crawlers aren't blocked at the host/WAF layer:
      `curl -A 'OAI-SearchBot' https://birchtreefinancial.ca` should return HTTP 200.

## 8. Refresh figures every January

When the CRA confirms new annual limits, update the dollar figures in the blog posts
(TFSA/RRSP/FHSA/CPP/OAS) so the site is never the stale result. See the figures we verified
for 2026 in the playbook.
