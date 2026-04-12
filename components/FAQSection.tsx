"use client"

import { motion } from "framer-motion"
import RevealText from "@/components/RevealText"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  eyebrow: string
  heading: string
  faqs: FAQ[]
}

export default function FAQSection({ eyebrow, heading, faqs }: FAQSectionProps) {
  return (
    <section
      className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden grain-overlay"
      style={{
        background: "linear-gradient(160deg, #f8f7f4 0%, #f5f4f0 40%, #f2f1ed 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-4">
              {eyebrow}
            </p>
            <RevealText
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight"
            >
              {heading}
            </RevealText>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full space-y-3 sm:space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="rounded-xl bg-white border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)]">
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-none"
                  >
                    <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:no-underline">
                      <span className="text-left text-base sm:text-lg font-heading text-midnight">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4">
                      <p className="text-sm sm:text-base text-midnight/50 leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
