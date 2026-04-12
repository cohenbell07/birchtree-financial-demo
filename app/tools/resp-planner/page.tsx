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
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Child age: ${formData.childAge}, Target cost: $${formData.targetCost}, Current savings: $${formData.currentSavings}. Projected RESP: $${calculation.totalValue.toLocaleString()} including $${calculation.governmentGrant.toLocaleString()} in grants. Provide a 2-3 sentence educational explanation about RESP planning for Canadian families.`,
          type: "resp",
        }),
      })

      const data = await response.json()
      if (data.content) {
        calculation.summary = data.content
      }

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

      try {
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
    } catch (error) {
      console.warn("AI summary generation failed, using default")
      setInsights(null)
    }

    setResult(calculation)
    setIsLoading(false)
  }

  return (
    <div>
      <PageHeader
        title="RESP Planner"
        subtitle="Plan for your child&apos;s education with RESP savings and government grants"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden grain-overlay" style={{ background: 'linear-gradient(160deg, #f8f7f4 0%, #f5f4f0 40%, #f2f1ed 100%)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white rounded-xl border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] max-w-md mx-auto lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-midnight flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gold flex-shrink-0" />
                      Education Planning
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-midnight/70 mt-2">
                      Calculate RESP growth and government grant eligibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="childAge">Child&apos;s Current Age</Label>
                        <Input
                          id="childAge"
                          type="number"
                          value={formData.childAge}
                          onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                          required
                          min="0"
                          max="17"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="targetCost">Target Education Cost</Label>
                        <Input
                          id="targetCost"
                          type="number"
                          value={formData.targetCost}
                          onChange={(e) => setFormData({ ...formData, targetCost: e.target.value })}
                          required
                          min="0"
                          step="1000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentSavings">Current RESP Savings</Label>
                        <Input
                          id="currentSavings"
                          type="number"
                          value={formData.currentSavings}
                          onChange={(e) => setFormData({ ...formData, currentSavings: e.target.value })}
                          required
                          min="0"
                          step="100"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gold/90 hover:bg-gold text-midnight font-semibold shadow-[0_2px_8px_rgba(215,195,138,0.2)] hover:shadow-[0_4px_20px_rgba(215,195,138,0.3)] hover:scale-[1.02] transition-all duration-200 rounded-xl [&>*]:text-midnight"
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
                  <div className="space-y-4 sm:space-y-6">
                    <Card className="text-white border border-gold/15 rounded-xl max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-white flex items-center">
                          <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0" />
                          RESP Projection
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs sm:text-sm text-silver/80">Projected Total Value</p>
                            <p className="text-2xl sm:text-3xl font-bold text-white">
                              ${result.totalValue.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-silver/80">Government Grants</p>
                            <p className="text-xl sm:text-2xl font-semibold text-white">
                              ${result.governmentGrant.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-silver/80">Recommended Monthly Contribution</p>
                            <p className="text-xl sm:text-2xl font-semibold text-white">
                              ${result.monthlyContribution.toLocaleString()}/month
                            </p>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-silver/90 leading-relaxed mt-4">
                          {result.summary}
                        </p>
                      </CardContent>
                    </Card>

                    {insights && (
                      <Card className="bg-white border border-gold/15 rounded-xl shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] max-w-md mx-auto lg:max-w-none bg-[#faf9f6]">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight flex items-center">
                            <GraduationCap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gold flex-shrink-0" />
                            Personalized Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <div className="prose prose-sm max-w-none text-midnight/90">
                            <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed">
                              {insights}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="bg-amber-50/50 border border-amber-200/50 rounded-xl max-w-md mx-auto lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs sm:text-sm text-midnight/80 italic">
                          <strong>Disclaimer:</strong> This calculator provides estimates. Government grant eligibility and amounts may vary. Actual returns depend on investment performance. Consult with a financial advisor for personalized RESP planning.
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
                  <Card className="bg-white rounded-xl border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] max-w-md mx-auto lg:max-w-none">
                    <CardContent className="p-4 sm:p-6 text-center text-midnight/70">
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

