import { NextRequest, NextResponse } from "next/server"

// Web search function using DuckDuckGo (free, no API key needed)
async function searchWeb(query: string): Promise<string> {
  try {
    // Using DuckDuckGo Instant Answer API (free, no key required)
    const searchQuery = encodeURIComponent(`${query} Canada`)
    
    // Create timeout controller for graceful degradation
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const response = await fetch(`https://api.duckduckgo.com/?q=${searchQuery}&format=json&no_html=1&skip_disambig=1`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      return "" // Gracefully degrade - return empty string
    }

    const data = await response.json()
    let context = ""
    
    // Extract useful information from DuckDuckGo response
    if (data.AbstractText) {
      context += `Current Information: ${data.AbstractText}\n`
    }
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      context += "\nRelated Information:\n"
      data.RelatedTopics.slice(0, 3).forEach((topic: any, index: number) => {
        if (topic.Text) {
          context += `${index + 1}. ${topic.Text.substring(0, 150)}...\n`
        }
      })
    }
    
    return context
  } catch (error) {
    // Gracefully handle any errors - return empty string so chat still works
    // This includes timeouts, rate limits, network errors, etc.
    if (error instanceof Error && error.name !== 'AbortError') {
      console.warn("Web search unavailable (this is okay, chat will still work):", error.message)
    }
    return "" // Empty string means no web search context, but chat continues normally
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, type } = body

    // Get API key from environment
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      )
    }

    // Get current date dynamically (updates automatically each day)
    const now = new Date()
    const currentDate = now.toLocaleDateString("en-CA", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    })
    const currentYear = now.getFullYear()

    // Perform web search for chat type to get current information (gracefully degrades if unavailable)
    let webSearchContext = ""
    if (type === "chat") {
      webSearchContext = await searchWeb(prompt)
    }

    // Create system prompt based on type
    let systemPrompt = ""
    if (type === "risk-profiler") {
      systemPrompt = `You are a Canadian financial advisor providing general investment risk assessment information. 
      Based on the user's inputs, provide a brief summary of their risk profile category (Conservative, Moderate, Growth, or Aggressive) 
      and what this means for their investment strategy. Focus on Canadian investment vehicles like RRSPs, TFSAs, and Canadian securities. 
      Be general and educational only. Do not provide specific investment recommendations.`
    } else if (type === "retirement") {
      systemPrompt = `You are a Canadian financial advisor providing general retirement planning information. 
      Based on the user's retirement calculation inputs, provide a brief, educational summary of their retirement projection. 
      Reference Canadian retirement vehicles like RRSPs, TFSAs, CPP (Canada Pension Plan), and OAS (Old Age Security) when relevant. 
      Be general and educational only. Do not provide specific financial advice or guarantees.`
    } else {
      systemPrompt = `You are an AI financial advisor assistant for Birchtree Financial, a Canadian financial advisory firm based in Olds, Alberta.

CURRENT DATE: ${currentDate} (Year: ${currentYear})

IMPORTANT: 
- Always use the current date (${currentYear}) when discussing financial information
- Do not reference outdated information from previous years unless specifically asked about historical data
- Today's date is ${currentDate} - use this for all time-sensitive information

KNOWLEDGE BASE:
Services offered by Birchtree Financial:
- Retirement Planning (RRSP, CPP, OAS strategies)
- Investment Management (portfolio management, wealth growth)
- Insurance Strategies (life, disability, critical illness insurance)
- Tax Optimization (TFSA, RRSP optimization, tax planning)
- Wealth Building (strategic advisory, legacy planning)
- Estate Planning (wills, powers of attorney, probate)

Available Financial Tools (suggest when relevant):
- Risk Profiler - For investment risk assessment
- Retirement Calculator - For retirement planning questions
- TFSA vs RRSP Analyzer - For TFSA/RRSP comparison questions
- Tax Optimization Calculator - For tax planning questions
- RESP Planner - For education savings questions
- CPP/OAS Optimizer - For CPP/OAS timing questions
- Net Worth Tracker - For net worth and debt questions
- Bank Loan Calculator - For mortgage/loan questions
- Savings Calculator - For savings goal questions

RESPONSE GUIDELINES:
1. Focus on Canadian financial products, regulations, and tax structures (RRSP, TFSA, CPP, OAS, RESP, etc.)
2. When a user's question relates to a specific tool, naturally suggest it by directing them to the Resources page. For example:
   - Retirement questions → "You might find our Retirement Calculator helpful. You can access it by going to the Resources page and selecting it from the Tools section."
   - Tax questions → "Our Tax Optimization Calculator can help with this. Visit the Resources page and look for it in the Tools section."
   - Risk/investment questions → "Consider using our Risk Profiler tool, which you can find on the Resources page under Tools."
   - TFSA/RRSP questions → "Our TFSA vs RRSP Analyzer tool can help you compare these accounts. Go to the Resources page and select it from the Tools section."
   IMPORTANT: Do NOT include any URLs, paths, or links in your suggestions. Simply direct users to "the Resources page" and mention "Tools section" or "Tools".
3. Keep responses educational and general - do not provide personalized financial advice, guarantees, or specific investment recommendations
4. Use the most current information available. If web search results are provided, prioritize that information over your training data. If no web search results are available, use your knowledge but emphasize it may not be the most current.
5. Always reference the current year (${currentYear}) when discussing contribution limits, tax rates, or other time-sensitive information.
6. End every response with this exact disclaimer: "This is general Canadian financial information only and does not constitute personalized financial, legal, or tax advice. For personalized advice tailored to your situation, consider booking a consultation with a Birchtree Financial advisor."
7. Do NOT include any buttons, links to schedule consultations, or other call-to-action elements in the response body - only the disclaimer text at the end.`
    }

    // Build user message with web search context if available (gracefully handles when search is unavailable)
    let userMessage = prompt
    if (webSearchContext && webSearchContext.trim().length > 0) {
      userMessage = `${prompt}\n\n[Current Information from Web Search - ${currentDate}]:\n${webSearchContext}\n\nPlease use this current information to provide an up-to-date answer for ${currentYear}.`
    } else {
      // No web search available - still works, just without current web data
      userMessage = `${prompt}\n\nNote: Please provide information relevant to ${currentYear} (current year).`
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("OpenAI API error:", error)
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: 500 }
      )
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || "No response generated"

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error in AI analyze route:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

