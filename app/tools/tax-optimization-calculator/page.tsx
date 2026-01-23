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
  const [isLoading, setIsLoading] = useState(false)

  const calculateTax = () => {
    const income = parseFloat(formData.income) || 75000
    const rrspContribution = parseFloat(formData.rrspContribution) || 0
    const tfsaContribution = parseFloat(formData.tfsaContribution) || 0
    const deductions = parseFloat(formData.deductions) || 0
    const isMarried = formData.maritalStatus === "married"

    // Simplified Canadian tax brackets (federal + Ontario average)
    const getTaxBracket = (taxableIncome: number) => {
      if (taxableIncome <= 50197) return "15%"
      if (taxableIncome <= 100392) return "20.5%"
      if (taxableIncome <= 155625) return "26%"
      if (taxableIncome <= 221708) return "29%"
      return "33%"
    }

    // Current tax
    const taxableIncome = income - deductions
    const currentTaxBracket = getTaxBracket(taxableIncome)
    const currentTax = taxableIncome * (parseFloat(currentTaxBracket) / 100)

    // Optimized with RRSP
    const optimizedTaxableIncome = taxableIncome - rrspContribution
    const optimizedTaxBracket = getTaxBracket(optimizedTaxableIncome)
    const optimizedTax = optimizedTaxableIncome * (parseFloat(optimizedTaxBracket) / 100)
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
    } catch (error) {
      console.warn("AI summary generation failed, using default")
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
                      <Calculator className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-emerald flex-shrink-0" />
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
                        className="w-full relative z-10 !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0"
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
                    <Card className="gradient-bg text-white shadow-glow border-emerald/30 max-w-md mx-auto lg:max-w-none">
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

                    <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-midnight">
                          Optimization Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <ul className="space-y-2 text-sm">
                          {result.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-emerald mr-2">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 p-3 bg-emerald/10 rounded-lg">
                          <p className="text-sm text-midnight/80">{result.rrspImpact}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass border-amber-200/50 bg-amber-50/50 max-w-md mx-auto lg:max-w-none">
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-xs sm:text-sm text-midnight/80 italic">
                          <strong>Disclaimer:</strong> This calculator provides estimates. Actual tax savings depend on your complete tax situation. Consult with a qualified tax professional or financial advisor for personalized tax planning.
                        </p>
                      </CardContent>
                    </Card>

                    <LeadCapture
                      source="tax-optimization-calculator"
                      toolData={{
                        taxBracket: result.taxBracket,
                        savings: result.savings,
                        tips: result.tips,
                        summary: result.summary,
                        formData: formData,
                      }}
                    />
                  </div>
                ) : (
                  <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto lg:max-w-none">
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

