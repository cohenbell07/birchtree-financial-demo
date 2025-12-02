import { NextRequest, NextResponse } from "next/server"

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

    // Create system prompt based on type
    let systemPrompt = ""
    if (type === "risk-profiler") {
      systemPrompt = `You are a financial advisor providing general investment risk assessment information. 
      Based on the user's inputs, provide a brief summary of their risk profile category (Conservative, Moderate, Growth, or Aggressive) 
      and what this means for their investment strategy. Be general and educational only. Do not provide specific investment recommendations.`
    } else if (type === "retirement") {
      systemPrompt = `You are a financial advisor providing general retirement planning information. 
      Based on the user's retirement calculation inputs, provide a brief, educational summary of their retirement projection. 
      Be general and educational only. Do not provide specific financial advice or guarantees.`
    } else {
      systemPrompt = `You are a financial advisor assistant providing general financial information only. 
      You must include the following disclaimer in your response: "This is general information only and does not constitute personalized financial, legal, or tax advice. 
      Please consult with qualified professionals for advice specific to your situation." 
      You cannot provide personalized financial advice, guarantees, specific investment recommendations, or legal/tax guidance. 
      Keep responses educational and general.`
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
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
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

