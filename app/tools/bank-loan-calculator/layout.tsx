import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bank Loan Calculator",
  description: "Calculate your Canadian mortgage or loan payments with semi-annual compounding. Compare monthly and biweekly payment schedules and total interest costs.",
  keywords: ["mortgage calculator Canada", "loan calculator", "mortgage payment calculator", "Canadian mortgage rates", "amortization calculator"],
  openGraph: {
    title: "Bank Loan Calculator | Birchtree Financial",
    description: "Calculate your Canadian mortgage or loan payments with proper semi-annual compounding.",
    type: "website",
    locale: "en_CA",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
