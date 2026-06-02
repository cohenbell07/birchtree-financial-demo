import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Birchtree Financial — our advisory services, fees, fiduciary standard, LLQP licensing, and how to get started in Olds, Alberta.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Birchtree Financial",
    description:
      "Common questions about our financial advisory services, fees, and process.",
    type: "website",
    locale: "en_CA",
    url: "/faq",
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

