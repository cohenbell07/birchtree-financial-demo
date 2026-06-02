import type { Metadata } from "next"
import Link from "next/link"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import PageHeader from "@/components/layout/PageHeader"
import JsonLd from "@/components/seo/JsonLd"
import { faqSchema, breadcrumbSchema, graph } from "@/lib/schema"
import { siteConfig, services, communityPartners } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Financial Advisor in Olds, Alberta",
  description:
    "Birchtree Financial is a family-run, LLQP-licensed financial advisory firm at 4914 50 Ave in Olds, Alberta. Retirement, investment, insurance, tax, and estate planning for Olds and central Alberta. Book a free consultation: (403) 556-7777.",
  keywords: [
    "financial advisor Olds",
    "financial advisor Olds Alberta",
    "financial planner Olds AB",
    "retirement planning Olds Alberta",
    "financial advisor central Alberta",
    "financial advisor near me Olds",
  ],
  alternates: { canonical: "/financial-advisor-olds-alberta" },
  openGraph: {
    title: "Financial Advisor in Olds, Alberta | Birchtree Financial",
    description:
      "Family-run, LLQP-licensed financial advisory firm in Olds, Alberta serving central Alberta and Canada.",
    type: "website",
    locale: "en_CA",
    url: "/financial-advisor-olds-alberta",
  },
}

const localFaqs = [
  {
    question: "Where is Birchtree Financial located?",
    answer:
      "Our office is at 4914 50 Ave in downtown Olds, Alberta (T4H 1P5). We're open Monday to Friday, 9:00am–5:00pm Mountain Time, and you can reach us at (403) 556-7777 or melissa.birch@birchtreefinancial.ca.",
  },
  {
    question: "Do you work with clients outside of Olds?",
    answer:
      "Yes. We serve individuals, families, and business owners across central Alberta — including Didsbury, Sundre, Carstairs, Bowden, Innisfail, and Red Deer — as well as clients across Canada. Meetings can be held in person at our Olds office, by phone, or over Zoom.",
  },
  {
    question: "Is the first consultation really free?",
    answer:
      "Yes. Your initial consultation is complimentary and comes with no obligation. We'll discuss your goals, answer your questions, and help you decide whether we're the right fit — and you'll get value from that first conversation either way.",
  },
  {
    question: "What kind of financial advisor is Birchtree Financial?",
    answer:
      "We're a family-run, registered financial advisory firm in Canada with over 30 years of experience. Our advisors hold the Life License Qualification Program (LLQP) license and we help clients with retirement, investment, insurance, tax, wealth, and estate planning — always with a client-first approach.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Call us at (403) 556-7777, email melissa.birch@birchtreefinancial.ca, or book online at cal.com/birchtreefinancial. You can also use the contact page on this website to send us a message.",
  },
]

const testimonials = [
  {
    quote:
      "We'd been putting off retirement planning for years—honestly, it felt too complicated. Melissa sat down with us, walked us through everything in plain English, and now we actually feel excited about retiring next year instead of scared.",
    name: "Karen & Doug M.",
    location: "Retired Couple · Olds, AB",
  },
  {
    quote:
      "Running a ranch doesn't leave a lot of time to think about RRSPs and tax strategy. The Birchtree team took that off my plate completely. They set everything up, check in regularly, and I trust them like family at this point.",
    name: "Tyler Brandt",
    location: "Ranch Owner · Sundre, AB",
  },
  {
    quote:
      "I switched to Birchtree after my old advisor kept pushing products I didn't need. Here, it actually feels like they're working for me. They helped me set up a group plan for my employees too, which was a game-changer.",
    name: "Priya Sandhu",
    location: "Small Business Owner · Red Deer, AB",
  },
]

export default function OldsLocalPage() {
  return (
    <div className="bg-white">
      <JsonLd
        data={graph([
          faqSchema(localFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            {
              name: "Financial Advisor in Olds, Alberta",
              path: "/financial-advisor-olds-alberta",
            },
          ]),
        ])}
      />

      <PageHeader
        eyebrow="Olds, Alberta"
        title="Financial Advisor in Olds, Alberta"
        subtitle="Family-run, client-first financial advice for Olds and central Alberta — and Canadians wherever you call home."
      />

      {/* Answer-first intro capsule (AEO) */}
      <Section tone="paper" topRule>
        <Container size="narrow">
          <p className="text-lg leading-relaxed text-midnight/75 sm:text-xl">
            <strong className="font-semibold text-midnight">
              Birchtree Financial
            </strong>{" "}
            is a family-run, LLQP-licensed financial advisory firm based at 4914
            50 Ave in Olds, Alberta. For over 30 years we&apos;ve helped
            individuals,
            families, and business owners across central Alberta and Canada plan
            for retirement, invest with confidence, protect what matters, and
            pass on a legacy — all starting with a complimentary consultation.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: MapPin,
                label: "Office",
                value: "4914 50 Ave, Olds, AB T4H 1P5",
              },
              {
                icon: Phone,
                label: "Phone",
                value: siteConfig.telephoneDisplay,
                href: `tel:${siteConfig.telephone}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: siteConfig.email,
                href: `mailto:${siteConfig.email}`,
              },
              {
                icon: Clock,
                label: "Hours",
                value: "Mon–Fri, 9am–5pm MST",
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-3.5 rounded-xl border border-midnight/10 bg-white px-4 py-3.5"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                  <Icon className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <div className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-dark">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="block truncate text-sm font-medium text-midnight hover:text-gold-dark"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="truncate text-sm font-medium text-midnight">
                      {value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${siteConfig.telephone}`}
              className="inline-flex items-center justify-center rounded-xl border border-midnight/20 bg-white px-7 py-3.5 text-sm font-semibold text-midnight transition-all duration-300 hover:border-midnight/40 hover:bg-midnight/[0.03]"
            >
              <Phone className="mr-2 h-4 w-4 text-gold-dark" />
              Call {siteConfig.telephoneDisplay}
            </a>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section tone="paper-soft" topRule>
        <Container>
          <Eyebrow className="mb-4">How We Help</Eyebrow>
          <h2
            className="font-heading font-bold leading-[1.1] tracking-tight text-midnight"
            style={{ fontSize: "clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)" }}
          >
            Financial Services for Olds & Central Alberta
          </h2>
          <div
            aria-hidden
            className="mt-4 h-px w-16"
            style={{
              background:
                "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
            }}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-midnight/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]"
              >
                <h3 className="font-heading text-[1.05rem] font-bold leading-snug text-midnight">
                  {s.name}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-midnight/60">
                  {s.short}
                </p>
                <span className="mt-5 inline-flex items-center text-[0.8rem] font-semibold text-midnight transition-colors group-hover:text-gold-dark">
                  Learn more
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Service area + community */}
      <Section tone="paper" topRule>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow className="mb-4">Where We Serve</Eyebrow>
              <h2 className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                Proudly serving central Alberta
              </h2>
              <p className="mt-4 leading-relaxed text-midnight/65">
                Our home is Olds, but our clients are spread across the region.
                We regularly work with families and business owners in:
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-2.5">
                {siteConfig.areaServed.towns.map((town) => (
                  <li
                    key={town}
                    className="flex items-center gap-2 text-sm text-midnight/75"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-gold-dark" strokeWidth={1.6} />
                    {town}, AB
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-midnight/60">
                Not in central Alberta? We also work with Canadians across the
                country by phone and Zoom.
              </p>
            </div>

            <div>
              <Eyebrow className="mb-4">Rooted in the Community</Eyebrow>
              <h2 className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                Giving back where we live
              </h2>
              <p className="mt-4 leading-relaxed text-midnight/65">
                For over a decade, Birchtree Financial has supported local
                organizations that share our values of growth, safety, and
                opportunity in Olds and area:
              </p>
              <ul className="mt-5 space-y-2.5">
                {communityPartners.map((org) => (
                  <li
                    key={org}
                    className="flex items-center gap-2.5 text-sm text-midnight/75"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-gold-dark" strokeWidth={1.6} />
                    {org}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Local testimonials */}
      <Section tone="paper-soft" topRule>
        <Container>
          <Eyebrow className="mb-4">Client Stories</Eyebrow>
          <h2 className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
            Trusted by central Alberta families and business owners
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex h-full flex-col rounded-2xl border border-midnight/10 bg-white p-7"
              >
                <blockquote className="flex-1 text-[0.92rem] leading-relaxed text-midnight/70">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-midnight/[0.07] pt-5">
                  <span className="block font-heading text-sm font-semibold text-midnight">
                    {t.name}
                  </span>
                  <span className="block text-xs text-midnight/45">
                    {t.location}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Local FAQ */}
      <Section tone="paper" topRule>
        <Container size="narrow">
          <Eyebrow className="mb-4">Questions, Answered</Eyebrow>
          <h2 className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
            Financial advisor in Olds — FAQ
          </h2>
          <dl className="mt-8 space-y-4">
            {localFaqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-midnight/[0.08] bg-white p-5 sm:p-6"
              >
                <dt className="font-heading text-base font-semibold text-midnight sm:text-lg">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-midnight/70">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 rounded-[1.75rem] border border-midnight/10 bg-[#F7F5EF] p-8 text-center sm:p-10">
            <h2 className="font-heading text-[1.5rem] font-bold leading-tight tracking-tight text-midnight">
              Ready to talk to a local advisor?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-midnight/65 sm:text-base">
              Book a complimentary, no-obligation consultation at our Olds office,
              by phone, or over Zoom.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-midnight-light sm:w-auto"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book a Consultation
              </Link>
              <a
                href={`tel:${siteConfig.telephone}`}
                className="inline-flex w-full items-center justify-center rounded-xl border border-midnight/20 bg-white px-7 py-3.5 text-sm font-semibold text-midnight transition-all duration-300 hover:border-midnight/40 sm:w-auto"
              >
                <Phone className="mr-2 h-4 w-4 text-gold-dark" />
                {siteConfig.telephoneDisplay}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
