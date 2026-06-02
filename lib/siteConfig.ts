/**
 * Canonical site + business facts for Birchtree Financial.
 *
 * SINGLE SOURCE OF TRUTH IN CODE. Mirrors docs/seo/BRAND_SOURCE_OF_TRUTH.md.
 * Every brand fact (NAP, people, services, area served) used in metadata and
 * JSON-LD structured data is derived from here so it stays consistent and true.
 * Do NOT add facts that aren't verified on the live site.
 */

export const siteConfig = {
  name: "Birchtree Financial",
  legalName: "Birchtree Financial",
  url: "https://birchtreefinancial.ca",
  // Short, plain-language description used for default meta + schema.
  description:
    "Birchtree Financial is a family-run financial advisory firm in Olds, Alberta, helping Canadians with retirement, investment, insurance, tax, wealth, and estate planning.",
  tagline: "Your Financial Future, Elevated",
  email: "melissa.birch@birchtreefinancial.ca",
  telephone: "+14035567777",
  telephoneDisplay: "(403) 556-7777",
  bookingUrl: "https://cal.com/birchtreefinancial",
  locale: "en_CA",
  foundingPerson: "Art Birch",

  address: {
    streetAddress: "4914 50 Ave",
    addressLocality: "Olds",
    addressRegion: "AB",
    postalCode: "T4H 1P5",
    addressCountry: "CA",
  },

  // Approximate coordinates for Olds, AB (town centre). Google uses the Google
  // Business Profile pin for the map; this is a supporting signal only.
  geo: { latitude: 51.7928, longitude: -114.1067 },

  // Mon–Fri 9am–5pm MST
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],

  /**
   * Service area, ordered local → provincial → national. Town list = HQ (Olds)
   * plus documented client towns (Sundre, Red Deer) and the immediately
   * surrounding central-Alberta communities Birchtree realistically serves.
   */
  areaServed: {
    towns: [
      "Olds",
      "Didsbury",
      "Sundre",
      "Carstairs",
      "Bowden",
      "Innisfail",
      "Red Deer",
    ],
    region: "Mountain View County",
    province: "Alberta",
    country: "Canada",
  },

  /**
   * Social / external profiles for schema `sameAs` and AEO entity signals.
   * EMPTY ON PURPOSE — no verified profile URLs exist in the site content yet.
   * Add ONLY real, confirmed URLs (Google Business Profile, Facebook, LinkedIn).
   * Never invent these.
   */
  sameAs: [] as string[],
} as const

export const services = [
  {
    slug: "retirement-planning",
    name: "Retirement Planning",
    short:
      "RRSP, CPP and OAS timing, and tax-smart withdrawal strategies for a confident retirement.",
  },
  {
    slug: "investment-management",
    name: "Investment Management",
    short:
      "Disciplined, evidence-based portfolios built to grow and protect your wealth.",
  },
  {
    slug: "insurance-strategies",
    name: "Insurance Strategies",
    short:
      "Life, disability, critical illness, and long-term care coverage tailored to your needs.",
  },
  {
    slug: "tax-optimization-strategies",
    name: "Tax Optimization Strategies",
    short:
      "TFSA/RRSP optimization and year-round, tax-efficient planning to keep more of what you earn.",
  },
  {
    slug: "wealth-building-advisory",
    name: "Wealth Building & Advisory",
    short:
      "Strategic advice to build, preserve, and transfer wealth across generations.",
  },
  {
    slug: "estate-planning-guidance",
    name: "Estate Planning Guidance",
    short:
      "Wills, trusts, beneficiary and legacy planning that minimizes taxes and probate.",
  },
] as const

/** The real team. LLQP is the ONLY documented credential — never add CFP/CFA/etc. */
export const team = [
  {
    slug: "melissa-birch",
    name: "Melissa Birch",
    jobTitle: "Owner & Financial Advisor",
    credential: "LLQP",
    email: "melissa.birch@birchtreefinancial.ca",
    knowsAbout: [
      "Financial Advisory",
      "Life Insurance",
      "Accident & Sickness Insurance",
      "Retirement Planning",
    ],
  },
  {
    slug: "kevin-birch",
    name: "Kevin Birch",
    jobTitle: "Co-owner & Office Administrator",
    credential: "",
    email: "",
    knowsAbout: ["Office Management", "Client Relations"],
  },
  {
    slug: "kaleb-birch",
    name: "Kaleb Birch",
    jobTitle: "IT Specialist",
    credential: "",
    email: "",
    knowsAbout: ["Technology Infrastructure", "Cybersecurity"],
  },
  {
    slug: "crystal",
    name: "Crystal Smith",
    jobTitle: "Bookkeeper & Office Administrator",
    credential: "",
    email: "",
    knowsAbout: ["Bookkeeping", "Client Services"],
  },
  {
    slug: "art-birch",
    name: "Art Birch",
    jobTitle: "Founder & Mentor",
    credential: "LLQP",
    email: "",
    knowsAbout: [
      "Life Insurance",
      "Investment Advisory",
      "Retirement Planning",
      "Estate Planning",
    ],
  },
] as const

/** Real community organizations Birchtree supports (local-SEO E-E-A-T). */
export const communityPartners = [
  "Olds Grizzlys",
  "4-H Canada",
  "BGC Olds & Area",
  "Mountain View Emergency Shelter Society (MVESS)",
] as const
