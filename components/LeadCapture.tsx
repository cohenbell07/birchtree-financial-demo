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
      <Card className="rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.09)] max-w-md mx-auto lg:max-w-none">
        <CardContent className="p-4 sm:p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
            <CheckCircle2 className="h-7 w-7 text-gold-dark" strokeWidth={1.6} />
          </div>
          <h3 className="text-lg sm:text-xl font-heading font-bold tracking-tight text-midnight mb-2">
            Thank You!
          </h3>
          <p className="text-sm sm:text-base text-midnight/65">
            Your results have been sent to your email.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.09)] max-w-md mx-auto lg:max-w-none">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl font-heading font-bold tracking-tight text-midnight flex items-center">
          <span className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
            <Mail className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
          </span>
          Get Your Results by Email
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-midnight/65 mt-2">
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
            className="w-full rounded-xl bg-midnight text-white font-semibold shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
          >
            {isSubmitting ? "Sending..." : "Send My Results by Email"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

