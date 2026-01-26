"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { TrendingUp } from "lucide-react"
import LeadCapture from "@/components/LeadCapture"

export default function RiskProfilerPage() {
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    experience: "",
    timeHorizon: "",
    riskTolerance: "",
    goals: [] as string[],
  })
  const [result, setResult] = useState<{
    category: string
    summary: string
    scores: { category: string; value: number }[]
  } | null>(null)
  const [insights, setInsights] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const goalOptions = [
    "Retirement Planning",
    "Wealth Building",
    "Home Purchase",
    "Education Funding",
    "Emergency Fund",
    "Tax Optimization",
  ]

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }))
  }

  const calculateRiskProfile = () => {
    // Calculate risk score based on inputs
    let score = 0
    const scores: { category: string; value: number }[] = []

    // Age factor (younger = higher risk tolerance)
    const age = parseInt(formData.age) || 40
    const ageScore = age < 35 ? 80 : age < 50 ? 60 : age < 65 ? 40 : 20
    scores.push({ category: "Age Factor", value: ageScore })
    score += ageScore * 0.2

    // Time horizon
    const timeHorizonMap: Record<string, number> = {
      "less-5": 30,
      "5-10": 50,
      "10-20": 70,
      "20-plus": 90,
    }
    const horizonScore = timeHorizonMap[formData.timeHorizon] || 50
    scores.push({ category: "Time Horizon", value: horizonScore })
    score += horizonScore * 0.25

    // Risk tolerance
    const toleranceMap: Record<string, number> = {
      conservative: 30,
      moderate: 50,
      growth: 70,
      aggressive: 90,
    }
    const toleranceScore = toleranceMap[formData.riskTolerance] || 50
    scores.push({ category: "Risk Tolerance", value: toleranceScore })
    score += toleranceScore * 0.35

    // Experience
    const experienceMap: Record<string, number> = {
      "no-experience": 40,
      "some-experience": 60,
      "experienced": 80,
    }
    const experienceScore = experienceMap[formData.experience] || 50
    scores.push({ category: "Experience", value: experienceScore })
    score += experienceScore * 0.2

    // Determine category
    let category = "Moderate"
    if (score < 40) category = "Conservative"
    else if (score < 60) category = "Moderate"
    else if (score < 80) category = "Growth"
    else category = "Aggressive"

    return { category, scores }
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
          meta: { tool: "risk-profiler" },
        }),
      })
    } catch (error) {
      // Silently fail - event tracking is optional
      console.warn("Event tracking failed:", error)
    }

    // Calculate risk profile
    const riskProfile = calculateRiskProfile()

    // Generate AI summary
    const prompt = `User profile:
- Age: ${formData.age}
- Income range: ${formData.income}
- Investment experience: ${formData.experience}
- Time horizon: ${formData.timeHorizon}
- Risk tolerance: ${formData.riskTolerance}
- Goals: ${formData.goals.join(", ")}

Risk profile category: ${riskProfile.category}
Risk score: ${riskProfile.scores.reduce((sum, s) => sum + s.value, 0) / riskProfile.scores.length}

Provide a brief, educational summary (2-3 sentences) of what this ${riskProfile.category} risk profile means for investment strategy. Keep it general and educational only.`

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "risk-profiler" }),
      })

      const data = await response.json()
      setResult({
        category: riskProfile.category,
        summary: data.content || "Analysis generated.",
        scores: riskProfile.scores,
      })

      // Generate enhanced insights
      const avgScore = riskProfile.scores.reduce((sum, s) => sum + s.value, 0) / riskProfile.scores.length
      const insightsPrompt = `Investment Risk Profile Analysis - Generate 3-4 actionable insights:
- Age: ${formData.age}
- Income Range: ${formData.income}
- Investment Experience: ${formData.experience}
- Time Horizon: ${formData.timeHorizon}
- Risk Tolerance: ${formData.riskTolerance}
- Financial Goals: ${formData.goals.join(", ")}
- Risk Profile Category: ${riskProfile.category}
- Average Risk Score: ${avgScore.toFixed(0)}%

Provide 3-4 specific, actionable insights in bullet format. Focus on:
1. Portfolio allocation recommendations for this risk profile
2. Investment strategies aligned with their goals and timeline
3. Canadian investment options (ETFs, mutual funds, GICs, etc.)
4. Risk management and diversification strategies

Format as a bulleted list with clear, actionable advice. Keep it educational and valuable.`

      try {
        const insightsResponse = await fetch("/api/ai/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: insightsPrompt, type: "risk-profiler-insights" }),
        })
        const insightsData = await insightsResponse.json()
        setInsights(insightsData.content || null)
      } catch (error) {
        console.warn("Insights generation failed:", error)
        setInsights(null)
      }
    } catch (error) {
      console.error("Error generating summary:", error)
      setResult({
        category: riskProfile.category,
        summary: "Your risk profile has been calculated. Please consult with a financial advisor for personalized guidance.",
        scores: riskProfile.scores,
      })
      setInsights(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Investment Risk Profiler"
        subtitle="Discover your investment risk profile with our AI-powered assessment tool"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
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
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-midnight">
                      Your Profile
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-midnight/70 mt-2">
                      Answer a few questions to determine your risk profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) =>
                            setFormData({ ...formData, age: e.target.value })
                          }
                          required
                          min="18"
                          max="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="income">Annual Income Range</Label>
                        <Select
                          value={formData.income}
                          onValueChange={(value) =>
                            setFormData({ ...formData, income: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select income range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50">Under $50,000</SelectItem>
                            <SelectItem value="50-100">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100-200">$100,000 - $200,000</SelectItem>
                            <SelectItem value="200-plus">$200,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Investment Experience</Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) =>
                            setFormData({ ...formData, experience: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no-experience">
                              No Experience
                            </SelectItem>
                            <SelectItem value="some-experience">
                              Some Experience
                            </SelectItem>
                            <SelectItem value="experienced">Experienced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeHorizon">Investment Time Horizon</Label>
                        <Select
                          value={formData.timeHorizon}
                          onValueChange={(value) =>
                            setFormData({ ...formData, timeHorizon: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time horizon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less-5">Less than 5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10-20">10-20 years</SelectItem>
                            <SelectItem value="20-plus">20+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                        <Select
                          value={formData.riskTolerance}
                          onValueChange={(value) =>
                            setFormData({ ...formData, riskTolerance: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select risk tolerance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conservative">Conservative</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="growth">Growth</SelectItem>
                            <SelectItem value="aggressive">Aggressive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Financial Goals (select all that apply)</Label>
                        <div className="space-y-2">
                          {goalOptions.map((goal) => (
                            <div key={goal} className="flex items-center space-x-2">
                              <Checkbox
                                id={goal}
                                checked={formData.goals.includes(goal)}
                                onCheckedChange={() => handleGoalToggle(goal)}
                              />
                              <label
                                htmlFor={goal}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {goal}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="relative z-10 w-full !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(11,26,44,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0" disabled={isLoading}>
                        {isLoading ? "Analyzing..." : "Analyze My Risk Profile"}
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
                    <Card className="gradient-bg text-white shadow-glow border-emerald/30 max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-white flex items-center">
                          <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0" />
                          Your Risk Profile: {result.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <p className="text-xs sm:text-sm md:text-base text-silver/90 leading-relaxed">{result.summary}</p>
                      </CardContent>
                    </Card>

                    <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight">
                          Your Risk Factors
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-midnight/70 mt-2">
                          See how each factor contributes to your risk profile
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-4 sm:space-y-5">
                          {result.scores.map((score, index) => {
                            // Map technical names to user-friendly labels
                            const labelMap: Record<string, { label: string; description: string }> = {
                              "Age Factor": {
                                label: "Age",
                                description: "Younger investors typically have higher risk tolerance"
                              },
                              "Time Horizon": {
                                label: "Investment Time Horizon",
                                description: "Longer time horizons allow for more aggressive strategies"
                              },
                              "Risk Tolerance": {
                                label: "Your Risk Comfort Level",
                                description: "How comfortable you are with market fluctuations"
                              },
                              "Experience": {
                                label: "Investment Experience",
                                description: "Your familiarity with investing and financial markets"
                              }
                            }
                            
                            const info = labelMap[score.category] || { label: score.category, description: "" }
                            const percentage = Math.round(score.value)
                            
                            // Determine color based on score
                            let barColor = "bg-emerald"
                            let textColor = "text-emerald"
                            if (percentage < 40) {
                              barColor = "bg-blue-500"
                              textColor = "text-blue-600"
                            } else if (percentage < 70) {
                              barColor = "bg-emerald"
                              textColor = "text-emerald"
                            } else {
                              barColor = "bg-amber-500"
                              textColor = "text-amber-600"
                            }
                            
                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-sm sm:text-base font-semibold text-midnight">
                                      {info.label}
                                    </h4>
                                    {info.description && (
                                      <p className="text-xs text-midnight/60 mt-0.5">
                                        {info.description}
                                      </p>
                                    )}
                                  </div>
                                  <span className={`text-sm sm:text-base font-bold ${textColor} ml-4`}>
                                    {percentage}%
                                  </span>
                                </div>
                                <div className="w-full bg-silver/20 rounded-full h-3 sm:h-4 overflow-hidden">
                                  <div
                                    className={`${barColor} h-full rounded-full transition-all duration-500 ease-out`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {insights && (
                      <Card className="glass shadow-glow-hover border-emerald/30 max-w-md mx-auto lg:max-w-none bg-gradient-to-br from-emerald/5 to-emerald-light/5">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight flex items-center">
                            <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-emerald flex-shrink-0" />
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

                    <Card className="glass border-amber-200/50 bg-amber-50/50 max-w-md mx-auto lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs sm:text-sm text-midnight/80 italic">
                          <strong>Disclaimer:</strong> This assessment provides general
                          information only and does not constitute personalized financial
                          advice. Please consult with a qualified financial advisor for
                          personalized recommendations based on your specific Canadian financial situation.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Lead Capture */}
                    {false && (
                      <LeadCapture
                        source="risk-profiler"
                        toolData={{
                          category: result.category,
                          summary: result.summary,
                          scores: result.scores,
                          formData: formData,
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                    <CardContent className="p-4 sm:p-6 text-center text-midnight/70">
                      <p className="text-sm sm:text-base">
                        Complete the form to see your personalized risk profile
                        analysis.
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

