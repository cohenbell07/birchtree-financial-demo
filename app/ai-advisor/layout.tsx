import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Financial Advisor",
  description: "Get general financial information and answers to your questions from our AI assistant.",
}

export default function AIAdvisorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

