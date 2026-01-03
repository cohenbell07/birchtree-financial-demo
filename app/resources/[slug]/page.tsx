"use client"

import { notFound } from "next/navigation"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileText, BookOpen } from "lucide-react"

const resourceContent: Record<string, {
  title: string
  description: string
  type: "Article" | "Guide"
  readTime: string
  content: string[]
}> = {
  "understanding-retirement-planning-basics": {
    title: "Understanding Retirement Planning Basics",
    description: "A comprehensive guide to getting started with retirement planning, covering key concepts and strategies.",
    type: "Article",
    readTime: "5 min read",
    content: [
      "Retirement planning is one of the most important financial decisions you'll make in your lifetime. In Canada, there are several key components to consider when planning for retirement, including the Canada Pension Plan (CPP), Old Age Security (OAS), and your personal savings through Registered Retirement Savings Plans (RRSPs) and Tax-Free Savings Accounts (TFSAs).",
      "The first step in retirement planning is understanding your retirement goals. How much income will you need? What lifestyle do you want to maintain? These questions help determine how much you need to save and invest.",
      "RRSPs are one of the most popular retirement savings vehicles in Canada. Contributions are tax-deductible, meaning they reduce your taxable income in the year you contribute. The money grows tax-free until withdrawal, at which point it's taxed as income. This is particularly beneficial if you expect to be in a lower tax bracket during retirement.",
      "TFSAs offer another excellent retirement savings option. While contributions aren't tax-deductible, all growth and withdrawals are completely tax-free. This makes TFSAs ideal for those who expect to be in the same or higher tax bracket during retirement.",
      "CPP and OAS are government-provided retirement benefits. CPP is based on your contributions throughout your working life, while OAS is available to most Canadians aged 65 and older who meet residency requirements. The timing of when you start these benefits can significantly impact your lifetime benefits.",
      "A well-rounded retirement plan typically includes a mix of these savings vehicles, tailored to your individual circumstances, tax situation, and retirement goals. Working with a qualified financial advisor can help you create a personalized retirement strategy that maximizes your benefits and minimizes your tax burden."
    ]
  },
  "tax-efficient-investment-strategies": {
    title: "Tax-Efficient Investment Strategies",
    description: "Learn how to minimize taxes on your investments while maximizing returns.",
    type: "Article",
    readTime: "7 min read",
    content: [
      "Tax-efficient investing is crucial for maximizing your after-tax returns in Canada. Understanding how different investment vehicles are taxed can help you make smarter decisions about where to hold your investments.",
      "Canadian dividends receive preferential tax treatment through the dividend tax credit. This makes dividend-paying Canadian stocks particularly attractive for non-registered accounts, as they're taxed at a lower rate than interest income or foreign dividends.",
      "Capital gains are taxed more favourably than interest income. Only 50% of capital gains are included in your taxable income, making growth investments like stocks and equity funds more tax-efficient than bonds or GICs in non-registered accounts.",
      "Interest income from bonds, GICs, and savings accounts is fully taxable at your marginal tax rate. For this reason, these investments are often better suited for registered accounts like RRSPs or TFSAs, where they can grow tax-free or tax-deferred.",
      "Asset location strategy involves placing investments in the most tax-advantaged accounts. Generally, interest-bearing investments should go in RRSPs or TFSAs, while Canadian dividend stocks can be held in non-registered accounts to take advantage of the dividend tax credit.",
      "Tax-loss harvesting is a strategy where you sell investments at a loss to offset capital gains. This can help reduce your tax bill while maintaining your investment strategy. However, be aware of the superficial loss rule, which prevents you from claiming a loss if you repurchase the same or identical investment within 30 days.",
      "For high-income earners, maximizing RRSP contributions can provide significant tax savings. The tax deduction reduces your current-year tax bill, and the money can be invested and grow tax-deferred until retirement, when you may be in a lower tax bracket.",
      "Remember that tax efficiency is just one factor in investment planning. Your overall strategy should balance tax considerations with your risk tolerance, time horizon, and financial goals. Consult with a qualified financial advisor to develop a tax-efficient investment strategy tailored to your situation."
    ]
  },
  "estate-planning-essentials": {
    title: "Estate Planning Essentials",
    description: "Important considerations for creating an effective estate plan that protects your legacy.",
    type: "Article",
    readTime: "6 min read",
    content: [
      "Estate planning is the process of arranging for the management and disposal of your assets after your death. In Canada, proper estate planning ensures your wishes are carried out, minimizes taxes, and reduces stress for your loved ones during a difficult time.",
      "A Will is the cornerstone of any estate plan. Without a Will, your estate will be distributed according to provincial intestacy laws, which may not align with your wishes. Your Will should name an executor to manage your estate, specify how assets should be distributed, and name guardians for minor children if applicable.",
      "Power of Attorney documents are essential for managing your affairs if you become incapacitated. A Power of Attorney for Property allows someone to manage your financial affairs, while a Power of Attorney for Personal Care covers healthcare decisions. These documents should be created while you're mentally capable.",
      "Beneficiary designations on registered accounts (RRSPs, TFSAs, insurance policies) take precedence over your Will. It's important to keep these designations up to date and ensure they align with your overall estate plan. Failure to do so can lead to unintended consequences.",
      "Probate is the legal process of validating your Will and granting authority to your executor. In some provinces, probate fees can be significant. Strategies to minimize probate include naming beneficiaries directly on accounts, using joint ownership (with caution), and setting up trusts.",
      "Tax planning is crucial in estate planning. Upon death, you're deemed to have disposed of all your assets at fair market value, which can trigger capital gains taxes. RRSPs and RRIFs are fully taxable upon death unless left to a spouse or qualifying beneficiary. Proper planning can help minimize these tax consequences.",
      "Business succession planning is important if you own a business. This involves planning for the transfer of ownership, ensuring business continuity, and addressing tax implications. A buy-sell agreement can help ensure a smooth transition.",
      "Regular review and updates are essential. Major life events like marriage, divorce, birth of children, or significant changes in assets should trigger a review of your estate plan. Laws and tax rules change, so periodic reviews with your financial advisor and lawyer are recommended."
    ]
  },
  "financial-advisory-checklist": {
    title: "Financial Advisory Checklist",
    description: "A step-by-step guide to organizing your financial life and planning for the future.",
    type: "Guide",
    readTime: "10 min read",
    content: [
      "Organizing your financial life is the first step toward achieving your financial goals. This comprehensive checklist will help you assess where you are and identify areas that need attention.",
      "**Current Financial Situation:**",
      "• Calculate your net worth (assets minus liabilities)",
      "• List all your assets: bank accounts, investments, real estate, vehicles, etc.",
      "• List all your liabilities: mortgages, loans, credit card debt, etc.",
      "• Track your monthly income and expenses",
      "• Review your credit report annually",
      "",
      "**Emergency Fund:**",
      "• Aim for 3-6 months of essential expenses in a high-interest savings account",
      "• Keep this fund easily accessible but separate from your daily spending account",
      "• Review and adjust the amount as your circumstances change",
      "",
      "**Debt Management:**",
      "• List all debts with interest rates and minimum payments",
      "• Prioritize high-interest debt for repayment",
      "• Consider debt consolidation if it reduces your overall interest costs",
      "• Avoid taking on new debt unless necessary",
      "",
      "**Retirement Planning:**",
      "• Determine your retirement income needs",
      "• Review your RRSP and TFSA contribution room",
      "• Maximize employer matching contributions if available",
      "• Understand your CPP and OAS entitlements",
      "• Create a retirement savings timeline",
      "",
      "**Insurance Coverage:**",
      "• Review life insurance needs based on dependents and debts",
      "• Assess disability insurance coverage",
      "• Review health and dental insurance",
      "• Consider long-term care insurance if appropriate",
      "",
      "**Estate Planning:**",
      "• Create or update your Will",
      "• Designate beneficiaries on all registered accounts",
      "• Create Power of Attorney documents",
      "• Review and update beneficiary designations regularly",
      "",
      "**Tax Planning:**",
      "• Understand your current tax bracket",
      "• Maximize tax-advantaged accounts (RRSP, TFSA)",
      "• Keep receipts for tax deductions and credits",
      "• Plan for major tax events (retirement, sale of assets)",
      "",
      "**Investment Review:**",
      "• Assess your risk tolerance",
      "• Review your asset allocation",
      "• Ensure your portfolio aligns with your goals and time horizon",
      "• Rebalance your portfolio as needed",
      "",
      "Regularly reviewing this checklist and working with a qualified financial advisor can help ensure you're on track to meet your financial goals."
    ]
  },
  "investment-portfolio-basics": {
    title: "Investment Portfolio Basics",
    description: "Understanding asset allocation, diversification, and building a solid investment portfolio.",
    type: "Guide",
    readTime: "12 min read",
    content: [
      "Building a solid investment portfolio is fundamental to achieving your long-term financial goals. Understanding the basics of asset allocation, diversification, and portfolio construction will help you make informed investment decisions.",
      "**Asset Allocation:**",
      "Asset allocation is the process of dividing your investments among different asset classes, such as stocks, bonds, and cash. The right allocation depends on your risk tolerance, time horizon, and financial goals. Generally, younger investors with longer time horizons can afford to take more risk and allocate more to stocks, while those closer to retirement may prefer a more conservative mix.",
      "",
      "**Diversification:**",
      "Diversification means spreading your investments across different types of assets, sectors, and geographic regions. This helps reduce risk because different investments perform differently under various market conditions. A well-diversified portfolio might include:",
      "• Canadian stocks across different sectors",
      "• International stocks from developed and emerging markets",
      "• Bonds of varying maturities and credit qualities",
      "• Real estate investment trusts (REITs)",
      "• Alternative investments (if appropriate)",
      "",
      "**Stocks (Equities):**",
      "Stocks represent ownership in companies. They offer the potential for higher returns but come with higher risk and volatility. Canadian stocks provide exposure to the domestic economy and benefit from the dividend tax credit. International stocks offer geographic diversification and exposure to global growth opportunities.",
      "",
      "**Bonds (Fixed Income):**",
      "Bonds are loans to governments or corporations. They provide regular interest payments and return of principal at maturity. Bonds are generally less volatile than stocks and can provide stability to a portfolio. Government bonds are considered safer but offer lower returns, while corporate bonds offer higher yields but carry more risk.",
      "",
      "**Rebalancing:**",
      "Over time, your portfolio's allocation will drift as different investments perform differently. Rebalancing involves adjusting your portfolio back to your target allocation. This typically means selling assets that have performed well and buying those that have underperformed, which enforces a 'buy low, sell high' discipline.",
      "",
      "**Cost Considerations:**",
      "Investment costs matter significantly over the long term. Management fees, trading costs, and other expenses can eat into your returns. Consider low-cost index funds or ETFs for broad market exposure, and be mindful of fees when selecting investment products.",
      "",
      "**Time Horizon:**",
      "Your investment time horizon significantly impacts your asset allocation. Money needed in the short term (less than 5 years) should be in more conservative investments, while long-term goals (10+ years) can accommodate more growth-oriented investments.",
      "",
      "**Risk Tolerance:**",
      "Understanding your risk tolerance is crucial. Can you handle market volatility? How would you react to a 20% portfolio decline? Your risk tolerance should inform your asset allocation, ensuring you can stick with your investment strategy during market downturns.",
      "",
      "Building a portfolio is an ongoing process that requires regular review and adjustment. Working with a qualified financial advisor can help you create a portfolio that aligns with your goals, risk tolerance, and time horizon while maintaining proper diversification and cost efficiency."
    ]
  }
}

export default function ResourcePage() {
  const params = useParams()
  const slug = params?.slug as string
  const resource = resourceContent[slug]

  if (!resource) {
    notFound()
  }

  const Icon = resource.type === "Article" ? FileText : BookOpen

  return (
    <div>
      <PageHeader
        title={resource.title}
        subtitle={resource.description}
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-teal" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Resource Meta */}
            <Card className="glass shadow-glow-hover border-emerald/20 mb-6 sm:mb-8">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4 text-sm text-midnight/70">
                  <div className="flex items-center">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald mr-2" />
                    <span className="font-medium">{resource.type}</span>
                  </div>
                  <span>•</span>
                  <span>{resource.readTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Resource Content */}
            <Card className="glass shadow-glow-hover border-emerald/20">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <article className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-midnight/80">
                  {resource.content.map((paragraph, index) => {
                    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                      // Bold heading
                      const heading = paragraph.slice(2, -2)
                      return (
                        <h3 key={index} className="text-xl sm:text-2xl font-heading font-bold text-midnight mb-3 mt-6">
                          {heading}
                        </h3>
                      )
                    } else if (paragraph.startsWith("•")) {
                      // Bullet point
                      return (
                        <li key={index} className="text-base sm:text-lg mb-2 ml-4">
                          {paragraph.slice(1).trim()}
                        </li>
                      )
                    } else if (paragraph === "") {
                      // Empty line for spacing
                      return <br key={index} />
                    } else {
                      // Regular paragraph
                      return (
                        <p key={index} className="text-base sm:text-lg leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      )
                    }
                  })}
                </article>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="glass shadow-glow-hover border-emerald/20 mt-6 sm:mt-8">
              <CardContent className="p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-midnight mb-3 sm:mb-4">
                  Need Personalized Guidance?
                </h3>
                <p className="text-sm sm:text-base text-midnight/70 mb-4 sm:mb-6 max-w-xl mx-auto">
                  While this resource provides valuable information, personalized financial planning requires understanding your unique situation. Schedule a consultation to discuss your specific needs.
                </p>
                <Button asChild size="lg" className="!bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white">
                  <Link href="/contact" className="!text-white">Schedule a Consultation</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Back to Resources */}
            <div className="mt-6 sm:mt-8 text-center">
              <Button asChild className="!bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0">
                <Link href="/resources" className="!text-white">
                  ← Back to Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

