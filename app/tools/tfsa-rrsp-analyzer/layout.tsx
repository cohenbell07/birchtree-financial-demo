import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TFSA vs RRSP Analyzer",
  description: "Compare TFSA and RRSP accounts to determine which is better for your situation. Analyze tax benefits, growth projections, and withdrawal strategies.",
  keywords: ["TFSA vs RRSP", "TFSA calculator", "RRSP calculator", "registered accounts comparison Canada", "tax-free savings account"],
  openGraph: {
    title: "TFSA vs RRSP Analyzer | Birchtree Financial",
    description: "Compare TFSA and RRSP accounts to determine which is better for your financial situation.",
    type: "website",
    locale: "en_CA",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
