"use client"

import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"

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

const CARD_STYLE = {
  border: "1px solid rgba(11,26,44,0.06)",
  boxShadow: "0 1px 2px rgba(11,26,44,0.04), 0 6px 16px rgba(11,26,44,0.04)",
}

export default function ServiceDetailPage() {
  const params = useParams()
  const serviceSlug = params?.service as string
  const service = serviceDetails[serviceSlug]

  if (!service) {
    notFound()
  }

  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title={service.title}
        subtitle={service.description}
      />

      {/* ============ BODY ============ */}
      <Section tone="paper" topRule>
        <Container size="narrow">
          {/* Overview */}
          <Reveal>
            <article className="rounded-2xl bg-white p-7 sm:p-9" style={CARD_STYLE}>
              <Eyebrow className="mb-4">The Service</Eyebrow>
              <h2 className="font-heading text-2xl font-bold text-midnight sm:text-3xl">
                Overview
              </h2>
              <div
                aria-hidden
                className="mt-5 mb-6 h-px w-16 bg-gradient-to-r from-gold/55 to-transparent"
              />
              <p
                className="leading-relaxed text-midnight/75"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                {service.overview}
              </p>
            </article>
          </Reveal>

          {/* Benefits + What We Do */}
          <RevealStagger
            stagger={0.1}
            className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
          >
            <article className="h-full rounded-2xl bg-white p-7 sm:p-8" style={CARD_STYLE}>
              <Eyebrow className="mb-4">For You</Eyebrow>
              <h2 className="font-heading text-xl font-bold text-midnight sm:text-2xl">
                Key Benefits
              </h2>
              <div
                aria-hidden
                className="mt-4 mb-6 h-px w-12 bg-gradient-to-r from-gold/55 to-transparent"
              />
              <ul className="space-y-3.5">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold"
                      strokeWidth={1.6}
                    />
                    <span className="text-[0.95rem] leading-relaxed text-midnight/75">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="h-full rounded-2xl bg-white p-7 sm:p-8" style={CARD_STYLE}>
              <Eyebrow className="mb-4">Our Approach</Eyebrow>
              <h2 className="font-heading text-xl font-bold text-midnight sm:text-2xl">
                What We Do
              </h2>
              <div
                aria-hidden
                className="mt-4 mb-6 h-px w-12 bg-gradient-to-r from-gold/55 to-transparent"
              />
              <ul className="space-y-3.5">
                {service.whatWeDo.map((item, i) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center font-heading text-xs font-medium text-gold/80"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-midnight/75">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </RevealStagger>

          {/* Who It's For — dark callout */}
          <Reveal>
            <article
              className="relative mt-6 overflow-hidden rounded-2xl p-7 sm:p-9"
              style={{
                background:
                  "linear-gradient(145deg, #0d1f33 0%, #0B1A2C 50%, #091525 100%)",
                border: "1px solid rgba(215,195,138,0.1)",
                boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              />
              <Eyebrow tone="dark" className="mb-4">
                Is This For You
              </Eyebrow>
              <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                Who It&apos;s For
              </h2>
              <div
                aria-hidden
                className="mt-4 mb-6 h-px w-16 bg-gradient-to-r from-gold/45 to-transparent"
              />
              <p
                className="leading-relaxed text-white/85"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                {service.whoItsFor}
              </p>
            </article>
          </Reveal>
        </Container>
      </Section>

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
                style={{ fontSize: "clamp(2rem, 1.5rem + 2.5vw, 3.4rem)" }}
              >
                Ready to take the next step?
              </h2>
              <div
                aria-hidden
                className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              />
              <p
                className="mx-auto mt-8 max-w-xl leading-relaxed text-white/80"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                Schedule a complimentary consultation to discuss your{" "}
                {service.title.toLowerCase()} needs and discover how we can
                help.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border-0 bg-gold px-9 py-6 text-sm font-semibold text-midnight shadow-[0_4px_20px_rgba(215,195,138,0.2)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_8px_40px_rgba(215,195,138,0.3)] sm:w-auto sm:text-base [&>*]:text-midnight"
                >
                  <Link href="/contact" className="text-midnight">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 inline h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border border-white/[0.18] bg-white/[0.04] px-9 py-6 text-sm text-white/85 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08] hover:text-white sm:w-auto sm:text-base [&>*]:text-white"
                >
                  <Link href="/services" className="text-white">
                    <ArrowLeft className="mr-2 inline h-4 w-4" />
                    Back to All Services
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
