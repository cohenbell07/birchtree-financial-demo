"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, TrendingUp, Users, Target, CheckCircle2 } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const services = [
  {
    icon: Target,
    title: "Retirement Planning",
    description: "Secure your future with comprehensive retirement strategies tailored to your goals.",
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
    description: "Minimize tax burden while maximizing your financial efficiency.",
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest via-forest-dark to-slate overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4 sm:mb-6 text-balance">
              Your Financial Future,
              <span className="text-champagne block">Rooted in Excellence</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-cream mb-6 sm:mb-8 max-w-2xl text-balance">
              Premium financial advisory services designed to help you achieve
              your goals with confidence, clarity, and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                <Link href="/contact">
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 border-champagne text-champagne hover:bg-champagne hover:text-slate w-full sm:w-auto"
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-forest mb-4 sm:mb-6">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate leading-relaxed">
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
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-forest mb-3 sm:mb-4">
              Comprehensive Financial Services
            </h2>
            <p className="text-base sm:text-lg text-slate max-w-2xl mx-auto px-4">
              We offer a full spectrum of financial planning and investment
              management services tailored to your unique needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-forest/10">
                    <CardHeader>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-moss/10 flex items-center justify-center mb-3 sm:mb-4">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-forest" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-heading">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate mb-4">
                        {service.description}
                      </CardDescription>
                      <Link
                        href={service.href}
                        className="text-forest hover:text-moss font-medium text-xs sm:text-sm inline-flex items-center group"
                      >
                        Learn more
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
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
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-cream to-cream-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-forest mb-3 sm:mb-4">
              Why Choose BirchTree Financial
            </h2>
            <p className="text-base sm:text-lg text-slate max-w-2xl mx-auto px-4">
              Experience the difference of working with a premium financial
              advisory firm.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-forest mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-semibold text-forest mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-forest mb-3 sm:mb-4">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full glass">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <CheckCircle2
                          key={i}
                          className="h-5 w-5 text-champagne fill-champagne"
                        />
                      ))}
                    </div>
                    <p className="text-slate mb-4 italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold text-forest">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-forest text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3 sm:mb-4">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-cream mb-6 sm:mb-8 max-w-2xl mx-auto">
              Schedule a complimentary consultation to discuss your financial
              goals and discover how we can help you achieve them.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild size="lg" variant="champagne" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                <Link href="/contact">
                  Book Your Consultation
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 border-champagne text-champagne hover:bg-champagne hover:text-slate w-full sm:w-auto"
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
