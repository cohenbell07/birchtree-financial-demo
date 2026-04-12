"use client"

import { useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Users, Target, Star, Heart, Lightbulb, Handshake } from "lucide-react"
import HeroBackground from "@/components/HeroBackground"
import LogoTreeIcon from "@/components/LogoTreeIcon"
import RevealText from "@/components/RevealText"
import CountUp from "@/components/CountUp"
import Image from "next/image"

const AutoplayHeroVideo = dynamic(
  () => import("@/components/home/AutoplayHeroVideo"),
  { ssr: false }
)

const services = [
  { icon: Target, title: "Retirement Planning", description: "Comprehensive RRSP and CPP strategies tailored to your Canadian retirement goals.", href: "/services/retirement-planning", number: "01" },
  { icon: TrendingUp, title: "Investment Management", description: "Expert portfolio management designed to grow and protect your wealth.", href: "/services/investment-management", number: "02" },
  { icon: Shield, title: "Insurance Strategies", description: "Protect what matters most with customized insurance solutions.", href: "/services/insurance-strategies", number: "03" },
  { icon: TrendingUp, title: "Tax Optimization", description: "Maximize TFSA and RRSP benefits while minimizing Canadian tax burden.", href: "/services/tax-optimization-strategies", number: "04" },
  { icon: Target, title: "Wealth Building", description: "Strategic advisory services to build and preserve your legacy.", href: "/services/wealth-building-advisory", number: "05" },
  { icon: Shield, title: "Estate Planning", description: "Ensure your wealth is transferred according to your wishes.", href: "/services/estate-planning-guidance", number: "06" },
]

const whyChooseUs = [
  { icon: Users, title: "Expert Team", description: "Certified financial advisors with decades of combined experience." },
  { icon: Shield, title: "Trusted Advisor", description: "Fiduciary commitment to act in your best interests at all times." },
  { icon: Target, title: "Personalized Approach", description: "Custom strategies designed specifically for your unique situation." },
  { icon: TrendingUp, title: "Proven Results", description: "Track record of helping clients achieve their financial goals." },
]

const testimonials = [
  { name: "Karen & Doug M.", role: "Retired Couple, Olds", content: "We'd been putting off retirement planning for years — honestly, it felt too complicated. Melissa sat down with us, walked us through everything in plain English, and now we actually feel excited about retiring next year instead of scared.", initials: "KD" },
  { name: "Tyler Brandt", role: "Ranch Owner, Sundre", content: "Running a ranch doesn't leave a lot of time to think about RRSPs and tax strategy. The Birchtree team took that off my plate completely. They set everything up, check in regularly, and I trust them like family at this point.", initials: "TB" },
  { name: "Priya Sandhu", role: "Small Business Owner, Red Deer", content: "I switched to Birchtree after my old advisor kept pushing products I didn't need. Here, it actually feels like they're working for me. They helped me set up a group plan for my employees too, which was a game-changer.", initials: "PS" },
]

export default function Home() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const heroTextY = useTransform(scrollY, [0, 600], [0, -60])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    const load = () => {
      const container = document.getElementById('tradingview-ticker-container')
      if (!container || container.querySelector('script[src*="ticker-tape"]')) return
      const widgetDiv = document.createElement('div')
      widgetDiv.className = 'tradingview-widget-container__widget'
      widgetDiv.style.height = '100%'
      widgetDiv.style.width = '100%'
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
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
        showSymbolLogo: true, colorTheme: "dark", isTransparent: true, displayMode: "adaptive", locale: "en",
      })
      widgetDiv.appendChild(script)
      container.appendChild(widgetDiv)
    }
    if ('requestIdleCallback' in window) requestIdleCallback(load)
    else setTimeout(load, 100)
  }, [])

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Ticker */}
      <div className="relative bg-[#050c16] border-b border-white/[0.06] overflow-hidden pt-[5rem]">
        <div className="relative h-[52px] overflow-hidden">
          <div id="tradingview-ticker-container" className="tradingview-widget-container" style={{ height: '100%', width: '100%', position: 'relative' }} />
        </div>
      </div>

      {/* ======== HERO ======== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={shouldReduceMotion ? {} : { y: heroTextY, opacity: heroOpacity }}
        >
          <div className="max-w-5xl mx-auto text-center py-16 sm:py-28 md:py-36">

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-gold/70 font-medium mb-8 sm:mb-10"
            >
              Canadian Financial Advisory
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-heading font-bold text-white mb-6 sm:mb-10 leading-[1.05] tracking-tight px-2"
            >
              Your Financial Future,
              <br />
              <span className="text-gold/90">
                Elevated
              </span>
            </motion.h1>

            {/* Gold line — draws from center */}
            <motion.div
              className="flex justify-center mb-8 sm:mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 160 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed font-body px-4"
            >
              A modern Canadian advisory firm delivering clarity, confidence, and strategic financial insight.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-16 sm:mb-24 px-4"
            >
              <Button
                asChild
                size="lg"
                className="group relative z-10 w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-gold/90 hover:bg-gold text-midnight font-semibold border-0 shadow-[0_4px_20px_rgba(215,195,138,0.25)] hover:shadow-[0_8px_40px_rgba(215,195,138,0.35)] transition-all duration-300 hover:scale-[1.02] rounded-xl [&>*]:text-midnight"
              >
                <Link href="/contact" className="text-midnight">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="relative z-10 w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-white/[0.04] backdrop-blur-sm border border-white/[0.12] text-white/80 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.02] rounded-xl [&>*]:text-white"
              >
                <Link href="/services" className="text-white">Explore Services</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
              {[
                { target: 30, suffix: "+", label: "Years Experience" },
                { target: 500, suffix: "+", label: "Clients Served" },
                { target: 1, prefix: "$", suffix: "B+", label: "Assets Managed" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                >
                  <div className="rounded-xl border border-gold/10 transition-all duration-300 hover:border-gold/25 hover:shadow-[0_0_20px_rgba(215,195,138,0.08)]" style={{ background: 'rgba(11,26,44,0.6)' }}>
                    <div className="p-6 sm:p-8 text-center">
                      <CountUp
                        target={stat.target}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white block [font-variant-numeric:tabular-nums]"
                      />
                      <div className="text-xs sm:text-sm text-white/40 font-body mt-2 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ======== VIDEO ======== */}
      <AutoplayHeroVideo />

      {/* ======== SERVICES ======== */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden grain-overlay" style={{ background: 'linear-gradient(160deg, #f8f7f4 0%, #f5f4f0 40%, #f2f1ed 100%)' }}>
        {/* Gold accent line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        {/* Warm radial glow behind heading — no blur filter */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(215,195,138,0.04) 0%, transparent 60%)' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-4 sm:mb-5">
              What We Offer
            </p>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-midnight mb-5 sm:mb-7 tracking-tight px-2">
              Comprehensive Financial Services
            </RevealText>
            <p className="text-base sm:text-lg md:text-xl text-midnight/50 max-w-2xl mx-auto leading-relaxed font-body px-4">
              A full spectrum of Canadian financial advisory and investment management services tailored to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: index * 0.07, ease: [0.33, 1, 0.68, 1] }}
                  className="h-full"
                >
                  <Link href={service.href} className="block h-full group">
                    <div
                      className="h-full flex rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5"
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(11,26,44,0.06)',
                        boxShadow: '0 1px 2px rgba(11,26,44,0.04), 0 4px 12px rgba(11,26,44,0.03)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(11,26,44,0.06), 0 12px 32px rgba(11,26,44,0.08)'
                        e.currentTarget.style.borderColor = 'rgba(215,195,138,0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 2px rgba(11,26,44,0.04), 0 4px 12px rgba(11,26,44,0.03)'
                        e.currentTarget.style.borderColor = 'rgba(11,26,44,0.06)'
                      }}
                    >
                      {/* Left accent bar */}
                      <div className="w-[3px] flex-shrink-0 transition-all duration-300 group-hover:w-1" style={{ background: '#D7C38A' }} />

                      <div className="p-6 sm:p-7 flex flex-col flex-1">
                        <div className="w-10 h-10 rounded-full bg-midnight flex items-center justify-center mb-5">
                          <Icon className="h-[18px] w-[18px] text-gold" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-heading font-bold text-midnight mb-3">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-[0.9rem] text-midnight/50 leading-relaxed font-body mb-6 flex-grow">
                          {service.description}
                        </p>
                        <span className="text-midnight/60 group-hover:text-midnight font-medium text-sm inline-flex items-center transition-colors duration-200">
                          Learn more
                          <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======== MISSION — Dark navy ======== */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden grain-overlay">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(21,36,57,0.4) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 70%, rgba(215,195,138,0.025) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(5,12,22,0.5) 100%),
            linear-gradient(160deg, #071422 0%, #0B1A2C 35%, #0d1d30 65%, #091828 100%)
          `
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 sm:mb-20 md:mb-24"
            >
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <LogoTreeIcon className="h-[56px] w-[56px] sm:h-[68px] sm:w-[68px] brightness-0 invert opacity-60" />
                </div>
              </div>
              <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-4 sm:mb-5">
                Who We Are
              </p>
              <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-5 sm:mb-7 tracking-tight px-2">
                Our Mission
              </RevealText>
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              </div>
              <p className="text-base sm:text-lg md:text-xl text-white/40 max-w-3xl mx-auto leading-relaxed px-4">
                Financial planning isn&apos;t just about managing money — it&apos;s about creating the life you want. We turn your dreams into achievable goals and your goals into lasting financial security.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { icon: Heart, title: "Client-Centered Values", description: "Your financial well-being is at the heart of everything we do. We listen, understand, and build relationships that last generations." },
                { icon: Lightbulb, title: "Clarity Through Education", description: "We believe in empowering you with knowledge. Complex financial concepts become clear, so you can make confident decisions." },
                { icon: Handshake, title: "Long-Term Commitment", description: "We're not just advisors — we're partners in your journey. From planning to execution, we're with you through every milestone." },
              ].map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <div className="h-full rounded-xl overflow-hidden border border-gold/10 transition-all duration-300 hover:border-gold/25 hover:shadow-[0_0_20px_rgba(215,195,138,0.08)]" style={{ background: 'rgba(11,26,44,0.6)' }}>
                      <div className="p-7 sm:p-9 text-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
                          <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-gold/70" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4">
                          {pillar.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/40 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ======== WHY CHOOSE US — Dark section ======== */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden grain-overlay">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 55% 50% at 35% 20%, rgba(21,36,57,0.4) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 85% 60%, rgba(215,195,138,0.03) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(5,12,22,0.5) 100%),
            linear-gradient(160deg, #050c16 0%, #0B1A2C 30%, #0e1f34 60%, #081525 100%)
          `
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-4 sm:mb-5">
              The Birchtree Difference
            </p>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5 sm:mb-7 tracking-tight text-white px-2">
              Why Choose Birchtree Financial
            </RevealText>
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>
            <p className="text-base sm:text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-body px-4">
              Experience the difference of working with a premium financial advisory firm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="h-full rounded-xl overflow-hidden border border-gold/10 transition-all duration-300 hover:border-gold/25 hover:shadow-[0_0_20px_rgba(215,195,138,0.08)]" style={{ background: 'rgba(11,26,44,0.6)' }}>
                    <div className="p-6 sm:p-8">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5">
                        <Icon className="h-6 w-6 text-gold/70" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======== TESTIMONIALS + COMMUNITY ======== */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden grain-overlay" style={{ background: 'linear-gradient(160deg, #faf9f6 0%, #f7f6f2 50%, #f4f3ef 100%)' }}>
        {/* Gold accent line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-4 sm:mb-5">
              Client Stories
            </p>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-midnight mb-5 sm:mb-7 tracking-tight px-2">
              What Our Clients Say
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
              >
                <div className="h-full rounded-xl bg-white border border-midnight/[0.06] shadow-[0_2px_8px_rgba(11,26,44,0.06),0_8px_24px_rgba(11,26,44,0.08)]">
                  <div className="flex h-full">
                    {/* Gold left accent bar */}
                    <div className="w-1 flex-shrink-0 rounded-l-2xl" style={{ background: 'linear-gradient(to bottom, rgba(215,195,138,0.5) 0%, rgba(215,195,138,0.15) 100%)' }} />

                    <div className="p-6 sm:p-8 md:p-9 relative flex-1">
                      {/* Large decorative quote */}
                      <div className="absolute top-3 right-4 text-[5rem] font-heading font-bold text-gold/[0.08] leading-none select-none pointer-events-none">
                        &ldquo;
                      </div>

                      <div className="flex items-center space-x-0.5 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 text-gold fill-gold" />
                        ))}
                      </div>
                      <p className="text-midnight/60 mb-7 italic text-sm sm:text-base leading-relaxed font-body">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-midnight/60 font-semibold text-xs flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(215,195,138,0.15) 0%, rgba(215,195,138,0.06) 100%)' }}>
                          {testimonial.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-midnight text-sm font-heading">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-midnight/40 font-body">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gold divider */}
          <div className="flex justify-center my-16 sm:my-20 md:my-24">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-4 sm:mb-5">
              Giving Back
            </p>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-5 sm:mb-7 px-2 !leading-[1.4]">
              Proudly Supporting Our Community
            </RevealText>
            <p className="text-base sm:text-lg text-midnight/50 leading-relaxed mb-14 sm:mb-20 max-w-2xl mx-auto px-4">
              For over a decade, Birchtree Financial has donated to and supported local organizations that align with our values of growth, safety, and opportunity.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 max-w-3xl mx-auto items-center">
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
                  className="flex items-center justify-center opacity-40 hover:opacity-70 transition-opacity duration-300"
                >
                  <Image src={logo.src} alt={logo.alt} width={400} height={400} className="object-contain w-[90px] sm:w-[110px] h-auto" style={{ background: 'transparent' }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======== CTA — Aurora dark section ======== */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 text-white relative overflow-hidden grain-overlay">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 50% 45% at 45% 40%, rgba(215,195,138,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 20% 80%, rgba(21,36,57,0.3) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(5,12,22,0.4) 100%),
            linear-gradient(160deg, #050c16 0%, #0B1A2C 30%, #101f33 60%, #0a1525 100%)
          `
        }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-5 sm:mb-7">
              Get Started Today
            </p>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5 sm:mb-7 tracking-tight text-white px-2">
              Ready to Take Control of Your Financial Future?
            </RevealText>
            <div className="flex justify-center mb-8 sm:mb-10">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
            </div>
            <p className="text-base sm:text-lg text-white/40 mb-10 sm:mb-14 max-w-xl mx-auto leading-relaxed font-body px-4">
              Schedule a complimentary consultation to discuss your financial goals and discover how we can help you achieve them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-4">
              <Button
                asChild
                size="lg"
                className="relative z-10 w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-gold/90 hover:bg-gold text-midnight font-semibold border-0 shadow-[0_4px_20px_rgba(215,195,138,0.2)] hover:shadow-[0_8px_40px_rgba(215,195,138,0.3)] transition-all duration-300 hover:scale-[1.02] rounded-xl [&>*]:text-midnight"
              >
                <Link href="/contact" className="text-midnight">
                  Book Your Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="relative z-10 w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-white/[0.04] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300 rounded-xl [&>*]:text-white"
              >
                <Link href="/about" className="text-white">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
