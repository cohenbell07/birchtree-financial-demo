import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function GET(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: false, authenticated: false, error: "Not configured" }, { status: 500 })
  }

  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("sb-user-id")?.value
    const sessionToken = cookieStore.get("sb-access-token")?.value

    if (!userId || !sessionToken) {
      return NextResponse.json({ ok: false, authenticated: false }, { status: 401 })
    }

    // Decode session token to get user info
    try {
      const sessionData = JSON.parse(Buffer.from(sessionToken, "base64").toString())
      
      // Verify session is not too old (7 days)
      const sessionAge = Date.now() - sessionData.timestamp
      if (sessionAge > 7 * 24 * 60 * 60 * 1000) {
        return NextResponse.json({ ok: false, authenticated: false, error: "Session expired" }, { status: 401 })
      }

      // Verify user ID matches
      if (sessionData.userId !== userId) {
        return NextResponse.json({ ok: false, authenticated: false, error: "Invalid session" }, { status: 401 })
      }

      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })

      // Check if user is admin
      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", userId)
        .single()

      if (adminError || !adminUser) {
        return NextResponse.json({ ok: false, authenticated: false, error: "Not admin" }, { status: 403 })
      }

      return NextResponse.json({ 
        ok: true, 
        authenticated: true, 
        user: { id: userId, email: sessionData.email } 
      })
    } catch (decodeError) {
      return NextResponse.json({ ok: false, authenticated: false, error: "Invalid session token" }, { status: 401 })
    }
  } catch (error: any) {
    console.error("[API] admin/auth/verify error:", error)
    return NextResponse.json({ ok: false, authenticated: false, error: error.message }, { status: 500 })
  }
}

