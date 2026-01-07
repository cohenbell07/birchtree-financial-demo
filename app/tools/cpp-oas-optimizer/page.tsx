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
  const [isLoading, setIsLoading] = useState(false)

  const calculateOptimalTiming = () => {
    const age = parseInt(formData.age) || 60
    const incomeNeeds = parseFloat(formData.incomeNeeds) || 3000
    const isHealthy = formData.health === "excellent" || formData.health === "good"
    const isWorking = formData.workStatus === "working"

    // CPP can start at 60 (reduced) or 65 (full) or 70 (increased)
    // OAS can start at 65 (full) or delayed to 70 (increased)
    
    let cppAge = 65
    let oasAge = 65
    let cppRecommendation = "Take CPP at 65 for full benefits"
    let oasRecommendation = "Take OAS at 65 for full benefits"

    // If healthy and can delay, recommend delay for higher lifetime benefits
    if (isHealthy && incomeNeeds < 4000 && !isWorking) {
      cppAge = 70
      oasAge = 70
      cppRecommendation = "Delay CPP to 70 for maximum lifetime benefits (42% increase)"
      oasRecommendation = "Delay OAS to 70 for maximum lifetime benefits (36% increase)"
    } else if (incomeNeeds > 5000 || isWorking) {
      cppAge = 60
      cppRecommendation = "Consider taking CPP early at 60 if you need income now"
      oasAge = 65
      oasRecommendation = "Take OAS at 65 (cannot start before 65)"
    }

    // Simplified lifetime benefit calculation
    const cppMonthly = cppAge === 60 ? 600 : cppAge === 65 ? 1000 : 1420
    const oasMonthly = oasAge === 65 ? 700 : 950
    const yearsToReceive = 85 - Math.max(cppAge, oasAge) // Assume life to 85
    const lifetimeBenefit = (cppMonthly + oasMonthly) * 12 * yearsToReceive

    const summary = `Based on your situation, ${cppAge === 70 ? "delaying" : "taking"} CPP at ${cppAge} and ${oasAge === 70 ? "delaying" : "taking"} OAS at ${oasAge} is recommended. This strategy maximizes your lifetime benefits.`

    return {
      cppRecommendation,
      oasRecommendation,
      cppAge,
      oasAge,
      lifetimeBenefit,
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
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Age: ${formData.age}, Income needs: $${formData.incomeNeeds}, Health: ${formData.health}, Work status: ${formData.workStatus}. Recommendation: CPP at ${calculation.cppAge}, OAS at ${calculation.oasAge}. Provide 2-3 sentences explaining CPP/OAS timing strategy for Canadian retirees.`,
          type: "cpp-oas-optimization",
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
        title="CPP/OAS Timing Optimizer"
        subtitle="Determine the optimal age to start CPP and OAS benefits"
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
                      <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-emerald flex-shrink-0" />
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
                        className="w-full relative z-10 !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0"
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
                    <Card className="gradient-bg text-white shadow-glow border-emerald/30 max-w-md mx-auto lg:max-w-none">
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
                            <p className="text-2xl sm:text-3xl font-bold text-mint">
                              ${result.lifetimeBenefit.toLocaleString()}
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
                          <strong>Disclaimer:</strong> This calculator provides general guidance. Actual CPP and OAS amounts depend on your contribution history and other factors. Consult with a financial advisor for personalized CPP/OAS strategy.
                        </p>
                      </CardContent>
                    </Card>

                    <LeadCapture
                      source="cpp-oas-optimizer"
                      toolData={{
                        cppAge: result.cppAge,
                        oasAge: result.oasAge,
                        lifetimeBenefit: result.lifetimeBenefit,
                        summary: result.summary,
                        formData: formData,
                      }}
                    />
                  </div>
                ) : (
                  <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
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

