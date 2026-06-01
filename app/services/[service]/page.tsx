"use client"

import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
  Compass,
  ClipboardList,
  Rocket,
  RefreshCw,
  Armchair,
  BarChart3,
  ShieldCheck,
  Calculator,
  TrendingUp,
  FileText,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/layout/PageHeader"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal, RevealStagger } from "@/components/ui/reveal"

const serviceDetails: Record<
  string,
  {
    title: string
    description: string
    overview: string
    benefits: string[]
    whatWeDo: string[]
    whoItsFor: string
  }
> = {
  "retirement-planning": {
    title: "Retirement Planning",
    description:
      "Secure your future with a comprehensive retirement strategy tailored to your goals and timeline.",
    overview:
      "Planning for retirement is one of the most important financial decisions you'll make. Our retirement planning services help you create a roadmap to financial security, ensuring you have the resources to enjoy your golden years with confidence and peace of mind.",
    benefits: [
      "Clear understanding of your retirement needs and timeline",
      "Maximized CPP and OAS benefits through strategic planning",
      "Optimized RRSP and TFSA contributions and distributions",
      "Tax-efficient withdrawal strategies to preserve your wealth",
      "Confidence knowing you're on track to meet your goals",
    ],
    whatWeDo: [
      "Analyze your current retirement savings and projected needs",
      "Develop personalized retirement income strategies",
      "Optimize CPP and OAS claiming strategies",
      "Create tax-efficient withdrawal plans",
      "Provide ongoing monitoring and adjustments as needed",
    ],
    whoItsFor:
      "Whether you're decades away from retirement or planning to retire in the next few years, our retirement planning services can help you build and protect your nest egg.",
  },
  "investment-management": {
    title: "Investment Management",
    description:
      "Expert portfolio management designed to grow and protect your wealth through disciplined investment strategies.",
    overview:
      "Successful investing requires more than just picking stocks. Our investment management approach combines rigorous research, disciplined risk management, and strategic asset allocation to help you achieve your long-term financial goals.",
    benefits: [
      "Professional portfolio management tailored to your goals",
      "Diversified investments to reduce risk",
      "Tax-efficient investment strategies",
      "Ongoing monitoring and rebalancing",
      "Access to institutional-quality investment options",
    ],
    whatWeDo: [
      "Develop personalized investment strategies based on your goals and risk tolerance",
      "Construct well-diversified portfolios across asset classes",
      "Monitor and rebalance portfolios regularly",
      "Implement tax-loss harvesting strategies",
      "Provide regular performance reports and insights",
    ],
    whoItsFor:
      "Ideal for investors who want professional management of their investment portfolios without the complexity of doing it themselves.",
  },
  "insurance-strategies": {
    title: "Insurance Strategies",
    description:
      "Protect what matters most with customized insurance solutions tailored to your unique needs.",
    overview:
      "Insurance is a critical component of any comprehensive financial plan. We help you identify your insurance needs and find the right policies to protect your family, assets, and financial future.",
    benefits: [
      "Comprehensive protection for you and your loved ones",
      "Optimized insurance coverage at competitive rates",
      "Protection against unexpected events and liabilities",
      "Peace of mind knowing your family is protected",
      "Regular reviews to ensure coverage remains adequate",
    ],
    whatWeDo: [
      "Assess your current insurance needs and coverage gaps",
      "Review existing policies for cost and coverage optimization",
      "Recommend appropriate life, disability, and long-term care insurance",
      "Help coordinate with insurance professionals",
      "Regularly review and update your coverage as circumstances change",
    ],
    whoItsFor:
      "Essential for anyone with dependents, significant assets, or business interests that need protection.",
  },
  "tax-optimization-strategies": {
    title: "Tax Optimization Strategies",
    description:
      "Minimize your tax burden while maximizing financial efficiency through strategic tax planning.",
    overview:
      "Taxes are one of the largest expenses you'll face. Our tax optimization strategies help you keep more of what you earn while staying compliant with all tax regulations.",
    benefits: [
      "Reduced tax liability through strategic planning",
      "Tax-efficient investment and retirement strategies",
      "Maximized deductions and credits",
      "Coordination with your tax professional",
      "Ongoing tax planning throughout the year",
    ],
    whatWeDo: [
      "Develop tax-efficient investment strategies",
      "Optimize RRSP and TFSA contributions and distributions",
      "Implement tax-loss harvesting strategies",
      "Coordinate charitable giving for tax benefits",
      "Work with your tax professional to minimize your overall tax burden",
    ],
    whoItsFor:
      "Beneficial for high-income earners, business owners, and anyone looking to minimize their tax burden legally and effectively.",
  },
  "wealth-building-advisory": {
    title: "Wealth Building & Advisory",
    description:
      "Strategic advisory services to build, preserve, and transfer your wealth effectively.",
    overview:
      "Building and preserving wealth requires a comprehensive approach that considers all aspects of your financial life. Our wealth advisory services provide the strategic guidance you need to grow your assets and achieve your long-term goals.",
    benefits: [
      "Comprehensive wealth management strategy",
      "Multi-generational wealth planning",
      "Business succession planning",
      "Philanthropic planning strategies",
      "Access to exclusive investment opportunities",
    ],
    whatWeDo: [
      "Develop comprehensive wealth accumulation strategies",
      "Create business succession and exit plans",
      "Plan for multi-generational wealth transfer",
      "Design philanthropic giving strategies",
      "Provide access to alternative investments and private opportunities",
    ],
    whoItsFor:
      "Ideal for high-net-worth individuals, business owners, and families looking to build and preserve wealth across generations.",
  },
  "estate-planning-guidance": {
    title: "Estate Planning Guidance",
    description:
      "Ensure your wealth is transferred according to your wishes while minimizing taxes and preserving family harmony.",
    overview:
      "Estate planning ensures your assets are distributed according to your wishes, your family is provided for, and your legacy is preserved. We guide you through this complex process with care and expertise.",
    benefits: [
      "Clear estate plan that reflects your wishes",
      "Minimized estate taxes and probate costs",
      "Protection for your loved ones",
      "Preservation of family wealth across generations",
      "Peace of mind knowing your legacy is secure",
    ],
    whatWeDo: [
      "Assess your estate planning needs and goals",
      "Coordinate with estate planning attorneys",
      "Develop trust and beneficiary strategies",
      "Plan for wealth transfer and tax minimization",
      "Review and update estate plans as circumstances change",
    ],
    whoItsFor:
      "Important for anyone with significant assets, children, or specific wishes for how their wealth should be distributed.",
  },
}

// Per-service icon, shared with the homepage + services listing for consistency.
const serviceIcons: Record<string, LucideIcon> = {
  "retirement-planning": Armchair,
  "investment-management": BarChart3,
  "insurance-strategies": ShieldCheck,
  "tax-optimization-strategies": Calculator,
  "wealth-building-advisory": TrendingUp,
  "estate-planning-guidance": FileText,
}

// How we work with every client — the same disciplined process across services.
const process = [
  {
    icon: Compass,
    title: "Discover",
    desc: "We start by understanding your goals, your timeline and the full picture of your financial life.",
  },
  {
    icon: ClipboardList,
    title: "Plan",
    desc: "We build a clear, personalized strategy and walk you through every part of it in plain language.",
  },
  {
    icon: Rocket,
    title: "Implement",
    desc: "We put the plan into action and coordinate with your accountant, lawyer and other professionals.",
  },
  {
    icon: RefreshCw,
    title: "Review",
    desc: "We meet regularly to track progress and adjust as your life and the markets change.",
  },
]

export default function ServiceDetailPage() {
  const params = useParams()
  const serviceSlug = params?.service as string
  const service = serviceDetails[serviceSlug]

  if (!service) {
    notFound()
  }

  const related = Object.entries(serviceDetails)
    .filter(([slug]) => slug !== serviceSlug)
    .slice(0, 3)
    .map(([slug, s]) => ({ slug, title: s.title, description: s.description }))

  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title={service.title}
        subtitle={service.description}
      />

      {/* ============ OVERVIEW + ADVISOR SIDEBAR ============ */}
      <Section tone="paper" topRule>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.65fr_1fr] lg:gap-14">
            {/* Main column */}
            <div>
              <Reveal>
                <Eyebrow className="mb-4">The Service</Eyebrow>
                <h2 className="font-heading text-2xl font-bold leading-[1.15] tracking-tight text-midnight sm:text-[2rem]">
                  Overview
                </h2>
                <div
                  aria-hidden
                  className="mt-5 mb-7 h-px w-16 bg-gradient-to-r from-gold/60 to-transparent"
                />
                <p
                  className="leading-relaxed text-midnight/75"
                  style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.4vw, 1.2rem)" }}
                >
                  {service.overview}
                </p>
              </Reveal>

              {/* Benefits + What We Do */}
              <RevealStagger
                stagger={0.1}
                className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
              >
                <article className="h-full rounded-2xl border border-midnight/10 bg-white p-7 sm:p-8">
                  <Eyebrow className="mb-4">For You</Eyebrow>
                  <h3 className="font-heading text-xl font-bold text-midnight sm:text-[1.4rem]">
                    Key Benefits
                  </h3>
                  <div
                    aria-hidden
                    className="mt-4 mb-6 h-px w-12 bg-gradient-to-r from-gold/55 to-transparent"
                  />
                  <ul className="space-y-3.5">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-dark"
                          strokeWidth={1.6}
                        />
                        <span className="text-[0.95rem] leading-relaxed text-midnight/75">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="h-full rounded-2xl border border-midnight/10 bg-white p-7 sm:p-8">
                  <Eyebrow className="mb-4">Our Approach</Eyebrow>
                  <h3 className="font-heading text-xl font-bold text-midnight sm:text-[1.4rem]">
                    What We Do
                  </h3>
                  <div
                    aria-hidden
                    className="mt-4 mb-6 h-px w-12 bg-gradient-to-r from-gold/55 to-transparent"
                  />
                  <ul className="space-y-3.5">
                    {service.whatWeDo.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/70"
                        />
                        <span className="text-[0.95rem] leading-relaxed text-midnight/75">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealStagger>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                {/* Speak with an advisor */}
                <div
                  className="relative overflow-hidden rounded-2xl border border-midnight/10 bg-paper p-7 sm:p-8"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(11,26,44,0.04), 0 18px 40px rgba(11,26,44,0.06)",
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
                  />
                  <Eyebrow className="mb-3">Talk to us</Eyebrow>
                  <h3 className="font-heading text-[1.4rem] font-bold leading-snug tracking-tight text-midnight">
                    Speak with an advisor
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-midnight/60">
                    Every plan starts with a conversation. Book a complimentary,
                    no-obligation consultation to talk through your{" "}
                    {service.title.toLowerCase()} needs.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="mt-6 w-full rounded-xl bg-midnight px-7 py-6 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
                  >
                    <Link href="/contact">
                      Book a Consultation
                      <ArrowRight className="ml-2 inline h-4 w-4" />
                    </Link>
                  </Button>
                  <a
                    href="tel:4035567777"
                    className="mt-4 inline-flex items-center gap-2.5 text-sm font-medium text-midnight/65 transition-colors hover:text-midnight"
                  >
                    <Phone className="h-4 w-4 text-gold-dark" strokeWidth={1.75} />
                    <span className="tabular-nums">(403) 556-7777</span>
                  </a>
                </div>

                {/* Who it's for */}
                <div className="mt-5 rounded-2xl border border-midnight/10 bg-white p-7 sm:p-8">
                  <Eyebrow className="mb-3">Is This For You</Eyebrow>
                  <h3 className="font-heading text-[1.3rem] font-bold leading-snug tracking-tight text-midnight">
                    Who it&apos;s for
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-midnight/65">
                    {service.whoItsFor}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ HOW WE WORK (process) ============ */}
      <Section tone="paper-soft" topRule>
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow className="mb-4">How It Works</Eyebrow>
            <h2
              className="font-heading font-bold leading-[1.12] tracking-tight text-midnight text-balance"
              style={{ fontSize: "clamp(1.85rem, 1.3rem + 1.8vw, 2.6rem)" }}
            >
              A clear path, from first meeting to ongoing care
            </h2>
            <div
              aria-hidden
              className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-gold/55 to-transparent"
            />
          </Reveal>

          <div className="relative mt-14">
            {/* Connecting hairline behind the steps (desktop) */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-midnight/12 to-transparent lg:block"
            />
            <RevealStagger
              stagger={0.1}
              className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
            >
              {process.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="relative text-center">
                    <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-midnight/10 bg-white shadow-[0_8px_20px_rgba(11,26,44,0.06)]">
                      <Icon className="h-6 w-6 text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-5 font-heading text-[1.25rem] font-bold tracking-tight text-midnight">
                      {step.title}
                    </h3>
                    <p className="mx-auto mt-2.5 max-w-[16rem] text-[0.9rem] leading-relaxed text-midnight/60">
                      {step.desc}
                    </p>
                  </div>
                )
              })}
            </RevealStagger>
          </div>
        </Container>
      </Section>

      {/* ============ EXPLORE OTHER SERVICES ============ */}
      <Section tone="paper" topRule>
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow className="mb-3">Keep Exploring</Eyebrow>
                <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-midnight sm:text-[2rem]">
                  Explore other services
                </h2>
              </div>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-midnight"
              >
                <span className="border-b border-gold/50 pb-0.5 transition-colors group-hover:border-gold">
                  View all services
                </span>
                <ArrowRight className="h-4 w-4 text-gold-dark transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <RevealStagger
            stagger={0.08}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {related.map((r) => {
              const Icon = serviceIcons[r.slug] ?? FileText
              return (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-midnight/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-midnight/[0.08] bg-gradient-to-b from-midnight/[0.05] to-midnight/[0.01] transition-all duration-300 group-hover:border-gold/45 group-hover:from-gold/[0.14] group-hover:to-gold/[0.03]">
                    <Icon
                      className="h-5 w-5 text-midnight/75 transition-colors duration-300 group-hover:text-gold-dark"
                      strokeWidth={1.6}
                    />
                  </span>
                  <h3 className="mt-5 font-heading text-[1.2rem] font-bold leading-snug tracking-tight text-midnight">
                    {r.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[0.9rem] leading-relaxed text-midnight/55">
                    {r.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-midnight transition-colors group-hover:text-gold-dark">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </RevealStagger>
        </Container>
      </Section>

      {/* ============ CTA (light cream band) ============ */}
      <Section tone="paper-soft" topRule>
        <Container>
          <Reveal>
            <div
              className="relative mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-midnight/10 bg-paper px-8 py-12 text-center sm:px-12 sm:py-16"
              style={{
                boxShadow:
                  "0 1px 2px rgba(11,26,44,0.04), 0 18px 40px rgba(11,26,44,0.06)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 0%, rgba(215,195,138,0.10) 0%, transparent 65%)",
                }}
              />
              <div className="relative">
                <Eyebrow className="mb-6">Get Started</Eyebrow>
                <h2
                  className="font-heading font-bold leading-[1.1] tracking-tight text-midnight text-balance"
                  style={{ fontSize: "clamp(2rem, 1.5rem + 2.5vw, 3.4rem)" }}
                >
                  Ready to take the next step?
                </h2>
                <div
                  aria-hidden
                  className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/55 to-transparent"
                />
                <p
                  className="mx-auto mt-8 max-w-xl leading-relaxed text-midnight/65"
                  style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
                >
                  Schedule a complimentary consultation to discuss your{" "}
                  {service.title.toLowerCase()} needs and discover how we can
                  help.
                </p>
                <div className="mt-10 flex flex-col-reverse items-center justify-center gap-4 sm:flex-row sm:gap-5">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full px-9 py-6 sm:w-auto sm:text-base"
                  >
                    <Link href="/services">
                      <ArrowLeft className="mr-2 inline h-4 w-4" />
                      Back to All Services
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="w-full px-9 py-6 sm:w-auto sm:text-base"
                  >
                    <Link href="/contact">
                      Schedule a Consultation
                      <ArrowRight className="ml-2 inline h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
