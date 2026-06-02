import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Investment Risk Profiler",
  description: "Discover your investment risk profile with our AI-powered assessment tool.",
  alternates: { canonical: "/tools/risk-profiler" },
}

export default function RiskProfilerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

