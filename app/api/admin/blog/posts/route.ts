import { NextRequest, NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog"
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
    const posts = getAllPosts()
    
    // Return posts with full content for editing
    return NextResponse.json({ ok: true, posts })
  } catch (error: any) {
    if (error.message === "Not authenticated" || error.message === "Not authorized") {
      return NextResponse.json({ ok: false, error: error.message }, { status: 401 })
    }
    return NextResponse.json({ ok: false, error: error.message || "Failed to fetch posts" }, { status: 500 })
  }
}

