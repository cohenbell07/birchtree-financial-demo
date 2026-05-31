"use client"

import Link from "next/link"
import {
  ArrowRight,
  PiggyBank,
  Coins,
  Scale,
  Receipt,
  CalendarClock,
  GraduationCap,
  LineChart,
  Landmark,
  Gauge,
} from "lucide-react"

import PageHeader from "@/components/layout/PageHeader"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { RevealStagger } from "@/components/ui/reveal"

const calculators = [
  {
    icon: PiggyBank,
    title: "Retirement Calculator",
    desc: "Project your savings and income through retirement.",
    href: "/tools/retirement-calculator",
  },
  {
    icon: Coins,
    title: "Savings Calculator",
    desc: "See how your money grows with compound interest over time.",
    href: "/tools/savings-calculator",
  },
  {
    icon: Scale,
    title: "TFSA vs RRSP Analyzer",
    desc: "Compare both accounts to find your best tax fit.",
    href: "/tools/tfsa-rrsp-analyzer",
  },
  {
    icon: Receipt,
    title: "Tax Optimization Calculator",
    desc: "Estimate tax savings from RRSP & TFSA strategies.",
    href: "/tools/tax-optimization-calculator",
  },
  {
    icon: CalendarClock,
    title: "CPP / OAS Timing Optimizer",
    desc: "Find the optimal age to start your government benefits.",
    href: "/tools/cpp-oas-optimizer",
  },
  {
    icon: GraduationCap,
    title: "RESP Planner",
    desc: "Plan education savings and estimate CESG grants.",
    href: "/tools/resp-planner",
  },
  {
    icon: LineChart,
    title: "Net Worth & Debt Tracker",
    desc: "Track your net worth and build a debt-payoff plan.",
    href: "/tools/net-worth-tracker",
  },
  {
    icon: Landmark,
    title: "Bank Loan Calculator",
    desc: "Calculate Canadian mortgage and loan payments.",
    href: "/tools/bank-loan-calculator",
  },
  {
    icon: Gauge,
    title: "Investment Risk Profiler",
    desc: "Discover your personal investment risk profile.",
    href: "/tools/risk-profiler",
  },
]

export default function CalculatorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Financial Calculators"
        subtitle="Free, Canadian-built tools to model every part of your financial life — no sign-up required."
      />

      <Section tone="paper" topRule>
        <Container size="wide">
          <RevealStagger
            stagger={0.05}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {calculators.map((calc) => {
              const Icon = calc.icon
              return (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="group flex h-full flex-col rounded-2xl border border-midnight/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-midnight/[0.06] bg-midnight/[0.03] transition-colors duration-300 group-hover:border-gold/30 group-hover:bg-gold/[0.06]">
                    <Icon
                      className="h-[20px] w-[20px] text-midnight/75 transition-colors duration-300 group-hover:text-gold-dark"
                      strokeWidth={1.6}
                    />
                  </span>
                  <h3 className="mt-5 font-heading text-[1.1rem] font-bold leading-snug text-midnight">
                    {calc.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-midnight/55">
                    {calc.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center text-[0.82rem] font-semibold text-midnight transition-colors group-hover:text-gold-dark">
                    Open calculator
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </RevealStagger>
        </Container>
      </Section>
    </>
  )
}
