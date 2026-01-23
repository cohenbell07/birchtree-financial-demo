import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password required" }, { status: 400 })
    }

    // Create Supabase client with service role key for admin operations
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Sign in user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return NextResponse.json({ ok: false, error: authError?.message || "Login failed" }, { status: 401 })
    }

    // Verify user is in admin_users table
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", authData.user.id)
      .single()

    if (adminError || !adminUser) {
      return NextResponse.json({ ok: false, error: "Not authorized as admin" }, { status: 403 })
    }

    // Create a simple session token (user ID + timestamp)
    // In production, you might want to use JWT or Supabase's session tokens
    const sessionToken = Buffer.from(
      JSON.stringify({
        userId: authData.user.id,
        email: authData.user.email,
        timestamp: Date.now(),
      })
    ).toString("base64")

    // Set cookies for session management
    const response = NextResponse.json({
      ok: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
      },
    })

    // Set session cookie
    response.cookies.set("sb-access-token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    // Also store user ID for quick lookup
    response.cookies.set("sb-user-id", authData.user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error: any) {
    console.error("[API] admin/auth/login error:", error)
    return NextResponse.json({ ok: false, error: error.message || "Login failed" }, { status: 500 })
  }
}

