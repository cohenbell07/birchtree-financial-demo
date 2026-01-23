"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, BookOpen, Calculator, FileText, Mail, Book, Globe, CheckCircle2, AlertCircle } from "lucide-react"


const resources = [
  {
    category: "Articles",
    items: [
      {
        title: "Understanding Retirement Planning Basics",
        description:
          "A comprehensive guide to getting started with retirement planning, covering key concepts and strategies.",
        type: "Article",
        readTime: "5 min read",
        href: "/resources/understanding-retirement-planning-basics",
      },
      {
        title: "Tax-Efficient Investment Strategies",
        description:
          "Learn how to minimize taxes on your investments while maximizing returns.",
        type: "Article",
        readTime: "7 min read",
        href: "/resources/tax-efficient-investment-strategies",
      },
      {
        title: "Estate Planning Essentials",
        description:
          "Important considerations for creating an effective estate plan that protects your legacy.",
        type: "Article",
        readTime: "6 min read",
        href: "/resources/estate-planning-essentials",
      },
    ],
  },
  {
    category: "Guides",
    items: [
      {
        title: "Financial Advisory Checklist",
        description:
          "A step-by-step guide to organizing your financial life and planning for the future.",
        type: "Guide",
        readTime: "10 min read",
        href: "/resources/financial-advisory-checklist",
      },
      {
        title: "Investment Portfolio Basics",
        description:
          "Understanding asset allocation, diversification, and building a solid investment portfolio.",
        type: "Guide",
        readTime: "12 min read",
        href: "/resources/investment-portfolio-basics",
      },
    ],
  },
  {
    category: "Tools",
    items: [
      {
        title: "Investment Risk Profiler",
        description:
          "Determine your risk tolerance and investment profile with our AI-powered assessment tool.",
        type: "Tool",
        href: "/tools/risk-profiler",
      },
      {
        title: "Retirement Calculator",
        description:
          "Calculate your retirement savings needs and project your financial future.",
        type: "Tool",
        href: "/tools/retirement-calculator",
      },
      {
        title: "TFSA vs RRSP Analyzer",
        description:
          "Compare tax benefits and determine which account is right for your situation.",
        type: "Tool",
        href: "/tools/tfsa-rrsp-analyzer",
      },
      {
        title: "RESP Planner",
        description:
          "Plan for your child's education with RESP savings and government grant calculations.",
        type: "Tool",
        href: "/tools/resp-planner",
      },
      {
        title: "Tax Optimization Calculator",
        description:
          "Maximize your tax savings with strategic RRSP and TFSA planning strategies.",
        type: "Tool",
        href: "/tools/tax-optimization-calculator",
      },
      {
        title: "CPP/OAS Timing Optimizer",
        description:
          "Determine the optimal age to start CPP and OAS benefits for maximum lifetime value.",
        type: "Tool",
        href: "/tools/cpp-oas-optimizer",
      },
      {
        title: "Net Worth & Debt Payoff Tracker",
        description:
          "Calculate your net worth and plan your debt payoff strategy.",
        type: "Tool",
        href: "/tools/net-worth-tracker",
      },
      {
        title: "Bank Loan Calculator",
        description:
          "Calculate monthly or biweekly loan payments and see total interest over the life of your loan.",
        type: "Tool",
        href: "/tools/bank-loan-calculator",
      },
      {
        title: "Savings Calculator",
        description:
          "Plan for short- or medium-term savings goals and see how your savings will grow over time.",
        type: "Tool",
        href: "/tools/savings-calculator",
      },
    ],
  },
]

export default function ResourcesPage() {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [newsletterMessage, setNewsletterMessage] = useState("")

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newsletterEmail.trim()) {
      setNewsletterStatus("error")
      setNewsletterMessage("Please enter a valid email address")
      return
    }

    setNewsletterStatus("loading")
    setNewsletterMessage("")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      })

      const data = await response.json()

      if (data.ok) {
        setNewsletterStatus("success")
        setNewsletterMessage(data.message || "Successfully subscribed!")
        setNewsletterEmail("")
      } else {
        setNewsletterStatus("error")
        if (data.reason === "invalid_email") {
          setNewsletterMessage("Please enter a valid email address")
        } else if (data.reason === "email_not_configured") {
          setNewsletterMessage("Newsletter subscription is temporarily unavailable. Please try again later.")
        } else {
          setNewsletterMessage(data.message || "Something went wrong. Please try again.")
        }
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error)
      setNewsletterStatus("error")
      setNewsletterMessage("Unable to subscribe. Please try again later.")
    }
  }

  return (
    <div>
      <PageHeader
        title="Resources"
        subtitle="Educational content, guides, and tools to empower your financial decisions"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">
            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="gradient-bg text-white shadow-glow border-emerald/30 max-w-md mx-auto md:max-w-none">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-heading text-white flex items-center">
                    <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0" />
                    Stay Informed
                  </CardTitle>
                  <CardDescription className="text-silver/90 text-xs sm:text-sm md:text-base mt-2">
                    Subscribe to our newsletter for monthly financial insights, market
                    updates, and exclusive resources.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  {newsletterStatus === "success" ? (
                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-white">{newsletterMessage}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Input
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="flex-1 bg-white/95 text-midnight text-sm sm:text-base border-white/20"
                          disabled={newsletterStatus === "loading"}
                          required
                        />
                        <Button 
                          type="submit" 
                          disabled={newsletterStatus === "loading"}
                          className="relative z-10 !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] transition-all duration-200 ease-out text-sm sm:text-base w-full sm:w-auto !text-white disabled:opacity-50"
                        >
                          {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                        </Button>
                      </div>
                      {newsletterStatus === "error" && newsletterMessage && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-red-200 flex-shrink-0" />
                          <p className="text-xs sm:text-sm text-red-100">{newsletterMessage}</p>
                        </div>
                      )}
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Helpful Tools Prominent Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto md:max-w-none">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-emerald mr-3" />
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-midnight">
                      Helpful Tools & Resources
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-midnight/70 mb-4 sm:mb-6">
                    Access government pension benefits information, registered savings plans, will planning checklists, and essential financial resources for Canadians.
                  </p>
                  <Button asChild size="lg" className="w-full sm:w-auto !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0">
                    <Link href="/helpful-tools" className="!text-white">
                      View Helpful Tools
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Resources by Category */}
            {resources.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-midnight mb-3 sm:mb-4 md:mb-6 px-2">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: categoryIndex * 0.1 + itemIndex * 0.1,
                      }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="h-full glass shadow-glow-hover border-emerald/20 max-w-md mx-auto md:max-w-none">
                        <CardHeader className="p-4 sm:p-6">
                          <div className="flex items-center justify-between mb-2">
                            {item.type === "Tool" && (
                              <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-emerald" />
                            )}
                            {item.type === "Article" && (
                              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-emerald" />
                            )}
                            {item.type === "Guide" && (
                              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-emerald" />
                            )}
                            {"readTime" in item && (
                              <span className="text-xs text-midnight/60">
                                {item.readTime}
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-sm sm:text-base md:text-lg font-heading text-midnight mb-2">
                            {item.title}
                          </CardTitle>
                          <CardDescription className="text-xs sm:text-sm text-midnight/70 leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          {"href" in item ? (
                            <Button asChild size="sm" className="relative z-10 w-full !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0 text-sm">
                              <Link href={item.href} className="!text-white">
                                {item.type === "Tool" ? "Use Tool" : "Read More"}
                                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                              </Link>
                            </Button>
                          ) : (
                            <Button size="sm" className="relative z-10 w-full !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0 text-sm">
                              Read More
                              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Blog Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 sm:mt-12"
            >
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-midnight mb-3 sm:mb-4 md:mb-6 px-2">
                Financial Insights Blog
              </h2>
              <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto md:max-w-none">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Book className="h-5 w-5 sm:h-6 sm:w-6 text-emerald mr-2" />
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-midnight">
                      Expert Financial Articles
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-midnight/70 mb-4 sm:mb-6">
                    Read our latest articles on RRSP strategies, tax optimization, retirement planning, and more.
                  </p>
                  <Button asChild size="lg" className="w-full sm:w-auto !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0">
                    <Link href="/blog" className="!text-white">
                      Visit Blog
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mt-6 sm:mt-8"
            >
              <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto md:max-w-none">
                <CardContent className="p-4 sm:p-6 md:pt-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-midnight mb-3 sm:mb-4 px-2">
                    Need Personalized Guidance?
                  </h3>
                  <p className="text-sm sm:text-base text-midnight/70 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
                    While our resources provide valuable information, personalized
                    financial advisory services require understanding your unique situation.
                    Schedule a consultation to discuss your specific needs.
                  </p>
                  <Button asChild size="lg" className="relative z-10 w-full sm:w-auto !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6">
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

