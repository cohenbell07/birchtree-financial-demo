"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import RevealText from "@/components/RevealText"
import { Button } from "@/components/ui/button"
import { Target, Users, Award, Heart, Shield, Lightbulb, ArrowRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const aboutFaqs = [
  {
    question: "What is a fiduciary, and why does it matter?",
    answer: "A fiduciary is a legal and ethical obligation to act in your best interest at all times. As a registered investment advisor, Birchtree Financial is held to a fiduciary standard, meaning we must prioritize your financial well-being above all else. This differs from brokers who may only be required to recommend 'suitable' investments.",
  },
  {
    question: "What makes Birchtree Financial different from other advisors?",
    answer: "We combine deep expertise with a personalized, client-first approach. As a fee-only fiduciary, we eliminate conflicts of interest. We take time to truly understand your goals, values, and concerns, creating customized strategies rather than one-size-fits-all solutions. Our team's experience and commitment to ongoing education ensure you receive the best possible guidance.",
  },
  {
    question: "Are you registered with any regulatory bodies?",
    answer: "Yes, Birchtree Financial is a registered financial advisory firm in Canada. Our team holds relevant licenses and professional qualifications, including the Life License Qualification Program (LLQP). We maintain strict compliance with all Canadian regulatory requirements and stay current with evolving financial regulations and industry best practices.",
  },
  {
    question: "What happens to my accounts if something happens to my advisor?",
    answer: "Your accounts and financial plan are documented and stored securely, and our team-based approach ensures continuity of service. In the unlikely event your primary advisor is unavailable, another qualified team member will step in to ensure seamless service. Your accounts remain in your name and control at all times.",
  },
]

const values = [
  {
    icon: Target,
    title: "Client-First Approach",
    description: "Every decision we make is guided by what's best for our clients. Your success is our success.",
  },
  {
    icon: Heart,
    title: "Integrity & Trust",
    description: "We operate with complete transparency and honesty, building lasting relationships based on trust.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from planning to execution.",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "No two clients are the same. We create customized solutions tailored to your unique situation.",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* ============================================
          HERO — Tree Watermark + Stat Bar
          ============================================ */}
      <section
        className="relative text-white pt-28 sm:pt-36 md:pt-40 lg:pt-48 pb-16 sm:pb-24 md:pb-28 lg:pb-36 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #060f1c 0%, #0B1A2C 40%, #0d1d30 70%, #081525 100%)",
        }}
      >
        <div
          className="absolute top-[30%] left-[20%] w-[50%] h-[50%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(215,195,138,0.04) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/70 font-semibold mb-5 sm:mb-7"
            >
              <span className="inline-block w-2 h-px bg-gold/50 mr-3 align-middle" />
              Our Company
              <span className="inline-block w-2 h-px bg-gold/50 ml-3 align-middle" />
            </motion.p>
            <RevealText
              as="h1"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-0"
            >
              About Birchtree Financial
            </RevealText>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-6 sm:mt-8 mb-5 sm:mb-7"
              style={{ width: "fit-content" }}
            >
              <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/45 leading-relaxed font-body mb-10 sm:mb-14 px-4"
            >
              Building trust, delivering results, securing your future
            </motion.p>

            {/* Stat bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-8 sm:gap-14"
            >
              {[
                { number: "30+", label: "Years Experience" },
                { number: "500+", label: "Clients Served" },
                { number: "$1B+", label: "Assets Managed" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                  className="border-l-2 border-gold/25 pl-4 sm:pl-5 text-left"
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gold/80 block">
                    {stat.number}
                  </span>
                  <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.15em] text-white/35 font-medium">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          THE VISION
          ============================================ */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden grain-overlay" style={{ background: 'linear-gradient(160deg, #fcfbf9 0%, #f9f8f5 50%, #f6f5f1 100%)' }}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        {/* Subtle warm radial glow */}
        <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(215,195,138,0.04) 0%, transparent 70%)' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image with gold offset frame */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1 flex items-center justify-center"
              >
                <div className="relative w-full max-w-[320px] lg:max-w-[360px] mx-auto">
                  {/* Gold offset border */}
                  <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-gold/15 hidden sm:block" />
                  <Image
                    src="/birchtreevision.png"
                    alt="Birchtree Financial storefront in Alberta"
                    width={1536}
                    height={2058}
                    className="relative w-full h-auto rounded-2xl object-contain"
                    style={{
                      boxShadow: '0 8px 32px rgba(11,26,44,0.1), 0 2px 8px rgba(11,26,44,0.06)',
                    }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-1 lg:order-2 max-w-xl lg:max-w-none px-4 sm:px-0"
              >
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3 sm:mb-4">
                  Our Roots
                </p>
                <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-0">
                  The Vision
                </RevealText>
                <div className="mt-5 sm:mt-6 mb-6 sm:mb-8">
                  <div className="h-px w-16 bg-gradient-to-r from-gold/50 to-transparent" />
                </div>
                <p className="text-base sm:text-lg md:text-xl text-midnight/50 leading-relaxed max-w-lg font-body">
                  Founded with a vision to make premium financial advisory services
                  accessible and personalized, Birchtree Financial has been helping
                  individuals and families across Canada navigate their financial journey for over
                  three decades. Our name reflects our philosophy: just as a birch tree
                  stands strong and grows steadily over time, we help our clients
                  build a solid financial foundation that supports them throughout
                  life&apos;s seasons.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          THE HISTORY — Dark navy aurora
          ============================================ */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 text-white relative overflow-hidden grain-overlay">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 50% 45% at 70% 25%, rgba(21,36,57,0.4) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 15% 75%, rgba(215,195,138,0.03) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(5,12,22,0.5) 100%),
            linear-gradient(160deg, #071422 0%, #0B1A2C 35%, #0d1d30 65%, #091828 100%)
          `
        }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10 sm:mb-14">
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-3 sm:mb-4">
                  Our Story
                </p>
                <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-0 px-2">
                  The History
                </RevealText>
                <div className="flex justify-center mt-5 sm:mt-7">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-white/40 mb-5 sm:mb-7 leading-relaxed px-4 font-body">
                What started as a small practice with a big idea has grown into a
                trusted firm serving clients across the country. Our team of
                certified financial advisors and investment advisors brings
                decades of combined experience, but more importantly, brings a
                genuine commitment to understanding your unique circumstances and goals.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/40 leading-relaxed px-4 font-body">
                We&apos;ve weathered market cycles, economic changes, and evolving
                regulations—always keeping our focus on what matters most: your
                financial well-being. Today, we continue to combine time-tested
                strategies with innovative approaches, ensuring our clients stay
                ahead of the curve in the Canadian financial landscape.
              </p>

              {/* Premium pull-quote */}
              <div className="mt-10 sm:mt-14 mx-4 sm:mx-0 relative">
                <div
                  className="absolute -top-6 -left-3 text-8xl sm:text-9xl font-heading font-bold leading-none select-none pointer-events-none"
                  style={{ color: "rgba(215,195,138,0.15)" }}
                >
                  &ldquo;
                </div>
                <blockquote
                  className="relative pl-8 border-l-[3px] py-3"
                  style={{ borderColor: "rgba(215,195,138,0.6)" }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl text-white/70 italic leading-relaxed font-heading">
                    We believe that financial advisory services are not just about numbers—it&apos;s about empowering you to live the life you envision.
                  </p>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW WE SERVE CANADIANS
          ============================================ */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden grain-overlay" style={{ background: 'linear-gradient(160deg, #fcfbf9 0%, #f9f8f5 50%, #f6f5f1 100%)' }}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-16 md:mb-20"
          >
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3 sm:mb-4">
              What Drives Us
            </p>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-4 sm:mb-6 px-2">
              How We Serve Canadians
            </RevealText>
            <p className="text-base sm:text-lg md:text-xl text-midnight/50 max-w-2xl mx-auto px-4 font-body">
              We believe that financial advisory services are a journey, not a destination.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto px-4 sm:px-0 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative pl-6 sm:pl-8"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full" style={{ background: 'linear-gradient(to bottom, rgba(215,195,138,0.5) 0%, rgba(215,195,138,0.1) 100%)' }} />
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-midnight mb-4">
                Our Mission
              </h3>
              <p className="text-base sm:text-lg text-midnight/50 leading-relaxed font-body">
                To empower Canadians to achieve financial clarity, confidence, and success through personalized, intelligent advisory services. We combine deep expertise in Canadian financial regulations and tax structures with cutting-edge technology to deliver solutions that are both sophisticated and accessible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative pl-6 sm:pl-8"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full" style={{ background: 'linear-gradient(to bottom, rgba(215,195,138,0.5) 0%, rgba(215,195,138,0.1) 100%)' }} />
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-midnight mb-4">
                Our Philosophy
              </h3>
              <p className="text-base sm:text-lg text-midnight/50 leading-relaxed font-body">
                Our philosophy centers on three core principles: comprehensive planning, personalized service, and unwavering integrity.
              </p>
              <p className="text-base sm:text-lg text-midnight/50 leading-relaxed mt-4 font-body">
                Every strategy we develop is tailored specifically to you, taking into account your stage of life, risk tolerance, and long-term aspirations. We&apos;re here to guide you through every step of your financial journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          CORE VALUES (dark section)
          ============================================ */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 text-white relative overflow-hidden grain-overlay">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 55% 50% at 30% 20%, rgba(21,36,57,0.4) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 80% 65%, rgba(215,195,138,0.03) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(5,12,22,0.4) 100%),
            linear-gradient(160deg, #050c16 0%, #0B1A2C 30%, #101f33 60%, #0a1525 100%)
          `
        }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-14 md:mb-20">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-3 sm:mb-4">
              What We Stand For
            </p>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-5 sm:mb-7 text-white px-2">
              Our Core Values
            </RevealText>
            <div className="flex justify-center">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 md:gap-9 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="max-w-md mx-auto md:max-w-none w-full"
                >
                  <div className="h-full rounded-xl overflow-hidden border border-gold/10 transition-all duration-300 hover:border-gold/25 hover:shadow-[0_0_20px_rgba(215,195,138,0.08)]" style={{ background: 'rgba(11,26,44,0.6)' }}>
                    <div className="p-5 sm:p-7">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 sm:mb-5 mx-auto md:mx-0">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-gold/70" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-white text-center md:text-left mb-3">
                        {value.title}
                      </h3>
                      <p className="text-white/40 text-sm sm:text-base md:text-lg text-center md:text-left leading-relaxed font-body">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          COMPLIANCE & STANDARDS
          ============================================ */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden grain-overlay" style={{ background: 'linear-gradient(160deg, #fcfbf9 0%, #f9f8f5 50%, #f6f5f1 100%)' }}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3 sm:mb-4">
                Regulatory Standards
              </p>
              <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-0">
                Compliance & Standards
              </RevealText>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-4"
            >
              <div className="flex justify-center mb-10 sm:mb-12">
                <div
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 hover:border-gold/50"
                  style={{
                    background: "rgba(215,195,138,0.06)",
                    borderColor: "rgba(215,195,138,0.3)",
                  }}
                >
                  <Shield className="h-5 w-5 text-gold" style={{ color: "#D7C38A" }} />
                  <span className="text-sm font-semibold text-midnight/60 tracking-wide">
                    Life License Qualification Program (LLQP) Certified
                  </span>
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-midnight/50 leading-relaxed mb-5 sm:mb-7 text-center font-body">
                As a registered financial advisory firm in Canada, we adhere to the highest
                standards of professional conduct and regulatory compliance. We are
                committed to transparency, ethical practices, and putting our clients&apos;
                interests first in everything we do.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-midnight/50 leading-relaxed text-center font-body">
                Our team of licensed financial advisors holds the necessary qualifications to serve clients across Canada. Our advisors are licensed to provide life insurance and accident &amp; sickness insurance products, having completed the Life License Qualification Program (LLQP). We maintain ongoing education requirements and stay current with evolving Canadian financial regulations, tax laws, and industry best practices.
              </p>
            </motion.div>

            {/* Gold divider connecting to FAQ */}
            <div className="flex justify-center my-16 sm:my-20">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>

            {/* FAQ — inline within same section */}
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-4">
                Your Questions Answered
              </p>
              <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight">
                About Birchtree Financial
              </RevealText>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
              {aboutFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="rounded-xl bg-white border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)]">
                    <AccordionItem value={`item-${index}`} className="border-none">
                      <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:no-underline">
                        <span className="text-left text-base sm:text-lg font-heading text-midnight">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4">
                        <p className="text-sm sm:text-base text-midnight/50 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA + COMMUNITY — Aurora dark section
          ============================================ */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 text-white relative overflow-hidden grain-overlay">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 50% 45% at 45% 40%, rgba(215,195,138,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 15% 80%, rgba(21,36,57,0.3) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(5,12,22,0.4) 100%),
            linear-gradient(160deg, #050c16 0%, #0B1A2C 30%, #101f33 60%, #0a1525 100%)
          `
        }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-16 sm:mb-20"
          >
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-3 sm:mb-4">
              Giving Back
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-6 sm:mb-8 px-2 !leading-[1.4]">
              Proudly Supporting Our Community
            </h3>
            <p className="text-base sm:text-lg text-white/40 leading-relaxed mb-10 sm:mb-14 max-w-3xl mx-auto px-4 font-body">
              For over a decade, Birchtree Financial has donated to and supported local organizations that align with our values of growth, safety, and opportunity.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 max-w-3xl mx-auto">
              {[
                { src: "/oldsgrizzlesnew.png", alt: "Olds Grizzlys Hockey" },
                { src: "/canadalogonew.png", alt: "4-H Canada" },
                { src: "/bgcoldsnew.png", alt: "BGC Olds & Area" },
                { src: "/mvessnew.png", alt: "MVESS Shelter" },
              ].map((logo, index) => (
                <motion.div
                  key={logo.alt}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={400}
                    height={400}
                    className="object-contain w-[90px] sm:w-[100px] h-auto brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300"
                    style={{ background: "transparent" }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Gold separator */}
          <div className="flex justify-center mb-16 sm:mb-20">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-5 sm:mb-7">
              Get Started
            </p>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5 sm:mb-7 tracking-tight text-white px-2">
              Ready to Work With Us?
            </RevealText>
            <div className="flex justify-center mb-8 sm:mb-10">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
            </div>
            <p className="text-base sm:text-lg text-white/40 mb-10 sm:mb-14 max-w-xl mx-auto leading-relaxed font-body px-4">
              Schedule a complimentary consultation and take the first step toward a stronger financial future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-4">
              <Button
                asChild
                size="lg"
                className="relative z-10 w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-gold/90 hover:bg-gold text-midnight font-semibold border-0 shadow-[0_4px_20px_rgba(215,195,138,0.2)] hover:shadow-[0_8px_40px_rgba(215,195,138,0.3)] transition-all duration-300 hover:scale-[1.02] rounded-xl [&>*]:text-midnight"
              >
                <Link href="/contact" className="text-midnight">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="relative z-10 w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-white/[0.04] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300 rounded-xl [&>*]:text-white"
              >
                <Link href="/team" className="text-white">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
