import { NextRequest, NextResponse } from "next/server"
import { db, Referral } from "@/lib/supabaseServer"
import { sendReviewRequestEmail, sendReferralInviteEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lead_id } = body

    if (!lead_id) {
      return NextResponse.json(
        { ok: false, reason: "missing_lead_id" },
        { status: 400 }
      )
    }

    // Get lead info (in production, fetch from leads table)
    // For now, we'll assume lead data is passed or stored in events
    const lead = body.lead || {
      name: "Valued Client",
      email: body.email || "",
      phone: body.phone,
    }

    // Schedule review request
    const reviewResult = await db.insertReview({
      lead_id,
      platform: "google",
      status: "requested",
    })

    if (reviewResult.data) {
      await sendReviewRequestEmail(lead)
    }

    // Create referral event (if referral email provided)
    if (body.referral_email) {
      const referralResult = await db.insertReferral({
        lead_id,
        referred_email: body.referral_email,
        status: "invited",
      })

      const referralData = referralResult.data as Referral | null
      if (referralData) {
        const referralLink = body.referral_link || `https://birchtreefinancial.ca/referral?ref=${referralData.id}`
        await sendReferralInviteEmail(lead, body.referral_email, referralLink)
      }
    }

    return NextResponse.json({
      ok: true,
      review_scheduled: !!reviewResult.data,
      referral_sent: !!body.referral_email,
    })
  } catch (error: any) {
    console.error("[API] schedule-referral-and-review error:", error)
    return NextResponse.json(
      { ok: false, reason: "server_error", message: error.message },
      { status: 500 }
    )
  }
}

