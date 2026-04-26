"use client"

import { motion } from "framer-motion"
import Link from "next/link"

import PageHeader from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionHeader } from "@/components/ui/section-header"
import { Reveal } from "@/components/ui/reveal"
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
      "Birchtree Financial offers comprehensive financial advisory and investment management services, including retirement planning, investment management, insurance strategies, tax optimization, wealth building advisory, and estate planning guidance. We also provide benefit packages for both group and individual plans, helping businesses and individuals secure comprehensive coverage that protects their financial future. We work with individuals, families, and business owners to create personalized financial strategies tailored to their unique needs.",
  },
  {
    question: "How do you charge for your services?",
    answer:
      "Birchtree Financial is compensated through the company with no fees charged directly to clients. This compensation structure ensures we can act in your best interest without conflicts of interest, as our compensation is not tied to specific product sales or commissions. This approach allows us to provide unbiased financial advice and recommendations that are truly in your best interest. All compensation details are transparently disclosed during our initial consultation.",
  },
  {
    question: "What is a fiduciary, and why does it matter?",
    answer:
      "A fiduciary is a legal and ethical obligation to act in your best interest at all times. As a registered investment advisor, Birchtree Financial is held to a fiduciary standard, meaning we must prioritize your financial well-being above all else. This differs from brokers who may only be required to recommend 'suitable' investments.",
  },
  {
    question:
      "Do I need a minimum amount of assets to work with Birchtree Financial?",
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
    question:
      "Can you help me with my employer's Group RRSP or other retirement accounts?",
    answer:
      "Yes, we can provide guidance on your employer-sponsored retirement accounts, including Group RRSPs, pension plans, and DPSPs (Deferred Profit Sharing Plans). While we may not directly manage these accounts, we can help you understand your options, optimize your contributions, and ensure these accounts align with your overall financial strategy. We also help coordinate with your RRSP and TFSA strategies.",
  },
  {
    question:
      "Do you work with other professionals like accountants and attorneys?",
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
      "Yes, Birchtree Financial is a registered financial advisory firm in Canada. Our team holds relevant licenses and professional qualifications, including the Life License Qualification Program (LLQP). We maintain strict compliance with all Canadian regulatory requirements and stay current with evolving financial regulations and industry best practices.",
  },
  {
    question: "What should I bring to my first meeting?",
    answer:
      "For your first consultation, it's helpful to bring a general overview of your financial situation, including your assets, liabilities, income, and expenses. You don't need detailed documentation initially — we'll guide you on what additional information we'll need as we develop your financial strategy.",
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
    <>
      <PageHeader
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about our services and processes."
      />

      <Section tone="paper" topRule>
        <Container size="narrow">
          <SectionHeader
            eyebrow="Your Questions Answered"
            heading="What people ask us most"
          />

          <Accordion
            type="single"
            collapsible
            className="mt-14 w-full space-y-3 sm:space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.2) }}
              >
                <div
                  className="rounded-xl bg-white"
                  style={{
                    border: "1px solid rgba(11,26,44,0.06)",
                    boxShadow:
                      "0 1px 2px rgba(11,26,44,0.04), 0 4px 12px rgba(11,26,44,0.03)",
                  }}
                >
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="px-5 py-4 hover:no-underline sm:px-6">
                      <span className="text-left font-heading text-base text-midnight sm:text-lg">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 sm:px-6">
                      <p className="text-[0.95rem] leading-relaxed text-midnight/70">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </motion.div>
            ))}
          </Accordion>
        </Container>
      </Section>

      <Section tone="dark-aurora" topRule grain>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow tone="dark" className="mb-6">
                Need More Help?
              </Eyebrow>
              <h2
                className="font-heading font-bold leading-[1.1] tracking-tight text-white text-balance"
                style={{ fontSize: "clamp(2rem, 1.5rem + 2.5vw, 3.4rem)" }}
              >
                Still have questions?
              </h2>
              <div
                aria-hidden
                className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              />
              <p className="mx-auto mt-8 max-w-xl leading-relaxed text-white/80"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                We&apos;re here to help. If you don&apos;t see the answer to
                your question here, please don&apos;t hesitate to reach out.
                Our team is always available to discuss your specific situation
                and answer any questions you may have.
              </p>
              <div className="mt-10">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl border-0 bg-gold px-9 py-6 text-sm font-semibold text-midnight shadow-[0_4px_20px_rgba(215,195,138,0.2)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_8px_40px_rgba(215,195,138,0.3)] sm:text-base [&>*]:text-midnight"
                >
                  <Link href="/contact" className="text-midnight">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
