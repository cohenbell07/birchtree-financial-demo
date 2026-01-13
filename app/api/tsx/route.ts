import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Yahoo Finance symbol for TSX Composite (S&P/TSX Composite Index)
    const response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPTSE?interval=1d&range=1d', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://finance.yahoo.com/',
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'API error' }, { status: response.status })
    }

    const data = await response.json()

    if (data.chart?.result?.[0]) {
      const meta = data.chart.result[0].meta
      const regularMarketPrice = meta.regularMarketPrice
      const chartPreviousClose = meta.chartPreviousClose

      if (regularMarketPrice && chartPreviousClose !== undefined) {
        const change = regularMarketPrice - chartPreviousClose
        const changePercent = (change / chartPreviousClose) * 100

        return NextResponse.json({
          price: regularMarketPrice,
          change: change,
          changePercent: changePercent,
        })
      }
    }

    return NextResponse.json({ error: 'Invalid data format' }, { status: 500 })
  } catch (error) {
    console.error('Error fetching TSX:', error)
    return NextResponse.json({ error: 'Failed to fetch TSX data' }, { status: 500 })
  }
}

