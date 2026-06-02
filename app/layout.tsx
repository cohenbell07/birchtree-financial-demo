import type { Metadata, Viewport } from "next"
import { Inter, Libre_Baskerville } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ChatBot from "@/components/ChatBot"
import JsonLd from "@/components/seo/JsonLd"
import { globalGraph } from "@/lib/schema"
import { siteConfig } from "@/lib/siteConfig"

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

export const viewport: Viewport = {
  themeColor: "#0B1A2C",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Birchtree Financial | Financial Advisor in Olds, Alberta",
    template: "%s | Birchtree Financial",
  },
  description:
    "Birchtree Financial is a family-run financial advisory firm in Olds, Alberta. Expert retirement, RRSP/TFSA, investment, insurance, tax, and estate planning for individuals, families, and business owners across Alberta and Canada.",
  keywords: [
    "financial advisor Olds",
    "financial advisor Olds Alberta",
    "financial planner Olds AB",
    "financial advisor near me",
    "retirement planning Alberta",
    "RRSP advisor Alberta",
    "TFSA planning Canada",
    "estate planning Olds Alberta",
    "investment advisor central Alberta",
    "financial advisor Red Deer",
    "Canadian financial advisor",
    "wealth management Alberta",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Birchtree Financial | Financial Advisor in Olds, Alberta",
    description:
      "Family-run financial advisory firm in Olds, Alberta. Retirement, investment, insurance, tax, and estate planning for Albertans and Canadians.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birchtree Financial | Financial Advisor in Olds, Alberta",
    description:
      "Family-run financial advisory firm in Olds, Alberta serving clients across Alberta and Canada.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
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
    <html lang="en-CA" className={`${inter.variable} ${libreBaskerville.variable} h-full`}>
      <body className="font-body antialiased bg-white text-midnight h-full">
        <JsonLd data={globalGraph()} />
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
