import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Retirement Calculator",
  description: "Project your retirement savings and plan for your future with our retirement calculator.",
  alternates: { canonical: "/tools/retirement-calculator" },
}

export default function RetirementCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

