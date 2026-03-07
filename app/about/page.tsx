"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Users, Award, Heart, Shield, Lightbulb, ArrowRight } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

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

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Our Company"
        title="About Birchtree Financial"
        subtitle="Building trust, delivering results, securing your future"
      />

      {/* Section 1: The Vision */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Left vertical gold accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              initial="initial"
              whileInView="animate"
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image left */}
              <div className="order-2 lg:order-1 flex items-center justify-center">
                <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                  {/* Decorative gold border frame */}
                  <div
                    className="absolute -inset-3 rounded-3xl opacity-40"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(215,195,138,0.3) 0%, transparent 50%, rgba(215,195,138,0.2) 100%)",
                    }}
                  />
                  <Image
                    src="/birchtreevision.png"
                    alt="Birchtree Financial storefront in Alberta"
                    width={1536}
                    height={2058}
                    className="relative w-full h-auto rounded-2xl shadow-xl object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Text right */}
              <div className="order-1 lg:order-2 max-w-xl lg:max-w-none px-4 sm:px-0">
                <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3 sm:mb-4">
                  Our Roots
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-4 sm:mb-6 md:mb-8 section-title">
                  The Vision
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-midnight/80 mb-6 sm:mb-8 leading-relaxed max-w-lg">
                  Founded with a vision to make premium financial advisory services
                  accessible and personalized, Birchtree Financial has been helping
                  individuals and families across Canada navigate their financial journey for over
                  three decades. Our name reflects our philosophy: just as a birch tree
                  stands strong and grows steadily over time, we help our clients
                  build a solid financial foundation that supports them throughout
                  life&apos;s seasons.
                </p>

                {/* Inline stat pills */}
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {[
                    { number: "30+", label: "Years Experience" },
                    { number: "500+", label: "Clients Served" },
                    { number: "$1B+", label: "Assets Managed" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-baseline gap-1.5 px-4 py-2 rounded-xl bg-midnight/5 border border-midnight/10"
                    >
                      <span className="text-xl sm:text-2xl font-heading font-bold text-midnight">
                        {stat.number}
                      </span>
                      <span className="text-xs sm:text-sm text-midnight/60 font-body">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: The History */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-mist/60 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              initial="initial"
              whileInView="animate"
            >
              <div className="text-center mb-8 sm:mb-10">
                <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3 sm:mb-4">
                  Our Journey
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-0 section-title px-2">
                  The History
                </h2>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-midnight/80 mb-4 sm:mb-6 leading-relaxed px-4">
                What started as a small practice with a big idea has grown into a
                trusted firm serving clients across the country. Our team of
                certified financial advisors and investment advisors brings
                decades of combined experience, but more importantly, brings a
                genuine commitment to understanding your unique circumstances and
                goals.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-midnight/80 leading-relaxed px-4">
                We&apos;ve weathered market cycles, economic changes, and evolving
                regulations—always keeping our focus on what matters most: your
                financial well-being. Today, we continue to combine time-tested
                strategies with innovative approaches, ensuring our clients stay
                ahead of the curve in the Canadian financial landscape.
              </p>

              {/* Premium pull-quote */}
              <div className="mt-8 sm:mt-12 mx-4 sm:mx-0 relative">
                {/* Decorative large quote mark */}
                <div
                  className="absolute -top-4 -left-2 text-7xl sm:text-8xl font-heading font-bold leading-none select-none pointer-events-none"
                  style={{ color: "rgba(215,195,138,0.18)" }}
                >
                  &ldquo;
                </div>
                <blockquote
                  className="relative pl-6 border-l-2 py-2"
                  style={{ borderColor: "rgba(215,195,138,0.5)" }}
                >
                  <p className="text-base sm:text-lg md:text-xl text-midnight/90 italic leading-relaxed font-heading">
                    We believe that financial advisory services are not just about numbers—it&apos;s about empowering you to live the life you envision.
                  </p>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: How We Serve Canadians */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3 sm:mb-4">
              What Drives Us
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-3 sm:mb-4 md:mb-6 section-title px-2">
              How We Serve Canadians
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-midnight/70 max-w-2xl mx-auto px-4">
              We believe that financial advisory services are a journey, not a destination.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <Card
                className="glass h-full shadow-glow-hover border-emerald/20"
                style={{ borderTop: "2px solid rgba(215,195,138,0.3)" }}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald/15 to-emerald/15 flex items-center justify-center">
                      <Target className="h-5 w-5 text-emerald" />
                    </div>
                    <span className="text-xs font-semibold tracking-widest text-gold/60 font-heading mt-1">
                      01
                    </span>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-heading text-midnight">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-base sm:text-lg text-midnight/80 leading-relaxed">
                    To empower Canadians to achieve financial clarity, confidence, and success
                    through personalized, intelligent advisory services. We combine deep expertise
                    in Canadian financial regulations and tax structures with cutting-edge technology
                    to deliver solutions that are both sophisticated and accessible.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Philosophy card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card
                className="glass h-full shadow-glow-hover border-emerald/20"
                style={{ borderTop: "2px solid rgba(215,195,138,0.3)" }}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald/15 to-emerald/15 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-emerald" />
                    </div>
                    <span className="text-xs font-semibold tracking-widest text-gold/60 font-heading mt-1">
                      02
                    </span>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-heading text-midnight">
                    Our Philosophy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-base sm:text-lg text-midnight/80 leading-relaxed mb-3 sm:mb-4">
                    Our philosophy centers on three core principles: comprehensive
                    planning, personalized service, and unwavering integrity.
                  </p>
                  <p className="text-base sm:text-lg text-midnight/80 leading-relaxed">
                    Every strategy we develop is tailored specifically to you, taking into account
                    your stage of life, risk tolerance, and long-term aspirations. We&apos;re
                    here to guide you through every step of your financial journey.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Core Values (dark) */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-midnight via-teal to-midnight text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald/10 via-transparent to-mint/10 animate-gradient-shift" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold/80 font-semibold mb-3 sm:mb-4">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6 section-title text-white px-2">
              Our Core Values
            </h2>
            <div className="flex justify-center">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <Card className="glass-dark h-full shadow-glow-hover border-emerald/20 max-w-md mx-auto md:max-w-none">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center mb-3 sm:mb-4 shadow-glow mx-auto md:mx-0">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white icon-hover" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-white text-center md:text-left">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <p className="text-silver/80 text-sm sm:text-base md:text-lg text-center md:text-left leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Compliance & Standards */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Subtle right accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="max-w-4xl mx-auto px-4"
          >
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3 sm:mb-4">
                Regulatory Standards
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-0 section-title">
                Compliance & Standards
              </h2>
            </div>

            {/* Credential badge */}
            <div className="flex justify-center mb-8 sm:mb-10">
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border"
                style={{
                  background: "rgba(215,195,138,0.06)",
                  borderColor: "rgba(215,195,138,0.3)",
                }}
              >
                <Shield className="h-5 w-5 text-gold" style={{ color: "#D7C38A" }} />
                <span className="text-sm font-semibold text-midnight/80 tracking-wide">
                  Life License Qualification Program (LLQP) Certified
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-midnight/80 leading-relaxed mb-4 sm:mb-6 text-center">
              As a registered financial advisory firm in Canada, we adhere to the highest
              standards of professional conduct and regulatory compliance. We are
              committed to transparency, ethical practices, and putting our clients&apos;
              interests first in everything we do.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-midnight/80 leading-relaxed text-center">
              Our team of licensed financial advisors holds the necessary qualifications to serve clients across Canada. Our advisors are licensed to provide life insurance and accident &amp; sickness insurance products, having completed the Life License Qualification Program (LLQP), which is the standard certification required for insurance advisors in Canada. We maintain ongoing education requirements and
              stay current with evolving Canadian financial regulations, tax laws, and
              industry best practices to ensure we provide you with the most up-to-date and compliant advice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Proudly Supporting Our Community */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#f8f9fa] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3 sm:mb-4">
              Giving Back
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-4 sm:mb-6 md:mb-8 section-title px-2">
              Proudly Supporting Our Community
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-midnight/80 leading-relaxed mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto px-4">
              For over a decade, Birchtree Financial has donated to and supported local organizations that align with our values of growth, safety, and opportunity.
            </p>

            {/* Logo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
              {[
                { src: "/oldsgrizzlesnew.png", alt: "Olds Grizzlys Hockey", delay: 0.1 },
                { src: "/canadalogonew.png", alt: "4-H Canada", delay: 0.2 },
                { src: "/bgcoldsnew.png", alt: "BGC Olds & Area", delay: 0.3 },
                { src: "/mvessnew.png", alt: "MVESS Shelter", delay: 0.4 },
              ].map((logo) => (
                <motion.div
                  key={logo.alt}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: logo.delay }}
                  className="flex items-center justify-center"
                >
                  <div className="relative w-[120px] h-auto flex items-center justify-center transition-all duration-300 hover:scale-105">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={400}
                      height={400}
                      className="object-contain w-[120px] h-auto"
                      style={{ background: "transparent" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-midnight/60" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-gold/80 font-semibold mb-4">
              Get Started
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6 tracking-tight text-white px-2">
              Ready to Work With Us?
            </h2>
            <div className="flex justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            </div>
            <p className="text-base sm:text-lg md:text-xl text-silver/90 mb-8 sm:mb-10 leading-relaxed px-4">
              Schedule a complimentary consultation and take the first step toward a stronger financial future.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 bg-gradient-to-r from-emerald to-emerald-light hover:from-midnight hover:to-midnight-light text-white shadow-lg hover:shadow-xl transition-all duration-150 ease-out hover:scale-[1.02] [&>*]:text-white"
              >
                <Link href="/contact" className="text-white">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/70 transition-all duration-200 [&>*]:text-white"
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
