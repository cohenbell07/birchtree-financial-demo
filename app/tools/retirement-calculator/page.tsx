"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Calculator } from "lucide-react"

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
    summary: string
    chartData: { age: number; savings: number }[]
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateRetirement = () => {
    const currentAge = parseInt(formData.currentAge) || 30
    const retirementAge = parseInt(formData.retirementAge) || 65
    const currentSavings = parseFloat(formData.currentSavings) || 0
    const annualContribution = parseFloat(formData.annualContribution) || 0
    const expectedReturn = parseFloat(formData.expectedReturn) || 7

    const yearsToRetirement = retirementAge - currentAge
    const monthlyReturn = expectedReturn / 100 / 12
    const monthsToRetirement = yearsToRetirement * 12

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

    const calculation = calculateRetirement()

    // Generate AI summary
    const prompt = `Retirement Calculation Results:
- Current Age: ${formData.currentAge}
- Retirement Age: ${formData.retirementAge}
- Current Savings: $${parseFloat(formData.currentSavings || "0").toLocaleString()}
- Annual Contribution: $${parseFloat(formData.annualContribution || "0").toLocaleString()}
- Expected Return: ${formData.expectedReturn}%
- Years to Retirement: ${parseInt(formData.retirementAge || "65") - parseInt(formData.currentAge || "30")}
- Projected Savings at Retirement: $${calculation.projectedSavings.toLocaleString()}

Provide a brief, educational summary (2-3 sentences) of this retirement projection. Include observations about whether this seems adequate for retirement and general considerations. Keep it general and educational only. Do not provide specific financial advice.`

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "retirement" }),
      })

      const data = await response.json()
      setResult({
        ...calculation,
        summary: data.content || "Calculation complete. Please consult with a financial advisor for personalized guidance.",
      })
    } catch (error) {
      console.error("Error generating summary:", error)
      setResult({
        ...calculation,
        summary: "Your retirement projection has been calculated. Please consult with a financial advisor for personalized guidance.",
      })
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

      <section className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-teal" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass shadow-glow-hover border-emerald/20">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl font-heading flex items-center text-midnight">
                      <Calculator className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-emerald" />
                      Calculate Your Retirement
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-midnight/70">
                      Enter your information to see your projected RRSP and TFSA retirement savings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                        <p className="text-xs text-slate">
                          Historical average for a balanced portfolio: 7-8%
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
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
                    <Card className="gradient-bg text-white shadow-glow border-emerald/30">
                      <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl font-heading text-white">
                          Projected Retirement Savings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-mint">
                          ${result.projectedSavings.toLocaleString()}
                        </div>
                        <p className="text-sm sm:text-base text-silver/90 leading-relaxed">{result.summary}</p>
                      </CardContent>
                    </Card>

                    <Card className="glass shadow-glow-hover border-emerald/20">
                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl font-heading text-midnight">
                          Growth Projection
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                          <LineChart data={result.chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#16A085" opacity={0.2} />
                            <XAxis
                              dataKey="age"
                              stroke="#0B1A2C"
                              label={{
                                value: "Age",
                                position: "insideBottom",
                                offset: -5,
                              }}
                            />
                            <YAxis
                              stroke="#0B1A2C"
                              label={{ value: "Savings ($)", angle: -90, position: "insideLeft" }}
                              tickFormatter={(value) =>
                                `$${(value / 1000).toFixed(0)}k`
                              }
                            />
                            <Tooltip
                              formatter={(value: number) =>
                                `$${value.toLocaleString()}`
                              }
                              labelFormatter={(label) => `Age: ${label}`}
                              contentStyle={{ backgroundColor: "#F5F7FA", border: "1px solid #16A085" }}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="savings"
                              stroke="#16A085"
                              strokeWidth={3}
                              dot={{ fill: "#7CFFC4", r: 4 }}
                              name="Projected Savings"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="glass border-amber-200/50 bg-amber-50/50">
                      <CardContent className="pt-6">
                        <p className="text-sm text-midnight/80 italic">
                          <strong>Disclaimer:</strong> This calculator provides
                          estimates based on the assumptions you entered. Actual
                          returns may vary, and this does not constitute
                          personalized financial advice. Please consult with a
                          qualified Canadian financial advisor for personalized retirement
                          planning including RRSP and TFSA strategies.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="glass shadow-glow-hover border-emerald/20">
                    <CardContent className="pt-6 text-center text-midnight/70">
                      <p>
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

