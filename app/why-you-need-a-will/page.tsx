"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle2, Shield, Users, Clock, AlertCircle } from "lucide-react"

const reasons = [
  {
    icon: Shield,
    title: "Control Over Asset Distribution",
    description: "Without a Will, your estate is distributed according to provincial intestacy laws, which may not align with your wishes. A Will ensures your assets go to the people and causes you choose."
  },
  {
    icon: Users,
    title: "Protect Your Family",
    description: "A Will allows you to name guardians for minor children and dependents, ensuring they are cared for by people you trust. It also helps prevent family disputes and confusion during a difficult time."
  },
  {
    icon: Clock,
    title: "Reduce Delays and Costs",
    description: "When someone dies without a Will (intestate), the probate process can be significantly longer and more expensive. A properly drafted Will can streamline estate administration and reduce legal fees."
  },
  {
    icon: AlertCircle,
    title: "Avoid Intestate Succession Rules",
    description: "In Canada, if you die without a Will, provincial law determines how your assets are distributed. Your spouse may not automatically receive everything—assets may be split between your spouse and children according to formulaic rules."
  },
  {
    icon: FileText,
    title: "Name an Executor",
    description: "A Will allows you to choose a trusted executor who understands your wishes and can manage your estate efficiently. Without a Will, the court appoints an administrator, which may not be someone you would have chosen."
  },
  {
    icon: CheckCircle2,
    title: "Plan for Tax Implications",
    description: "A Will can help minimize tax consequences for your beneficiaries through proper estate planning strategies. This is especially important for registered accounts like RRSPs and TFSAs."
  }
]

export default function WhyYouNeedAWillPage() {
  return (
    <div>
      <PageHeader
        title="Why You Need a Will"
        subtitle="Understanding the importance of estate planning for Canadians"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden grain-overlay" style={{ background: 'linear-gradient(160deg, #f8f7f4 0%, #f5f4f0 40%, #f2f1ed 100%)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white rounded-xl border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)]">
                <CardContent className="p-6 sm:p-8">
                  <p className="text-base sm:text-lg text-midnight/80 leading-relaxed">
                    Without a Will, your estate may not automatically pass to your spouse. Assets are distributed by the rules of intestate succession, which vary by province. Having a Will gives you control, reduces delays, and helps your family avoid unnecessary stress during an already difficult time.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reasons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {reasons.map((reason, index) => {
                const Icon = reason.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  >
                    <Card className="bg-white rounded-xl border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] h-full">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mr-4">
                            <Icon className="h-6 w-6 text-gold" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg sm:text-xl font-heading text-midnight mb-2">
                              {reason.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <p className="text-sm sm:text-base text-midnight/70 leading-relaxed">
                          {reason.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Additional Considerations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="bg-white rounded-xl border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)]">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-heading text-midnight">
                    Additional Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center mt-0.5 mr-3">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                      </div>
                      <span className="text-sm sm:text-base text-midnight/80 leading-relaxed flex-1">
                        Update your Will after major life events such as marriage, divorce, birth of children, or significant changes in assets
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center mt-0.5 mr-3">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                      </div>
                      <span className="text-sm sm:text-base text-midnight/80 leading-relaxed flex-1">
                        Consider creating a Power of Attorney for property and personal care to handle decisions if you become incapacitated
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center mt-0.5 mr-3">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                      </div>
                      <span className="text-sm sm:text-base text-midnight/80 leading-relaxed flex-1">
                        Review beneficiary designations on registered accounts, insurance policies, and pensions to ensure they align with your Will
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center mt-0.5 mr-3">
                        <div className="w-2 h-2 rounded-full bg-gold" />
                      </div>
                      <span className="text-sm sm:text-base text-midnight/80 leading-relaxed flex-1">
                        Store your Will in a safe place and inform your executor of its location
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="bg-amber-50/50 border border-amber-200/50 rounded-xl">
                <CardContent className="p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-midnight/80 italic">
                    <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal or financial advice. Estate planning laws vary by province in Canada. Please consult with a qualified estate lawyer and financial advisor to create a Will and estate plan that meets your specific needs and complies with provincial laws.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg" className="bg-gold/90 hover:bg-gold text-midnight font-semibold hover:shadow-[0_4px_20px_rgba(215,195,138,0.25)] hover:scale-[1.02] transition-all duration-200 rounded-xl [&>*]:text-midnight">
                <Link href="/contact" className="text-midnight">Speak with a Financial Advisor</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-midnight/20 text-midnight hover:bg-midnight/5 hover:border-midnight/40 transition-all duration-200 rounded-xl [&>*]:text-midnight">
                <Link href="/helpful-tools" className="text-midnight">View Will Planning Checklist</Link>
              </Button>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}

