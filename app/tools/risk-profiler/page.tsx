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
import { TrendingUp, Sparkles } from "lucide-react"
import { Eyebrow } from "@/components/ui/eyebrow"
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
    setResult({
      category: riskProfile.category,
      scores: riskProfile.scores,
    })

    try {
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

      <section className="relative overflow-hidden bg-[#F7F5EF] py-16 sm:py-20 lg:py-24">
        {/* Faint gold wash to match the homepage hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-white p-2 shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle
                      className="font-heading font-bold leading-[1.1] tracking-tight text-midnight"
                      style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 1.9rem)" }}
                    >
                      Your Profile
                    </CardTitle>
                    <div
                      aria-hidden
                      className="mt-4 h-px w-16"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                      }}
                    />
                    <CardDescription className="mt-4 text-sm leading-relaxed text-midnight/60">
                      Answer a few questions to determine your risk profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 sm:p-6">
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
                                className="text-sm font-medium leading-none text-midnight/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {goal}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
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
                    <Card className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-midnight/10 bg-[#FBFAF6] shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                      {/* Faint gold radial wash */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(60% 60% at 12% 0%, rgba(215,195,138,0.14) 0%, transparent 62%)",
                        }}
                      />
                      <CardHeader className="relative p-4 sm:p-6">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                            <TrendingUp className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                          </span>
                          <Eyebrow className="text-gold-dark">Your Risk Profile</Eyebrow>
                        </div>
                      </CardHeader>
                      <CardContent className="relative p-4 pt-0 sm:p-6">
                        <div
                          className="font-heading font-bold leading-[1.04] tracking-tight text-midnight"
                          style={{ fontSize: "clamp(2.25rem, 1.6rem + 2.6vw, 3.25rem)" }}
                        >
                          {result.category}
                        </div>
                        <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                          Investor profile category
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-white p-2 shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="font-heading text-[1.25rem] font-bold leading-[1.18] tracking-tight text-midnight sm:text-[1.4rem]">
                          Your Risk Factors
                        </CardTitle>
                        <CardDescription className="mt-2 text-sm leading-relaxed text-midnight/60">
                          See how each factor contributes to your risk profile
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 sm:p-6">
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
                            let barColor = "bg-midnight"
                            let textColor = "text-midnight"
                            if (percentage < 40) {
                              barColor = "bg-midnight/60"
                              textColor = "text-midnight/60"
                            } else if (percentage < 70) {
                              barColor = "bg-midnight"
                              textColor = "text-midnight"
                            } else {
                              barColor = "bg-gold"
                              textColor = "text-gold-dark"
                            }

                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-midnight sm:text-base">
                                      {info.label}
                                    </h4>
                                    {info.description && (
                                      <p className="mt-0.5 text-xs text-midnight/55">
                                        {info.description}
                                      </p>
                                    )}
                                  </div>
                                  <span className={`ml-4 text-sm font-bold sm:text-base ${textColor}`}>
                                    {percentage}%
                                  </span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-midnight/[0.06] sm:h-4">
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
                      <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-[#FBFAF6] p-2 shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="flex items-center gap-3 font-heading text-[1.25rem] font-bold leading-[1.18] tracking-tight text-midnight sm:text-[1.4rem]">
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                              <Sparkles className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                            </span>
                            Personalized Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 sm:p-6">
                          <div className="prose prose-sm max-w-none text-midnight/75">
                            <div className="whitespace-pre-line text-xs leading-relaxed sm:text-sm">
                              {insights}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="mx-auto max-w-md rounded-2xl border border-midnight/10 bg-[#F7F5EF] lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs leading-relaxed text-midnight/65 sm:text-sm">
                          <strong className="text-midnight/80">Disclaimer:</strong> This assessment provides general
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
                          category: result!.category,
                          scores: result!.scores,
                          formData: formData,
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="mx-auto flex h-full max-w-md items-center rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] lg:max-w-none">
                    <CardContent className="p-6 text-center sm:p-8">
                      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                        <TrendingUp className="h-[22px] w-[22px] text-gold-dark" strokeWidth={1.6} />
                      </span>
                      <p className="mt-4 text-sm leading-relaxed text-midnight/60 sm:text-base">
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
