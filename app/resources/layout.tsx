import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resources",
  description: "Financial articles, guides, tools, and resources to help you make informed decisions about your financial future.",
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

