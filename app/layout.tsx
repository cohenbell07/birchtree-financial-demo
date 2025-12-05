import type { Metadata } from "next"
import { Inter, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Use Inter for headings with tighter tracking as fallback for Sora
const headingFont = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700", "800"],
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: {
    default: "BirchTree Financial | Premium Financial Advisory Services",
    template: "%s | BirchTree Financial",
  },
  description: "Modern Canadian financial advisory firm delivering clarity, confidence, and strategic financial insight. Expert RRSP, TFSA, and retirement planning services.",
  keywords: ["Canadian financial advisor", "RRSP planning", "TFSA strategies", "Canadian retirement planning", "wealth management Canada", "financial planning Canada"],
  authors: [{ name: "BirchTree Financial" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
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
    <html lang="en" className={`${inter.variable} ${headingFont.variable} ${ibmPlexSans.variable}`}>
      <body className="font-body antialiased bg-white text-midnight">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
