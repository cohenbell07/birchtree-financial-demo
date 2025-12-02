import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "BirchTree Financial | Premium Financial Advisory Services",
    template: "%s | BirchTree Financial",
  },
  description: "Expert financial planning and wealth management services. Helping you achieve your financial goals with personalized strategies and trusted guidance.",
  keywords: ["financial advisor", "wealth management", "retirement planning", "investment management", "financial planning"],
  authors: [{ name: "BirchTree Financial" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://birchtreefinancial.com",
    siteName: "BirchTree Financial",
    title: "BirchTree Financial | Premium Financial Advisory Services",
    description: "Expert financial planning and wealth management services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BirchTree Financial",
    description: "Premium financial advisory services",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body antialiased bg-cream text-slate">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
