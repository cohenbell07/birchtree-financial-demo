import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the experienced financial professionals at Birchtree Financial dedicated to your success.",
}

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

