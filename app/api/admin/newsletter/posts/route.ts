import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/supabaseServer"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

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

  // Verify session token
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
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
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
    const result = await db.getNewsletterPosts()
    return NextResponse.json({ ok: true, posts: result.data || [], error: result.error })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await verifyAdmin()
    const body = await request.json()
    const { subject, content_html, status } = body

    if (!subject || !content_html) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    const result = await db.createNewsletterPost({
      subject,
      content_html,
      status: status || "draft",
    })

    if (result.error) {
      return NextResponse.json({ ok: false, error: result.error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, post: result.data })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 401 })
  }
}

