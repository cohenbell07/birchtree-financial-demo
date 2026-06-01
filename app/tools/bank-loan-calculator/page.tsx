"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("./Chart"), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] rounded-lg bg-midnight/[0.03] animate-pulse" />,
})
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
  const [insights, setInsights] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateLoan = () => {
    const loanAmount = parseFloat(formData.loanAmount) || 0
    const interestRate = parseFloat(formData.interestRate) || 0
    const amortizationPeriod = parseInt(formData.amortizationPeriod) || 0
    const isBiweekly = formData.paymentFrequency === "biweekly"

    if (loanAmount <= 0 || interestRate <= 0 || amortizationPeriod <= 0) {
      return null
    }

    // Canadian mortgage convention: semi-annual compounding
    // Convert nominal annual rate to effective periodic rate
    const annualRate = interestRate / 100
    const periodsPerYear = isBiweekly ? 26 : 12
    // Semi-annual compounding: effective periodic rate = (1 + annual/2)^(1/periodsPerHalf) - 1
    const periodicRate = Math.pow(1 + annualRate / 2, 2 / periodsPerYear) - 1
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
      // Generate enhanced insights
      const insightsPrompt = `Loan Analysis - Generate 3-4 actionable insights:
- Loan Amount: $${formData.loanAmount}
- Interest Rate: ${formData.interestRate}%
- Amortization Period: ${formData.amortizationPeriod} years
- Payment Frequency: ${formData.paymentFrequency}
- ${formData.paymentFrequency === "monthly" ? "Monthly" : "Biweekly"} Payment: $${calculation.payment.toLocaleString()}
- Total Interest: $${calculation.totalInterest.toLocaleString()}
- Total Amount Paid: $${calculation.totalAmount.toLocaleString()}

Provide 3-4 specific, actionable insights in bullet format. Focus on:
1. Strategies to reduce total interest paid
2. Impact of making extra payments
3. Refinancing considerations
4. Budget planning and affordability tips

Format as a bulleted list with clear, actionable advice. Keep it educational and valuable.`

      try {
        const insightsResponse = await fetch("/api/ai/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: insightsPrompt, type: "loan-insights" }),
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
        title="Bank Loan Calculator"
        subtitle="Calculate your monthly or biweekly loan payments and see the total interest over the life of your loan"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white rounded-2xl border border-midnight/10 shadow-[0_18px_40px_rgba(11,26,44,0.06)] max-w-md mx-auto lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                      Calculator
                    </p>
                    <CardTitle className="mt-2 text-lg sm:text-xl md:text-2xl font-heading font-bold tracking-tight flex items-center text-midnight">
                      <span className="mr-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                        <Calculator className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                      </span>
                      Calculate Your Loan Payment
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-midnight/60 mt-2">
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
                        <p className="text-xs text-midnight/55">
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
                        <select
                          id="paymentFrequency"
                          value={formData.paymentFrequency}
                          onChange={(e) =>
                            setFormData({ ...formData, paymentFrequency: e.target.value })
                          }
                          required
                          className="flex h-11 w-full items-center justify-between rounded-xl border border-midnight/15 bg-paper px-4 py-2 text-sm text-midnight transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="monthly">Monthly</option>
                          <option value="biweekly">Biweekly</option>
                        </select>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
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
                    <Card className="bg-[#F7F5EF] border border-midnight/10 rounded-2xl max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading font-bold tracking-tight text-midnight">
                          Loan Payment Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                        <div>
                          <div className="text-xs sm:text-sm text-midnight/55 mb-1">
                            {formData.paymentFrequency === "monthly" ? "Monthly" : "Biweekly"} Payment
                          </div>
                          <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-midnight">
                            ${result.payment.toLocaleString()}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-midnight/10">
                          <div>
                            <div className="text-xs sm:text-sm text-midnight/55 mb-1">Total Interest</div>
                            <div className="text-lg sm:text-xl font-bold text-midnight">
                              ${result.totalInterest.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm text-midnight/55 mb-1">Total Amount</div>
                            <div className="text-lg sm:text-xl font-bold text-midnight">
                              ${result.totalAmount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white rounded-2xl border border-midnight/10 shadow-[0_18px_40px_rgba(11,26,44,0.06)] max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg md:text-xl font-heading font-bold tracking-tight text-midnight">
                          Payment Breakdown Over Time
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="w-full max-w-full overflow-hidden px-2">
                          <Chart data={result.chartData} />
                        </div>
                      </CardContent>
                    </Card>

                    {insights && (
                      <Card className="bg-[#F7F5EF] border border-midnight/10 rounded-2xl max-w-md mx-auto lg:max-w-none">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-base sm:text-lg md:text-xl font-heading font-bold tracking-tight text-midnight flex items-center">
                            <span className="mr-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                              <DollarSign className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                            </span>
                            Personalized Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <div className="prose prose-sm max-w-none text-midnight/80">
                            <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed">
                              {insights}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="bg-[#F7F5EF] border border-midnight/10 rounded-2xl max-w-md mx-auto lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs sm:text-sm text-midnight/65 italic">
                          <strong className="text-midnight">Disclaimer:</strong> This calculator provides estimates based on the assumptions you entered. Actual loan terms, interest rates, and payments may vary. This does not constitute personalized financial advice. Please consult with a qualified Canadian financial advisor or loan specialist for personalized loan planning.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Lead Capture */}
                    {false && (
                      <LeadCapture
                        source="bank-loan-calculator"
                        toolData={{
                          payment: result!.payment,
                          totalInterest: result!.totalInterest,
                          totalAmount: result!.totalAmount,
                          formData: formData,
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="bg-white rounded-2xl border border-midnight/10 shadow-[0_18px_40px_rgba(11,26,44,0.06)] max-w-md mx-auto lg:max-w-none">
                    <CardContent className="p-4 sm:p-6 text-center text-midnight/60">
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
