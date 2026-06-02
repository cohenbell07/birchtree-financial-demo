/**
 * JSON-LD (schema.org) builders for Birchtree Financial.
 *
 * All values come from lib/siteConfig.ts (the verified source of truth).
 * These power rich results in Google AND machine-readable facts for AI answer
 * engines (ChatGPT, Perplexity, Google AI Overviews, etc.).
 *
 * We use a stable @id graph so nodes can reference each other:
 *   #organization  — the business (FinancialService / LocalBusiness)
 *   #website       — the website
 */

import { siteConfig, services, team } from "@/lib/siteConfig"

const ORG_ID = `${siteConfig.url}/#organization`
const WEBSITE_ID = `${siteConfig.url}/#website`

type JsonLdNode = Record<string, unknown>

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry,
  }
}

function areaServedNodes() {
  const towns = siteConfig.areaServed.towns.map((name) => ({
    "@type": "City",
    name,
  }))
  return [
    ...towns,
    { "@type": "AdministrativeArea", name: siteConfig.areaServed.region },
    { "@type": "AdministrativeArea", name: siteConfig.areaServed.province },
    { "@type": "Country", name: siteConfig.areaServed.country },
  ]
}

/**
 * The business node. FinancialService is a subtype of LocalBusiness, so this
 * single node serves both local-pack and "financial advisor" entity needs.
 */
export function organizationSchema(): JsonLdNode {
  const node: JsonLdNode = {
    "@type": ["FinancialService", "LocalBusiness"],
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/android-chrome-512x512.png`,
    image: `${siteConfig.url}/android-chrome-512x512.png`,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    // priceRange omitted on purpose: the firm charges no direct client fees and
    // a symbolic "$$" tier would be misleading. The free consultation is
    // expressed via the ReserveAction offer below instead.
    slogan: siteConfig.tagline,
    currenciesAccepted: "CAD",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(
      `${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}`
    )}`,
    areaServed: areaServedNodes(),
    openingHoursSpecification: siteConfig.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    founder: { "@type": "Person", name: siteConfig.foundingPerson },
    knowsAbout: services.map((s) => s.name),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        url: `${siteConfig.url}/services/${s.slug}`,
      },
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: siteConfig.bookingUrl,
      name: "Book a complimentary consultation",
    },
  }
  if (siteConfig.sameAs.length > 0) node.sameAs = siteConfig.sameAs
  return node
}

export function websiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en-CA",
    publisher: { "@id": ORG_ID },
  }
}

/** Sitewide nodes injected once in the root layout. */
export function globalGraph() {
  return graph([organizationSchema(), websiteSchema()])
}

export function personSchema(member: (typeof team)[number]): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "Person",
    "@id": `${siteConfig.url}/team/${member.slug}#person`,
    name: member.name,
    jobTitle: member.jobTitle,
    worksFor: { "@id": ORG_ID },
    url: `${siteConfig.url}/team/${member.slug}`,
    knowsAbout: member.knowsAbout,
  }
  if (member.email) node.email = member.email
  if (member.credential === "LLQP") {
    node.hasCredential = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "Life License Qualification Program (LLQP)",
    }
  }
  return node
}

export function serviceSchema(service: {
  slug: string
  name: string
  description: string
}): JsonLdNode {
  return {
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.name,
    provider: { "@id": ORG_ID },
    areaServed: areaServedNodes(),
    url: `${siteConfig.url}/services/${service.slug}`,
    audience: { "@type": "Audience", audienceType: "Canadian individuals, families, and business owners" },
  }
}

export function faqSchema(
  faqs: { question: string; answer: string }[]
): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }
}

export function articleSchema(post: {
  slug: string
  title: string
  description: string
  publishedAt: string
  image?: string
}): JsonLdNode {
  return {
    "@type": "BlogPosting",
    "@id": `${siteConfig.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "en-CA",
    image: post.image
      ? `${siteConfig.url}${post.image}`
      : `${siteConfig.url}/android-chrome-512x512.png`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  }
}

/** Wrap one or more nodes into a single @context graph for injection. */
export function graph(nodes: JsonLdNode[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  }
}
