import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refer a Friend",
  description: "Share Birchtree Financial with someone you care about. Refer a friend or family member to our premium Canadian financial advisory services.",
  alternates: { canonical: "/referral" },
  openGraph: {
    title: "Refer a Friend | Birchtree Financial",
    description: "Share Birchtree Financial with someone you care about.",
    type: "website",
    locale: "en_CA",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
