"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Calculator } from "lucide-react"
import LeadCapture from "@/components/LeadCapture"

const provinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
  "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"
]

export default function TFSAvsRRSPAnalyzerPage() {
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    province: "",
  })
  const [result, setResult] = useState<{
    tfsaBenefit: number
    rrspBenefit: number
    recommendation: string
    summary: string
    comparison: {
      taxBenefit: { tfsa: string; rrsp: string }
      flexibility: { tfsa: string; rrsp: string }
      savingsOutcome: { tfsa: number; rrsp: number }
    }
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateComparison = () => {
    const age = parseInt(formData.age) || 30
    const income = parseFloat(formData.income) || 50000
    const contribution = 5000 // Example annual contribution

    // Simplified tax calculation (federal + provincial average)
    const taxRate = income < 50000 ? 0.20 : income < 100000 ? 0.30 : 0.40

    // RRSP: Tax deduction now, taxed on withdrawal
    const rrspTaxSavings = contribution * taxRate
    const rrspGrowth = contribution * 1.07 * 30 // 7% annual return, 30 years
    const rrspWithdrawalTax = rrspGrowth * 0.25 // Assumed lower tax in retirement
    const rrspNet = rrspGrowth - rrspWithdrawalTax + rrspTaxSavings

    // TFSA: No deduction, but tax-free growth
    const tfsaGrowth = contribution * 1.07 * 30
    const tfsaNet = tfsaGrowth

    const recommendation = age < 35 && income < 80000 ? "TFSA" : "RRSP"
    const recommendationReason = age < 35 && income < 80000
      ? "TFSA offers more flexibility for younger earners and those in lower tax brackets."
      : "RRSP provides immediate tax savings that can be reinvested, especially beneficial for higher earners."

    return {
      tfsaBenefit: tfsaNet,
      rrspBenefit: rrspNet,
      recommendation,
      summary: `Based on your age (${age}) and income ($${income.toLocaleString()}), ${recommendation} is likely more optimal. ${recommendationReason}`,
      comparison: {
        taxBenefit: {
          tfsa: "No immediate tax deduction, but withdrawals are tax-free",
          rrsp: `Immediate tax savings of $${rrspTaxSavings.toLocaleString()} per $${contribution.toLocaleString()} contribution`,
        },
        flexibility: {
          tfsa: "Contributions can be withdrawn anytime without tax consequences",
          rrsp: "Withdrawals are taxed as income and reduce contribution room permanently",
        },
        savingsOutcome: {
          tfsa: tfsaNet,
          rrsp: rrspNet,
        },
      },
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Track tool usage
    try {
      await fetch("/api/events/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "tool_used",
          meta: { tool: "tfsa-rrsp-analyzer" },
        }),
      })
    } catch (error) {
      console.warn("Event tracking failed:", error)
    }

    const calculation = calculateComparison()

    // Get AI summary
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `User profile: Age ${formData.age}, Income $${formData.income}, Province ${formData.province}. Analysis shows ${calculation.recommendation} is recommended. Provide a 2-3 sentence educational explanation of TFSA vs RRSP for this Canadian taxpayer.`,
          type: "tfsa-rrsp-analysis",
        }),
      })

      const data = await response.json()
      if (data.content) {
        calculation.summary = data.content
      }
    } catch (error) {
      console.warn("AI summary generation failed, using default")
    }

    setResult(calculation)
    setIsLoading(false)
  }

  return (
    <div>
      <PageHeader
        title="TFSA vs RRSP Analyzer"
        subtitle="Compare tax benefits and determine which account is right for you"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-teal" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-midnight flex items-center">
                      <Calculator className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-emerald flex-shrink-0" />
                      Your Profile
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-midnight/70 mt-2">
                      Enter your information to compare TFSA and RRSP benefits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          required
                          min="18"
                          max="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="income">Annual Income</Label>
                        <Input
                          id="income"
                          type="number"
                          value={formData.income}
                          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                          required
                          min="0"
                          step="1000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="province">Province</Label>
                        <Select
                          value={formData.province}
                          onValueChange={(value) => setFormData({ ...formData, province: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select province" />
                          </SelectTrigger>
                          <SelectContent>
                            {provinces.map((prov) => (
                              <SelectItem key={prov} value={prov}>
                                {prov}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full relative z-10 !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0"
                        disabled={isLoading}
                      >
                        {isLoading ? "Analyzing..." : "Compare TFSA vs RRSP"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {result ? (
                  <div className="space-y-4 sm:space-y-6">
                    <Card className="gradient-bg text-white shadow-glow border-emerald/30 max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-white flex items-center">
                          <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0" />
                          Recommendation: {result.recommendation}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <p className="text-xs sm:text-sm md:text-base text-silver/90 leading-relaxed">
                          {result.summary}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight">
                          Comparison
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                        <div>
                          <h4 className="font-semibold text-midnight mb-2">Tax Benefit</h4>
                          <div className="space-y-2 text-sm">
                            <p><strong>TFSA:</strong> {result.comparison.taxBenefit.tfsa}</p>
                            <p><strong>RRSP:</strong> {result.comparison.taxBenefit.rrsp}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-midnight mb-2">Flexibility</h4>
                          <div className="space-y-2 text-sm">
                            <p><strong>TFSA:</strong> {result.comparison.flexibility.tfsa}</p>
                            <p><strong>RRSP:</strong> {result.comparison.flexibility.rrsp}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-midnight mb-2">Projected Savings (30 years)</h4>
                          <div className="space-y-2 text-sm">
                            <p><strong>TFSA:</strong> ${result.comparison.savingsOutcome.tfsa.toLocaleString()}</p>
                            <p><strong>RRSP:</strong> ${result.comparison.savingsOutcome.rrsp.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass border-amber-200/50 bg-amber-50/50 max-w-md mx-auto lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs sm:text-sm text-midnight/80 italic">
                          <strong>Disclaimer:</strong> This analysis provides general information only. Actual benefits depend on your specific tax situation, future tax rates, and investment returns. Consult with a qualified financial advisor for personalized advice.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Lead Capture */}
                    <LeadCapture
                      source="tfsa-rrsp-analyzer"
                      toolData={{
                        recommendation: result.recommendation,
                        summary: result.summary,
                        comparison: result.comparison,
                        formData: formData,
                      }}
                    />
                  </div>
                ) : (
                  <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                    <CardContent className="p-4 sm:p-6 text-center text-midnight/70">
                      <p className="text-sm sm:text-base">
                        Enter your information to see your TFSA vs RRSP comparison.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

