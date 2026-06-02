import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tax Optimization Calculator",
  description: "Calculate your Canadian tax savings with RRSP and TFSA optimization strategies. See how contributions reduce your federal and provincial tax burden.",
  keywords: ["Canadian tax calculator", "RRSP tax savings", "TFSA optimization", "tax planning Canada", "marginal tax rate calculator"],
  openGraph: {
    title: "Tax Optimization Calculator | Birchtree Financial",
    description: "Calculate your Canadian tax savings with RRSP and TFSA optimization strategies.",
    type: "website",
    locale: "en_CA",
  },
  alternates: { canonical: "/tools/tax-optimization-calculator" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
