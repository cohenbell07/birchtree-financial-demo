import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CPP/OAS Timing Optimizer",
  description: "Determine the optimal age to start your Canada Pension Plan and Old Age Security benefits. Compare early, standard, and delayed claiming strategies.",
  keywords: ["CPP calculator", "OAS calculator", "CPP timing optimizer", "Canada Pension Plan", "Old Age Security", "retirement benefits Canada"],
  openGraph: {
    title: "CPP/OAS Timing Optimizer | Birchtree Financial",
    description: "Determine the optimal age to start your Canada Pension Plan and Old Age Security benefits.",
    type: "website",
    locale: "en_CA",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
