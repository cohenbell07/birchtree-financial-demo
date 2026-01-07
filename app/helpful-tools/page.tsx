"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, GraduationCap, Home, BookOpen, Heart, Globe, Phone } from "lucide-react"

const willPlanningChecklist = [
  "Name an executor to manage your estate and carry out your wishes",
  "Designate guardianship for dependents (children, elderly parents, or pets)",
  "Specify distribution of assets to beneficiaries",
  "Establish a Power of Attorney for financial and healthcare decisions",
  "Document digital assets and online account access information",
  "Consider charitable donations and legacy giving",
  "Plan for business succession if you own a business",
  "Address potential tax implications for your beneficiaries",
  "Include instructions for funeral and burial preferences",
  "Review and update beneficiary designations on registered accounts (RRSP, TFSA, insurance)",
  "Consider setting up trusts for minor beneficiaries or special needs dependents",
  "Document your wishes for end-of-life medical care",
  "Ensure your Will is properly witnessed and stored securely",
  "Review your Will periodically and update after major life events",
  "Communicate your wishes with your executor and family members"
]

export default function HelpfulToolsPage() {
  return (
    <div>
      <PageHeader
        title="Helpful Tools & Resources"
        subtitle="Access government resources, planning guides, and essential financial information for Canadians"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
            
            {/* Government Pension Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass shadow-glow-hover border-emerald/20">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-heading text-midnight flex items-center">
                    <FileText className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-emerald flex-shrink-0" />
                    Government Pension Benefits
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-midnight/70 mt-2">
                    Access information and applications for Canada Pension Plan (CPP) and Old Age Security (OAS) benefits
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Link
                      href="https://www.canada.ca/en/services/benefits/publicpensions/cpp.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-white border-2 border-silver/20 rounded-lg hover:border-emerald/50 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-midnight group-hover:text-emerald transition-colors text-sm sm:text-base">
                          General CPP Info
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate/60 group-hover:text-emerald transition-colors ml-2 flex-shrink-0" />
                    </Link>

                    <Link
                      href="https://www.canada.ca/en/services/benefits/publicpensions/cpp/apply.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-white border-2 border-silver/20 rounded-lg hover:border-emerald/50 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-midnight group-hover:text-emerald transition-colors text-sm sm:text-base">
                          How to Apply for CPP
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate/60 group-hover:text-emerald transition-colors ml-2 flex-shrink-0" />
                    </Link>

                    <Link
                      href="https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-white border-2 border-silver/20 rounded-lg hover:border-emerald/50 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-midnight group-hover:text-emerald transition-colors text-sm sm:text-base">
                          OAS Info
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate/60 group-hover:text-emerald transition-colors ml-2 flex-shrink-0" />
                    </Link>

                    <Link
                      href="https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-white border-2 border-silver/20 rounded-lg hover:border-emerald/50 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-midnight group-hover:text-emerald transition-colors text-sm sm:text-base">
                          How to Apply for OAS
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate/60 group-hover:text-emerald transition-colors ml-2 flex-shrink-0" />
                    </Link>

                    <div className="flex items-center p-4 bg-white border-2 border-silver/20 rounded-lg sm:col-span-2">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-emerald mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-midnight text-sm sm:text-base">
                          Service Canada Contact
                        </div>
                        <div className="text-xs sm:text-sm text-midnight/70 mt-1">
                          1-800-622-6232
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Government Programs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="glass shadow-glow-hover border-emerald/20">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-heading text-midnight flex items-center">
                    <Globe className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-emerald flex-shrink-0" />
                    Government Programs
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-midnight/70 mt-2">
                    Explore registered savings plans and government programs available to Canadians
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Link
                      href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-white border-2 border-silver/20 rounded-lg hover:border-emerald/50 hover:shadow-md transition-all duration-200"
                    >
                      <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-emerald mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-midnight group-hover:text-emerald transition-colors text-sm sm:text-base">
                          Registered Education Savings Plan (RESP)
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate/60 group-hover:text-emerald transition-colors ml-2 flex-shrink-0" />
                    </Link>

                    <Link
                      href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan/participate-home-buyers-plan.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-white border-2 border-silver/20 rounded-lg hover:border-emerald/50 hover:shadow-md transition-all duration-200"
                    >
                      <Home className="h-4 w-4 sm:h-5 sm:w-5 text-emerald mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-midnight group-hover:text-emerald transition-colors text-sm sm:text-base">
                          Home Buyers Plan (HBP)
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate/60 group-hover:text-emerald transition-colors ml-2 flex-shrink-0" />
                    </Link>

                    <Link
                      href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/lifelong-learning-plan.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-white border-2 border-silver/20 rounded-lg hover:border-emerald/50 hover:shadow-md transition-all duration-200"
                    >
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-emerald mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-midnight group-hover:text-emerald transition-colors text-sm sm:text-base">
                          Lifelong Learning Plan (LLP)
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate/60 group-hover:text-emerald transition-colors ml-2 flex-shrink-0" />
                    </Link>

                    <Link
                      href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-disability-savings-plan-rdsp.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-white border-2 border-silver/20 rounded-lg hover:border-emerald/50 hover:shadow-md transition-all duration-200"
                    >
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-emerald mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-midnight group-hover:text-emerald transition-colors text-sm sm:text-base">
                          Registered Disability Savings Plan (RDSP)
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate/60 group-hover:text-emerald transition-colors ml-2 flex-shrink-0" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Will Planning Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glass shadow-glow-hover border-emerald/20">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-heading text-midnight flex items-center">
                    <FileText className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-emerald flex-shrink-0" />
                    Will Planning Checklist
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-midnight/70 mt-2">
                    There are many important decisions when drafting a Will. Here&apos;s a checklist of topics to help guide your thinking.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ul className="space-y-3 sm:space-y-4">
                    {willPlanningChecklist.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.02 }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald/20 flex items-center justify-center mt-0.5 mr-3">
                          <div className="w-2 h-2 rounded-full bg-emerald" />
                        </div>
                        <span className="text-sm sm:text-base text-midnight/80 leading-relaxed flex-1">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-6 sm:mt-8 pt-6 border-t border-silver/20">
                    <Button asChild className="!bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white">
                      <Link href="/why-you-need-a-will" className="!text-white">
                        Learn More About Why You Need a Will
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <Card className="glass shadow-glow-hover border-emerald/20 max-w-2xl mx-auto">
                <CardContent className="p-6 sm:p-8 md:pt-8 text-center">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-midnight mb-3 sm:mb-4">
                    Need Personalized Guidance?
                  </h3>
                  <p className="text-sm sm:text-base text-midnight/70 mb-4 sm:mb-6 max-w-xl mx-auto">
                    While these resources provide valuable information, personalized financial and estate planning requires understanding your unique situation. Schedule a consultation to discuss your specific needs.
                  </p>
                  <Button asChild size="lg" className="!bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white">
                    <Link href="/contact" className="!text-white">Schedule a Consultation</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}

