"use client"

import { useState } from "react"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, CheckCircle2 } from "lucide-react"

export default function ReferralPage() {
  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    friendEmail: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/referrals/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.ok) {
        setSubmitStatus("success")
        setFormData({ yourName: "", yourEmail: "", friendEmail: "" })
      } else {
        setSubmitStatus("error")
        setErrorMessage(data.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Referral submission error:", error)
      setSubmitStatus("error")
      setErrorMessage("Unable to submit. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Refer a Friend"
        subtitle="Share Birchtree Financial with someone you care about"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            {submitStatus === "success" ? (
              <Card className="glass shadow-glow-hover border-emerald/20">
                <CardContent className="p-6 sm:p-8 text-center">
                  <CheckCircle2 className="h-16 w-16 text-emerald mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-midnight mb-2">
                    Thank You!
                  </h3>
                  <p className="text-base text-midnight/70">
                    Your referral has been sent. We&apos;ll reach out to your friend with information about Birchtree Financial.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass shadow-glow-hover border-emerald/20">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center mb-2">
                    <Users className="h-6 w-6 text-emerald mr-2" />
                    <CardTitle className="text-xl sm:text-2xl font-heading text-midnight">
                      Refer a Friend
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base text-midnight/70">
                    Know someone who could benefit from professional financial advisory services? Refer them to Birchtree Financial.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="yourName">Your Name *</Label>
                      <Input
                        id="yourName"
                        name="yourName"
                        type="text"
                        value={formData.yourName}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yourEmail">Your Email *</Label>
                      <Input
                        id="yourEmail"
                        name="yourEmail"
                        type="email"
                        value={formData.yourEmail}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="friendEmail">Friend&apos;s Email *</Label>
                      <Input
                        id="friendEmail"
                        name="friendEmail"
                        type="email"
                        value={formData.friendEmail}
                        onChange={handleChange}
                        required
                        placeholder="friend.email@example.com"
                      />
                    </div>

                    {submitStatus === "error" && errorMessage && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
                        {errorMessage}
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full relative z-10 bg-gradient-to-r from-emerald to-emerald-light hover:shadow-glow text-white"
                    >
                      {isSubmitting ? "Sending..." : "Send Referral"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

