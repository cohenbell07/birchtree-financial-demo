"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Armchair,
  BarChart3,
  ShieldCheck,
  Calculator,
  TrendingUp,
  FileText,
} from "lucide-react"

import FAQSection from "@/components/FAQSection"
import RevealText from "@/components/RevealText"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionHeader } from "@/components/ui/section-header"
import { Reveal, RevealStagger } from "@/components/ui/reveal"

const servicesFaqs = [
  {
    question: "What services does Birchtree Financial provide?",
    answer:
      "Birchtree Financial offers comprehensive financial advisory and investment management services, including retirement planning, investment management, insurance strategies, tax optimization, wealth building advisory, and estate planning guidance. We also provide benefit packages for both group and individual plans, helping businesses and individuals secure comprehensive coverage that protects their financial future. We work with individuals, families, and business owners to create personalized financial strategies tailored to their unique needs.",
  },
  {
    question: "How do you charge for your services?",
    answer:
      "Birchtree Financial is compensated through the company with no fees charged directly to clients. This compensation structure ensures we can act in your best interest without conflicts of interest, as our compensation is not tied to specific product sales or commissions. This approach allows us to provide unbiased financial advice and recommendations that are truly in your best interest. All compensation details are transparently disclosed during our initial consultation.",
  },
  {
    question: "What is your investment philosophy?",
    answer:
      "We believe in a disciplined, evidence-based approach to investing. Our philosophy emphasizes diversification, long-term thinking, risk management, and cost efficiency. We focus on building well-balanced portfolios that align with your risk tolerance and financial goals, using a combination of strategic asset allocation and regular rebalancing.",
  },
  {
    question:
      "Can you help me with my employer's Group RRSP or other retirement accounts?",
    answer:
      "Yes, we can provide guidance on your employer-sponsored retirement accounts, including Group RRSPs, pension plans, and DPSPs (Deferred Profit Sharing Plans). While we may not directly manage these accounts, we can help you understand your options, optimize your contributions, and ensure these accounts align with your overall financial strategy. We also help coordinate with your RRSP and TFSA strategies.",
  },
  {
    question: "Do you provide tax advice?",
    answer:
      "While we provide tax planning strategies and work closely with tax professionals, we do not provide specific tax preparation or detailed tax advice. We focus on tax-efficient investment and planning strategies, and we recommend coordinating with a qualified Canadian tax professional or accountant for specific tax matters.",
  },
  {
    question:
      "Do I need a minimum amount of assets to work with Birchtree Financial?",
    answer:
      "We work with clients across a range of asset levels and life stages. While we do have minimum requirements for certain services, we offer solutions for individuals just starting their financial journey as well as those with substantial wealth. Contact us to discuss whether our services are a good fit for your situation.",
  },
]

const services = [
  {
    slug: "retirement-planning",
    icon: Armchair,
    title: "Retirement Planning",
    description:
      "Create a comprehensive retirement strategy that ensures financial security and peace of mind during your golden years.",
    features: [
      "Retirement income planning",
      "CPP and OAS optimization",
      "RRSP and TFSA management",
      "Withdrawal strategies",
    ],
  },
  {
    slug: "investment-management",
    icon: BarChart3,
    title: "Investment Management",
    description:
      "Expert portfolio management designed to grow and protect your wealth through disciplined investment strategies.",
    features: [
      "Portfolio construction",
      "Asset allocation",
      "Risk management",
      "Performance monitoring",
    ],
  },
  {
    slug: "insurance-strategies",
    icon: ShieldCheck,
    title: "Insurance Strategies",
    description:
      "Protect what matters most with customized insurance solutions tailored to your unique needs and circumstances.",
    features: [
      "Life insurance planning",
      "Disability insurance",
      "Long-term care planning",
      "Policy review and optimization",
    ],
  },
  {
    slug: "tax-optimization-strategies",
    icon: Calculator,
    title: "Tax Optimization Strategies",
    description:
      "Minimize your tax burden while maximizing financial efficiency through strategic tax planning and optimization.",
    features: [
      "Tax-efficient investing",
      "RRSP and TFSA strategies",
      "Tax-loss harvesting",
      "Charitable giving strategies",
    ],
  },
  {
    slug: "wealth-building-advisory",
    icon: TrendingUp,
    title: "Wealth Building & Advisory",
    description:
      "Strategic advisory services to build, preserve, and transfer your wealth effectively across generations.",
    features: [
      "Wealth accumulation strategies",
      "Business succession planning",
      "Multi-generational planning",
      "Philanthropic planning",
    ],
  },
  {
    slug: "estate-planning-guidance",
    icon: FileText,
    title: "Estate Planning Guidance",
    description:
      "Ensure your wealth is transferred according to your wishes while minimizing taxes and preserving family harmony.",
    features: [
      "Estate plan creation",
      "Trust strategies",
      "Beneficiary planning",
      "Legacy planning",
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* ============ HERO — Headline + 6-icon grid (light) ============ */}
      <section
        className="relative overflow-hidden bg-[#FBFAF6]"
        style={{
          paddingTop: "clamp(7rem, 8vw + 4rem, 12rem)",
          paddingBottom: "clamp(4rem, 6vw + 2rem, 9rem)",
        }}
      >
        {/* Atmospheric gold wash — matches the homepage hero. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />

        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-7 inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark"
              >
                <span aria-hidden className="inline-block h-px w-6 bg-gold/60" />
                What We Offer
              </motion.p>

              <RevealText
                as="h1"
                className="max-w-2xl font-heading font-bold leading-[1.06] tracking-tight text-midnight text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              >
                Our Services
              </RevealText>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="origin-left mt-7 mb-7"
              >
                <div
                  className="h-px w-24"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                  }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-xl leading-relaxed text-midnight/65"
                style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)" }}
              >
                Comprehensive financial solutions for every stage of life.
              </motion.p>
            </div>

            {/* Icon grid */}
            <div className="hidden lg:col-span-2 lg:block">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Armchair, label: "Retirement" },
                  { icon: BarChart3, label: "Investing" },
                  { icon: ShieldCheck, label: "Insurance" },
                  { icon: Calculator, label: "Tax" },
                  { icon: TrendingUp, label: "Wealth" },
                  { icon: FileText, label: "Estate" },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                      className="flex flex-col items-center gap-2 rounded-xl border border-midnight/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                        <Icon className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                      </span>
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-midnight/55">
                        {item.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============ MAIN SERVICES GRID ============ */}
      <Section tone="paper" topRule>
        <Container>
          <SectionHeader
            eyebrow="Explore Our Services"
            heading="A complete financial toolkit"
            subtitle="At Birchtree Financial, we offer a comprehensive suite of Canadian financial planning and investment management services. Each service is designed to work independently or as part of a complete financial strategy tailored to your unique situation."
          />

          <RevealStagger
            stagger={0.07}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-midnight/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-midnight/15 hover:shadow-[0_22px_50px_rgba(11,26,44,0.10)] sm:p-9"
                >
                  {/* Gold hairline that draws across the top on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/70 via-gold/40 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />

                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-midnight/[0.08] bg-gradient-to-b from-midnight/[0.05] to-midnight/[0.01] transition-all duration-300 group-hover:border-gold/45 group-hover:from-gold/[0.14] group-hover:to-gold/[0.03]">
                    <Icon
                      className="h-6 w-6 text-midnight/75 transition-colors duration-300 group-hover:text-gold-dark"
                      strokeWidth={1.6}
                    />
                  </span>

                  <h3 className="mt-7 font-heading text-[1.6rem] font-bold leading-[1.16] tracking-tight text-midnight">
                    {service.title}
                  </h3>
                  <p className="mt-3.5 text-[0.95rem] leading-relaxed text-midnight/60">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-midnight/[0.07] pt-6 text-[0.9rem] text-midnight/65">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <span aria-hidden className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/70" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-midnight">
                    <span className="border-b border-gold/50 pb-0.5 transition-colors group-hover:border-gold">
                      Learn more
                    </span>
                    <ArrowRight className="h-4 w-4 text-gold-dark transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </RevealStagger>
        </Container>
      </Section>

      {/* ============ FAQ ============ */}
      <FAQSection
        eyebrow="Common Questions"
        heading="Services FAQ"
        faqs={servicesFaqs}
      />

      {/* ============ CTA (light cream band) ============ */}
      <Section tone="paper-soft" topRule>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="mb-6">Get Started</Eyebrow>
              <h2
                className="font-heading font-bold leading-[1.1] tracking-tight text-midnight text-balance"
                style={{ fontSize: "clamp(1.85rem, 1.3rem + 1.8vw, 2.6rem)" }}
              >
                Ready to build your financial strategy?
              </h2>
              <div
                aria-hidden
                className="mx-auto mt-6 h-px w-16"
                style={{
                  background:
                    "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                }}
              />
              <p
                className="mx-auto mt-6 max-w-xl leading-relaxed text-midnight/65"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                Schedule a complimentary consultation and discover which
                services are right for you.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl bg-midnight px-9 py-6 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)] sm:w-auto sm:text-base"
                >
                  <Link href="/contact">
                    Book a Consultation
                    <ArrowRight className="ml-2 inline h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border border-midnight/20 bg-white px-9 py-6 text-sm font-semibold text-midnight shadow-none transition-all duration-300 hover:border-midnight/40 hover:bg-midnight/[0.03] sm:w-auto sm:text-base"
                >
                  <Link href="/team">Meet Our Team</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
