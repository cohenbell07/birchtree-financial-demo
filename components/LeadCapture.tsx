"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, CheckCircle2 } from "lucide-react"

interface LeadCaptureProps {
  source: string
  toolData: any
  onSuccess?: () => void
}

export default function LeadCapture({ source, toolData, onSuccess }: LeadCaptureProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      const response = await fetch("/api/leads/create-from-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          source,
          tool_data: toolData,
        }),
      })

      const data = await response.json()

      if (data.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "" })
        if (onSuccess) {
          onSuccess()
        }
      } else {
        setSubmitStatus("error")
        if (data.reason === "email_not_configured" || data.reason === "server_error") {
          setErrorMessage("Email sending is temporarily unavailable. Please try again later or contact us directly.")
        } else {
          setErrorMessage("Something went wrong. Please try again.")
        }
      }
    } catch (error) {
      console.error("Lead capture error:", error)
      setSubmitStatus("error")
      setErrorMessage("Unable to submit. Please try again later or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
        <CardContent className="p-4 sm:p-6 text-center">
          <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-emerald mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-heading font-bold text-midnight mb-2">
            Thank You!
          </h3>
          <p className="text-sm sm:text-base text-midnight/70">
            Your results have been sent to your email.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl font-heading text-midnight flex items-center">
          <Mail className="mr-2 h-5 w-5 text-emerald" />
          Get Your Results by Email
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-midnight/70 mt-2">
          Receive your detailed results and a comprehensive report delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lead-name">Name *</Label>
            <Input
              id="lead-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead-email">Email *</Label>
            <Input
              id="lead-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="text-sm sm:text-base"
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
            className="w-full relative z-10 !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(27,42,61,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0"
          >
            {isSubmitting ? "Sending..." : "Send My Results by Email"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

