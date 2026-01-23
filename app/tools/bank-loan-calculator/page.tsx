"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Calculator, DollarSign } from "lucide-react"
import LeadCapture from "@/components/LeadCapture"

export default function BankLoanCalculatorPage() {
  const [formData, setFormData] = useState({
    loanAmount: "",
    interestRate: "",
    amortizationPeriod: "",
    paymentFrequency: "monthly",
  })
  const [result, setResult] = useState<{
    payment: number
    totalInterest: number
    totalAmount: number
    chartData: { year: number; principal: number; interest: number; balance: number }[]
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateLoan = () => {
    const loanAmount = parseFloat(formData.loanAmount) || 0
    const interestRate = parseFloat(formData.interestRate) || 0
    const amortizationPeriod = parseInt(formData.amortizationPeriod) || 0
    const isBiweekly = formData.paymentFrequency === "biweekly"

    if (loanAmount <= 0 || interestRate <= 0 || amortizationPeriod <= 0) {
      return null
    }

    // Convert annual rate to periodic rate
    const annualRate = interestRate / 100
    const periodsPerYear = isBiweekly ? 26 : 12
    const periodicRate = annualRate / periodsPerYear
    const totalPeriods = amortizationPeriod * periodsPerYear

    // Calculate payment using standard loan formula: P = (r * PV) / (1 - (1 + r)^(-n))
    const payment = (periodicRate * loanAmount) / (1 - Math.pow(1 + periodicRate, -totalPeriods))

    // Calculate amortization schedule
    let balance = loanAmount
    const chartData: { year: number; principal: number; interest: number; balance: number }[] = []
    let totalInterestPaid = 0

    for (let year = 0; year <= amortizationPeriod; year++) {
      if (year === 0) {
        chartData.push({
          year: 0,
          principal: 0,
          interest: 0,
          balance: loanAmount,
        })
        continue
      }

      let yearPrincipal = 0
      let yearInterest = 0
      const paymentsInYear = isBiweekly ? 26 : 12

      for (let period = 0; period < paymentsInYear; period++) {
        const interestPayment = balance * periodicRate
        const principalPayment = payment - interestPayment
        yearInterest += interestPayment
        yearPrincipal += principalPayment
        balance -= principalPayment
        totalInterestPaid += interestPayment
      }

      chartData.push({
        year,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        balance: Math.max(0, Math.round(balance)),
      })
    }

    return {
      payment: Math.round(payment),
      totalInterest: Math.round(totalInterestPaid),
      totalAmount: Math.round(loanAmount + totalInterestPaid),
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
          meta: { tool: "bank-loan-calculator" },
        }),
      })
    } catch (error) {
      console.warn("Event tracking failed:", error)
    }

    const calculation = calculateLoan()
    if (calculation) {
      setResult(calculation)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <PageHeader
        title="Bank Loan Calculator"
        subtitle="Calculate your monthly or biweekly loan payments and see the total interest over the life of your loan"
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
                      <Calculator className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-emerald flex-shrink-0" />
                      Calculate Your Loan Payment
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-midnight/70 mt-2">
                      Enter your loan details to see your estimated payment and total interest
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="loanAmount">Loan Amount (CAD)</Label>
                        <Input
                          id="loanAmount"
                          type="number"
                          value={formData.loanAmount}
                          onChange={(e) =>
                            setFormData({ ...formData, loanAmount: e.target.value })
                          }
                          required
                          min="1"
                          step="1000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interestRate">Interest Rate (%)</Label>
                        <Input
                          id="interestRate"
                          type="number"
                          value={formData.interestRate}
                          onChange={(e) =>
                            setFormData({ ...formData, interestRate: e.target.value })
                          }
                          required
                          min="0"
                          max="100"
                          step="0.01"
                        />
                        <p className="text-xs text-slate">
                          Annual interest rate (e.g., 5.5 for 5.5%)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amortizationPeriod">Amortization Period (years)</Label>
                        <Input
                          id="amortizationPeriod"
                          type="number"
                          value={formData.amortizationPeriod}
                          onChange={(e) =>
                            setFormData({ ...formData, amortizationPeriod: e.target.value })
                          }
                          required
                          min="1"
                          max="30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                        <Select
                          value={formData.paymentFrequency}
                          onValueChange={(value) =>
                            setFormData({ ...formData, paymentFrequency: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="biweekly">Biweekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="relative z-10 w-full !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0"
                        disabled={isLoading}
                      >
                        {isLoading ? "Calculating..." : "Calculate Payment"}
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
                          Loan Payment Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                        <div>
                          <div className="text-xs sm:text-sm text-silver/80 mb-1">
                            {formData.paymentFrequency === "monthly" ? "Monthly" : "Biweekly"} Payment
                          </div>
                          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                            ${result.payment.toLocaleString()}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald/30">
                          <div>
                            <div className="text-xs sm:text-sm text-silver/80 mb-1">Total Interest</div>
                            <div className="text-lg sm:text-xl font-bold text-white">
                              ${result.totalInterest.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm text-silver/80 mb-1">Total Amount</div>
                            <div className="text-lg sm:text-xl font-bold text-white">
                              ${result.totalAmount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight">
                          Payment Breakdown Over Time
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
                                dataKey="principal"
                                stroke="#1B2A3D"
                                strokeWidth={2}
                                dot={false}
                                name="Principal Paid"
                              />
                              <Line
                                type="monotone"
                                dataKey="interest"
                                stroke="#1B2A3D"
                                strokeWidth={2}
                                dot={false}
                                name="Interest Paid"
                              />
                              <Line
                                type="monotone"
                                dataKey="balance"
                                stroke="#FFA726"
                                strokeWidth={2}
                                dot={false}
                                name="Remaining Balance"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass border-amber-200/50 bg-amber-50/50 max-w-md mx-auto lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs sm:text-sm text-midnight/80 italic">
                          <strong>Disclaimer:</strong> This calculator provides estimates based on the assumptions you entered. Actual loan terms, interest rates, and payments may vary. This does not constitute personalized financial advice. Please consult with a qualified Canadian financial advisor or loan specialist for personalized loan planning.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Lead Capture */}
                    <LeadCapture
                      source="bank-loan-calculator"
                      toolData={{
                        payment: result.payment,
                        totalInterest: result.totalInterest,
                        totalAmount: result.totalAmount,
                        formData: formData,
                      }}
                    />
                  </div>
                ) : (
                  <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                    <CardContent className="p-4 sm:p-6 text-center text-midnight/70">
                      <p className="text-sm sm:text-base">
                        Enter your loan information and calculate to see your payment breakdown.
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

