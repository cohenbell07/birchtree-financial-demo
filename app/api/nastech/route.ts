import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Nasdaq Composite Index ticker symbol
    const symbol = '^IXIC'
    
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`, {
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
      // If symbol doesn't exist or other error, return null values
      console.warn(`Nasdaq API error: ${response.status} - Symbol may be incorrect`)
      return NextResponse.json({
        price: null,
        change: null,
        changePercent: null,
        error: `Symbol not found (${response.status}) - please update ticker symbol`,
      })
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

    // If we get here, data format is invalid
    console.warn('Nasdaq: Invalid data format from API')
    return NextResponse.json({
      price: null,
      change: null,
      changePercent: null,
      error: 'Invalid data format',
    })
  } catch (error) {
    console.error('Error fetching Nasdaq:', error)
    return NextResponse.json({
      price: null,
      change: null,
      changePercent: null,
      error: 'Failed to fetch Nasdaq data',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

