"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GraduationCap, TrendingUp } from "lucide-react"
import LeadCapture from "@/components/LeadCapture"

export default function RESPPlannerPage() {
  const [formData, setFormData] = useState({
    childAge: "",
    targetCost: "",
    currentSavings: "",
  })
  const [result, setResult] = useState<{
    projectedGrowth: number
    governmentGrant: number
    totalValue: number
    monthlyContribution: number
    summary: string
  } | null>(null)
  const [insights, setInsights] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateRESP = () => {
    const childAge = parseInt(formData.childAge) || 5
    const targetCost = parseFloat(formData.targetCost) || 50000
    const currentSavings = parseFloat(formData.currentSavings) || 0
    const yearsToEducation = 18 - childAge
    const annualReturn = 0.06 // 6% conservative estimate

    // CESG: 20% of first $2,500/year = $500/year, lifetime max $7,200 per child
    // Eligibility: until end of calendar year child turns 17
    const annualGrant = 500
    const grantEligibleYears = Math.min(yearsToEducation, Math.max(0, 17 - childAge))
    const totalGovernmentGrant = Math.min(annualGrant * grantEligibleYears, 7200)

    const monthlyRate = annualReturn / 12
    const months = Math.max(1, yearsToEducation * 12)

    // Future value of current savings (compound)
    const currentSavingsFV = currentSavings * Math.pow(1 + annualReturn, yearsToEducation)

    // Future value of grant stream (each year's $500 compounds for remaining years)
    let grantFV = 0
    for (let y = 0; y < grantEligibleYears && y * annualGrant < 7200; y++) {
      grantFV += annualGrant * Math.pow(1 + annualReturn, yearsToEducation - y)
    }

    // Remaining needed after current savings growth and grant growth
    const remainingNeeded = Math.max(0, targetCost - currentSavingsFV - grantFV)

    // Monthly contribution needed (future value of annuity formula, solved for PMT)
    let monthlyContribution = 0
    if (remainingNeeded > 0 && months > 0 && monthlyRate > 0) {
      monthlyContribution = (remainingNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
    }

    // Total projected value (proper compound growth of monthly contributions)
    const contributionsFV = monthlyContribution > 0
      ? monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : 0
    const totalValue = Math.round(currentSavingsFV + contributionsFV + grantFV)

    const summary = `With ${yearsToEducation} years until education, contributing $${Math.round(monthlyContribution)}/month, you'll accumulate approximately $${totalValue.toLocaleString()} including ~$${Math.round(totalGovernmentGrant).toLocaleString()} in CESG government grants (compounded). RESP lifetime contribution limit: $50,000 per beneficiary.`

    return {
      projectedGrowth: totalValue,
      governmentGrant: totalGovernmentGrant,
      totalValue,
      monthlyContribution: Math.round(monthlyContribution),
      summary,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await fetch("/api/events/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "tool_used",
          meta: { tool: "resp-planner" },
        }),
      })
    } catch (error) {
      console.warn("Event tracking failed:", error)
    }

    const calculation = calculateRESP()

    try {
      // Generate enhanced insights
      const insightsPrompt = `RESP Planning Analysis - Generate 3-4 actionable insights:
- Child Age: ${formData.childAge}
- Target Education Cost: $${formData.targetCost}
- Current RESP Savings: $${formData.currentSavings}
- Recommended Monthly Contribution: $${calculation.monthlyContribution}
- Projected Total Value: $${calculation.totalValue.toLocaleString()}
- Government Grants Included: $${calculation.governmentGrant.toLocaleString()}

Provide 3-4 specific, actionable insights in bullet format. Focus on:
1. How to maximize government grants (CESG)
2. Contribution strategies to reach the target
3. Investment options and growth potential
4. Timeline considerations and milestones

Format as a bulleted list with clear, actionable advice. Keep it educational and valuable.`

      const insightsResponse = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: insightsPrompt, type: "resp-insights" }),
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
        eyebrow="Education Planning"
        title="RESP Planner"
        subtitle="Plan for your child&apos;s education with RESP savings and government grants"
        accent="gold"
      />

      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        {/* faint gold radial wash — same recipe as the homepage hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                  <CardHeader className="p-6 sm:p-8">
                    <CardTitle className="flex items-center font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                      <span className="mr-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                        <GraduationCap className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                      </span>
                      Education Planning
                    </CardTitle>
                    <CardDescription className="mt-3 text-sm leading-relaxed text-midnight/60">
                      Calculate RESP growth and government grant eligibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 sm:p-8 sm:pt-0">
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="childAge" className="text-sm font-medium text-midnight/70">Child&apos;s Current Age</Label>
                        <Input
                          id="childAge"
                          type="number"
                          value={formData.childAge}
                          onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                          required
                          min="0"
                          max="17"
                          className="rounded-xl border-midnight/15 bg-white text-midnight focus-visible:ring-gold/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="targetCost" className="text-sm font-medium text-midnight/70">Target Education Cost</Label>
                        <Input
                          id="targetCost"
                          type="number"
                          value={formData.targetCost}
                          onChange={(e) => setFormData({ ...formData, targetCost: e.target.value })}
                          required
                          min="0"
                          step="1000"
                          className="rounded-xl border-midnight/15 bg-white text-midnight focus-visible:ring-gold/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentSavings" className="text-sm font-medium text-midnight/70">Current RESP Savings</Label>
                        <Input
                          id="currentSavings"
                          type="number"
                          value={formData.currentSavings}
                          onChange={(e) => setFormData({ ...formData, currentSavings: e.target.value })}
                          required
                          min="0"
                          step="100"
                          className="rounded-xl border-midnight/15 bg-white text-midnight focus-visible:ring-gold/40"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
                        disabled={isLoading}
                      >
                        {isLoading ? "Calculating..." : "Calculate RESP Plan"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {result ? (
                  <div className="space-y-6">
                    <Card
                      className="mx-auto max-w-md rounded-2xl border border-midnight/10 shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none"
                      style={{
                        background:
                          "radial-gradient(70% 90% at 0% 0%, rgba(215,195,138,0.14) 0%, transparent 70%), #FBFAF6",
                      }}
                    >
                      <CardHeader className="p-6 sm:p-8">
                        <CardTitle className="flex items-center font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                          <span className="mr-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                            <TrendingUp className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                          </span>
                          RESP Projection
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 sm:p-8 sm:pt-0">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-midnight/55 sm:text-sm">Projected Total Value</p>
                            <p className="font-heading text-3xl font-bold text-midnight sm:text-4xl">
                              ${result.totalValue.toLocaleString()}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border border-midnight/10 bg-white p-4">
                              <p className="text-xs text-midnight/55">Government Grants</p>
                              <p className="mt-1 font-heading text-xl font-bold text-midnight">
                                ${result.governmentGrant.toLocaleString()}
                              </p>
                            </div>
                            <div className="rounded-xl border border-midnight/10 bg-white p-4">
                              <p className="text-xs text-midnight/55">Recommended Monthly</p>
                              <p className="mt-1 font-heading text-xl font-bold text-midnight">
                                ${result.monthlyContribution.toLocaleString()}/mo
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="mt-5 text-sm leading-relaxed text-midnight/65">
                          {result.summary}
                        </p>
                      </CardContent>
                    </Card>

                    {insights && (
                      <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-[#F7F5EF] shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                        <CardHeader className="p-6 sm:p-8">
                          <CardTitle className="flex items-center font-heading text-[1.3rem] font-bold leading-[1.18] tracking-tight text-midnight">
                            <span className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                              <GraduationCap className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                            </span>
                            Personalized Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 sm:p-8 sm:pt-0">
                          <div className="prose prose-sm max-w-none text-midnight/80">
                            <div className="whitespace-pre-line text-xs leading-relaxed sm:text-sm">
                              {insights}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-[#F7F5EF] lg:max-w-none">
                      <CardContent className="p-6">
                        <p className="text-xs italic leading-relaxed text-midnight/60 sm:text-sm">
                          <strong className="text-midnight/75">Disclaimer:</strong> This calculator provides estimates. Government grant eligibility and amounts may vary. Actual returns depend on investment performance. Consult with a financial advisor for personalized RESP planning.
                        </p>
                      </CardContent>
                    </Card>

                    {false && (
                      <LeadCapture
                        source="resp-planner"
                        toolData={{
                          projectedGrowth: result!.projectedGrowth,
                          governmentGrant: result!.governmentGrant,
                          monthlyContribution: result!.monthlyContribution,
                          summary: result!.summary,
                          formData: formData,
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                    <CardContent className="p-6 text-center text-midnight/60 sm:p-8">
                      <p className="text-sm sm:text-base">
                        Enter your information to see your RESP projection.
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
