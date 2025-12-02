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
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

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
    } catch (error) {
      console.error("Error generating summary:", error)
      setResult({
        category: riskProfile.category,
        summary: "Your risk profile has been calculated. Please consult with a financial advisor for personalized guidance.",
        scores: riskProfile.scores,
      })
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

      <section className="py-12 sm:py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-heading">
                      Your Profile
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Answer a few questions to determine your risk profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                    <Card className="bg-forest text-white">
                      <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl font-heading text-white flex items-center">
                          <TrendingUp className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                          Your Risk Profile: {result.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm sm:text-base text-cream leading-relaxed">{result.summary}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl font-heading">
                          Risk Profile Breakdown
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                          <RadarChart data={result.scores}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="category" />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar
                              name="Risk Score"
                              dataKey="value"
                              stroke="#12372A"
                              fill="#89A17F"
                              fillOpacity={0.6}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="glass">
                      <CardContent className="pt-6">
                        <p className="text-sm text-slate italic">
                          <strong>Disclaimer:</strong> This assessment provides general
                          information only and does not constitute personalized financial
                          advice. Please consult with a qualified financial advisor for
                          personalized recommendations based on your specific situation.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center text-slate">
                      <p>
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

