import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Team — The Birch Family Advisors in Olds, Alberta",
  description:
    "Meet the Birchtree Financial team in Olds, Alberta — Melissa Birch (Owner & Financial Advisor, LLQP), founder Art Birch, and the family team dedicated to your financial success.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Meet the Team | Birchtree Financial — Olds, Alberta",
    description:
      "The family team behind Birchtree Financial, a financial advisory firm in Olds, Alberta.",
    type: "website",
    locale: "en_CA",
    url: "/team",
  },
}

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

