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
      "Social Security optimization",
      "401(k) and IRA management",
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
      "Retirement account strategies",
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

      <section className="py-12 sm:py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <p className="text-base sm:text-lg text-slate leading-relaxed">
              At BirchTree Financial, we offer a comprehensive suite of financial
              planning and investment management services. Each service is
              designed to work independently or as part of a complete financial
              strategy tailored to your unique situation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-moss/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-forest" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-heading">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-slate">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      <ul className="space-y-2 mb-4 flex-grow">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start space-x-2 text-sm text-slate"
                          >
                            <ArrowRight className="h-4 w-4 text-moss mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-forest hover:text-moss font-medium text-sm inline-flex items-center group mt-auto"
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
    </div>
  )
}

