import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us — Family-Run Financial Advisors in Olds, Alberta",
  description:
    "Birchtree Financial is a family-run, LLQP-licensed advisory firm in Olds, Alberta with 30+ years of experience. Learn our story, mission, values, and community roots.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Birchtree Financial — Olds, Alberta",
    description:
      "A family-run financial advisory firm in Olds, Alberta serving clients across Alberta and Canada for over three decades.",
    type: "website",
    locale: "en_CA",
    url: "/about",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

