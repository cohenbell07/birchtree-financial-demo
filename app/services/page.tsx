"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Target,
  TrendingUp,
  Shield,
  Calculator,
  Building2,
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
    icon: Target,
    title: "Retirement Planning",
    description:
      "Create a comprehensive retirement strategy that ensures financial security and peace of mind during your golden years.",
    features: [
      "Retirement income planning",
      "CPP and OAS optimization",
      "RRSP and TFSA management",
      "Withdrawal strategies",
    ],
    number: "01",
  },
  {
    slug: "investment-management",
    icon: TrendingUp,
    title: "Investment Management",
    description:
      "Expert portfolio management designed to grow and protect your wealth through disciplined investment strategies.",
    features: [
      "Portfolio construction",
      "Asset allocation",
      "Risk management",
      "Performance monitoring",
    ],
    number: "02",
  },
  {
    slug: "insurance-strategies",
    icon: Shield,
    title: "Insurance Strategies",
    description:
      "Protect what matters most with customized insurance solutions tailored to your unique needs and circumstances.",
    features: [
      "Life insurance planning",
      "Disability insurance",
      "Long-term care planning",
      "Policy review and optimization",
    ],
    number: "03",
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
    number: "04",
  },
  {
    slug: "wealth-building-advisory",
    icon: Building2,
    title: "Wealth Building & Advisory",
    description:
      "Strategic advisory services to build, preserve, and transfer your wealth effectively across generations.",
    features: [
      "Wealth accumulation strategies",
      "Business succession planning",
      "Multi-generational planning",
      "Philanthropic planning",
    ],
    number: "05",
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
    number: "06",
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* ============ HERO — Headline + 6-icon grid ============ */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(160deg, #060f1c 0%, #0B1A2C 40%, #0d1d30 70%, #081525 100%)",
          paddingTop: "clamp(7rem, 8vw + 4rem, 12rem)",
          paddingBottom: "clamp(4rem, 6vw + 2rem, 9rem)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent, transparent 60px, rgba(215,195,138,0.025) 60px, rgba(215,195,138,0.025) 61px)",
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
                className="mb-7 inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold"
              >
                <span aria-hidden className="inline-block h-px w-6 bg-gold/60" />
                What We Offer
              </motion.p>

              <RevealText
                as="h1"
                className="max-w-2xl font-heading font-bold leading-[1.06] tracking-tight text-white text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              >
                Our Services
              </RevealText>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="origin-left mt-7 mb-7"
              >
                <div className="h-px w-24 bg-gradient-to-r from-gold/65 to-transparent" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-xl leading-relaxed text-white/85"
                style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)" }}
              >
                Comprehensive financial solutions for every stage of life.
              </motion.p>
            </div>

            {/* Icon grid */}
            <div className="hidden lg:col-span-2 lg:block">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Target, label: "Retirement" },
                  { icon: TrendingUp, label: "Investing" },
                  { icon: Shield, label: "Insurance" },
                  { icon: Calculator, label: "Tax" },
                  { icon: Building2, label: "Wealth" },
                  { icon: FileText, label: "Estate" },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                      className="flex flex-col items-center gap-2 rounded-xl border border-gold/15 bg-white/[0.02] p-4 transition-all duration-300 hover:border-gold/35 hover:bg-gold/[0.04]"
                    >
                      <Icon className="h-5 w-5 text-gold/75" strokeWidth={1.5} />
                      <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white/65">
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
            className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-white p-7 transition-all duration-300"
                  style={{
                    border: "1px solid rgba(11,26,44,0.07)",
                    boxShadow:
                      "0 1px 2px rgba(11,26,44,0.04), 0 6px 16px rgba(11,26,44,0.04)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/0 via-gold/70 to-gold/0 transition-transform duration-500 group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                      <Icon className="h-[18px] w-[18px] text-midnight/75" strokeWidth={1.6} />
                    </div>
                    <span
                      aria-hidden
                      className="font-heading text-2xl font-medium text-gold/65"
                    >
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-7 font-heading text-xl font-bold text-midnight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-midnight/70">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 text-sm text-midnight/65">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <span aria-hidden className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/55" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex items-center text-sm font-medium text-midnight transition-colors group-hover:text-midnight/80">
                    Learn more
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
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

      {/* ============ CTA (dark aurora) ============ */}
      <Section tone="dark-aurora" topRule grain>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow tone="dark" className="mb-6">
                Get Started
              </Eyebrow>
              <h2
                className="font-heading font-bold leading-[1.1] tracking-tight text-white text-balance"
                style={{ fontSize: "clamp(2rem, 1.5rem + 2.5vw, 3.6rem)" }}
              >
                Ready to build your financial strategy?
              </h2>
              <div
                aria-hidden
                className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              />
              <p className="mx-auto mt-8 max-w-xl leading-relaxed text-white/75"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                Schedule a complimentary consultation and discover which
                services are right for you.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border-0 bg-gold px-9 py-6 text-sm font-semibold text-midnight shadow-[0_4px_20px_rgba(215,195,138,0.2)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_8px_40px_rgba(215,195,138,0.3)] sm:w-auto sm:text-base [&>*]:text-midnight"
                >
                  <Link href="/contact" className="text-midnight">
                    Book a Consultation
                    <ArrowRight className="ml-2 inline h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] px-9 py-6 text-sm text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white sm:w-auto sm:text-base [&>*]:text-white"
                >
                  <Link href="/team" className="text-white">
                    Meet Our Team
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
