"use client"

import { useState } from "react"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("./Chart"), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] rounded-lg bg-midnight/[0.03] animate-pulse" />,
})
import { Calculator, PiggyBank, TrendingUp, Wallet, Sparkles } from "lucide-react"
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
    <div className="bg-white">
      <PageHeader
        eyebrow="Savings Calculator"
        title="Savings Calculator"
        subtitle="Plan for your short- or medium-term savings goals. Calculate how your savings will grow over time"
      />

      <section className="bg-[#F7F5EF] py-20 sm:py-24">
        <Container size="wide">
          <Reveal>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Form */}
              <div>
                <Card className="rounded-2xl border border-midnight/10 bg-white p-6 shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] sm:p-7 max-w-md mx-auto lg:max-w-none">
                  <CardHeader className="p-0">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                      <PiggyBank className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <CardTitle className="mt-5 font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                      Calculate Your Savings Growth
                    </CardTitle>
                    <CardDescription className="mt-2.5 text-[0.92rem] leading-relaxed text-midnight/60">
                      Perfect for planning short- or medium-term savings goals like a down payment, vacation, or emergency fund
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 mt-7">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="initialDeposit" className="text-sm font-semibold text-midnight">Initial Deposit (CAD)</Label>
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
                          className="border-midnight/15 bg-white text-midnight placeholder:text-midnight/35 focus-visible:ring-gold/40 focus-visible:border-gold/50"
                        />
                        <p className="text-xs text-midnight/55">
                          Your starting savings amount
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="monthlyContribution" className="text-sm font-semibold text-midnight">Monthly Contribution (CAD)</Label>
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
                          className="border-midnight/15 bg-white text-midnight placeholder:text-midnight/35 focus-visible:ring-gold/40 focus-visible:border-gold/50"
                        />
                        <p className="text-xs text-midnight/55">
                          Amount you plan to save each month
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expectedReturn" className="text-sm font-semibold text-midnight">Expected Annual Return (%)</Label>
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
                          className="border-midnight/15 bg-white text-midnight placeholder:text-midnight/35 focus-visible:ring-gold/40 focus-visible:border-gold/50"
                        />
                        <p className="text-xs text-midnight/55">
                          Conservative estimate: 3-4% (savings account). Moderate: 5-7% (balanced investments)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="savingsDuration" className="text-sm font-semibold text-midnight">Savings Duration (years)</Label>
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
                          className="border-midnight/15 bg-white text-midnight placeholder:text-midnight/35 focus-visible:ring-gold/40 focus-visible:border-gold/50"
                        />
                        <p className="text-xs text-midnight/55">
                          How long you plan to save (1-5 years for short-term, 5-15 for medium-term)
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
                        disabled={isLoading}
                      >
                        {isLoading ? "Calculating..." : "Calculate Savings"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div>
                {result ? (
                  <div className="space-y-6">
                    <Card className="relative overflow-hidden rounded-2xl border border-midnight/10 bg-paper p-6 shadow-[0_18px_40px_rgba(11,26,44,0.07)] sm:p-7 max-w-md mx-auto lg:max-w-none">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.10) 0%, transparent 60%)",
                        }}
                      />
                      <CardHeader className="relative p-0">
                        <Eyebrow className="mb-3">Future Savings Total</Eyebrow>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold tracking-tight text-midnight">
                          ${result.totalSavings.toLocaleString()}
                        </div>
                        <div
                          aria-hidden
                          className="mt-4 h-px w-16"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                          }}
                        />
                      </CardHeader>
                      <CardContent className="relative p-0 mt-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                              <Wallet className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                            </span>
                            <div>
                              <div className="text-xs sm:text-sm text-midnight/55 mb-1">Your Contributions</div>
                              <div className="text-lg sm:text-xl font-heading font-bold text-midnight">
                                ${result.totalContributions.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                              <TrendingUp className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                            </span>
                            <div>
                              <div className="text-xs sm:text-sm text-midnight/55 mb-1">Interest Earned</div>
                              <div className="text-lg sm:text-xl font-heading font-bold text-midnight">
                                ${result.interestEarned.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl border border-midnight/10 bg-white p-6 shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] sm:p-7 max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-0">
                        <CardTitle className="font-heading text-[1.05rem] font-bold leading-snug text-midnight">
                          Savings Growth Over Time
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 mt-5">
                        <div className="w-full max-w-full overflow-hidden px-2">
                          <Chart data={result.chartData} />
                        </div>
                      </CardContent>
                    </Card>

                    {insights && (
                      <Card className="rounded-2xl border border-midnight/10 bg-[#F7F5EF] p-6 shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] sm:p-7 max-w-md mx-auto lg:max-w-none">
                        <CardHeader className="p-0">
                          <CardTitle className="flex items-center font-heading text-[1.05rem] font-bold leading-snug text-midnight">
                            <span className="mr-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                              <Sparkles className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                            </span>
                            Personalized Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-5">
                          <div className="prose prose-sm max-w-none text-midnight/70">
                            <div className="whitespace-pre-line text-[0.86rem] leading-relaxed">
                              {insights}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="rounded-2xl border border-midnight/10 bg-paper p-6 max-w-md mx-auto lg:max-w-none">
                      <CardContent className="p-0">
                        <p className="text-xs sm:text-sm leading-relaxed text-midnight/65 italic">
                          <strong className="font-semibold text-midnight">Disclaimer:</strong> This calculator provides estimates based on the assumptions you entered. Actual returns may vary significantly, and this does not constitute personalized financial advice. For retirement planning (long-term goals), please use our Retirement Calculator. Please consult with a qualified Canadian financial advisor for personalized savings planning including TFSA and other registered account strategies.
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
                  <Card className="flex h-full flex-col items-center justify-center rounded-2xl border border-midnight/10 bg-white p-6 text-center shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] sm:p-7 max-w-md mx-auto lg:max-w-none">
                    <CardContent className="p-0">
                      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                        <Calculator className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                      </span>
                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-midnight/60">
                        Enter your savings information and calculate to see your projected growth.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
