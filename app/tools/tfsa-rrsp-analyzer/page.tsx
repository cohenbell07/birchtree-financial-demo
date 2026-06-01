"use client"

import { useState } from "react"
import PageHeader from "@/components/layout/PageHeader"
import { Reveal } from "@/components/ui/reveal"
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
  const [insights, setInsights] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateComparison = () => {
    const age = parseInt(formData.age) || 30
    const income = parseFloat(formData.income) || 50000
    const yearsToRetirement = Math.max(1, 65 - age)
    const annualReturn = 0.07
    const annualContribution = Math.min(income * 0.18, 33000) // 2026 RRSP limit cap

    // Canadian marginal tax rate (combined federal + avg provincial ~10%)
    const getMarginalRate = (inc: number) => {
      if (inc <= 57375) return 0.25
      if (inc <= 114750) return 0.305
      if (inc <= 177882) return 0.36
      if (inc <= 253414) return 0.41
      return 0.46
    }

    const currentMarginalRate = getMarginalRate(income)
    const retirementMarginalRate = getMarginalRate(income * 0.55) // Assume ~55% of working income in retirement

    // Future value of annuity (proper compound growth)
    const fvAnnuity = annualContribution * ((Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn)

    // RRSP: Tax deduction now at current rate, taxed on withdrawal at retirement rate
    const rrspTaxSavings = annualContribution * currentMarginalRate
    const rrspGrowthTotal = fvAnnuity
    const rrspAfterTax = rrspGrowthTotal * (1 - retirementMarginalRate)
    const rrspNet = rrspAfterTax

    // TFSA: After-tax contribution (no deduction), but withdrawals are completely tax-free
    const tfsaContribution = annualContribution * (1 - currentMarginalRate) // What you'd have after paying tax
    const tfsaGrowthTotal = tfsaContribution * ((Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn)
    const tfsaNet = tfsaGrowthTotal // No tax on withdrawal

    // Recommendation logic: RRSP wins when current rate > retirement rate
    const rrspAdvantage = currentMarginalRate > retirementMarginalRate
    const recommendation = rrspAdvantage ? "RRSP" : "TFSA"
    const recommendationReason = rrspAdvantage
      ? "Your current marginal tax rate is higher than your expected retirement rate, making the RRSP tax deferral more valuable."
      : "Your current and expected retirement tax rates suggest TFSA's tax-free growth and withdrawal flexibility is more advantageous."

    return {
      tfsaBenefit: Math.round(tfsaNet),
      rrspBenefit: Math.round(rrspNet),
      recommendation,
      summary: `Based on your age (${age}), income ($${income.toLocaleString()}), and ${yearsToRetirement} years to retirement, ${recommendation} is likely more optimal. ${recommendationReason}`,
      comparison: {
        taxBenefit: {
          tfsa: "No immediate tax deduction, but withdrawals are completely tax-free",
          rrsp: `Immediate tax savings of ~$${Math.round(rrspTaxSavings).toLocaleString()} per year at your ${(currentMarginalRate * 100).toFixed(0)}% marginal rate`,
        },
        flexibility: {
          tfsa: "Contributions can be withdrawn anytime without tax consequences; room is restored the following year",
          rrsp: "Withdrawals are taxed as income; contribution room is not restored",
        },
        savingsOutcome: {
          tfsa: Math.round(tfsaNet),
          rrsp: Math.round(rrspNet),
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

    try {
      // Generate enhanced insights
      const insightsPrompt = `TFSA vs RRSP Analysis - Generate 3-4 actionable insights:
- Age: ${formData.age}
- Annual Income: $${formData.income}
- Province: ${formData.province}
- Recommendation: ${calculation.recommendation}
- TFSA Projected Benefit (30 years): $${calculation.tfsaBenefit.toLocaleString()}
- RRSP Projected Benefit (30 years): $${calculation.rrspBenefit.toLocaleString()}

Provide 3-4 specific, actionable insights in bullet format. Focus on:
1. Why the recommendation makes sense for their situation
2. Contribution strategies (maximizing both accounts if possible)
3. Tax optimization opportunities
4. Long-term wealth building strategies using both accounts

Format as a bulleted list with clear, actionable advice. Keep it educational and valuable.`

      const insightsResponse = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: insightsPrompt, type: "tfsa-rrsp-insights" }),
      })
      const insightsData = await insightsResponse.json()
      setInsights(insightsData.content || null)
    } catch (error) {
      console.warn("Insights generation failed:", error)
      setInsights(null)
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

      <section className="relative overflow-hidden bg-[#F7F5EF] py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Form */}
              <Reveal>
                <Card className="max-w-md mx-auto rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center text-lg font-heading font-bold tracking-tight text-midnight sm:text-xl md:text-2xl">
                      <span className="mr-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                        <Calculator className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                      </span>
                      Your Profile
                    </CardTitle>
                    <CardDescription className="mt-2 text-xs text-midnight/60 sm:text-sm md:text-base">
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
                        className="w-full rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
                        disabled={isLoading}
                      >
                        {isLoading ? "Analyzing..." : "Compare TFSA vs RRSP"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Results */}
              <Reveal delay={0.1}>
                {result ? (
                  <div className="space-y-4 sm:space-y-6">
                    <Card className="max-w-md mx-auto rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                            <TrendingUp className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                          </span>
                          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                            Recommendation
                          </span>
                        </div>
                        <CardTitle className="mt-3 text-lg font-heading font-bold tracking-tight text-midnight sm:text-xl md:text-2xl">
                          {result.recommendation}
                        </CardTitle>
                        <div
                          aria-hidden
                          className="mt-4 h-px w-16"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                          }}
                        />
                      </CardHeader>
                      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                        <p className="text-xs leading-relaxed text-midnight/65 sm:text-sm md:text-base">
                          {result.summary}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="max-w-md mx-auto rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base font-heading font-bold tracking-tight text-midnight sm:text-lg md:text-xl">
                          Comparison
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
                        <div>
                          <h4 className="mb-2 font-heading font-bold text-midnight">Tax Benefit</h4>
                          <div className="space-y-2 text-sm text-midnight/65">
                            <p><strong className="font-semibold text-midnight">TFSA:</strong> {result.comparison.taxBenefit.tfsa}</p>
                            <p><strong className="font-semibold text-midnight">RRSP:</strong> {result.comparison.taxBenefit.rrsp}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 font-heading font-bold text-midnight">Flexibility</h4>
                          <div className="space-y-2 text-sm text-midnight/65">
                            <p><strong className="font-semibold text-midnight">TFSA:</strong> {result.comparison.flexibility.tfsa}</p>
                            <p><strong className="font-semibold text-midnight">RRSP:</strong> {result.comparison.flexibility.rrsp}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 font-heading font-bold text-midnight">Projected Savings (30 years)</h4>
                          <div className="space-y-2 text-sm text-midnight/65">
                            <p><strong className="font-semibold text-midnight">TFSA:</strong> ${result.comparison.savingsOutcome.tfsa.toLocaleString()}</p>
                            <p><strong className="font-semibold text-midnight">RRSP:</strong> ${result.comparison.savingsOutcome.rrsp.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {insights && (
                      <Card className="max-w-md mx-auto rounded-2xl border border-midnight/10 bg-[#F7F5EF] shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="flex items-center text-base font-heading font-bold tracking-tight text-midnight sm:text-lg md:text-xl">
                            <span className="mr-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                              <Calculator className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                            </span>
                            Personalized Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                          <div className="prose prose-sm max-w-none text-midnight/65">
                            <div className="whitespace-pre-line text-xs leading-relaxed sm:text-sm">
                              {insights}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="max-w-md mx-auto rounded-2xl border border-midnight/10 bg-[#F7F5EF] lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs italic text-midnight/65 sm:text-sm">
                          <strong className="font-semibold not-italic text-midnight">Disclaimer:</strong> This analysis provides general information only. Actual benefits depend on your specific tax situation, future tax rates, and investment returns. Consult with a qualified financial advisor for personalized advice.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Lead Capture */}
                    {false && (
                      <LeadCapture
                        source="tfsa-rrsp-analyzer"
                        toolData={{
                          recommendation: result!.recommendation,
                          summary: result!.summary,
                          comparison: result!.comparison,
                          formData: formData,
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="max-w-md mx-auto rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                    <CardContent className="p-4 text-center text-midnight/60 sm:p-6">
                      <p className="text-sm sm:text-base">
                        Enter your information to see your TFSA vs RRSP comparison.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

