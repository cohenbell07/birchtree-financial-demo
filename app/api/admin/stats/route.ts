import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/supabaseServer"

// Simple auth check - in production, use proper authentication
const ADMIN_SECRET = process.env.ADMIN_DASHBOARD_SECRET

export async function GET(request: NextRequest) {
  // Optional: Check for admin secret
  const authHeader = request.headers.get("authorization")
  const secretParam = request.nextUrl.searchParams.get("secret")

  if (ADMIN_SECRET) {
    const providedSecret = authHeader?.replace("Bearer ", "") || secretParam
    if (providedSecret !== ADMIN_SECRET) {
      return NextResponse.json(
        { ok: false, reason: "unauthorized", message: "Invalid admin secret" },
        { status: 401 }
      )
    }
  }

  try {
    // Get all leads
    const leadsResult = await db.getLeads(1000)
    const leads = leadsResult.data || []

    // Get all events
    const eventsResult = await db.getEvents(1000)
    const events = eventsResult.data || []

    // Calculate stats
    const leadsBySource: Record<string, number> = {}
    leads.forEach((lead: any) => {
      const source = lead.source || "unknown"
      leadsBySource[source] = (leadsBySource[source] || 0) + 1
    })

    // Get recent leads (last 20)
    const recentLeads = leads
      .slice(0, 20)
      .map((lead: any) => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        source: lead.source,
        created_at: lead.created_at,
      }))

    return NextResponse.json({
      ok: true,
      stats: {
        totalLeads: leads.length,
        leadsBySource,
        totalEvents: events.length,
        recentLeads,
      },
    })
  } catch (error: any) {
    console.error("[API] admin/stats error:", error)
    return NextResponse.json(
      {
        ok: false,
        reason: "server_error",
        message: error.message || "Failed to fetch statistics",
      },
      { status: 500 }
    )
  }
}

