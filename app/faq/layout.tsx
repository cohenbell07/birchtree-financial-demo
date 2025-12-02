import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions about our financial advisory services, processes, and how we can help you achieve your financial goals.",
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

