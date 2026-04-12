import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "RESP Planner",
  description: "Plan your child's education savings with our RESP calculator. Estimate CESG government grants, required contributions, and projected growth.",
  keywords: ["RESP calculator", "RESP planner Canada", "CESG calculator", "education savings plan", "Canada Education Savings Grant"],
  openGraph: {
    title: "RESP Planner | Birchtree Financial",
    description: "Plan your child's education savings with government grants and projected growth calculations.",
    type: "website",
    locale: "en_CA",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
