import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Why You Need a Will",
  description: "Understanding the importance of estate planning for Canadians. Learn why every Canadian needs a will and how to protect your family's financial future.",
  keywords: ["why you need a will Canada", "estate planning Canada", "Canadian will planning", "probate Canada", "estate protection", "will planning Alberta"],
  alternates: { canonical: "/why-you-need-a-will" },
  openGraph: {
    title: "Why You Need a Will | Birchtree Financial",
    description: "Understanding the importance of estate planning and wills for Canadians.",
    type: "website",
    locale: "en_CA",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
