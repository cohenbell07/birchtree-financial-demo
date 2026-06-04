import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Financial Insights Blog",
  description: "Expert Canadian financial advice, RRSP strategies, TFSA tips, retirement planning insights, and tax optimization strategies from Birchtree Financial.",
  keywords: ["Canadian financial advice", "RRSP strategies", "TFSA tips", "retirement planning", "tax optimization", "CPP OAS", "financial blog Canada"],
  openGraph: {
    title: "Financial Insights Blog | Birchtree Financial",
    description: "Expert Canadian financial advice and strategies for your financial journey.",
    type: "website",
    locale: "en_CA",
    url: "https://www.birchtreefinancial.ca/blog",
  },
  alternates: {
    canonical: "https://www.birchtreefinancial.ca/blog",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
