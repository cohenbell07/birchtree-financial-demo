import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Helpful Tools & Resources",
  description: "Access government pension information, registered savings plan guides, will planning checklists, and essential financial resources for Canadians.",
  keywords: ["Canadian financial resources", "government pension tools", "will planning checklist", "financial planning resources Canada"],
  alternates: { canonical: "/helpful-tools" },
  openGraph: {
    title: "Helpful Tools & Resources | Birchtree Financial",
    description: "Essential financial resources, government tools, and planning guides for Canadians.",
    type: "website",
    locale: "en_CA",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
