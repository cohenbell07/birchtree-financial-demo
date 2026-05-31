import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Financial Calculators",
  description:
    "Free, Canadian-built financial calculators — retirement, savings, TFSA vs RRSP, tax optimization, CPP/OAS timing, RESP, net worth, mortgage, and investment risk.",
  keywords: [
    "Canadian financial calculators",
    "retirement calculator Canada",
    "TFSA RRSP calculator",
    "tax optimization calculator",
    "mortgage calculator Canada",
  ],
  openGraph: {
    title: "Financial Calculators | Birchtree Financial",
    description:
      "Free Canadian financial calculators to model every part of your financial life.",
    type: "website",
    locale: "en_CA",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
