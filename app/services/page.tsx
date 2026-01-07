"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Target, TrendingUp, Shield, Calculator, Building2, FileText } from "lucide-react"

const services = [
  {
    slug: "retirement-planning",
    icon: Target,
    title: "Retirement Planning",
    description:
      "Create a comprehensive retirement strategy that ensures financial security and peace of mind during your golden years.",
    features: [
      "Retirement income planning",
      "CPP and OAS optimization",
      "RRSP and TFSA management",
      "Withdrawal strategies",
    ],
  },
  {
    slug: "investment-management",
    icon: TrendingUp,
    title: "Investment Management",
    description:
      "Expert portfolio management designed to grow and protect your wealth through disciplined investment strategies.",
    features: [
      "Portfolio construction",
      "Asset allocation",
      "Risk management",
      "Performance monitoring",
    ],
  },
  {
    slug: "insurance-strategies",
    icon: Shield,
    title: "Insurance Strategies",
    description:
      "Protect what matters most with customized insurance solutions tailored to your unique needs and circumstances.",
    features: [
      "Life insurance planning",
      "Disability insurance",
      "Long-term care planning",
      "Policy review and optimization",
    ],
  },
  {
    slug: "tax-optimization-strategies",
    icon: Calculator,
    title: "Tax Optimization Strategies",
    description:
      "Minimize your tax burden while maximizing financial efficiency through strategic tax planning and optimization.",
    features: [
      "Tax-efficient investing",
      "RRSP and TFSA strategies",
      "Tax-loss harvesting",
      "Charitable giving strategies",
    ],
  },
  {
    slug: "wealth-building-advisory",
    icon: Building2,
    title: "Wealth Building & Advisory",
    description:
      "Strategic advisory services to build, preserve, and transfer your wealth effectively across generations.",
    features: [
      "Wealth accumulation strategies",
      "Business succession planning",
      "Multi-generational planning",
      "Philanthropic planning",
    ],
  },
  {
    slug: "estate-planning-guidance",
    icon: FileText,
    title: "Estate Planning Guidance",
    description:
      "Ensure your wealth is transferred according to your wishes while minimizing taxes and preserving family harmony.",
    features: [
      "Estate plan creation",
      "Trust strategies",
      "Beneficiary planning",
      "Legacy planning",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive financial solutions for every stage of life"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto px-4"
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-midnight/80 leading-relaxed">
              At Birchtree Financial, we offer a comprehensive suite of Canadian financial
              planning and investment management services. Each service is
              designed to work independently or as part of a complete financial
              strategy tailored to your unique situation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="h-full glass shadow-glow-hover border-emerald/20 flex flex-col max-w-md mx-auto md:max-w-none">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald/20 to-emerald/20 flex items-center justify-center mb-3 sm:mb-4">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-emerald" />
                      </div>
                      <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-heading text-midnight">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-midnight/70 text-xs sm:text-sm md:text-base mt-2">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col p-4 sm:p-6 pt-0">
                      <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 flex-grow">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start space-x-2 text-xs sm:text-sm text-midnight/80"
                          >
                            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-emerald mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-emerald hover:text-emerald-light font-medium text-xs sm:text-sm inline-flex items-center group mt-auto"
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
    </div>
  )
}

