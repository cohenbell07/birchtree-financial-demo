"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("./Chart"), {
  ssr: false,
  loading: () => <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg bg-midnight/[0.03] animate-pulse" />,
})
import { Calculator } from "lucide-react"
import LeadCapture from "@/components/LeadCapture"

export default function RetirementCalculatorPage() {
  const [formData, setFormData] = useState({
    currentAge: "",
    retirementAge: "",
    currentSavings: "",
    annualContribution: "",
    expectedReturn: "7",
  })
  const [result, setResult] = useState<{
    projectedSavings: number
    chartData: { age: number; savings: number }[]
  } | null>(null)
  const [insights, setInsights] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateRetirement = () => {
    const currentAge = parseInt(formData.currentAge) || 30
    const retirementAge = parseInt(formData.retirementAge) || 65
    const currentSavings = parseFloat(formData.currentSavings) || 0
    const annualContribution = parseFloat(formData.annualContribution) || 0
    const expectedReturn = parseFloat(formData.expectedReturn) || 7

    const yearsToRetirement = Math.max(1, retirementAge - currentAge)
    const monthlyReturn = expectedReturn / 100 / 12

    let savings = currentSavings
    const chartData: { age: number; savings: number }[] = [
      { age: currentAge, savings: Math.round(savings) },
    ]

    for (let i = 1; i <= yearsToRetirement; i++) {
      // Compound monthly
      for (let month = 0; month < 12; month++) {
        savings = savings * (1 + monthlyReturn) + annualContribution / 12
      }
      chartData.push({
        age: currentAge + i,
        savings: Math.round(savings),
      })
    }

    return {
      projectedSavings: Math.round(savings),
      chartData,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Track tool usage event
    try {
      await fetch("/api/events/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "tool_used",
          meta: { tool: "retirement-calculator" },
        }),
      })
    } catch (error) {
      // Silently fail - event tracking is optional
      console.warn("Event tracking failed:", error)
    }

    const calculation = calculateRetirement()
    setResult(calculation)

    try {
      // Generate enhanced insights
      const insightsPrompt = `Retirement Analysis - Generate 3-4 actionable insights:
- Current Age: ${formData.currentAge}
- Retirement Age: ${formData.retirementAge}
- Current Savings: $${parseFloat(formData.currentSavings || "0").toLocaleString()}
- Annual Contribution: $${parseFloat(formData.annualContribution || "0").toLocaleString()}
- Expected Return: ${formData.expectedReturn}%
- Projected Savings at Retirement: $${calculation.projectedSavings.toLocaleString()}
- Years to Retirement: ${parseInt(formData.retirementAge || "65") - parseInt(formData.currentAge || "30")}

Provide 3-4 specific, actionable insights in bullet format. Focus on:
1. How this projection compares to typical Canadian retirement needs
2. Specific strategies to improve the outcome (e.g., "Increasing contributions by $X/month would add $Y to retirement")
3. Key considerations for this age and timeline
4. Canadian-specific opportunities (RRSP, TFSA, CPP, OAS)

Format as a bulleted list with clear, actionable advice. Keep it educational and valuable.`

      const insightsResponse = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: insightsPrompt, type: "retirement-insights" }),
      })
      const insightsData = await insightsResponse.json()
      setInsights(insightsData.content || null)
    } catch (error) {
      console.warn("Insights generation failed:", error)
      setInsights(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Retirement Calculator"
        subtitle="Project your retirement savings and plan for your future"
      />

      <section className="relative overflow-hidden bg-[#F7F5EF] py-20 sm:py-24">
        {/* Faint gold wash — same recipe as the homepage hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center font-heading text-lg font-bold tracking-tight text-midnight sm:text-xl md:text-2xl">
                      <span className="mr-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                        <Calculator className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                      </span>
                      Calculate Your Retirement
                    </CardTitle>
                    <CardDescription className="mt-2 text-xs text-midnight/55 sm:text-sm md:text-base">
                      Enter your information to see your projected RRSP and TFSA retirement savings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentAge">Current Age</Label>
                        <Input
                          id="currentAge"
                          type="number"
                          value={formData.currentAge}
                          onChange={(e) =>
                            setFormData({ ...formData, currentAge: e.target.value })
                          }
                          required
                          min="18"
                          max="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="retirementAge">Desired Retirement Age</Label>
                        <Input
                          id="retirementAge"
                          type="number"
                          value={formData.retirementAge}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              retirementAge: e.target.value,
                            })
                          }
                          required
                          min="50"
                          max="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentSavings">Current Retirement Savings</Label>
                        <Input
                          id="currentSavings"
                          type="number"
                          value={formData.currentSavings}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              currentSavings: e.target.value,
                            })
                          }
                          required
                          min="0"
                          step="1000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="annualContribution">
                          Annual Contribution
                        </Label>
                        <Input
                          id="annualContribution"
                          type="number"
                          value={formData.annualContribution}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              annualContribution: e.target.value,
                            })
                          }
                          required
                          min="0"
                          step="1000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expectedReturn">
                          Expected Annual Return (%)
                        </Label>
                        <Input
                          id="expectedReturn"
                          type="number"
                          value={formData.expectedReturn}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expectedReturn: e.target.value,
                            })
                          }
                          required
                          min="0"
                          max="20"
                          step="0.1"
                        />
                        <p className="text-xs text-midnight/55">
                          Historical average for a balanced portfolio: 7-8%
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full rounded-xl bg-midnight font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
                        disabled={isLoading}
                      >
                        {isLoading ? "Calculating..." : "Calculate Projection"}
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
                  <div className="space-y-6">
                    <Card
                      className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none"
                      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FBFAF6 100%)" }}
                    >
                      {/* Faint gold wash — light private-bank accent */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(60% 70% at 100% 0%, rgba(215,195,138,0.12) 0%, transparent 60%)",
                        }}
                      />
                      <CardHeader className="relative p-4 sm:p-6">
                        <CardTitle className="font-heading text-lg font-bold tracking-tight text-midnight sm:text-xl md:text-2xl">
                          Projected Retirement Savings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative p-4 pt-0 sm:p-6">
                        <div className="mb-1 font-heading text-3xl font-bold tracking-tight text-midnight sm:text-4xl md:text-5xl">
                          ${result.projectedSavings.toLocaleString()}
                        </div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                          Estimated value at retirement
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="font-heading text-base font-bold tracking-tight text-midnight sm:text-lg md:text-xl">
                          Growth Projection
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 sm:p-6">
                        <div className="w-full max-w-full overflow-hidden px-2">
                          <Chart data={result.chartData} />
                        </div>
                      </CardContent>
                    </Card>

                    {insights && (
                      <Card className="mx-auto max-w-md rounded-2xl border border-gold/30 bg-[#F7F5EF] shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="flex items-center font-heading text-base font-bold tracking-tight text-midnight sm:text-lg md:text-xl">
                            <span className="mr-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                              <Calculator className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                            </span>
                            Personalized Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 sm:p-6">
                          <div className="prose prose-sm max-w-none text-midnight/70">
                            <div className="whitespace-pre-line text-xs leading-relaxed sm:text-sm">
                              {insights}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-[#F7F5EF] lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs italic text-midnight/65 sm:text-sm">
                          <strong>Disclaimer:</strong> This calculator provides
                          estimates based on the assumptions you entered. Actual
                          returns may vary, and this does not constitute
                          personalized financial advice. Please consult with a
                          qualified Canadian financial advisor for personalized retirement
                          planning including RRSP and TFSA strategies.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Lead Capture */}
                    {false && (
                      <LeadCapture
                        source="retirement-calculator"
                        toolData={{
                          projectedSavings: result!.projectedSavings,
                          chartData: result!.chartData,
                          formData: formData,
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                    <CardContent className="p-4 text-center text-midnight/60 sm:p-6">
                      <p className="text-sm sm:text-base">
                        Enter your information and calculate to see your
                        retirement projection.
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

