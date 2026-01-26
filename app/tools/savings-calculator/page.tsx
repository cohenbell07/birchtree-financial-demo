"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Calculator, PiggyBank } from "lucide-react"
import LeadCapture from "@/components/LeadCapture"

export default function SavingsCalculatorPage() {
  const [formData, setFormData] = useState({
    initialDeposit: "",
    monthlyContribution: "",
    expectedReturn: "5",
    savingsDuration: "",
  })
  const [result, setResult] = useState<{
    totalSavings: number
    totalContributions: number
    interestEarned: number
    chartData: { year: number; savings: number; contributions: number }[]
  } | null>(null)
  const [insights, setInsights] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateSavings = () => {
    const initialDeposit = parseFloat(formData.initialDeposit) || 0
    const monthlyContribution = parseFloat(formData.monthlyContribution) || 0
    const expectedReturn = parseFloat(formData.expectedReturn) || 5
    const savingsDuration = parseInt(formData.savingsDuration) || 0

    if (savingsDuration <= 0) {
      return null
    }

    const monthlyReturn = expectedReturn / 100 / 12
    let savings = initialDeposit
    const chartData: { year: number; savings: number; contributions: number }[] = [
      { year: 0, savings: Math.round(savings), contributions: initialDeposit },
    ]

    let totalContributions = initialDeposit

    for (let year = 1; year <= savingsDuration; year++) {
      // Compound monthly
      for (let month = 0; month < 12; month++) {
        savings = savings * (1 + monthlyReturn) + monthlyContribution
        totalContributions += monthlyContribution
      }
      chartData.push({
        year,
        savings: Math.round(savings),
        contributions: Math.round(totalContributions),
      })
    }

    const interestEarned = savings - totalContributions

    return {
      totalSavings: Math.round(savings),
      totalContributions: Math.round(totalContributions),
      interestEarned: Math.round(interestEarned),
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
          meta: { tool: "savings-calculator" },
        }),
      })
    } catch (error) {
      console.warn("Event tracking failed:", error)
    }

    const calculation = calculateSavings()
    if (calculation) {
      // Generate enhanced insights
      const insightsPrompt = `Savings Growth Analysis - Generate 3-4 actionable insights:
- Initial Deposit: $${formData.initialDeposit}
- Monthly Contribution: $${formData.monthlyContribution}
- Expected Annual Return: ${formData.expectedReturn}%
- Savings Duration: ${formData.savingsDuration} years
- Total Savings: $${calculation.totalSavings.toLocaleString()}
- Total Contributions: $${calculation.totalContributions.toLocaleString()}
- Interest Earned: $${calculation.interestEarned.toLocaleString()}

Provide 3-4 specific, actionable insights in bullet format. Focus on:
1. Strategies to accelerate savings growth
2. Impact of increasing monthly contributions
3. Tax-advantaged savings options (TFSA, RRSP) for Canadians
4. Investment options based on timeline and risk tolerance

Format as a bulleted list with clear, actionable advice. Keep it educational and valuable.`

      try {
        const insightsResponse = await fetch("/api/ai/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: insightsPrompt, type: "savings-insights" }),
        })
        const insightsData = await insightsResponse.json()
        setInsights(insightsData.content || null)
      } catch (error) {
        console.warn("Insights generation failed:", error)
        setInsights(null)
      }

      setResult(calculation)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <PageHeader
        title="Savings Calculator"
        subtitle="Plan for your short- or medium-term savings goals. Calculate how your savings will grow over time"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading flex items-center text-midnight">
                      <PiggyBank className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-emerald flex-shrink-0" />
                      Calculate Your Savings Growth
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-midnight/70 mt-2">
                      Perfect for planning short- or medium-term savings goals like a down payment, vacation, or emergency fund
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="initialDeposit">Initial Deposit (CAD)</Label>
                        <Input
                          id="initialDeposit"
                          type="number"
                          value={formData.initialDeposit}
                          onChange={(e) =>
                            setFormData({ ...formData, initialDeposit: e.target.value })
                          }
                          required
                          min="0"
                          step="100"
                        />
                        <p className="text-xs text-slate">
                          Your starting savings amount
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="monthlyContribution">Monthly Contribution (CAD)</Label>
                        <Input
                          id="monthlyContribution"
                          type="number"
                          value={formData.monthlyContribution}
                          onChange={(e) =>
                            setFormData({ ...formData, monthlyContribution: e.target.value })
                          }
                          required
                          min="0"
                          step="100"
                        />
                        <p className="text-xs text-slate">
                          Amount you plan to save each month
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                        <Input
                          id="expectedReturn"
                          type="number"
                          value={formData.expectedReturn}
                          onChange={(e) =>
                            setFormData({ ...formData, expectedReturn: e.target.value })
                          }
                          required
                          min="0"
                          max="20"
                          step="0.1"
                        />
                        <p className="text-xs text-slate">
                          Conservative estimate: 3-4% (savings account). Moderate: 5-7% (balanced investments)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="savingsDuration">Savings Duration (years)</Label>
                        <Input
                          id="savingsDuration"
                          type="number"
                          value={formData.savingsDuration}
                          onChange={(e) =>
                            setFormData({ ...formData, savingsDuration: e.target.value })
                          }
                          required
                          min="1"
                          max="30"
                        />
                        <p className="text-xs text-slate">
                          How long you plan to save (1-5 years for short-term, 5-15 for medium-term)
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="relative z-10 w-full !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(11,26,44,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0"
                        disabled={isLoading}
                      >
                        {isLoading ? "Calculating..." : "Calculate Savings"}
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
                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-white">
                          Future Savings Total
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                        <div>
                          <div className="text-xs sm:text-sm text-silver/80 mb-1">
                            Total Savings
                          </div>
                          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                            ${result.totalSavings.toLocaleString()}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald/30">
                          <div>
                            <div className="text-xs sm:text-sm text-silver/80 mb-1">Your Contributions</div>
                            <div className="text-lg sm:text-xl font-bold text-white">
                              ${result.totalContributions.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm text-silver/80 mb-1">Interest Earned</div>
                            <div className="text-lg sm:text-xl font-bold text-white">
                              ${result.interestEarned.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight">
                          Savings Growth Over Time
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="w-full max-w-full overflow-hidden px-2">
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={result.chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1B2A3D" opacity={0.2} />
                              <XAxis
                                dataKey="year"
                                stroke="#0B1A2C"
                                tick={{ fontSize: 10 }}
                                label={{
                                  value: "Year",
                                  position: "insideBottom",
                                  offset: -5,
                                  style: { fontSize: 10 }
                                }}
                              />
                              <YAxis
                                stroke="#0B1A2C"
                                tick={{ fontSize: 10 }}
                                label={{ value: "Amount ($)", angle: -90, position: "insideLeft", style: { fontSize: 10 } }}
                                tickFormatter={(value) =>
                                  `$${(value / 1000).toFixed(0)}k`
                                }
                              />
                              <Tooltip
                                formatter={(value: number) =>
                                  `$${value.toLocaleString()}`
                                }
                                labelFormatter={(label) => `Year: ${label}`}
                                contentStyle={{ backgroundColor: "#F5F7FA", border: "1px solid #1B2A3D", fontSize: "12px" }}
                              />
                              <Legend wrapperStyle={{ fontSize: "12px" }} />
                              <Line
                                type="monotone"
                                dataKey="savings"
                                stroke="#1B2A3D"
                                strokeWidth={2}
                                dot={{ fill: "#1B2A3D", r: 3 }}
                                name="Total Savings"
                              />
                              <Line
                                type="monotone"
                                dataKey="contributions"
                                stroke="#1B2A3D"
                                strokeWidth={2}
                                dot={false}
                                name="Your Contributions"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {insights && (
                      <Card className="glass shadow-glow-hover border-emerald/30 max-w-md mx-auto lg:max-w-none bg-gradient-to-br from-emerald/5 to-emerald-light/5">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight flex items-center">
                            <PiggyBank className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-emerald flex-shrink-0" />
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
                          <strong>Disclaimer:</strong> This calculator provides estimates based on the assumptions you entered. Actual returns may vary significantly, and this does not constitute personalized financial advice. For retirement planning (long-term goals), please use our Retirement Calculator. Please consult with a qualified Canadian financial advisor for personalized savings planning including TFSA and other registered account strategies.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Lead Capture */}
                    {false && (
                      <LeadCapture
                        source="savings-calculator"
                        toolData={{
                          totalSavings: result!.totalSavings,
                          totalContributions: result!.totalContributions,
                          interestEarned: result!.interestEarned,
                          formData: formData,
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                    <CardContent className="p-4 sm:p-6 text-center text-midnight/70">
                      <p className="text-sm sm:text-base">
                        Enter your savings information and calculate to see your projected growth.
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

