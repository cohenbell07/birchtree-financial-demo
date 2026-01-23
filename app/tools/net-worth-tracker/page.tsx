"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { BarChart3, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import LeadCapture from "@/components/LeadCapture"

export default function NetWorthTrackerPage() {
  const [formData, setFormData] = useState({
    assets: "",
    liabilities: "",
    income: "",
    expenses: "",
  })
  const [result, setResult] = useState<{
    netWorth: number
    debtToIncome: number
    payoffMonths: number
    payoffPath: Array<{ month: number; debt: number }>
    summary: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateNetWorth = () => {
    const assets = parseFloat(formData.assets) || 0
    const liabilities = parseFloat(formData.liabilities) || 0
    const income = parseFloat(formData.income) || 0
    const expenses = parseFloat(formData.expenses) || 0

    const netWorth = assets - liabilities
    const monthlySavings = income - expenses
    const debtToIncome = income > 0 ? (liabilities / income) * 100 : 0

    // Calculate payoff path
    const payoffPath: Array<{ month: number; debt: number }> = []
    let remainingDebt = liabilities
    let month = 0

    while (remainingDebt > 0 && month < 120 && monthlySavings > 0) {
      remainingDebt = Math.max(0, remainingDebt - monthlySavings)
      payoffPath.push({ month: month + 1, debt: remainingDebt })
      month++
    }

    const payoffMonths = month

    const summary = `Your net worth is $${netWorth.toLocaleString()}. Your debt-to-income ratio is ${debtToIncome.toFixed(1)}%. ${payoffMonths > 0 ? `With current savings, you can pay off debt in approximately ${payoffMonths} months.` : "Consider increasing savings or reducing expenses to pay down debt."}`

    return {
      netWorth,
      debtToIncome,
      payoffMonths,
      payoffPath,
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
          meta: { tool: "net-worth-tracker" },
        }),
      })
    } catch (error) {
      console.warn("Event tracking failed:", error)
    }

    const calculation = calculateNetWorth()

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Net worth: $${calculation.netWorth.toLocaleString()}, Debt-to-income: ${calculation.debtToIncome.toFixed(1)}%, Payoff time: ${calculation.payoffMonths} months. Provide 2-3 sentences of educational advice about net worth and debt management for Canadians.`,
          type: "net-worth-analysis",
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
        title="Net Worth & Debt Payoff Tracker"
        subtitle="Calculate your net worth and plan your debt payoff strategy"
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
                      <BarChart3 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-emerald flex-shrink-0" />
                      Financial Overview
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-midnight/70 mt-2">
                      Enter your financial information to calculate net worth
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="assets">Total Assets</Label>
                        <Input
                          id="assets"
                          type="number"
                          value={formData.assets}
                          onChange={(e) => setFormData({ ...formData, assets: e.target.value })}
                          required
                          min="0"
                          step="1000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="liabilities">Total Liabilities (Debt)</Label>
                        <Input
                          id="liabilities"
                          type="number"
                          value={formData.liabilities}
                          onChange={(e) => setFormData({ ...formData, liabilities: e.target.value })}
                          required
                          min="0"
                          step="1000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="income">Monthly Income</Label>
                        <Input
                          id="income"
                          type="number"
                          value={formData.income}
                          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                          required
                          min="0"
                          step="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expenses">Monthly Expenses</Label>
                        <Input
                          id="expenses"
                          type="number"
                          value={formData.expenses}
                          onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
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
                        {isLoading ? "Calculating..." : "Calculate Net Worth"}
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
                          Your Net Worth
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs sm:text-sm text-silver/80">Net Worth</p>
                            <p className={`text-2xl sm:text-3xl font-bold ${result.netWorth >= 0 ? "text-white" : "text-red-300"}`}>
                              ${result.netWorth.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-silver/80">Debt-to-Income Ratio</p>
                            <p className="text-xl sm:text-2xl font-semibold text-white">
                              {result.debtToIncome.toFixed(1)}%
                            </p>
                          </div>
                          {result.payoffMonths > 0 && (
                            <div>
                              <p className="text-xs sm:text-sm text-silver/80">Estimated Payoff Time</p>
                              <p className="text-xl sm:text-2xl font-semibold text-white">
                                {result.payoffMonths} months
                              </p>
                            </div>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-silver/90 leading-relaxed mt-4">
                          {result.summary}
                        </p>
                      </CardContent>
                    </Card>

                    {result.payoffPath.length > 0 && (
                      <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight">
                            Debt Payoff Path
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <div className="w-full max-w-full overflow-hidden px-2">
                            <ResponsiveContainer width="100%" height={200} className="sm:h-[250px] md:h-[300px]">
                              <BarChart data={result.payoffPath.slice(0, 12)}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1B2A3D" opacity={0.2} />
                                <XAxis
                                  dataKey="month"
                                  stroke="#0B1A2C"
                                  tick={{ fontSize: 10 }}
                                  label={{ value: "Month", position: "insideBottom", offset: -5, style: { fontSize: 10 } }}
                                />
                                <YAxis
                                  stroke="#0B1A2C"
                                  tick={{ fontSize: 10 }}
                                  label={{ value: "Debt ($)", angle: -90, position: "insideLeft", style: { fontSize: 10 } }}
                                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip
                                  formatter={(value: number) => `$${value.toLocaleString()}`}
                                  labelFormatter={(label) => `Month ${label}`}
                                  contentStyle={{ backgroundColor: "#F5F7FA", border: "1px solid #1B2A3D", fontSize: "12px" }}
                                />
                                <Bar dataKey="debt" fill="#1B2A3D" name="Remaining Debt" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="glass border-amber-200/50 bg-amber-50/50 max-w-md mx-auto lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs sm:text-sm text-midnight/80 italic">
                          <strong>Disclaimer:</strong> This calculator provides estimates. Actual net worth and debt payoff depend on many factors including interest rates, investment returns, and lifestyle changes. Consult with a financial advisor for personalized debt management strategies.
                        </p>
                      </CardContent>
                    </Card>

                    <LeadCapture
                      source="net-worth-tracker"
                      toolData={{
                        netWorth: result.netWorth,
                        debtToIncome: result.debtToIncome,
                        payoffMonths: result.payoffMonths,
                        summary: result.summary,
                        formData: formData,
                      }}
                    />
                  </div>
                ) : (
                  <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                    <CardContent className="p-4 sm:p-6 text-center text-midnight/70">
                      <p className="text-sm sm:text-base">
                        Enter your information to calculate your net worth.
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

