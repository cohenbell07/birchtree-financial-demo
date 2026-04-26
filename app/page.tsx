"use client"

import { useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Target,
  Star,
  Heart,
  Lightbulb,
  Handshake,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionHeader } from "@/components/ui/section-header"
import { Reveal, RevealStagger } from "@/components/ui/reveal"
import HeroBackground from "@/components/HeroBackground"
import LogoTreeIcon from "@/components/LogoTreeIcon"
import CountUp from "@/components/CountUp"

const AutoplayHeroVideo = dynamic(
  () => import("@/components/home/AutoplayHeroVideo"),
  { ssr: false },
)

const services = [
  {
    icon: Target,
    title: "Retirement Planning",
    description:
      "Comprehensive RRSP and CPP strategies tailored to your Canadian retirement goals.",
    href: "/services/retirement-planning",
    number: "01",
  },
  {
    icon: TrendingUp,
    title: "Investment Management",
    description:
      "Expert portfolio management designed to grow and protect your wealth.",
    href: "/services/investment-management",
    number: "02",
  },
  {
    icon: Shield,
    title: "Insurance Strategies",
    description:
      "Protect what matters most with customized insurance solutions.",
    href: "/services/insurance-strategies",
    number: "03",
  },
  {
    icon: TrendingUp,
    title: "Tax Optimization",
    description:
      "Maximize TFSA and RRSP benefits while minimizing Canadian tax burden.",
    href: "/services/tax-optimization-strategies",
    number: "04",
  },
  {
    icon: Target,
    title: "Wealth Building",
    description:
      "Strategic advisory services to build and preserve your legacy.",
    href: "/services/wealth-building-advisory",
    number: "05",
  },
  {
    icon: Shield,
    title: "Estate Planning",
    description: "Ensure your wealth is transferred according to your wishes.",
    href: "/services/estate-planning-guidance",
    number: "06",
  },
]

const whyChooseUs = [
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Certified financial advisors with decades of combined experience.",
  },
  {
    icon: Shield,
    title: "Trusted Advisor",
    description:
      "Fiduciary commitment to act in your best interests at all times.",
  },
  {
    icon: Target,
    title: "Personalized Approach",
    description:
      "Custom strategies designed specifically for your unique situation.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Track record of helping clients achieve their financial goals.",
  },
]

const testimonials = [
  {
    name: "Karen & Doug M.",
    role: "Retired Couple, Olds",
    content:
      "We'd been putting off retirement planning for years — honestly, it felt too complicated. Melissa sat down with us, walked us through everything in plain English, and now we actually feel excited about retiring next year instead of scared.",
    initials: "KD",
  },
  {
    name: "Tyler Brandt",
    role: "Ranch Owner, Sundre",
    content:
      "Running a ranch doesn't leave a lot of time to think about RRSPs and tax strategy. The Birchtree team took that off my plate completely. They set everything up, check in regularly, and I trust them like family at this point.",
    initials: "TB",
  },
  {
    name: "Priya Sandhu",
    role: "Small Business Owner, Red Deer",
    content:
      "I switched to Birchtree after my old advisor kept pushing products I didn't need. Here, it actually feels like they're working for me. They helped me set up a group plan for my employees too, which was a game-changer.",
    initials: "PS",
  },
]

const communityLogos = [
  { src: "/oldsgrizzlesnew.webp", alt: "Olds Grizzlys Hockey" },
  { src: "/canadalogonew.webp", alt: "4-H Canada" },
  { src: "/bgcoldsnew.webp", alt: "BGC Olds & Area" },
  { src: "/mvessnew.webp", alt: "MVESS Shelter" },
]

export default function Home() {
  // Defer the TradingView ticker until after first paint + browser idle.
  useEffect(() => {
    const load = () => {
      const container = document.getElementById("tradingview-ticker-container")
      if (!container || container.querySelector('script[src*="ticker-tape"]')) return
      const widgetDiv = document.createElement("div")
      widgetDiv.className = "tradingview-widget-container__widget"
      widgetDiv.style.height = "100%"
      widgetDiv.style.width = "100%"
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
      script.async = true
      script.text = JSON.stringify({
        symbols: [
          { proName: "FOREXCOM:DJI", title: "Dow Jones" },
          { proName: "OANDA:SPX500USD", title: "S&P 500" },
          { proName: "TSX:TSX", title: "TSX Composite" },
          { proName: "TVC:GOLD", title: "Gold" },
          { proName: "TVC:SILVER", title: "Silver" },
          { proName: "OANDA:NAS100USD", title: "Nasdaq" },
        ],
        showSymbolLogo: true,
        colorTheme: "dark",
        isTransparent: true,
        displayMode: "adaptive",
        locale: "en",
      })
      widgetDiv.appendChild(script)
      container.appendChild(widgetDiv)
    }
    if ("requestIdleCallback" in window) {
      ;(window as Window & { requestIdleCallback: (cb: () => void) => number })
        .requestIdleCallback(load)
    } else {
      setTimeout(load, 100)
    }
  }, [])

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      {/* ============ TICKER ============ */}
      <div className="relative bg-[#050c16] border-b border-white/[0.06] overflow-hidden pt-[5rem]">
        <div className="relative h-[52px] overflow-hidden">
          <div
            id="tradingview-ticker-container"
            className="tradingview-widget-container"
            style={{ height: "100%", width: "100%", position: "relative" }}
          />
        </div>
      </div>

      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
        <HeroBackground />

        <div className="relative z-10">
          <Container className="py-20 sm:py-28 md:py-36">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Eyebrow tone="dark">Canadian Financial Advisory</Eyebrow>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 font-heading font-bold tracking-tight text-white text-balance leading-[1.04]"
                style={{ fontSize: "clamp(2.6rem, 1.6rem + 4.5vw, 5.5rem)" }}
              >
                Your Financial Future,
                <br />
                <span className="text-gold">Elevated</span>
              </motion.h1>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 140, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto my-9 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
                aria-hidden
              />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mx-auto max-w-xl text-balance leading-relaxed text-white/90"
                style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)" }}
              >
                A modern Canadian advisory firm delivering clarity, confidence,
                and strategic insight.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
              >
                <Button
                  asChild
                  size="lg"
                  className="group w-full rounded-xl border-0 bg-gold px-9 py-6 text-sm font-semibold text-midnight shadow-[0_4px_20px_rgba(215,195,138,0.25)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_8px_40px_rgba(215,195,138,0.35)] sm:w-auto sm:text-base [&>*]:text-midnight"
                >
                  <Link href="/contact" className="text-midnight">
                    Book a Consultation
                    <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border border-white/[0.14] bg-white/[0.04] px-9 py-6 text-sm text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white sm:w-auto sm:text-base [&>*]:text-white"
                >
                  <Link href="/services" className="text-white">
                    Explore Services
                  </Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <RevealStagger
                stagger={0.09}
                className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                {[
                  { target: 30, suffix: "+", label: "Years Experience" },
                  { target: 500, suffix: "+", label: "Clients Served" },
                  { target: 1, prefix: "$", suffix: "B+", label: "Assets Managed" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-gold/10 bg-[rgba(11,26,44,0.55)] p-7 text-center transition-colors duration-300 hover:border-gold/25"
                  >
                    <CountUp
                      target={stat.target}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      className="block font-heading text-4xl font-bold text-white [font-variant-numeric:tabular-nums] sm:text-5xl"
                    />
                    <div className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-white/65">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </RevealStagger>
            </div>
          </Container>
        </div>
      </section>

      {/* ============ VIDEO ============ */}
      <AutoplayHeroVideo />

      {/* ============ SERVICES ============ */}
      <Section tone="paper" topRule grain>
        <Container>
          <SectionHeader
            eyebrow="What We Offer"
            heading="Comprehensive Financial Services"
            subtitle="A full spectrum of Canadian financial advisory and investment management services tailored to your unique needs."
          />

          <RevealStagger
            stagger={0.07}
            className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-white p-7 transition-all duration-300"
                  style={{
                    border: "1px solid rgba(11,26,44,0.07)",
                    boxShadow: "0 1px 2px rgba(11,26,44,0.04), 0 6px 16px rgba(11,26,44,0.04)",
                  }}
                >
                  {/* Top hairline that animates on hover */}
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
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-midnight/55">
                    {service.description}
                  </p>

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

      {/* ============ MISSION (dark) ============ */}
      <Section tone="dark" grain>
        <Container>
          <Reveal>
            <div className="mx-auto mb-10 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.03]">
                <LogoTreeIcon className="h-12 w-12 brightness-0 invert opacity-60" />
              </div>
            </div>
          </Reveal>

          <SectionHeader
            tone="dark"
            eyebrow="Who We Are"
            heading="Our Mission"
            rule
            subtitle={
              <>
                Financial planning isn&apos;t just about managing money — it&apos;s
                about creating the life you want. We turn your dreams into
                achievable goals and your goals into lasting financial security.
              </>
            }
          />

          <RevealStagger
            stagger={0.1}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7"
          >
            {[
              {
                icon: Heart,
                title: "Client-Centered Values",
                description:
                  "Your financial well-being is at the heart of everything we do. We listen, understand, and build relationships that last generations.",
              },
              {
                icon: Lightbulb,
                title: "Clarity Through Education",
                description:
                  "We believe in empowering you with knowledge. Complex financial concepts become clear, so you can make confident decisions.",
              },
              {
                icon: Handshake,
                title: "Long-Term Commitment",
                description:
                  "We're not just advisors — we're partners in your journey. From planning to execution, we're with you through every milestone.",
              },
            ].map((pillar) => {
              const Icon = pillar.icon
              return (
                <article
                  key={pillar.title}
                  className="h-full rounded-2xl border border-gold/10 bg-[rgba(11,26,44,0.55)] p-8 transition-colors duration-300 hover:border-gold/25"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03]">
                    <Icon className="h-6 w-6 text-gold/75" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-7 font-heading text-xl font-bold text-white sm:text-[1.4rem]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">
                    {pillar.description}
                  </p>
                </article>
              )
            })}
          </RevealStagger>
        </Container>
      </Section>

      {/* ============ WHY CHOOSE US (dark aurora) ============ */}
      <Section tone="dark-aurora" grain>
        <Container>
          <SectionHeader
            tone="dark"
            eyebrow="The Birchtree Difference"
            heading="Why Choose Birchtree Financial"
            rule
            subtitle="Experience the difference of working with a premium financial advisory firm."
          />

          <RevealStagger
            stagger={0.08}
            className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          >
            {whyChooseUs.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="h-full rounded-2xl border border-gold/10 bg-[rgba(11,26,44,0.55)] p-7 transition-colors duration-300 hover:border-gold/25"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03]">
                    <Icon className="h-5 w-5 text-gold/75" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-heading text-lg font-bold text-white sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    {item.description}
                  </p>
                </article>
              )
            })}
          </RevealStagger>
        </Container>
      </Section>

      {/* ============ TESTIMONIALS + COMMUNITY ============ */}
      <Section tone="paper-soft" topRule grain>
        <Container>
          <SectionHeader
            eyebrow="Client Stories"
            heading="What Our Clients Say"
          />

          <RevealStagger
            stagger={0.1}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
          >
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="relative h-full overflow-hidden rounded-2xl bg-white p-8 sm:p-9"
                style={{
                  border: "1px solid rgba(11,26,44,0.06)",
                  boxShadow:
                    "0 2px 8px rgba(11,26,44,0.06), 0 12px 28px rgba(11,26,44,0.06)",
                }}
              >
                {/* Decorative quote — paint-only */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-5 top-2 select-none font-heading text-[5.5rem] leading-none text-gold/[0.09]"
                >
                  &ldquo;
                </span>

                <div className="relative">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>

                  <blockquote className="mt-5 font-body italic leading-relaxed text-midnight/65">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>

                  <figcaption className="mt-7 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-midnight/65"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(215,195,138,0.18) 0%, rgba(215,195,138,0.06) 100%)",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold text-midnight">
                        {t.name}
                      </p>
                      <p className="text-xs text-midnight/45">{t.role}</p>
                    </div>
                  </figcaption>
                </div>
              </figure>
            ))}
          </RevealStagger>

          <div className="mx-auto my-20 h-px w-32 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {/* Community */}
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow className="mb-5">Giving Back</Eyebrow>
              <h2
                className="font-heading font-bold leading-[1.15] tracking-tight text-midnight text-balance"
                style={{ fontSize: "clamp(1.8rem, 1.3rem + 2vw, 3rem)" }}
              >
                Proudly Supporting Our Community
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-balance leading-relaxed text-midnight/55"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                For over a decade, Birchtree Financial has donated to and
                supported local organizations that align with our values of
                growth, safety, and opportunity.
              </p>
            </div>
          </Reveal>

          <RevealStagger
            stagger={0.08}
            className="mx-auto mt-14 grid max-w-3xl grid-cols-2 items-center gap-10 sm:grid-cols-4 sm:gap-12"
          >
            {communityLogos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center opacity-45 transition-opacity duration-300 hover:opacity-80"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 90px, 110px"
                  className="h-auto w-[90px] object-contain sm:w-[110px]"
                  style={{ background: "transparent" }}
                />
              </div>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* ============ CTA (dark aurora) ============ */}
      <Section tone="dark-aurora" topRule grain>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow tone="dark" className="mb-6">
                Get Started Today
              </Eyebrow>
              <h2
                className="font-heading font-bold leading-[1.1] tracking-tight text-white text-balance"
                style={{ fontSize: "clamp(2rem, 1.5rem + 2.5vw, 3.6rem)" }}
              >
                Ready to take control of your financial future?
              </h2>

              <div
                aria-hidden
                className="mx-auto mt-9 h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              />

              <p
                className="mx-auto mt-9 max-w-xl text-balance leading-relaxed text-white/75"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                Schedule a complimentary consultation to discuss your financial
                goals and discover how we can help you achieve them.
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border-0 bg-gold px-9 py-6 text-sm font-semibold text-midnight shadow-[0_4px_20px_rgba(215,195,138,0.2)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_8px_40px_rgba(215,195,138,0.3)] sm:w-auto sm:text-base [&>*]:text-midnight"
                >
                  <Link href="/contact" className="text-midnight">
                    Book Your Consultation
                    <ArrowRight className="ml-2 inline h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] px-9 py-6 text-sm text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white sm:w-auto sm:text-base [&>*]:text-white"
                >
                  <Link href="/about" className="text-white">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}
