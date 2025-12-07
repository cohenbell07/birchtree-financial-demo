import { NextRequest, NextResponse } from "next/server"
import { db, Event } from "@/lib/supabaseServer"
import { sendDripSequenceEmail } from "@/lib/email"
import { sendSmsFollowup } from "@/lib/sms"

/**
 * This endpoint should be called by a cron job (e.g., Vercel Cron, GitHub Actions, or external service like cron-job.org)
 * 
 * Setup instructions:
 * 1. Vercel Cron: Add to vercel.json:
 *    Example vercel.json configuration:
 *    {
 *      "crons": [{
 *        "path": "/api/drip/run",
 *        "schedule": "0 *\/6 * * *"
 *      }]
 *    }
 * 
 * 2. GitHub Actions: Create .github/workflows/drip.yml
 * 
 * 3. External cron: Use cron-job.org to hit https://yourdomain.com/api/drip/run every 6 hours
 * 
 * 4. Add authentication header if needed:
 *    Authorization: Bearer YOUR_SECRET_TOKEN
 */
export async function GET(request: NextRequest) {
  // Optional: Add auth check
  const authHeader = request.headers.get("authorization")
  const expectedToken = process.env.DRIP_CRON_SECRET

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
      { ok: false, reason: "unauthorized" },
      { status: 401 }
    )
  }

  try {
    // Get due drip events
    const dripEvents = await db.getDueDripEvents()

    if (!dripEvents.data || dripEvents.data.length === 0) {
      return NextResponse.json({
        ok: true,
        processed: 0,
        message: "No due drip events",
      })
    }

    let processed = 0
    let errors = 0

    // Process each due event
    for (const event of dripEvents.data as Event[]) {
      try {
        const meta = (event.meta || {}) as Record<string, any>
        const leadId = event.lead_id

        if (!leadId) {
          continue
        }

        // Get lead info (simplified - in production, fetch from leads table)
        // For now, we'll use the meta data stored with the event

        if (event.type === "drip_scheduled") {
          if (!meta.lead_email) {
            console.warn(`[Drip] Skipping event ${event.id} - no lead_email in meta`)
            continue
          }

          const emailResult = await sendDripSequenceEmail({
            lead: {
              name: meta.lead_name || "Valued Client",
              email: meta.lead_email,
              phone: meta.lead_phone,
              source: meta.source,
            },
            sequenceId: meta.sequence_id || "default",
            step: meta.step || 1,
          })

          if (emailResult.ok) {
            await db.markDripEventSent(event.id!)
            processed++
          } else {
            errors++
          }
        } else if (event.type === "sms_scheduled") {
          if (!meta.lead_phone) {
            console.warn(`[Drip] Skipping SMS event ${event.id} - no lead_phone in meta`)
            continue
          }

          const smsResult = await sendSmsFollowup(
            {
              name: meta.lead_name || "Valued Client",
              phone: meta.lead_phone,
            },
            meta.template_id || "consultation_reminder"
          )

          if (smsResult.ok) {
            await db.markDripEventSent(event.id!)
            processed++
          } else {
            errors++
          }
        }
      } catch (error: any) {
        console.error(`[Drip] Error processing event ${event.id}:`, error)
        errors++
      }
    }

    return NextResponse.json({
      ok: true,
      processed,
      errors,
      total: dripEvents.data.length,
    })
  } catch (error: any) {
    console.error("[Drip] run error:", error)
    return NextResponse.json(
      { ok: false, reason: "server_error", message: error.message },
      { status: 500 }
    )
  }
}

