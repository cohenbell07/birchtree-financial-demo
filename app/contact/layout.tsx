import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact — Financial Advisor in Olds, Alberta",
  description:
    "Contact Birchtree Financial at 4914 50 Ave, Olds, AB, or call (403) 556-7777. Book a complimentary consultation — in person, by phone, or over Zoom.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Birchtree Financial — Olds, Alberta",
    description:
      "Visit us at 4914 50 Ave, Olds, AB or call (403) 556-7777 to book a complimentary consultation.",
    type: "website",
    locale: "en_CA",
    url: "/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

