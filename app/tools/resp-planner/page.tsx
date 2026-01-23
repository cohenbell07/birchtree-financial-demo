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
  const [isLoading, setIsLoading] = useState(false)

  const calculateRESP = () => {
    const childAge = parseInt(formData.childAge) || 5
    const targetCost = parseFloat(formData.targetCost) || 50000
    const currentSavings = parseFloat(formData.currentSavings) || 0
    const yearsToEducation = 18 - childAge
    const annualReturn = 0.06 // 6% conservative estimate

    // Government grants: 20% of first $2,500 annually (max $500/year, lifetime $7,200)
    const annualGrant = Math.min(2500 * 0.20, 500)
    const totalGrantYears = Math.min(yearsToEducation, 14.4) // $7,200 / $500
    const totalGovernmentGrant = annualGrant * totalGrantYears

    // Calculate required monthly contribution
    const futureValueNeeded = targetCost
    const presentValue = currentSavings
    const monthlyRate = annualReturn / 12
    const months = yearsToEducation * 12

    // Future value of current savings
    const currentSavingsFV = presentValue * Math.pow(1 + annualReturn, yearsToEducation)

    // Remaining needed
    const remainingNeeded = futureValueNeeded - currentSavingsFV - totalGovernmentGrant

    // Monthly contribution needed
    let monthlyContribution = 0
    if (remainingNeeded > 0 && months > 0) {
      monthlyContribution = (remainingNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
    }

    // Projected growth
    const totalContributions = monthlyContribution * months
    const projectedGrowth = currentSavingsFV + totalContributions * Math.pow(1 + annualReturn, yearsToEducation / 2) + totalGovernmentGrant
    const totalValue = projectedGrowth

    const summary = `With ${yearsToEducation} years until education, contributing $${Math.round(monthlyContribution)}/month, you'll accumulate approximately $${Math.round(totalValue).toLocaleString()} including $${Math.round(totalGovernmentGrant).toLocaleString()} in government grants.`

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
          type: "resp-planning",
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
        title="RESP Planner"
        subtitle="Plan for your child&apos;s education with RESP savings and government grants"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-midnight flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-emerald flex-shrink-0" />
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
                        className="w-full relative z-10 !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0"
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
                    <Card className="gradient-bg text-white shadow-glow border-emerald/30 max-w-md mx-auto lg:max-w-none">
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

                    <Card className="glass border-amber-200/50 bg-amber-50/50 max-w-md mx-auto lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs sm:text-sm text-midnight/80 italic">
                          <strong>Disclaimer:</strong> This calculator provides estimates. Government grant eligibility and amounts may vary. Actual returns depend on investment performance. Consult with a financial advisor for personalized RESP planning.
                        </p>
                      </CardContent>
                    </Card>

                    <LeadCapture
                      source="resp-planner"
                      toolData={{
                        projectedGrowth: result.projectedGrowth,
                        governmentGrant: result.governmentGrant,
                        monthlyContribution: result.monthlyContribution,
                        summary: result.summary,
                        formData: formData,
                      }}
                    />
                  </div>
                ) : (
                  <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
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

