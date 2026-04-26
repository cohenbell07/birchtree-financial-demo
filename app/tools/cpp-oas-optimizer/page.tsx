"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, TrendingUp } from "lucide-react"
import LeadCapture from "@/components/LeadCapture"

export default function CPPOASOptimizerPage() {
  const [formData, setFormData] = useState({
    age: "",
    incomeNeeds: "",
    health: "",
    workStatus: "",
  })
  const [result, setResult] = useState<{
    cppRecommendation: string
    oasRecommendation: string
    cppAge: number
    oasAge: number
    lifetimeBenefit: number
    summary: string
  } | null>(null)
  const [insights, setInsights] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateOptimalTiming = () => {
    const age = parseInt(formData.age) || 60
    const incomeNeeds = parseFloat(formData.incomeNeeds) || 3000
    const isHealthy = formData.health === "excellent" || formData.health === "good"
    const isWorking = formData.workStatus === "working"
    const lifeExpectancy = 87 // Statistics Canada average

    // 2026 CPP maximum at age 65: ~$1,365/month
    const cppMaxAt65 = 1365
    // CPP adjustments: -0.6%/month before 65, +0.7%/month after 65
    const getCppMonthly = (startAge: number) => {
      const monthsDiff = (startAge - 65) * 12
      if (monthsDiff < 0) return Math.round(cppMaxAt65 * (1 + monthsDiff * 0.006))
      return Math.round(cppMaxAt65 * (1 + monthsDiff * 0.007))
    }

    // 2026 OAS maximum at age 65: ~$730/month
    const oasMaxAt65 = 730
    // OAS adjustments: +0.6%/month after 65 (cannot start before 65)
    const getOasMonthly = (startAge: number) => {
      const monthsDeferred = Math.max(0, (startAge - 65) * 12)
      return Math.round(oasMaxAt65 * (1 + monthsDeferred * 0.006))
    }

    let cppAge = 65
    let oasAge = 65
    let cppRecommendation = "Take CPP at 65 for full benefits"
    let oasRecommendation = "Take OAS at 65 for full benefits"

    // Decision logic with graduated income needs
    if (isHealthy && incomeNeeds < 3500 && !isWorking) {
      cppAge = 70
      oasAge = 70
      cppRecommendation = "Delay CPP to 70 for a 42% increase over age-65 benefits"
      oasRecommendation = "Delay OAS to 70 for a 36% increase over age-65 benefits"
    } else if (isHealthy && incomeNeeds < 5000) {
      cppAge = 65
      oasAge = 70
      cppRecommendation = "Take CPP at 65 for full benefits to cover current income needs"
      oasRecommendation = "Delay OAS to 70 for a 36% increase while CPP provides income"
    } else if (incomeNeeds >= 5000 || !isHealthy) {
      cppAge = 60
      oasAge = 65
      cppRecommendation = "Consider taking CPP early at 60 to address immediate income needs (36% reduction from age-65 amount)"
      oasRecommendation = "Take OAS at 65 (earliest available)"
    }

    // Lifetime benefit calculation — each benefit stream calculated independently
    const cppMonthly = getCppMonthly(cppAge)
    const oasMonthly = getOasMonthly(oasAge)
    const cppYears = Math.max(0, lifeExpectancy - cppAge)
    const oasYears = Math.max(0, lifeExpectancy - oasAge)
    const lifetimeCpp = cppMonthly * 12 * cppYears
    const lifetimeOas = oasMonthly * 12 * oasYears
    const lifetimeBenefit = lifetimeCpp + lifetimeOas

    const summary = `Based on your situation, ${cppAge === 70 ? "delaying" : cppAge === 60 ? "taking early" : "taking"} CPP at ${cppAge} (~$${cppMonthly.toLocaleString()}/mo) and ${oasAge === 70 ? "delaying" : "taking"} OAS at ${oasAge} (~$${oasMonthly.toLocaleString()}/mo) is recommended. Estimated lifetime benefits to age ${lifeExpectancy}: $${lifetimeBenefit.toLocaleString()}.`

    return {
      cppRecommendation,
      oasRecommendation,
      cppAge,
      oasAge,
      lifetimeBenefit,
      cppMonthly,
      oasMonthly,
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
          meta: { tool: "cpp-oas-optimizer" },
        }),
      })
    } catch (error) {
      console.warn("Event tracking failed:", error)
    }

    const calculation = calculateOptimalTiming()

    try {
      // Generate enhanced insights
      const insightsPrompt = `CPP/OAS Timing Analysis - Generate 3-4 actionable insights:
- Current Age: ${formData.age}
- Monthly Income Needs: $${formData.incomeNeeds}
- Health Status: ${formData.health}
- Work Status: ${formData.workStatus}
- Recommended CPP Start Age: ${calculation.cppAge}
- Recommended OAS Start Age: ${calculation.oasAge}
- Projected Lifetime Benefit: $${calculation.lifetimeBenefit.toLocaleString()}

Provide 3-4 specific, actionable insights in bullet format. Focus on:
1. Financial impact of delaying vs taking early
2. Health and longevity considerations
3. Tax implications and income planning
4. Integration with other retirement income sources

Format as a bulleted list with clear, actionable advice. Keep it educational and valuable.`

      const insightsResponse = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: insightsPrompt, type: "cpp-oas-insights" }),
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
        title="CPP/OAS Timing Optimizer"
        subtitle="Determine the optimal age to start CPP and OAS benefits"
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
                      <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gold flex-shrink-0" />
                      Your Situation
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-midnight/70 mt-2">
                      Enter your information to optimize CPP/OAS timing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="age">Current Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          required
                          min="55"
                          max="70"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="incomeNeeds">Monthly Income Needs</Label>
                        <Input
                          id="incomeNeeds"
                          type="number"
                          value={formData.incomeNeeds}
                          onChange={(e) => setFormData({ ...formData, incomeNeeds: e.target.value })}
                          required
                          min="0"
                          step="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="health">Health Status</Label>
                        <Select
                          value={formData.health}
                          onValueChange={(value) => setFormData({ ...formData, health: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select health status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="workStatus">Work Status</Label>
                        <Select
                          value={formData.workStatus}
                          onValueChange={(value) => setFormData({ ...formData, workStatus: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select work status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="working">Still Working</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gold/90 hover:bg-gold text-midnight font-semibold shadow-[0_2px_8px_rgba(215,195,138,0.2)] hover:shadow-[0_4px_20px_rgba(215,195,138,0.3)] hover:scale-[1.02] transition-all duration-200 rounded-xl [&>*]:text-midnight"
                        disabled={isLoading}
                      >
                        {isLoading ? "Optimizing..." : "Optimize CPP/OAS Timing"}
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
                    <Card
                      className="text-white border border-gold/15 rounded-xl max-w-md mx-auto lg:max-w-none shadow-[0_4px_24px_rgba(11,26,44,0.18)]"
                      style={{ background: "linear-gradient(135deg, #0B1A2C 0%, #15243B 100%)" }}
                    >
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-white flex items-center">
                          <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0" />
                          Optimal Timing Strategy
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs sm:text-sm text-silver/80 mb-1">CPP Recommendation</p>
                            <p className="text-base sm:text-lg font-semibold">{result.cppRecommendation}</p>
                            <p className="text-xs sm:text-sm text-silver/70 mt-1">Start at age {result.cppAge}</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-silver/80 mb-1">OAS Recommendation</p>
                            <p className="text-base sm:text-lg font-semibold">{result.oasRecommendation}</p>
                            <p className="text-xs sm:text-sm text-silver/70 mt-1">Start at age {result.oasAge}</p>
                          </div>
                          <div className="pt-3 border-t border-white/20">
                            <p className="text-xs sm:text-sm text-silver/80">Projected Lifetime Benefit</p>
                            <p className="text-2xl sm:text-3xl font-bold text-white">
                              ${result.lifetimeBenefit.toLocaleString()}
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
                            <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gold flex-shrink-0" />
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
                          <strong>Disclaimer:</strong> This calculator provides general guidance. Actual CPP and OAS amounts depend on your contribution history and other factors. Consult with a financial advisor for personalized CPP/OAS strategy.
                        </p>
                      </CardContent>
                    </Card>

                    {false && (
                      <LeadCapture
                        source="cpp-oas-optimizer"
                        toolData={{
                          cppAge: result!.cppAge,
                          oasAge: result!.oasAge,
                          lifetimeBenefit: result!.lifetimeBenefit,
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
                        Enter your information to see optimal CPP/OAS timing.
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

