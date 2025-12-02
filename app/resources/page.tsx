"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, BookOpen, Calculator, FileText, Mail } from "lucide-react"


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
      },
      {
        title: "Tax-Efficient Investment Strategies",
        description:
          "Learn how to minimize taxes on your investments while maximizing returns.",
        type: "Article",
        readTime: "7 min read",
      },
      {
        title: "Estate Planning Essentials",
        description:
          "Important considerations for creating an effective estate plan that protects your legacy.",
        type: "Article",
        readTime: "6 min read",
      },
    ],
  },
  {
    category: "Guides",
    items: [
      {
        title: "Financial Planning Checklist",
        description:
          "A step-by-step guide to organizing your financial life and planning for the future.",
        type: "Guide",
        readTime: "10 min read",
      },
      {
        title: "Investment Portfolio Basics",
        description:
          "Understanding asset allocation, diversification, and building a solid investment portfolio.",
        type: "Guide",
        readTime: "12 min read",
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
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div>
      <PageHeader
        title="Resources"
        subtitle="Educational content, guides, and tools to empower your financial decisions"
      />

      <section className="py-12 sm:py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-forest text-white">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-white flex items-center">
                    <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    Stay Informed
                  </CardTitle>
                  <CardDescription className="text-cream text-xs sm:text-sm md:text-base">
                    Subscribe to our newsletter for monthly financial insights, market
                    updates, and exclusive resources.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 bg-white text-slate text-sm sm:text-base"
                    />
                    <Button type="submit" variant="champagne" className="text-slate text-sm sm:text-base w-full sm:w-auto">
                      Subscribe
                    </Button>
                  </form>
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
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-forest mb-4 sm:mb-6">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            {item.type === "Tool" && (
                              <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-moss" />
                            )}
                            {item.type === "Article" && (
                              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-moss" />
                            )}
                            {item.type === "Guide" && (
                              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-moss" />
                            )}
                            {"readTime" in item && (
                              <span className="text-xs text-slate">
                                {item.readTime}
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-base sm:text-lg font-heading">
                            {item.title}
                          </CardTitle>
                          <CardDescription className="text-xs sm:text-sm text-slate">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {"href" in item ? (
                            <Button asChild variant="outline" size="sm" className="w-full">
                              <Link href={item.href}>
                                Use Tool
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" className="w-full">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Additional CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Card className="glass">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-2xl font-heading font-bold text-forest mb-4">
                    Need Personalized Guidance?
                  </h3>
                  <p className="text-slate mb-6 max-w-2xl mx-auto">
                    While our resources provide valuable information, personalized
                    financial planning requires understanding your unique situation.
                    Schedule a consultation to discuss your specific needs.
                  </p>
                  <Button asChild size="lg">
                    <Link href="/contact">Schedule a Consultation</Link>
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

