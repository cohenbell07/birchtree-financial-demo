import { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "AI Financial Advisor",
  description: "Get general financial information and answers to your questions from our AI assistant.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function AIAdvisorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

