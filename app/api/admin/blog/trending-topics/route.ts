import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

async function verifyAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Not configured")
  }

  const cookieStore = await cookies()
  const userId = cookieStore.get("sb-user-id")?.value
  const sessionToken = cookieStore.get("sb-access-token")?.value

  if (!userId || !sessionToken) {
    throw new Error("Not authenticated")
  }

  try {
    const sessionData = JSON.parse(Buffer.from(sessionToken, "base64").toString())
    const sessionAge = Date.now() - sessionData.timestamp
    if (sessionAge > 7 * 24 * 60 * 60 * 1000 || sessionData.userId !== userId) {
      throw new Error("Invalid session")
    }
  } catch {
    throw new Error("Invalid session")
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: adminUser, error: adminError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", userId)
    .single()

  if (adminError || !adminUser) {
    throw new Error("Not authorized")
  }

  return { id: userId }
}

export async function GET(request: NextRequest) {
  try {
    await verifyAdmin()

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json({
        ok: false,
        error: "Anthropic API key not configured",
      })
    }

    const currentYear = new Date().getFullYear()

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: `You are a financial content strategist for a Canadian financial advisory firm. Generate 10 trending Canadian financial topics that would be relevant for blog posts in ${currentYear}. Focus on:
- Canadian-specific financial topics (RRSP, TFSA, CPP, OAS, RESP, GIC, etc.)
- Current trends and changes in Canadian financial regulations for ${currentYear}
- Topics relevant to Canadian investors and savers
- Avoid USA-specific content entirely
- Make topics specific and actionable (not generic)
- Return only the topic titles, one per line, no numbering or bullets`,
        messages: [
          {
            role: "user",
            content: `Generate 10 trending Canadian financial blog post topics for ${currentYear}. Return only the topic titles, one per line.`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Anthropic API error")
    }

    const data = await response.json()
    const topicsText = data.content?.[0]?.text || ""

    const topics = topicsText
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0)
      .filter((line: string) => !line.match(/^\d+[\.\)]/))
      .slice(0, 10)

    return NextResponse.json({ ok: true, topics })
  } catch (error: any) {
    console.error("[API] admin/blog/trending-topics error:", error)
    if (error.message === "Not authenticated" || error.message === "Not authorized") {
      return NextResponse.json({ ok: false, error: error.message }, { status: 401 })
    }
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to fetch trending topics" },
      { status: 500 }
    )
  }
}
