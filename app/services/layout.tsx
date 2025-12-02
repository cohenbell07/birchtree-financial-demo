import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive financial planning and investment management services tailored to your unique needs.",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

