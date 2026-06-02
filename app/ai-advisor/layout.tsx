import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Financial Advisor",
  description:
    "Explore Birchtree Financial's AI assistant for general Canadian financial questions. For personalized advice, book a complimentary consultation with our Olds, Alberta advisors.",
  alternates: { canonical: "/ai-advisor" },
}

export default function AiAdvisorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
