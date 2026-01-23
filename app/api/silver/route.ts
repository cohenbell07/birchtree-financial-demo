import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Yahoo Finance symbol for Silver futures (SI=F)
    // Alternative: XAGUSD=X for spot price
    const response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/SI%3DF?interval=1d&range=1d', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://finance.yahoo.com/',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limited' },
          { status: 429 }
        )
      }
      throw new Error(`API error: ${response.status}`)
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
    console.error('Error fetching Silver:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Silver data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

