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
import { Calculator, TrendingUp } from "lucide-react"
import LeadCapture from "@/components/LeadCapture"

export default function TaxOptimizationCalculatorPage() {
  const [formData, setFormData] = useState({
    income: "",
    maritalStatus: "",
    rrspContribution: "",
    tfsaContribution: "",
    deductions: "",
  })
  const [result, setResult] = useState<{
    taxBracket: string
    currentTax: number
    optimizedTax: number
    savings: number
    tips: string[]
    rrspImpact: string
    summary: string
  } | null>(null)
  const [insights, setInsights] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateTax = () => {
    const income = parseFloat(formData.income) || 75000
    const rrspContribution = parseFloat(formData.rrspContribution) || 0
    const tfsaContribution = parseFloat(formData.tfsaContribution) || 0
    const deductions = parseFloat(formData.deductions) || 0
    const isMarried = formData.maritalStatus === "married"

    // 2026 Canadian federal tax brackets (indexed estimates)
    const federalBrackets = [
      { limit: 57375, rate: 0.15 },
      { limit: 114750, rate: 0.205 },
      { limit: 177882, rate: 0.26 },
      { limit: 253414, rate: 0.29 },
      { limit: Infinity, rate: 0.33 },
    ]

    // Average provincial rate (~10% blended)
    const provincialRate = 0.10
    const basicPersonalAmount = 16800 // 2026 projected federal BPA

    // Graduated tax calculation (proper marginal brackets)
    const calculateGraduatedTax = (taxableIncome: number) => {
      const adjustedIncome = Math.max(0, taxableIncome - basicPersonalAmount)
      let tax = 0
      let remaining = adjustedIncome
      let prevLimit = 0
      for (const bracket of federalBrackets) {
        const taxableInBracket = Math.min(remaining, bracket.limit - prevLimit)
        if (taxableInBracket <= 0) break
        tax += taxableInBracket * bracket.rate
        remaining -= taxableInBracket
        prevLimit = bracket.limit
      }
      // Add provincial (simplified flat rate)
      tax += Math.max(0, taxableIncome - basicPersonalAmount) * provincialRate
      return Math.round(tax)
    }

    const getMarginalBracket = (taxableIncome: number) => {
      const adjusted = Math.max(0, taxableIncome - basicPersonalAmount)
      for (const bracket of federalBrackets) {
        if (adjusted <= bracket.limit) return `${((bracket.rate + provincialRate) * 100).toFixed(1)}%`
      }
      return "43.0%"
    }

    // Validate RRSP contribution (2026 limit: ~$33,000 or 18% of earned income)
    const maxRrsp = Math.min(income * 0.18, 33000)
    const effectiveRrsp = Math.min(rrspContribution, maxRrsp)

    // Current tax
    const taxableIncome = Math.max(0, income - deductions)
    const currentTaxBracket = getMarginalBracket(taxableIncome)
    const currentTax = calculateGraduatedTax(taxableIncome)

    // Optimized with RRSP
    const optimizedTaxableIncome = Math.max(0, taxableIncome - effectiveRrsp)
    const optimizedTaxBracket = getMarginalBracket(optimizedTaxableIncome)
    const optimizedTax = calculateGraduatedTax(optimizedTaxableIncome)
    const savings = currentTax - optimizedTax

    // Tips
    const tips: string[] = []
    if (rrspContribution < 5000 && income > 50000) {
      tips.push("Consider maximizing RRSP contributions to reduce taxable income")
    }
    if (tfsaContribution === 0) {
      tips.push("TFSA contributions don't reduce taxes now but grow tax-free")
    }
    if (deductions < 1000) {
      tips.push("Review eligible deductions: charitable donations, medical expenses, etc.")
    }
    if (isMarried) {
      tips.push("Consider income splitting strategies with your spouse")
    }

    const rrspImpact = rrspContribution > 0
      ? `Contributing $${rrspContribution.toLocaleString()} to RRSP reduces your tax by $${savings.toLocaleString()} and lowers your bracket from ${currentTaxBracket} to ${optimizedTaxBracket}.`
      : "No RRSP contribution entered. Consider contributing to reduce taxable income."

    const summary = `Your current tax bracket is ${currentTaxBracket}. With optimization strategies, you could save approximately $${savings.toLocaleString()} annually.`

    return {
      taxBracket: currentTaxBracket,
      currentTax,
      optimizedTax,
      savings,
      tips,
      rrspImpact,
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
          meta: { tool: "tax-optimization-calculator" },
        }),
      })
    } catch (error) {
      console.warn("Event tracking failed:", error)
    }

    const calculation = calculateTax()

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Income: $${formData.income}, Tax bracket: ${calculation.taxBracket}, Potential savings: $${calculation.savings.toLocaleString()}. Provide 2-3 sentences of educational tax optimization advice for Canadian taxpayers.`,
          type: "tax-optimization",
        }),
      })

      const data = await response.json()
      if (data.content) {
        calculation.summary = data.content
      }

      // Generate enhanced insights
      const insightsPrompt = `Tax Optimization Analysis - Generate 3-4 actionable insights:
- Annual Income: $${formData.income}
- Marital Status: ${formData.maritalStatus}
- Current Tax Bracket: ${calculation.taxBracket}
- Current RRSP Contribution: $${formData.rrspContribution || "0"}
- Current TFSA Contribution: $${formData.tfsaContribution || "0"}
- Other Deductions: $${formData.deductions || "0"}
- Potential Annual Savings: $${calculation.savings.toLocaleString()}

Provide 3-4 specific, actionable insights in bullet format. Focus on:
1. Specific dollar amounts they could save with different strategies
2. RRSP vs TFSA recommendations for their situation
3. Income splitting opportunities if applicable
4. Other Canadian tax strategies (charitable donations, medical expenses, etc.)

Format as a bulleted list with clear, actionable advice. Keep it educational and valuable.`

      try {
        const insightsResponse = await fetch("/api/ai/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: insightsPrompt, type: "tax-insights" }),
        })
        const insightsData = await insightsResponse.json()
        setInsights(insightsData.content || null)
      } catch (error) {
        console.warn("Insights generation failed:", error)
        setInsights(null)
      }
    } catch (error) {
      console.warn("AI summary generation failed, using default")
      setInsights(null)
    }

    setResult(calculation)
    setIsLoading(false)
  }

  return (
    <div>
      <PageHeader
        title="Tax Optimization Calculator"
        subtitle="Maximize your tax savings with strategic RRSP and TFSA planning"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden grain-overlay" style={{ background: 'linear-gradient(160deg, #f8f7f4 0%, #f5f4f0 40%, #f2f1ed 100%)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white rounded-xl border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] max-w-md mx-auto lg:max-w-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-midnight flex items-center">
                      <Calculator className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gold flex-shrink-0" />
                      Tax Information
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-midnight/70 mt-2">
                      Enter your tax information to see optimization opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="income">Annual Income</Label>
                        <Input
                          id="income"
                          type="number"
                          value={formData.income}
                          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                          required
                          min="0"
                          step="1000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maritalStatus">Marital Status</Label>
                        <Select
                          value={formData.maritalStatus}
                          onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married/Common-law</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rrspContribution">Current RRSP Contribution</Label>
                        <Input
                          id="rrspContribution"
                          type="number"
                          value={formData.rrspContribution}
                          onChange={(e) => setFormData({ ...formData, rrspContribution: e.target.value })}
                          min="0"
                          step="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tfsaContribution">Current TFSA Contribution</Label>
                        <Input
                          id="tfsaContribution"
                          type="number"
                          value={formData.tfsaContribution}
                          onChange={(e) => setFormData({ ...formData, tfsaContribution: e.target.value })}
                          min="0"
                          step="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deductions">Other Deductions</Label>
                        <Input
                          id="deductions"
                          type="number"
                          value={formData.deductions}
                          onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                          min="0"
                          step="100"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gold/90 hover:bg-gold text-midnight font-semibold shadow-[0_2px_8px_rgba(215,195,138,0.2)] hover:shadow-[0_4px_20px_rgba(215,195,138,0.3)] hover:scale-[1.02] transition-all duration-200 rounded-xl [&>*]:text-midnight"
                        disabled={isLoading}
                      >
                        {isLoading ? "Calculating..." : "Optimize My Taxes"}
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
                    <Card className="text-white border border-gold/15 rounded-xl max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-white flex items-center">
                          <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0" />
                          Tax Optimization Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs sm:text-sm text-silver/80">Current Tax Bracket</p>
                            <p className="text-2xl sm:text-3xl font-bold text-white">{result.taxBracket}</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-silver/80">Potential Annual Savings</p>
                            <p className="text-xl sm:text-2xl font-semibold text-white">
                              ${result.savings.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-silver/90 leading-relaxed mt-4">
                          {result.summary}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white rounded-xl border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight">
                          Optimization Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <ul className="space-y-2 text-sm">
                          {result.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-gold mr-2">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 p-3 bg-gold/[0.06] rounded-lg border border-gold/15">
                          <p className="text-sm text-midnight/80">{result.rrspImpact}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {insights && (
                      <Card className="bg-white border border-gold/15 rounded-xl shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] max-w-md mx-auto lg:max-w-none bg-[#faf9f6]">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight flex items-center">
                            <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gold flex-shrink-0" />
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

                    <Card className="bg-amber-50/50 border border-amber-200/50 rounded-xl max-w-md mx-auto lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs sm:text-sm text-midnight/80 italic">
                          <strong>Disclaimer:</strong> This calculator provides estimates. Actual tax savings depend on your complete tax situation. Consult with a qualified tax professional or financial advisor for personalized tax planning.
                        </p>
                      </CardContent>
                    </Card>

                    {false && (
                      <LeadCapture
                        source="tax-optimization-calculator"
                        toolData={{
                          taxBracket: result!.taxBracket,
                          savings: result!.savings,
                          tips: result!.tips,
                          summary: result!.summary,
                          formData: formData,
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="bg-white rounded-xl border border-midnight/[0.06] shadow-[0_1px_2px_rgba(11,26,44,0.04),0_4px_12px_rgba(11,26,44,0.03)] max-w-md mx-auto lg:max-w-none">
                    <CardContent className="p-4 sm:p-6 text-center text-midnight/70">
                      <p className="text-sm sm:text-base">
                        Enter your information to see tax optimization opportunities.
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

