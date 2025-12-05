"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, TrendingUp, Users, Target, CheckCircle2 } from "lucide-react"
import ParticleBackground from "@/components/ParticleBackground"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
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
    description: "Certified financial planners with decades of combined experience.",
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
      "BirchTree Financial helped me navigate retirement with confidence. Their team is knowledgeable, patient, and truly cares about my financial well-being.",
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    content:
      "As a business owner, I needed strategic financial planning. BirchTree provided comprehensive solutions that aligned perfectly with my business goals.",
  },
  {
    name: "Emily Rodriguez",
    role: "Young Professional",
    content:
      "Starting my wealth-building journey felt overwhelming until I found BirchTree. They made complex financial concepts easy to understand and act on.",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 gradient-bg vignette" />
        
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Glass Panels for Depth */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-emerald/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-mint/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Glass Card Container */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass-dark rounded-3xl p-8 sm:p-12 md:p-16 mb-8 shadow-2xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white mb-6 sm:mb-8 leading-tight"
              >
                Your Financial Future,
                <br />
                <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-mint via-emerald to-emerald-light">
                  Elevated Through Intelligence
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-silver mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                A modern Canadian advisory firm delivering clarity, confidence, and strategic financial insight.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="group text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 bg-gradient-to-r from-emerald to-emerald-light hover:shadow-glow hover:scale-105 transition-all duration-300"
                >
                  <Link href="/contact">
                    Book a Consultation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 border-2 border-mint/50 text-mint hover:bg-mint/10 hover:border-mint hover:shadow-glow transition-all duration-300"
                >
                  <Link href="/services">Explore Services</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12"
            >
              {[
                { number: "15+", label: "Years Experience" },
                { number: "500+", label: "Clients Served" },
                { number: "$2B+", label: "Assets Managed" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-dark rounded-2xl p-6 sm:p-8 shadow-glow-hover"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-mint mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-silver">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-mint/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-mint rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-teal" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-6 sm:mb-8">
              Our Mission
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-midnight/80 leading-relaxed">
              At BirchTree Financial, we believe that financial planning is not
              just about numbers—it&apos;s about empowering you to live the life you
              envision. Our team of experienced advisors combines deep expertise
              with personalized attention, crafting strategies that align with
              your values, goals, and aspirations. We&apos;re committed to being your
              trusted partner every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white to-silver/5 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-4 sm:mb-6">
              Comprehensive Financial Services
            </h2>
            <p className="text-lg sm:text-xl text-midnight/70 max-w-2xl mx-auto">
              We offer a full spectrum of Canadian financial planning and investment
              management services tailored to your unique needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="h-full glass shadow-glow-hover border-emerald/20 hover:border-emerald/40 transition-all duration-300">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald/20 to-teal/20 flex items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-emerald" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl font-heading text-midnight">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-midnight/70 mb-4 text-base">
                        {service.description}
                      </CardDescription>
                      <Link
                        href={service.href}
                        className="text-emerald hover:text-emerald-light font-medium text-sm inline-flex items-center group"
                      >
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose BirchTree */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-midnight via-teal to-midnight text-white relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald/10 via-transparent to-mint/10 animate-gradient-shift" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6">
              Why Choose BirchTree Financial
            </h2>
            <p className="text-lg sm:text-xl text-silver/80 max-w-2xl mx-auto">
              Experience the difference of working with a premium financial
              advisory firm.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center glass-dark rounded-2xl p-6 sm:p-8"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald to-emerald-light mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-glow">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-3 sm:mb-4">
                    {item.title}
                  </h3>
                  <p className="text-silver/80 text-sm sm:text-base">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-4 sm:mb-6">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass shadow-glow-hover">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <CheckCircle2
                          key={i}
                          className="h-5 w-5 text-emerald fill-emerald"
                        />
                      ))}
                    </div>
                    <p className="text-midnight/80 mb-4 italic text-base">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold text-midnight text-base">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-midnight/60">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-28 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-midnight/50" />
        <ParticleBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-xl sm:text-2xl text-silver mb-8 sm:mb-12 max-w-2xl mx-auto">
              Schedule a complimentary consultation to discuss your financial
              goals and discover how we can help you achieve them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 bg-gradient-to-r from-mint to-emerald hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                <Link href="/contact">
                  Book Your Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 border-2 border-mint/50 text-mint hover:bg-mint/10 hover:border-mint hover:shadow-glow transition-all duration-300"
              >
                <Link href="/faq">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
