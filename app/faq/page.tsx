"use client"

import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What services does Birchtree Financial provide?",
    answer:
      "Birchtree Financial offers comprehensive financial advisory and investment management services, including retirement planning, investment management, insurance strategies, tax optimization, wealth building advisory, and estate planning guidance. We work with individuals, families, and business owners to create personalized financial strategies.",
  },
  {
    question: "How do you charge for your services?",
    answer:
      "We operate on a fee-only basis, which means we are compensated solely through client fees, not through commissions or product sales. This structure ensures we act in your best interest without conflicts of interest. Our fee structure varies based on the services provided and is transparently disclosed during our initial consultation.",
  },
  {
    question: "What is a fiduciary, and why does it matter?",
    answer:
      "A fiduciary is a legal and ethical obligation to act in your best interest at all times. As a registered investment advisor, Birchtree Financial is held to a fiduciary standard, meaning we must prioritize your financial well-being above all else. This differs from brokers who may only be required to recommend 'suitable' investments.",
  },
  {
    question: "Do I need a minimum amount of assets to work with Birchtree Financial?",
    answer:
      "We work with clients across a range of asset levels and life stages. While we do have minimum requirements for certain services, we offer solutions for individuals just starting their financial journey as well as those with substantial wealth. Contact us to discuss whether our services are a good fit for your situation.",
  },
  {
    question: "How often will I meet with my financial advisor?",
    answer:
      "The frequency of meetings depends on your needs and the complexity of your financial situation. Typically, we meet quarterly or semi-annually for portfolio reviews and planning updates. However, we're available whenever you have questions or need to discuss changes in your life circumstances. We also provide ongoing communication through email and phone calls.",
  },
  {
    question: "What is your investment philosophy?",
    answer:
      "We believe in a disciplined, evidence-based approach to investing. Our philosophy emphasizes diversification, long-term thinking, risk management, and cost efficiency. We focus on building well-balanced portfolios that align with your risk tolerance and financial goals, using a combination of strategic asset allocation and regular rebalancing.",
  },
  {
    question: "Can you help me with my employer's Group RRSP or other retirement accounts?",
    answer:
      "Yes, we can provide guidance on your employer-sponsored retirement accounts, including Group RRSPs, pension plans, and DPSPs (Deferred Profit Sharing Plans). While we may not directly manage these accounts, we can help you understand your options, optimize your contributions, and ensure these accounts align with your overall financial strategy. We also help coordinate with your RRSP and TFSA strategies.",
  },
  {
    question: "Do you work with other professionals like accountants and attorneys?",
    answer:
      "Absolutely. We believe in a team approach to financial advisory services and regularly coordinate with our clients' accountants, attorneys, insurance agents, and other professionals. This ensures all aspects of your financial life work together cohesively.",
  },
  {
    question: "What makes Birchtree Financial different from other advisors?",
    answer:
      "We combine deep expertise with a personalized, client-first approach. As a fee-only fiduciary, we eliminate conflicts of interest. We take time to truly understand your goals, values, and concerns, creating customized strategies rather than one-size-fits-all solutions. Our team's experience and commitment to ongoing education ensure you receive the best possible guidance.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy. Simply schedule a complimentary consultation through our contact page. During this initial meeting, we'll discuss your financial goals, answer your questions, and determine if we're a good fit for each other. There's no obligation, and we'll provide value even in this first conversation.",
  },
  {
    question: "Are you registered with any regulatory bodies?",
    answer:
      "Yes, Birchtree Financial is a registered investment advisor in Canada, regulated by provincial securities commissions and member of IIROC (Investment Industry Regulatory Organization of Canada). Our team holds relevant licenses and professional certifications, including CFP®, CFA, and professional designations where applicable. We maintain strict compliance with all Canadian regulatory requirements.",
  },
  {
    question: "What should I bring to my first meeting?",
    answer:
      "For your first consultation, it's helpful to bring a general overview of your financial situation, including your assets, liabilities, income, and expenses. You don't need detailed documentation initially—we'll guide you on what additional information we'll need as we develop your financial strategy.",
  },
  {
    question: "Do you provide tax advice?",
    answer:
      "While we provide tax planning strategies and work closely with tax professionals, we do not provide specific tax preparation or detailed tax advice. We focus on tax-efficient investment and planning strategies, and we recommend coordinating with a qualified Canadian tax professional or accountant for specific tax matters.",
  },
  {
    question: "What happens to my accounts if something happens to my advisor?",
    answer:
      "Your accounts and financial plan are documented and stored securely, and our team-based approach ensures continuity of service. In the unlikely event your primary advisor is unavailable, another qualified team member will step in to ensure seamless service. Your accounts remain in your name and control at all times.",
  },
]

export default function FAQPage() {
  return (
    <div>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about our services and processes"
      />

      <section className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-teal" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="glass shadow-glow-hover border-emerald/20">
                      <AccordionItem value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:no-underline">
                          <CardTitle className="text-left text-base sm:text-lg font-heading text-midnight">
                            {faq.question}
                          </CardTitle>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4">
                          <p className="text-sm sm:text-base text-midnight/80 leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-12"
            >
              <Card className="gradient-bg text-white shadow-glow border-emerald/30">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-heading text-white">
                    Still Have Questions?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base sm:text-lg text-silver/90 mb-4 sm:mb-6">
                    We&apos;re here to help. If you don&apos;t see the answer to your question
                    here, please don&apos;t hesitate to reach out. Our team is always
                    available to discuss your specific situation and answer any
                    questions you may have.
                  </p>
                  <Button asChild size="lg" className="relative z-10 !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white">
                    <Link href="/contact" className="!text-white">Contact Us</Link>
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

