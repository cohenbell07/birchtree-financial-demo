import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Savings Calculator",
  description: "Plan your savings goals and calculate how your money will grow over time with compound interest. Project your TFSA, RRSP, and general savings growth.",
  keywords: ["savings calculator Canada", "compound interest calculator", "TFSA growth calculator", "savings goal planner"],
  openGraph: {
    title: "Savings Calculator | Birchtree Financial",
    description: "Plan your savings goals and calculate how your money will grow over time with compound interest.",
    type: "website",
    locale: "en_CA",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
