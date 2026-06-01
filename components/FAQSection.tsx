"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"

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
    <Section tone="paper" topRule>
      <Container size="narrow">
        <SectionHeader eyebrow={eyebrow} heading={heading} rule tone="light" />

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
              transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
            >
              <div
                className="rounded-2xl border border-midnight/10 bg-white transition-all duration-300 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(11,26,44,0.04), 0 4px 12px rgba(11,26,44,0.03)",
                }}
              >
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline sm:px-6 [&>svg]:text-gold-dark">
                    <span className="text-left font-heading text-base font-bold tracking-tight text-midnight sm:text-lg">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 sm:px-6">
                    <p className="text-[0.95rem] leading-relaxed text-midnight/65">
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
  )
}
