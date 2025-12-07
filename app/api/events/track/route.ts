import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/supabaseServer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, meta, lead_id } = body

    if (!type) {
      return NextResponse.json(
        { ok: false, reason: "missing_type" },
        { status: 400 }
      )
    }

    // Insert event (will no-op if Supabase not configured)
    const result = await db.insertEvent({
      type,
      meta: meta || {},
      lead_id: lead_id || null,
    })

    return NextResponse.json({
      ok: true,
      event_id: result.data?.id,
    })
  } catch (error: any) {
    // Silently fail - event tracking should never break the app
    console.warn("[API] events/track error:", error)
    return NextResponse.json({
      ok: false,
      reason: "tracking_unavailable",
    })
  }
}

