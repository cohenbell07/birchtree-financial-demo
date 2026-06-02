import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Financial Advisory Services in Olds, Alberta",
  description:
    "Retirement, investment, insurance, tax optimization, wealth building, and estate planning from Birchtree Financial — serving Olds, central Alberta, and clients across Canada.",
  keywords: [
    "financial advisory services Olds",
    "retirement planning Alberta",
    "investment management Alberta",
    "estate planning Olds Alberta",
    "tax planning Canada",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Financial Advisory Services | Birchtree Financial",
    description:
      "Comprehensive financial advisory services for Albertans and Canadians — retirement, investment, insurance, tax, wealth, and estate planning.",
    type: "website",
    locale: "en_CA",
    url: "/services",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

