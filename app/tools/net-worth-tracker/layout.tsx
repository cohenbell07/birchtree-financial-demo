import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Net Worth & Debt Payoff Tracker",
  description: "Calculate your net worth, debt-to-income ratio, and create a debt payoff plan. Track your financial health with our comprehensive tracker.",
  keywords: ["net worth calculator Canada", "debt payoff calculator", "debt-to-income ratio", "financial health tracker", "debt management"],
  openGraph: {
    title: "Net Worth & Debt Payoff Tracker | Birchtree Financial",
    description: "Calculate your net worth and create a debt payoff plan with our comprehensive tracker.",
    type: "website",
    locale: "en_CA",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
