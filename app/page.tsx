"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ShieldCheck,
  UserRound,
  UsersRound,
  Leaf,
  PieChart,
  BarChart3,
  Armchair,
  FileText,
  Calculator,
  TrendingUp,
  UserCheck,
  Compass,
  Target,
  Users,
  Quote,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { Reveal, RevealStagger } from "@/components/ui/reveal"
import MarketsCard from "@/components/home/MarketsCard"

const stats = [
  { icon: UserRound, value: "30+", label: "Years of trusted financial advice" },
  { icon: UsersRound, value: "500+", label: "Clients and families served across Canada" },
  { icon: Leaf, value: "100%", label: "Canadian owned" },
  { icon: PieChart, value: "$1B+", label: "Assets managed" },
  { icon: ShieldCheck, value: "Fiduciary", label: "Always acting in your best interest" },
]

const services = [
  {
    icon: Armchair,
    title: "Retirement Planning",
    desc: "A roadmap to retire with confidence—income, CPP/OAS timing and tax-smart withdrawals.",
    href: "/services/retirement-planning",
  },
  {
    icon: BarChart3,
    title: "Investment Management",
    desc: "Disciplined, evidence-based portfolios built to grow and protect your wealth.",
    href: "/services/investment-management",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Strategies",
    desc: "Protect your family and assets with coverage tailored to your needs.",
    href: "/services/insurance-strategies",
  },
  {
    icon: Calculator,
    title: "Tax Optimization",
    desc: "Keep more of what you earn with year-round, tax-efficient planning.",
    href: "/services/tax-optimization-strategies",
  },
  {
    icon: TrendingUp,
    title: "Wealth Building",
    desc: "Strategic advice to build, preserve and transfer wealth across generations.",
    href: "/services/wealth-building-advisory",
  },
  {
    icon: FileText,
    title: "Estate Planning",
    desc: "Pass on your legacy smoothly while minimizing taxes and probate.",
    href: "/services/estate-planning-guidance",
  },
]

const whyChoose = [
  {
    icon: UserCheck,
    title: "Independent Advice",
    desc: "Unbiased solutions tailored to your unique goals.",
  },
  {
    icon: Compass,
    title: "Holistic Approach",
    desc: "We look at the big picture of your financial life.",
  },
  {
    icon: Target,
    title: "Proven Process",
    desc: "Disciplined planning. Rigorous research. Measurable outcomes.",
  },
  {
    icon: Users,
    title: "Relationship Driven",
    desc: "We're with you for the moments that matter.",
  },
]

const testimonials = [
  {
    quote:
      "We'd been putting off retirement planning for years—honestly, it felt too complicated. Melissa sat down with us, walked us through everything in plain English, and now we actually feel excited about retiring next year instead of scared.",
    name: "Karen & Doug M.",
    location: "Retired Couple · Olds, AB",
    initials: "KD",
  },
  {
    quote:
      "Running a ranch doesn't leave a lot of time to think about RRSPs and tax strategy. The Birchtree team took that off my plate completely. They set everything up, check in regularly, and I trust them like family at this point.",
    name: "Tyler Brandt",
    location: "Ranch Owner · Sundre, AB",
    initials: "TB",
  },
  {
    quote:
      "I switched to Birchtree after my old advisor kept pushing products I didn't need. Here, it actually feels like they're working for me. They helped me set up a group plan for my employees too, which was a game-changer.",
    name: "Priya Sandhu",
    location: "Small Business Owner · Red Deer, AB",
    initials: "PS",
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-white">
      {/* ============================ HERO ============================ */}
      {/* True-white background (#FFFFFF) — the site's `bg-white` token is the
          cool off-white #F5F7FA, so we use `bg-white-pure` here so the
          white-background hero image blends in with no visible seam. The bottom
          padding gives the stats bar room to breathe before the next section. */}
      <section className="relative overflow-hidden bg-white-pure pt-28 pb-20 sm:pt-32 sm:pb-24">
        <Container size="wide" className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
            {/* Left — copy */}
            <div className="max-w-xl">
              <motion.h1
                {...fadeUp}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-bold tracking-tight text-midnight"
                style={{
                  fontSize: "clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem)",
                  lineHeight: 1.04,
                }}
              >
                Your Financial
                <br />
                Future, <span className="text-gold-dark">Elevated</span>
              </motion.h1>

              <motion.p
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-midnight/65"
              >
                Thoughtful advice. Tailored strategies. Lasting relationships.
                We help Canadian individuals, families and business owners
                build, protect and grow the wealth that matters most.
              </motion.p>

              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
                >
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl border border-midnight/20 bg-white px-7 py-3.5 text-sm font-semibold text-midnight transition-all duration-300 hover:border-midnight/40 hover:bg-midnight/[0.03]"
                >
                  Explore Our Services
                </Link>
              </motion.div>

              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="mt-7 flex items-center gap-2.5 text-[0.82rem] text-midnight/55"
              >
                <ShieldCheck className="h-4 w-4 text-gold-dark" strokeWidth={1.75} />
                Fiduciary advice. Always in your best interest.
              </motion.div>
            </div>

            {/* Right — hero image + live markets card, clean side-by-side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8 xl:flex-row xl:items-center xl:gap-6"
            >
              <div className="xl:min-w-0 xl:flex-1">
                <Image
                  src="/birchtree-hero-chart.webp"
                  alt="Growth illustration — ascending chart with marble and gold accents"
                  width={1255}
                  height={941}
                  priority
                  // Served as-is (no Next re-encode): the optimizer's q75 pass
                  // shifts the pure-white background to ~248 and creates a
                  // visible rectangle against the section's #FFFFFF. The source
                  // webp is already 82KB with a true-255 white field.
                  unoptimized
                  sizes="(max-width: 1280px) 460px, 440px"
                  className="mx-auto h-auto w-full max-w-[460px] object-contain xl:mx-0"
                />
              </div>

              {/* Markets at a glance — live, auto-refreshing */}
              <div className="mx-auto w-full max-w-[400px] xl:mx-0 xl:w-[230px] xl:max-w-none xl:flex-shrink-0">
                <MarketsCard />
              </div>
            </motion.div>
          </div>

          {/* ===================== STATS BAR ===================== */}
          <Reveal y={20} className="mt-14 sm:mt-16">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-midnight/10 bg-midnight/[0.06] sm:grid-cols-2 lg:grid-cols-5">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.label}
                    className="flex items-center gap-3.5 bg-white px-5 py-6"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                      <Icon className="h-5 w-5 text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="block font-heading text-xl font-bold leading-none text-midnight">
                        {s.value}
                      </span>
                      <span className="mt-1.5 block text-[0.72rem] leading-snug text-midnight/55">
                        {s.label}
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ========================= SERVICES ========================= */}
      <section className="relative bg-[#F7F5EF] py-20 sm:py-24">
        {/* Soft blend from the white hero into the cream section — no hard seam */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white-pure to-transparent"
        />
        <Container size="wide" className="relative">
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  className="font-heading font-bold leading-[1.1] tracking-tight text-midnight"
                  style={{ fontSize: "clamp(1.85rem, 1.3rem + 1.8vw, 2.6rem)" }}
                >
                  Our Financial Services
                </h2>
                <div
                  aria-hidden
                  className="mt-4 h-px w-16"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                  }}
                />
                <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-midnight/60">
                  Comprehensive solutions. Customized for your goals. Built for
                  what&apos;s next.
                </p>
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
            stagger={0.06}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group flex h-full flex-col rounded-2xl border border-midnight/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                    <Icon className="h-[20px] w-[20px] text-midnight/80" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-heading text-[1.05rem] font-bold leading-snug text-midnight">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-midnight/55">
                    {service.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center text-[0.8rem] font-semibold text-midnight transition-colors group-hover:text-gold-dark">
                    Learn more
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </RevealStagger>
        </Container>
      </section>

      {/* =================== MISSION + WHY CHOOSE =================== */}
      <section className="bg-white py-20 sm:py-24">
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Mission */}
            <Reveal className="h-full">
              <div className="grid h-full overflow-hidden rounded-2xl border border-midnight/10 bg-white sm:grid-cols-[0.85fr_1.15fr]">
                <div className="relative min-h-[200px]">
                  <Image
                    src="/mission-birch.webp"
                    alt="Birch trees"
                    fill
                    sizes="(max-width: 640px) 100vw, 280px"
                    className="object-cover"
                  />
                </div>
                <div className="p-8 sm:p-9">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                    Our Mission
                  </p>
                  <h3 className="mt-4 font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                    Guiding you with clarity. Empowering your future.
                  </h3>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-midnight/60">
                    We build lasting relationships through personalized advice,
                    transparent communication, and a commitment to your success.
                  </p>
                  <Link
                    href="/about"
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-midnight"
                  >
                    <span className="border-b border-gold/50 pb-0.5 transition-colors group-hover:border-gold">
                      Learn more about us
                    </span>
                    <ArrowRight className="h-4 w-4 text-gold-dark transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Why choose */}
            <Reveal delay={0.1} className="h-full">
              <div className="h-full rounded-2xl border border-midnight/10 bg-white p-8 sm:p-9">
                <h3 className="font-heading text-[1.6rem] font-bold tracking-tight text-midnight">
                  Why Choose Birchtree
                </h3>
                <div
                  aria-hidden
                  className="mt-4 h-px w-16"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                  }}
                />
                <div className="mt-7 grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2">
                  {whyChoose.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title}>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                          <Icon className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                        </span>
                        <h4 className="mt-3.5 font-heading text-[1.02rem] font-bold text-midnight">
                          {item.title}
                        </h4>
                        <p className="mt-1.5 text-[0.84rem] leading-relaxed text-midnight/55">
                          {item.desc}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ======================= TESTIMONIALS ======================= */}
      <section className="bg-[#F7F5EF] py-20 sm:py-24">
        <Container size="wide">
          <Reveal>
            <h2
              className="text-center font-heading font-bold tracking-tight text-midnight"
              style={{ fontSize: "clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)" }}
            >
              What Our Clients Say
            </h2>
          </Reveal>

          <RevealStagger
            stagger={0.1}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex h-full flex-col rounded-2xl border border-midnight/10 bg-white p-7"
              >
                <Quote className="h-7 w-7 text-gold/45" fill="currentColor" strokeWidth={0} />
                <blockquote className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-midnight/70">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-midnight/[0.07] pt-5">
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-heading text-sm font-semibold text-midnight/75"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(215,195,138,0.28) 0%, rgba(215,195,138,0.08) 100%)",
                    }}
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-heading text-sm font-semibold text-midnight">
                      {t.name}
                    </span>
                    <span className="block text-xs text-midnight/45">
                      {t.location}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* ========================= CTA BAND ========================= */}
      <section className="pb-16 pt-4 sm:pb-20">
        <Container size="wide">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-midnight/10">
              <Image
                src="/cta-mountains.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                aria-hidden
              />
              {/* Legibility wash — lighter on the left where the text sits */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(252,251,248,0.95) 0%, rgba(252,251,248,0.82) 42%, rgba(252,251,248,0.35) 70%, rgba(252,251,248,0.1) 100%)",
                }}
              />
              <div className="relative flex flex-col items-start gap-6 px-8 py-12 sm:px-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <h2
                    className="font-heading font-bold leading-[1.12] tracking-tight text-midnight"
                    style={{ fontSize: "clamp(1.7rem, 1.3rem + 1.6vw, 2.6rem)" }}
                  >
                    Let&apos;s elevate your financial future—together.
                  </h2>
                  <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-midnight/65">
                    Book a no-obligation consultation to start the conversation.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex shrink-0 items-center justify-center rounded-xl bg-midnight px-8 py-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(11,26,44,0.22)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_12px_32px_rgba(11,26,44,0.28)]"
                >
                  Book Your Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
