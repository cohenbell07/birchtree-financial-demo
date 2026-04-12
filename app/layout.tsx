import type { Metadata } from "next"
import { Inter, Libre_Baskerville } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ChatBot from "@/components/ChatBot"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Premium typography: Libre Baskerville for headings (closest match to logo serif)
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: {
    default: "Birchtree Financial | Premium Financial Advisory Services",
    template: "%s | Birchtree Financial",
  },
  description: "Modern Canadian financial advisory firm delivering clarity, confidence, and strategic financial insight. Expert RRSP, TFSA, and retirement planning services.",
  keywords: ["Canadian financial advisor", "RRSP planning", "TFSA strategies", "Canadian retirement planning", "wealth management Canada", "financial advisory Canada"],
  authors: [{ name: "Birchtree Financial" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://birchtreefinancial.ca",
    siteName: "Birchtree Financial",
    title: "Birchtree Financial | Premium Financial Advisory Services",
    description: "Expert financial advisory and wealth management services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birchtree Financial",
    description: "Premium financial advisory services",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable} h-full`}>
      <body className="font-body antialiased bg-white text-midnight h-full">
        <div className="min-h-full flex flex-col w-full max-w-full overflow-x-hidden">
          <Navbar />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </div>
        <ChatBot />
        <Analytics />
      </body>
    </html>
  )
}
