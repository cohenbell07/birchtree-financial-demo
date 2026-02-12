"use client"

import { useState, useEffect } from "react"
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

  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch to discuss your financial goals and how we can help"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-midnight">
                      Send Us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleSubmit} id="form" className="space-y-4 sm:space-y-6">
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
                          placeholder="(403) 556-7777"
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
                        <div className="p-4 bg-emerald/10 text-emerald-dark rounded-md">
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
                        className="relative z-10 w-full !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(11,26,44,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white"
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
                <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-midnight">
                      Get in Touch
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-emerald/20 to-emerald/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-emerald" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-midnight mb-1">Phone</h3>
                        <p className="text-sm sm:text-base text-midnight/70">(403) 556-7777</p>
                        <p className="text-xs sm:text-sm text-midnight/60">Mon-Fri, 9am-5pm MST</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-emerald/20 to-emerald/20 flex items-center justify-center flex-shrink-0">
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
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-emerald/20 to-emerald/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-emerald" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-midnight mb-1">Office</h3>
                        <p className="text-xs sm:text-sm text-midnight/70">
                          4914 50 Ave
                          <br />
                          Olds, AB T4H 1P5
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-bg text-white shadow-lg border-emerald/30 max-w-md mx-auto lg:max-w-none">
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
                      className="relative z-10 w-full !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(11,26,44,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white text-sm sm:text-base"
                    >
                      <a href="#calendar" className="!text-white">Book Consultation</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Calendar Booking Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              id="calendar"
              className="max-w-4xl mx-auto px-2 sm:px-4"
            >
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-midnight mb-2 px-2">
                  Schedule a Consultation
                </h2>
                <p className="text-sm sm:text-base text-midnight/70 px-4 mb-4">
                  Choose a convenient date and time for your consultation. We offer Zoom calls, phone consultations, and in-person meetings.
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
                  <div className="flex items-center text-xs sm:text-sm text-midnight/70 bg-white/50 px-3 py-1.5 rounded-md border border-emerald/20">
                    <span className="mr-2">📅</span>
                    <span>Select Date</span>
                    <span className="ml-2">→</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-midnight/70 bg-white/50 px-3 py-1.5 rounded-md border border-emerald/20">
                    <span className="mr-2">⏰</span>
                    <span>Choose Time</span>
                    <span className="ml-2">→</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-midnight/70 bg-white/50 px-3 py-1.5 rounded-md border border-emerald/20">
                    <span className="mr-2">✅</span>
                    <span>Confirm</span>
                  </div>
                </div>
              </div>
              <Card className="glass shadow-glow-hover border-emerald/20 overflow-hidden bg-white">
                <CardContent className="p-0 bg-white">
                  <div className="relative w-full bg-white overflow-x-auto">
                    <iframe
                      src="https://cal.com/birchtreefinancial"
                      className="w-full border-0 rounded-lg bg-white"
                      style={{ 
                        height: isMobile ? "700px" : "800px", 
                        minHeight: isMobile ? "600px" : "700px",
                        backgroundColor: "white",
                        width: "100%"
                      }}
                      title="Book a consultation with Birchtree Financial"
                      allow="camera; microphone; geolocation"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
