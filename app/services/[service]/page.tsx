"use client"

import { notFound, useParams } from "next/navigation"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

const serviceDetails: Record<
  string,
  {
    title: string
    description: string
    overview: string
    benefits: string[]
    whatWeDo: string[]
    whoItsFor: string
    icon?: string
  }
> = {
  "retirement-planning": {
    title: "Retirement Planning",
    description:
      "Secure your future with a comprehensive retirement strategy tailored to your goals and timeline.",
    overview:
      "Planning for retirement is one of the most important financial decisions you'll make. Our retirement planning services help you create a roadmap to financial security, ensuring you have the resources to enjoy your golden years with confidence and peace of mind.",
    benefits: [
      "Clear understanding of your retirement needs and timeline",
      "Maximized CPP and OAS benefits through strategic planning",
      "Optimized RRSP and TFSA contributions and distributions",
      "Tax-efficient withdrawal strategies to preserve your wealth",
      "Confidence knowing you're on track to meet your goals",
    ],
    whatWeDo: [
      "Analyze your current retirement savings and projected needs",
      "Develop personalized retirement income strategies",
      "Optimize CPP and OAS claiming strategies",
      "Create tax-efficient withdrawal plans",
      "Provide ongoing monitoring and adjustments as needed",
    ],
    whoItsFor:
      "Whether you're decades away from retirement or planning to retire in the next few years, our retirement planning services can help you build and protect your nest egg.",
  },
  "investment-management": {
    title: "Investment Management",
    description:
      "Expert portfolio management designed to grow and protect your wealth through disciplined investment strategies.",
    overview:
      "Successful investing requires more than just picking stocks. Our investment management approach combines rigorous research, disciplined risk management, and strategic asset allocation to help you achieve your long-term financial goals.",
    benefits: [
      "Professional portfolio management tailored to your goals",
      "Diversified investments to reduce risk",
      "Tax-efficient investment strategies",
      "Ongoing monitoring and rebalancing",
      "Access to institutional-quality investment options",
    ],
    whatWeDo: [
      "Develop personalized investment strategies based on your goals and risk tolerance",
      "Construct well-diversified portfolios across asset classes",
      "Monitor and rebalance portfolios regularly",
      "Implement tax-loss harvesting strategies",
      "Provide regular performance reports and insights",
    ],
    whoItsFor:
      "Ideal for investors who want professional management of their investment portfolios without the complexity of doing it themselves.",
  },
  "insurance-strategies": {
    title: "Insurance Strategies",
    description:
      "Protect what matters most with customized insurance solutions tailored to your unique needs.",
    overview:
      "Insurance is a critical component of any comprehensive financial plan. We help you identify your insurance needs and find the right policies to protect your family, assets, and financial future.",
    benefits: [
      "Comprehensive protection for you and your loved ones",
      "Optimized insurance coverage at competitive rates",
      "Protection against unexpected events and liabilities",
      "Peace of mind knowing your family is protected",
      "Regular reviews to ensure coverage remains adequate",
    ],
    whatWeDo: [
      "Assess your current insurance needs and coverage gaps",
      "Review existing policies for cost and coverage optimization",
      "Recommend appropriate life, disability, and long-term care insurance",
      "Help coordinate with insurance professionals",
      "Regularly review and update your coverage as circumstances change",
    ],
    whoItsFor:
      "Essential for anyone with dependents, significant assets, or business interests that need protection.",
  },
  "tax-optimization-strategies": {
    title: "Tax Optimization Strategies",
    description:
      "Minimize your tax burden while maximizing financial efficiency through strategic tax planning.",
    overview:
      "Taxes are one of the largest expenses you'll face. Our tax optimization strategies help you keep more of what you earn while staying compliant with all tax regulations.",
    benefits: [
      "Reduced tax liability through strategic planning",
      "Tax-efficient investment and retirement strategies",
      "Maximized deductions and credits",
      "Coordination with your tax professional",
      "Ongoing tax planning throughout the year",
    ],
    whatWeDo: [
      "Develop tax-efficient investment strategies",
      "Optimize RRSP and TFSA contributions and distributions",
      "Implement tax-loss harvesting strategies",
      "Coordinate charitable giving for tax benefits",
      "Work with your tax professional to minimize your overall tax burden",
    ],
    whoItsFor:
      "Beneficial for high-income earners, business owners, and anyone looking to minimize their tax burden legally and effectively.",
  },
  "wealth-building-advisory": {
    title: "Wealth Building & Advisory",
    description:
      "Strategic advisory services to build, preserve, and transfer your wealth effectively.",
    overview:
      "Building and preserving wealth requires a comprehensive approach that considers all aspects of your financial life. Our wealth advisory services provide the strategic guidance you need to grow your assets and achieve your long-term goals.",
    benefits: [
      "Comprehensive wealth management strategy",
      "Multi-generational wealth planning",
      "Business succession planning",
      "Philanthropic planning strategies",
      "Access to exclusive investment opportunities",
    ],
    whatWeDo: [
      "Develop comprehensive wealth accumulation strategies",
      "Create business succession and exit plans",
      "Plan for multi-generational wealth transfer",
      "Design philanthropic giving strategies",
      "Provide access to alternative investments and private opportunities",
    ],
    whoItsFor:
      "Ideal for high-net-worth individuals, business owners, and families looking to build and preserve wealth across generations.",
  },
  "estate-planning-guidance": {
    title: "Estate Planning Guidance",
    description:
      "Ensure your wealth is transferred according to your wishes while minimizing taxes and preserving family harmony.",
    overview:
      "Estate planning ensures your assets are distributed according to your wishes, your family is provided for, and your legacy is preserved. We guide you through this complex process with care and expertise.",
    benefits: [
      "Clear estate plan that reflects your wishes",
      "Minimized estate taxes and probate costs",
      "Protection for your loved ones",
      "Preservation of family wealth across generations",
      "Peace of mind knowing your legacy is secure",
    ],
    whatWeDo: [
      "Assess your estate planning needs and goals",
      "Coordinate with estate planning attorneys",
      "Develop trust and beneficiary strategies",
      "Plan for wealth transfer and tax minimization",
      "Review and update estate plans as circumstances change",
    ],
    whoItsFor:
      "Important for anyone with significant assets, children, or specific wishes for how their wealth should be distributed.",
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const serviceSlug = params?.service as string
  const service = serviceDetails[serviceSlug]

  if (!service) {
    notFound()
  }

  return (
    <div>
      <PageHeader title={service.title} subtitle={service.description} />

      <section className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass shadow-glow-hover border-emerald/20">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-heading text-midnight">Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base sm:text-lg text-midnight/80 leading-relaxed">
                    {service.overview}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="glass shadow-glow-hover border-emerald/20">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-heading text-midnight">Key Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start space-x-2 sm:space-x-3 text-sm sm:text-base text-midnight/80"
                      >
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* What We Do */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glass shadow-glow-hover border-emerald/20">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-heading text-midnight">What We Do</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.whatWeDo.map((item) => (
                      <li
                        key={item}
                        className="flex items-start space-x-3 text-midnight/80 text-sm sm:text-base"
                      >
                        <ArrowRight className="h-5 w-5 text-emerald mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Who It's For */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="gradient-bg text-white shadow-glow border-emerald/30">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-heading text-white">
                    Who It&apos;s For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base sm:text-lg text-silver/90 leading-relaxed">
                    {service.whoItsFor}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <Button asChild size="lg" className="relative z-10 !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(27,42,61,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white">
                <Link href="/contact" className="!text-white">Schedule a Consultation</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

