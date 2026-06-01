"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import SpotlightCard from "@/components/SpotlightCard"
import RevealText from "@/components/RevealText"
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
      {/* ============================================
          HERO — Stacked Stat Bar
          ============================================ */}
      <section
        className="relative pt-28 sm:pt-36 md:pt-40 lg:pt-48 pb-16 sm:pb-24 md:pb-28 lg:pb-36 overflow-hidden bg-[#FBFAF6]"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)" }}
        />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-midnight/10 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold mb-5 sm:mb-7"
          >
            <span className="inline-block w-2 h-px bg-gold-dark/50 mr-3 align-middle" />
            Learn & Plan
          </motion.p>
          <RevealText
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.04] tracking-tight text-midnight mb-0 max-w-3xl"
          >
            Resources
          </RevealText>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="origin-left mt-6 sm:mt-8 mb-5 sm:mb-7"
          >
            <div className="h-px w-20 sm:w-24" style={{ background: "linear-gradient(to right, rgba(215,195,138,0.85), transparent)" }} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-midnight/65 max-w-2xl leading-relaxed font-body mb-10 sm:mb-14"
          >
            Educational content, guides, and tools to empower your financial decisions
          </motion.p>

          {/* Stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-8 sm:gap-12"
          >
            {[
              { number: "9", label: "Interactive Tools" },
              { number: "50+", label: "Articles & Guides" },
              { number: "6", label: "Core Services" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                className="border-l-2 border-gold-dark/30 pl-4 sm:pl-5"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gold-dark block">
                  {stat.number}
                </span>
                <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.15em] text-midnight/55 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================
          Helpful Tools & Newsletter — Light section
          ============================================ */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 bg-[#F7F5EF] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto space-y-10 sm:space-y-14 md:space-y-20">

            {/* Newsletter Signup - HIDDEN (ready to re-enable when needed) */}
            {false && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SpotlightCard dark>
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0 text-gold" />
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-heading text-white font-bold">
                        Stay Informed
                      </h3>
                    </div>
                    <p className="text-silver/90 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
                      Subscribe to our newsletter for monthly financial insights, market
                      updates, and exclusive resources.
                    </p>
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
                            className="text-sm sm:text-base w-full sm:w-auto"
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
                  </div>
                </SpotlightCard>
              </motion.div>
            )}

            {/* Helpful Tools Prominent Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SpotlightCard>
                <div className="p-5 sm:p-7 md:p-8">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05] mr-3">
                      <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-gold-dark" strokeWidth={1.6} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-midnight">
                      Helpful Tools & Resources
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-midnight/65 mb-5 sm:mb-7">
                    Access government pension benefits information, registered savings plans, will planning checklists, and essential financial resources for Canadians.
                  </p>
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/helpful-tools">
                      View Helpful Tools
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Tools Section */}
            {resources
              .filter((category) => category.category === "Tools")
              .map((category) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold-dark font-medium mb-3 sm:mb-4 px-2">
                    {category.category}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {category.items.map((item, itemIndex) => {
                      const IconComp = item.type === "Tool" ? Calculator : item.type === "Guide" ? BookOpen : FileText
                      return (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: itemIndex * 0.07 }}
                          className="h-full"
                        >
                          {"href" in item ? (
                            <Link href={item.href} className="block h-full group">
                              <ResourceCard item={item} IconComp={IconComp} />
                            </Link>
                          ) : (
                            <div className="h-full group">
                              <ResourceCard item={item} IconComp={IconComp} />
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}

            {/* Articles & Guides */}
            {resources
              .filter((category) => category.category !== "Tools")
              .map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold-dark font-medium mb-3 sm:mb-4 px-2">
                  {category.category}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {category.items.map((item, itemIndex) => {
                    const IconComp = item.type === "Tool" ? Calculator : item.type === "Guide" ? BookOpen : FileText
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.07 }}
                        className="h-full"
                      >
                        {"href" in item ? (
                          <Link href={item.href} className="block h-full group">
                            <ResourceCard item={item} IconComp={IconComp} />
                          </Link>
                        ) : (
                          <div className="h-full group">
                            <ResourceCard item={item} IconComp={IconComp} />
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}

            {/* Blog Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold-dark font-medium mb-3 sm:mb-4 px-2">
                Blog
              </p>
              <SpotlightCard>
                <div className="p-5 sm:p-7 md:p-8">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05] mr-3">
                      <Book className="h-5 w-5 sm:h-6 sm:w-6 text-gold-dark" strokeWidth={1.6} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-midnight">
                      Expert Financial Articles
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-midnight/65 mb-5 sm:mb-7">
                    Read our latest articles on RRSP strategies, tax optimization, retirement planning, and more.
                  </p>
                  <Link href="/blog" className="link-draw text-sm font-medium text-midnight/70 inline-flex items-center">
                    Visit Blog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA — Dark aurora section
          ============================================ */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(48% 45% at 50% 40%, rgba(215,195,138,0.08) 0%, transparent 60%)"
        }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-midnight/10 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold-dark font-medium mb-5 sm:mb-7">
              Get Started
            </p>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5 sm:mb-7 tracking-tight text-midnight px-2">
              Need Personalized Guidance?
            </RevealText>
            <div className="flex justify-center mb-8 sm:mb-10">
              <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, rgba(215,195,138,0.85), transparent)" }} />
            </div>
            <p className="text-base sm:text-lg text-midnight/65 mb-10 sm:mb-14 max-w-xl mx-auto leading-relaxed font-body px-4">
              While our resources provide valuable information, personalized
              financial advisory services require understanding your unique situation.
              Schedule a consultation to discuss your specific needs.
            </p>
            <Button
              asChild
              size="lg"
              className="relative z-10 w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-midnight hover:bg-midnight-light text-white font-semibold border-0 shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:scale-[1.02] rounded-xl [&>*]:text-white"
            >
              <Link href="/contact" className="text-white">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function ResourceCard({ item, IconComp }: { item: any; IconComp: any }) {
  return (
    <div
      className="h-full flex flex-col rounded-2xl overflow-hidden border border-midnight/10 bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-midnight/15 group-hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]"
    >
      {/* Top icon zone */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-center justify-between bg-[#F7F5EF]">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
          <IconComp className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
        </div>
        <span className={`text-[0.6rem] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 rounded-full ${
          item.type === "Tool"
            ? "text-gold-dark bg-gold/10"
            : "text-midnight/55 bg-midnight/[0.04]"
        }`}>
          {item.type}
        </span>
      </div>

      {/* Content */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 flex flex-col flex-1">
        <h4 className="text-sm sm:text-base md:text-lg font-heading font-bold text-midnight mb-2">
          {item.title}
        </h4>
        <p className="text-xs sm:text-sm text-midnight/55 leading-relaxed mb-5 flex-grow">
          {item.description}
        </p>

        {/* Bottom action strip */}
        <div className="pt-3 border-t border-midnight/10 flex justify-end">
          <span className="text-sm font-medium text-midnight/55 group-hover:text-midnight inline-flex items-center transition-colors duration-200">
            {item.type === "Tool" ? "Use Tool" : "Read More"}
            <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </div>
      </div>
    </div>
  )
}
