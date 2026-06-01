"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Target, Users, Award, Heart, Shield, ArrowRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionHeader } from "@/components/ui/section-header"
import { Reveal, RevealStagger } from "@/components/ui/reveal"
import RevealText from "@/components/RevealText"

const aboutFaqs = [
  {
    question: "What is a fiduciary, and why does it matter?",
    answer:
      "A fiduciary is a legal and ethical obligation to act in your best interest at all times. As a registered investment advisor, Birchtree Financial is held to a fiduciary standard, meaning we must prioritize your financial well-being above all else. This differs from brokers who may only be required to recommend 'suitable' investments.",
  },
  {
    question: "What makes Birchtree Financial different from other advisors?",
    answer:
      "We combine deep expertise with a personalized, client-first approach. As a fee-only fiduciary, we eliminate conflicts of interest. We take time to truly understand your goals, values, and concerns, creating customized strategies rather than one-size-fits-all solutions. Our team's experience and commitment to ongoing education ensure you receive the best possible guidance.",
  },
  {
    question: "Are you registered with any regulatory bodies?",
    answer:
      "Yes, Birchtree Financial is a registered financial advisory firm in Canada. Our team holds relevant licenses and professional qualifications, including the Life License Qualification Program (LLQP). We maintain strict compliance with all Canadian regulatory requirements and stay current with evolving financial regulations and industry best practices.",
  },
  {
    question: "What happens to my accounts if something happens to my advisor?",
    answer:
      "Your accounts and financial plan are documented and stored securely, and our team-based approach ensures continuity of service. In the unlikely event your primary advisor is unavailable, another qualified team member will step in to ensure seamless service. Your accounts remain in your name and control at all times.",
  },
]

const values = [
  {
    icon: Target,
    title: "Client-First Approach",
    description:
      "Every decision we make is guided by what's best for our clients. Your success is our success.",
  },
  {
    icon: Heart,
    title: "Integrity & Trust",
    description:
      "We operate with complete transparency and honesty, building lasting relationships based on trust.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest standards in everything we do, from planning to execution.",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description:
      "No two clients are the same. We create customized solutions tailored to your unique situation.",
  },
]

const stats = [
  { number: "30+", label: "Years Experience" },
  { number: "500+", label: "Clients Served" },
  { number: "$1B+", label: "Assets Managed" },
]

const communityLogos = [
  { src: "/oldsgrizzlesnew.webp", alt: "Olds Grizzlys Hockey" },
  { src: "/canadalogonew.webp", alt: "4-H Canada" },
  { src: "/bgcoldsnew.webp", alt: "BGC Olds & Area" },
  { src: "/mvessnew.webp", alt: "MVESS Shelter" },
]

export default function AboutPage() {
  return (
    <>
      {/* ============ HERO — Centered headline + stat bar ============ */}
      <section
        className="relative overflow-hidden bg-[#FBFAF6] text-midnight"
        style={{
          paddingTop: "clamp(7rem, 8vw + 4rem, 12rem)",
          paddingBottom: "clamp(4rem, 6vw + 2rem, 9rem)",
        }}
      >
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
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-7 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold-dark"
            >
              <span aria-hidden className="mr-3 inline-block h-px w-3 align-middle bg-gold-dark/60" />
              Our Company
              <span aria-hidden className="ml-3 inline-block h-px w-3 align-middle bg-gold-dark/60" />
            </motion.p>

            <RevealText
              as="h1"
              className="font-heading font-bold leading-[1.06] tracking-tight text-midnight text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              About Birchtree Financial
            </RevealText>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-7 mb-7"
              style={{ width: "fit-content" }}
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12 leading-relaxed text-midnight/65"
              style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)" }}
            >
              Building trust, delivering results, securing your future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-3 items-center justify-items-center gap-4 sm:gap-14"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                  className="text-left"
                  style={{ borderLeft: "1px solid rgba(11,26,44,0.12)", paddingLeft: "0.75rem" }}
                >
                  <span className="block font-heading text-xl font-bold text-gold-dark sm:text-3xl md:text-4xl">
                    {stat.number}
                  </span>
                  <span className="text-[0.55rem] font-medium uppercase tracking-[0.15em] text-midnight/55 sm:text-[0.65rem] sm:tracking-[0.18em]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============ THE VISION (image + text) ============ */}
      <Section tone="paper" topRule>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="order-2 lg:order-1 mx-auto w-full max-w-[360px]">
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-2xl border border-gold/20 sm:block"
                  />
                  <Image
                    src="/birchtreevision.webp"
                    alt="Birchtree Financial storefront in Alberta"
                    width={1536}
                    height={2058}
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="relative h-auto w-full rounded-2xl object-contain"
                    style={{
                      boxShadow:
                        "0 8px 32px rgba(11,26,44,0.1), 0 2px 8px rgba(11,26,44,0.06)",
                    }}
                    priority
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="order-1 lg:order-2">
                <Eyebrow className="mb-4">Our Roots</Eyebrow>
                <h2
                  className="font-heading font-bold leading-[1.1] tracking-tight text-midnight"
                  style={{ fontSize: "clamp(1.85rem, 1.3rem + 2.2vw, 3.4rem)" }}
                >
                  The Vision
                </h2>
                <div
                  aria-hidden
                  className="mt-6 mb-8 h-px w-20 bg-gradient-to-r from-gold/55 to-transparent"
                />
                <p
                  className="max-w-lg leading-relaxed text-midnight/70"
                  style={{ fontSize: "clamp(1rem, 0.92rem + 0.5vw, 1.2rem)" }}
                >
                  Founded with a vision to make premium financial advisory
                  services accessible and personalized, Birchtree Financial has
                  been helping individuals and families across Canada navigate
                  their financial journey for over three decades. Our name
                  reflects our philosophy: just as a birch tree stands strong
                  and grows steadily over time, we help our clients build a
                  solid financial foundation that supports them throughout
                  life&apos;s seasons.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ============ THE HISTORY (light + pull quote) ============ */}
      <Section tone="paper-soft">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Our Story"
            heading="The History"
            rule
          />

          <Reveal>
            <div className="mt-12 space-y-7 text-midnight/65" style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.2rem)" }}>
              <p className="leading-relaxed">
                What started as a small practice with a big idea has grown into
                a trusted firm serving clients across the country. Our team of
                certified financial advisors and investment advisors brings
                decades of combined experience, but more importantly, brings a
                genuine commitment to understanding your unique circumstances
                and goals.
              </p>
              <p className="leading-relaxed">
                We&apos;ve weathered market cycles, economic changes, and
                evolving regulations — always keeping our focus on what matters
                most: your financial well-being. Today, we continue to combine
                time-tested strategies with innovative approaches, ensuring
                our clients stay ahead of the curve in the Canadian financial
                landscape.
              </p>
            </div>
          </Reveal>

          {/* Pull quote — left-rule treatment is conventional typography for
              quotes (not the AI side-stripe pattern banned for cards). */}
          <Reveal delay={0.15}>
            <figure className="relative mt-14">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 -left-2 select-none font-heading text-[6rem] leading-none text-gold-dark/20"
              >
                &ldquo;
              </span>
              <blockquote
                className="relative border-l py-3 pl-8"
                style={{ borderColor: "rgba(215,195,138,0.85)" }}
              >
                <p className="font-heading italic leading-relaxed text-midnight/85"
                  style={{ fontSize: "clamp(1.1rem, 0.95rem + 0.7vw, 1.55rem)" }}
                >
                  We believe that financial advisory services are not just
                  about numbers — it&apos;s about empowering you to live the
                  life you envision.
                </p>
              </blockquote>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* ============ HOW WE SERVE (mission + philosophy) ============ */}
      <Section tone="paper" topRule>
        <Container>
          <SectionHeader
            eyebrow="What Drives Us"
            heading="How We Serve Canadians"
            subtitle="We believe that financial advisory services are a journey, not a destination."
          />

          <RevealStagger
            stagger={0.1}
            className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16"
          >
            {[
              {
                kicker: "i.",
                title: "Our Mission",
                paragraphs: [
                  "To empower Canadians to achieve financial clarity, confidence, and success through personalized, intelligent advisory services. We combine deep expertise in Canadian financial regulations and tax structures with cutting-edge technology to deliver solutions that are both sophisticated and accessible.",
                ],
              },
              {
                kicker: "ii.",
                title: "Our Philosophy",
                paragraphs: [
                  "Our philosophy centers on three core principles: comprehensive planning, personalized service, and unwavering integrity.",
                  "Every strategy we develop is tailored specifically to you, taking into account your stage of life, risk tolerance, and long-term aspirations. We’re here to guide you through every step of your financial journey.",
                ],
              },
            ].map((b) => (
              <article key={b.title}>
                <div className="mb-3 font-heading text-sm font-medium tracking-wider text-gold/80">
                  {b.kicker}
                </div>
                <h3 className="font-heading text-2xl font-bold text-midnight sm:text-[1.6rem]">
                  {b.title}
                </h3>
                <div className="mt-5 space-y-4">
                  {b.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="leading-relaxed text-midnight/70"
                      style={{ fontSize: "clamp(0.98rem, 0.9rem + 0.4vw, 1.1rem)" }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* ============ CORE VALUES (light) ============ */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="What We Stand For"
            heading="Our Core Values"
            rule
          />

          <RevealStagger
            stagger={0.08}
            className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-7"
          >
            {values.map((v) => {
              const Icon = v.icon
              return (
                <article
                  key={v.title}
                  className="h-full rounded-2xl border border-midnight/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)] sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                    <Icon className="h-6 w-6 text-gold-dark" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-bold text-midnight sm:text-2xl">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-midnight/65">
                    {v.description}
                  </p>
                </article>
              )
            })}
          </RevealStagger>
        </Container>
      </Section>

      {/* ============ COMPLIANCE + FAQ (light) ============ */}
      <Section tone="paper" topRule>
        <Container size="narrow">
          <SectionHeader
            eyebrow="Regulatory Standards"
            heading="Compliance & Standards"
          />

          <Reveal>
            <div className="mt-12">
              <div className="flex justify-center">
                <span
                  className="inline-flex items-center gap-3 rounded-xl border px-6 py-4"
                  style={{
                    background: "rgba(215,195,138,0.06)",
                    borderColor: "rgba(215,195,138,0.3)",
                  }}
                >
                  <Shield className="h-5 w-5" style={{ color: "#D7C38A" }} />
                  <span className="text-sm font-semibold tracking-wide text-midnight/75">
                    Life License Qualification Program (LLQP) Certified
                  </span>
                </span>
              </div>

              <div className="mt-10 space-y-6 text-midnight/70" style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}>
                <p className="leading-relaxed">
                  As a registered financial advisory firm in Canada, we adhere
                  to the highest standards of professional conduct and
                  regulatory compliance. We are committed to transparency,
                  ethical practices, and putting our clients&apos; interests
                  first in everything we do.
                </p>
                <p className="leading-relaxed">
                  Our team of licensed financial advisors holds the necessary
                  qualifications to serve clients across Canada. Our advisors
                  are licensed to provide life insurance and accident &amp;
                  sickness insurance products, having completed the Life
                  License Qualification Program (LLQP). We maintain ongoing
                  education requirements and stay current with evolving
                  Canadian financial regulations, tax laws, and industry best
                  practices.
                </p>
              </div>
            </div>
          </Reveal>

          <div
            aria-hidden
            className="mx-auto my-20 h-px w-32 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          />

          <SectionHeader
            eyebrow="Your Questions Answered"
            heading="About Birchtree Financial"
          />

          <Accordion
            type="single"
            collapsible
            className="mt-12 w-full space-y-3 sm:space-y-4"
          >
            {aboutFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <div
                  className="rounded-xl bg-white"
                  style={{
                    border: "1px solid rgba(11,26,44,0.06)",
                    boxShadow:
                      "0 1px 2px rgba(11,26,44,0.04), 0 4px 12px rgba(11,26,44,0.03)",
                  }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-none"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline sm:px-6">
                      <span className="text-left font-heading text-base text-midnight sm:text-lg">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 sm:px-6">
                      <p className="text-[0.95rem] leading-relaxed text-midnight/70">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </motion.div>
            ))}
          </Accordion>
        </Container>
      </Section>

      {/* ============ COMMUNITY + CTA (light) ============ */}
      <Section tone="paper-soft" topRule>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow className="mb-5">
                Giving Back
              </Eyebrow>
              <h2
                className="font-heading font-bold leading-[1.15] tracking-tight text-midnight"
                style={{ fontSize: "clamp(1.8rem, 1.3rem + 2vw, 3rem)" }}
              >
                Proudly Supporting Our Community
              </h2>
              <p className="mx-auto mt-7 max-w-3xl leading-relaxed text-midnight/65"
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
                className="flex items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 90px, 100px"
                  className="h-auto w-[90px] object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 sm:w-[100px]"
                  style={{ background: "transparent" }}
                />
              </div>
            ))}
          </RevealStagger>

          <div
            aria-hidden
            className="mx-auto my-20 h-px w-32 bg-gradient-to-r from-transparent via-gold/25 to-transparent"
          />

          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="mb-6">
                Get Started
              </Eyebrow>
              <h2
                className="font-heading font-bold leading-[1.1] tracking-tight text-midnight text-balance"
                style={{ fontSize: "clamp(2rem, 1.5rem + 2.5vw, 3.6rem)" }}
              >
                Ready to work with us?
              </h2>
              <div
                aria-hidden
                className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              />
              <p className="mx-auto mt-8 max-w-xl leading-relaxed text-midnight/65"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                Schedule a complimentary consultation and take the first step
                toward a stronger financial future.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border-0 bg-midnight px-9 py-6 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light sm:w-auto sm:text-base [&>*]:text-white"
                >
                  <Link href="/contact" className="text-white">
                    Book a Consultation
                    <ArrowRight className="ml-2 inline h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border border-midnight/20 bg-white px-9 py-6 text-sm text-midnight transition-all duration-300 hover:border-midnight/30 hover:bg-midnight/[0.03] sm:w-auto sm:text-base [&>*]:text-midnight"
                >
                  <Link href="/team" className="text-midnight">
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
