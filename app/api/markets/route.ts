import { NextResponse } from "next/server"

// Consolidated live-quote endpoint for the homepage "Markets at a glance" card.
// Pulls the same major indices the old ticker banner showed, from Yahoo
// Finance's free chart API (no key). Server-side revalidate keeps us well
// under Yahoo's rate limits even when many visitors poll at once.

export const dynamic = "force-dynamic"

// The same six instruments the original ticker banner carried.
const SYMBOLS = [
  { key: "tsx", label: "S&P/TSX Composite", symbol: "%5EGSPTSE" },
  { key: "sp500", label: "S&P 500", symbol: "%5EGSPC" },
  { key: "nasdaq", label: "Nasdaq 100", symbol: "%5ENDX" },
  { key: "dow", label: "Dow Jones", symbol: "%5EDJI" },
  { key: "gold", label: "Gold", symbol: "GC%3DF" },
  { key: "silver", label: "Silver", symbol: "SI%3DF" },
]

async function fetchQuote(symbol: string) {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Referer: "https://finance.yahoo.com/",
      },
      // Cache the upstream call for 20s so a burst of visitors hits Yahoo once.
      next: { revalidate: 20 },
    },
  )
  if (!res.ok) throw new Error(`status ${res.status}`)
  const data = await res.json()
  const meta = data?.chart?.result?.[0]?.meta
  if (!meta || typeof meta.regularMarketPrice !== "number") {
    throw new Error("no meta")
  }
  const price: number = meta.regularMarketPrice
  const prev: number =
    typeof meta.chartPreviousClose === "number"
      ? meta.chartPreviousClose
      : meta.previousClose
  const change = price - prev
  const changePercent = prev ? (change / prev) * 100 : 0
  return { price, change, changePercent }
}

export async function GET() {
  const items = await Promise.all(
    SYMBOLS.map(async (s) => {
      try {
        const q = await fetchQuote(s.symbol)
        return { key: s.key, label: s.label, ...q }
      } catch {
        return {
          key: s.key,
          label: s.label,
          price: null,
          change: null,
          changePercent: null,
        }
      }
    }),
  )

  return NextResponse.json(
    { items, updatedAt: Date.now() },
    { headers: { "Cache-Control": "no-store" } },
  )
}
