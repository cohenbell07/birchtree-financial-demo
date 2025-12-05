"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitStatus("success")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitStatus("idle"), 5000)
  }

  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch to discuss your financial goals and how we can help"
      />

      <section className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-teal" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass shadow-glow-hover border-emerald/20">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-heading text-midnight">
                      Send Us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="How can we help?"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us about your financial goals and how we can help..."
                          rows={6}
                        />
                      </div>

                      {submitStatus === "success" && (
                        <div className="p-4 bg-moss/10 text-forest rounded-md">
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
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <Card className="glass shadow-glow-hover border-emerald/20">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-heading text-midnight">
                      Get in Touch
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-emerald/20 to-teal/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-emerald" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-midnight mb-1">Phone</h3>
                        <p className="text-sm sm:text-base text-midnight/70">(416) 555-1234</p>
                        <p className="text-xs sm:text-sm text-midnight/60">Mon-Fri, 9am-5pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-emerald/20 to-teal/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-emerald" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-midnight mb-1">Email</h3>
                        <p className="text-xs sm:text-sm text-midnight/70 break-all">info@birchtreefinancial.ca</p>
                        <p className="text-xs sm:text-sm text-midnight/60">
                          We typically respond within 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-emerald/20 to-teal/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-emerald" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-midnight mb-1">Office</h3>
                        <p className="text-xs sm:text-sm text-midnight/70">
                          123 Bay Street, Suite 500
                          <br />
                          Toronto, ON M5J 2T3
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-bg text-white shadow-glow border-emerald/30">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-heading text-white">
                      Schedule a Consultation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-silver/90 mb-4 sm:mb-6">
                      Ready to take the next step? Schedule a complimentary
                      consultation to discuss your financial goals and discover
                      how we can help you achieve them.
                    </p>
                    <Button asChild variant="champagne" size="lg" className="w-full">
                      <a href="#form">Book Consultation</a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-slate-light flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-slate" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

