import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Birchtree Financial's mission, values, and commitment to helping clients achieve their financial goals.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

