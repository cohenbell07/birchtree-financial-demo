"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, TrendingUp, Users, Target, CheckCircle2 } from "lucide-react"
import HeroBackground from "@/components/HeroBackground"
import LogoTreeIcon from "@/components/LogoTreeIcon"
import AutoplayHeroVideo from "@/components/home/AutoplayHeroVideo"
import Image from "next/image"

// Optimized animation - respects reduced motion preference
const useAnimations = () => {
  const shouldReduceMotion = useReducedMotion()
  
  return {
    heroText: {
      initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
    },
    fadeIn: {
      initial: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35 },
    },
  }
}

const services = [
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Comprehensive RRSP and CPP strategies tailored to your Canadian retirement goals.",
    href: "/services/retirement-planning",
  },
  {
    icon: TrendingUp,
    title: "Investment Management",
    description: "Expert portfolio management designed to grow and protect your wealth.",
    href: "/services/investment-management",
  },
  {
    icon: Shield,
    title: "Insurance Strategies",
    description: "Protect what matters most with customized insurance solutions.",
    href: "/services/insurance-strategies",
  },
  {
    icon: TrendingUp,
    title: "Tax Optimization",
    description: "Maximize TFSA and RRSP benefits while minimizing Canadian tax burden.",
    href: "/services/tax-optimization-strategies",
  },
  {
    icon: Target,
    title: "Wealth Building",
    description: "Strategic advisory services to build and preserve your legacy.",
    href: "/services/wealth-building-advisory",
  },
  {
    icon: Shield,
    title: "Estate Planning",
    description: "Ensure your wealth is transferred according to your wishes.",
    href: "/services/estate-planning-guidance",
  },
]

const whyChooseUs = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Certified financial advisors with decades of combined experience.",
  },
  {
    icon: Shield,
    title: "Trusted Advisor",
    description: "Fiduciary commitment to act in your best interests at all times.",
  },
  {
    icon: Target,
    title: "Personalized Approach",
    description: "Custom strategies designed specifically for your unique situation.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Track record of helping clients achieve their financial goals.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Retiree",
    content:
      "Birchtree Financial helped me navigate retirement with confidence. Their team is knowledgeable, patient, and truly cares about my financial well-being.",
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    content:
      "As a business owner, I needed strategic financial advisory services. Birchtree provided comprehensive solutions that aligned perfectly with my business goals.",
    initials: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Young Professional",
    content:
      "Starting my wealth-building journey felt overwhelming until I found Birchtree. They made complex financial concepts easy to understand and act on.",
    initials: "ER",
  },
]

export default function Home() {
  const animations = useAnimations()
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tickerRef.current) return

    // Check if script already exists
    if (tickerRef.current.querySelector('script')) return

    // Create widget container div if it doesn't exist
    let widgetDiv = tickerRef.current.querySelector('.tradingview-widget-container__widget')
    if (!widgetDiv) {
      widgetDiv = document.createElement('div')
      widgetDiv.className = 'tradingview-widget-container__widget'
      tickerRef.current.appendChild(widgetDiv)
    }

    // Create and configure TradingView script
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.type = 'text/javascript'
    script.async = true
    script.textContent = JSON.stringify({
      symbols: [
        {
          proName: 'OANDA:SPX500USD',
          title: 'S&P 500',
        },
        {
          // Dow Jones Industrial Average (TradingView index symbol)
          proName: 'TVC:DJI',
          title: 'Dow Jones',
        },
        {
          proName: 'TSX:TSX',
          title: 'TSX Composite',
        },
      ],
      showSymbolLogo: true,
      colorTheme: 'dark',
      isTransparent: true,
      displayMode: 'adaptive',
      locale: 'en',
    })

    tickerRef.current.appendChild(script)

    return () => {
      // Cleanup on unmount
      if (tickerRef.current) {
        const scriptElement = tickerRef.current.querySelector('script')
        if (scriptElement) {
          tickerRef.current.removeChild(scriptElement)
        }
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* TradingView Ticker Banner */}
      <div className="relative bg-midnight border-b border-silver/20 overflow-hidden">
        {/* Subtle premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald/10 via-transparent to-emerald/10" />
        <div className="relative">
          <div
            ref={tickerRef}
            className="tradingview-widget-container"
            style={{
              height: '52px',
              overflow: 'hidden',
              marginBottom: '0',
            }}
          />
        </div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        {/* Additional gradient blob for depth - optimized blur */}
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-emerald/3 rounded-full blur-2xl" />
        
        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center py-12 sm:py-24 md:py-32">
            <motion.h1
              {...animations.heroText}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white mb-4 sm:mb-8 leading-tight sm:leading-[1.1] tracking-tight px-2 drop-shadow-[0_4px_18px_rgba(0,0,0,0.65)]"
            >
              Your Financial Future,
              <br />
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-white via-silver-light to-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.65)]">
                Elevated Through Intelligence
              </span>
            </motion.h1>
            
            <motion.p
              {...animations.heroText}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white mb-6 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-subhead px-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.50)]"
            >
              A modern Canadian advisory firm delivering clarity, confidence, and strategic financial insight.
            </motion.p>
            
            <motion.div
              {...animations.heroText}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-10 sm:mb-16 md:mb-20 px-4"
            >
              <Button
                asChild
                size="lg"
                className="group relative z-10 w-full sm:w-auto text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 bg-gradient-to-r from-emerald to-emerald-light hover:from-emerald-light hover:to-emerald text-white border-2 border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_32px_rgba(27,42,61,0.8)] hover:border-white/30 transition-all duration-200 ease-out hover:scale-[1.02] [&>*]:text-white"
              >
                <Link href="/contact" className="text-white">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="relative z-10 w-full sm:w-auto text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 bg-white/10 backdrop-blur-sm border-2 border-white/60 text-white hover:bg-white/20 hover:border-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-200 ease-out hover:scale-[1.02] [&>*]:text-white"
              >
                <Link href="/services" className="text-white">Explore Services</Link>
              </Button>
            </motion.div>
            
            {/* Stats Cards - No animations for performance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
              {[
                { number: "15+", label: "Years Experience" },
                { number: "500+", label: "Clients Served" },
                { number: "$2B+", label: "Assets Managed" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-dark rounded-2xl p-4 sm:p-6 md:p-8 card-shadow"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-1 sm:mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg text-silver/90 font-body">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </section>

      {/* Autoplay Hero Video Section */}
      <AutoplayHeroVideo />

      {/* Services Overview - MOVED BEFORE MISSION */}
      <section className="py-12 sm:py-20 md:py-24 lg:py-28 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-midnight mb-4 sm:mb-6 md:mb-8 tracking-tight section-title px-2">
              Comprehensive Financial Services
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-midnight/70 max-w-3xl mx-auto leading-relaxed font-subhead px-4">
              We offer a full spectrum of Canadian financial advisory and investment
              management services tailored to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card
                  key={service.title}
                  className="h-full glass card-shadow card-shadow-hover border-emerald/20 hover:border-emerald/40 transition-all duration-150 ease-out max-w-md mx-auto md:max-w-none"
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald/15 to-emerald/15 flex items-center justify-center mb-3 sm:mb-4">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald icon-hover" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-heading text-midnight mb-2">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <CardDescription className="text-midnight/70 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed font-body">
                      {service.description}
                    </CardDescription>
                    <Link
                      href={service.href}
                      className="text-emerald hover:text-emerald-light font-semibold text-sm inline-flex items-center group transition-colors duration-150 ease-out"
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-150 ease-out will-change-transform" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement - Premium Redesigned */}
      <section className="pt-10 sm:pt-12 md:pt-16 lg:pt-20 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-gradient-to-b from-mist via-white to-mist relative overflow-hidden">
        {/* Premium textured background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald/15 via-emerald/8 to-emerald/15" />
        </div>
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B2A3D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Elegant birch tree icon */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald/10 flex items-center justify-center">
                <LogoTreeIcon className="h-[60px] w-[60px] sm:h-[72px] sm:w-[72px]" />
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-midnight mb-6 sm:mb-8 md:mb-10 tracking-tight section-title px-2">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-midnight/80 leading-relaxed font-body max-w-xl mx-auto px-4">
              At Birchtree Financial, we believe that financial advisory services are not
              just about numbers—it&apos;s about empowering you to live the life you
              envision. Our team of experienced advisors combines deep expertise
              with personalized attention, crafting strategies that align with
              your values, goals, and aspirations. We&apos;re committed to being your
              trusted partner every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Birchtree - Enhanced */}
      <section className="py-12 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-midnight via-emerald/90 to-midnight text-white relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald/10 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight section-title text-white px-2">
              Why Choose Birchtree Financial
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-silver/90 max-w-3xl mx-auto leading-relaxed font-subhead px-4">
              Experience the difference of working with a premium financial
              advisory firm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {whyChooseUs.map((item) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.title}
                  className="glass-dark h-full shadow-glow-hover border-emerald/20 max-w-md mx-auto md:max-w-none"
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center mb-3 sm:mb-4 shadow-glow mx-auto md:mx-0">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white icon-hover" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-white text-center md:text-left">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <CardDescription className="text-silver/80 text-sm sm:text-base md:text-lg text-center md:text-left">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced with avatars */}
      <section className="py-12 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-midnight mb-4 sm:mb-6 md:mb-8 tracking-tight section-title px-2">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="h-full glass card-shadow max-w-md mx-auto md:max-w-none">
                <CardContent className="p-4 sm:p-6 md:pt-8 md:pb-8">
                  <div className="flex items-center space-x-1 mb-4 sm:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle2
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5 text-emerald fill-emerald/20"
                      />
                    ))}
                  </div>
                  <p className="text-midnight/80 mb-4 sm:mb-6 italic text-sm sm:text-base md:text-lg leading-relaxed font-body">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-md flex-shrink-0">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-midnight text-sm sm:text-base font-heading">
                        {testimonial.name}
                      </p>
                      <p className="text-xs sm:text-sm text-midnight/60 font-body">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proudly Supporting Our Community */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#f8f9fa] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-4 sm:mb-6 md:mb-8 section-title px-2">
              Proudly Supporting Our Community
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-midnight/80 leading-relaxed mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto px-4">
              For over a decade, Birchtree Financial has donated to and supported local organizations that align with our values of growth, safety, and opportunity.
            </p>

            {/* Logo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
              {/* Olds Grizzlys Hockey */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-[120px] h-auto flex items-center justify-center transition-all duration-300 hover:scale-105">
                  <Image
                    src="/oldsgrizzlesnew.png"
                    alt="Olds Grizzlys Hockey"
                    width={400}
                    height={400}
                    className="object-contain w-[120px] h-auto"
                    style={{ background: 'transparent' }}
                  />
                </div>
              </motion.div>

              {/* 4-H Canada */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-[120px] h-auto flex items-center justify-center transition-all duration-300 hover:scale-105">
                  <Image
                    src="/canadalogonew.png"
                    alt="4-H Canada"
                    width={400}
                    height={400}
                    className="object-contain w-[120px] h-auto"
                    style={{ background: 'transparent' }}
                  />
                </div>
              </motion.div>

              {/* BGC Olds & Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-[120px] h-auto flex items-center justify-center transition-all duration-300 hover:scale-105">
                  <Image
                    src="/bgcoldsnew.png"
                    alt="BGC Olds & Area"
                    width={400}
                    height={400}
                    className="object-contain w-[120px] h-auto"
                    style={{ background: 'transparent' }}
                  />
                </div>
              </motion.div>

              {/* MVESS Shelter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-[120px] h-auto flex items-center justify-center transition-all duration-300 hover:scale-105">
                  <Image
                    src="/mvessnew.png"
                    alt="MVESS Shelter"
                    width={400}
                    height={400}
                    className="object-contain w-[120px] h-auto"
                    style={{ background: 'transparent' }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Simplified */}
      <section className="py-12 sm:py-20 md:py-24 lg:py-32 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-midnight/60" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight section-title text-white px-2">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-silver/90 mb-6 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-subhead px-4">
              Schedule a complimentary consultation to discuss your financial
              goals and discover how we can help you achieve them.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-4">
              <Button
                asChild
                size="lg"
                className="relative z-10 w-full sm:w-auto text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 bg-gradient-to-r from-emerald to-emerald-light hover:from-emerald-light hover:to-emerald text-white shadow-lg hover:shadow-xl transition-all duration-150 ease-out hover:scale-[1.02] will-change-transform [&>*]:text-white"
              >
                <Link href="/contact" className="text-white">
                  Book Your Consultation
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="relative z-10 w-full sm:w-auto text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 bg-gradient-to-r from-emerald to-emerald-light hover:from-emerald-light hover:to-emerald text-white shadow-lg hover:shadow-[0_0_25px_rgba(27,42,61,0.5)] transition-all duration-200 ease-out [&>*]:text-white border-0"
              >
                <Link href="/faq" className="text-white">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
