"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import RevealText from "@/components/RevealText"
import FAQSection from "@/components/FAQSection"

const contactFaqs = [
  {
    question: "How do I get started?",
    answer: "Getting started is easy. Simply schedule a complimentary consultation through our contact form above or call us directly. During this initial meeting, we'll discuss your financial goals, answer your questions, and determine if we're a good fit for each other. There's no obligation, and we'll provide value even in this first conversation.",
  },
  {
    question: "What should I bring to my first meeting?",
    answer: "For your first consultation, it's helpful to bring a general overview of your financial situation, including your assets, liabilities, income, and expenses. You don't need detailed documentation initially\u2014we'll guide you on what additional information we'll need as we develop your financial strategy.",
  },
  {
    question: "How often will I meet with my financial advisor?",
    answer: "The frequency of meetings depends on your needs and the complexity of your financial situation. Typically, we meet quarterly or semi-annually for portfolio reviews and planning updates. However, we're available whenever you have questions or need to discuss changes in your life circumstances. We also provide ongoing communication through email and phone calls.",
  },
  {
    question: "Do you work with other professionals like accountants and attorneys?",
    answer: "Absolutely. We believe in a team approach to financial advisory services and regularly coordinate with our clients' accountants, attorneys, insurance agents, and other professionals. This ensures all aspects of your financial life work together cohesively.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const inputStyles = "bg-white border-midnight/10 focus:border-gold/50 focus:ring-gold/20"

  return (
    <div>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Get in touch to discuss your financial goals and how we can help"
        accent="amber"
      />

      <Section tone="paper" topRule>
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-md mx-auto lg:max-w-none h-full rounded-xl overflow-hidden bg-white border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)]">
                  <Card className="border-0 shadow-none bg-transparent h-full">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-midnight">
                        Send Us a Message
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <form onSubmit={handleSubmit} id="form" className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-midnight/50">Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Your name"
                              className={inputStyles}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-midnight/50">Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="your.email@example.com"
                              className={inputStyles}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-midnight/50">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(403) 556-7777"
                            className={inputStyles}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-midnight/50">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="How can we help?"
                            className={inputStyles}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-midnight/50">Message *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Tell us about your financial goals and how we can help..."
                            rows={6}
                            className={inputStyles}
                          />
                        </div>

                        {submitStatus === "success" && (
                          <div className="p-4 bg-green-50 text-green-800 rounded-lg border border-green-200/50">
                            Thank you for your message! We&apos;ll get back to you soon.
                          </div>
                        )}

                        {submitStatus === "error" && (
                          <div className="p-4 bg-red-100 text-red-800 rounded-md">
                            Something went wrong. Please try again.
                          </div>
                        )}

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="max-w-md mx-auto lg:max-w-none rounded-xl overflow-hidden bg-white border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)]">
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-midnight">
                        Get in Touch
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(11,26,44,0.06) 0%, rgba(215,195,138,0.1) 100%)' }}>
                          <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-gold/70" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-midnight mb-1">Phone</h3>
                          <p className="text-sm sm:text-base text-midnight/50">(403) 556-7777</p>
                          <p className="text-xs sm:text-sm text-midnight/50">Mon-Fri, 9am-5pm MST</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(11,26,44,0.06) 0%, rgba(215,195,138,0.1) 100%)' }}>
                          <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-gold/70" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-midnight mb-1">Email</h3>
                          <p className="text-xs sm:text-sm text-midnight/50 break-all">melissa.birch@birchtreefinancial.ca</p>
                          <p className="text-xs sm:text-sm text-midnight/50">
                            We typically respond within 24 hours
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(11,26,44,0.06) 0%, rgba(215,195,138,0.1) 100%)' }}>
                          <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-gold/70" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-midnight mb-1">Office</h3>
                          <p className="text-xs sm:text-sm text-midnight/50">
                            4914 50 Ave
                            <br />
                            Olds, AB T4H 1P5
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="max-w-md mx-auto lg:max-w-none rounded-xl overflow-hidden border border-gold/15" style={{ background: 'linear-gradient(145deg, #0d1f33 0%, #0B1A2C 50%, #091525 100%)' }}>
                  <Card className="border-0 shadow-none bg-transparent text-white">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-white">
                        Schedule a Consultation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <p className="text-xs sm:text-sm md:text-base text-silver/90 mb-3 sm:mb-4 md:mb-6">
                        Ready to take the next step? Schedule a complimentary
                        consultation to discuss your financial goals and discover
                        how we can help you achieve them.
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="w-full text-sm sm:text-base"
                      >
                        <a href="#calendar">Book Consultation</a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
          </div>
        </Container>
      </Section>

      {/* ======== FAQ Section ======== */}
      <FAQSection
        eyebrow="Before You Reach Out"
        heading="What to Expect"
        faqs={contactFaqs}
      />

      <Section id="calendar" tone="dark" topRule grain>
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <Eyebrow tone="dark" className="mb-5">
                Pick a Time
              </Eyebrow>
              <RevealText
                as="h2"
                className="font-heading font-bold leading-[1.1] tracking-tight text-white text-balance"
              >
                Schedule a Consultation
              </RevealText>
              <div className="mx-auto mt-7 mb-7 flex items-center justify-center gap-3">
                <div aria-hidden className="h-px w-12 bg-gold/35" />
                <div aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold/65" />
                <div aria-hidden className="h-px w-12 bg-gold/35" />
              </div>
              <p
                className="mx-auto max-w-2xl leading-relaxed text-white/80"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                Choose a convenient date and time for your consultation. We
                offer Zoom calls, phone consultations, and in-person meetings.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/20">
              <div className="relative w-full overflow-x-auto bg-white">
                <iframe
                  src="https://cal.com/birchtreefinancial"
                  className="w-full rounded-lg border-0 bg-white"
                  style={{
                    height: isMobile ? "700px" : "800px",
                    minHeight: isMobile ? "600px" : "700px",
                    backgroundColor: "white",
                    width: "100%",
                  }}
                  title="Book a consultation with Birchtree Financial"
                  allow="camera; microphone; geolocation"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
