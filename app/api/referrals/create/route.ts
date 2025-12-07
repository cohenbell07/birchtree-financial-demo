import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/supabaseServer"
import { sendReferralInviteEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { yourName, yourEmail, friendEmail } = body

    if (!yourName || !yourEmail || !friendEmail) {
      return NextResponse.json(
        { ok: false, reason: "missing_required_fields" },
        { status: 400 }
      )
    }

    // Create a temporary lead entry for the referrer (or find existing)
    // In production, you'd look up the actual lead_id
    // For now, we'll create a referral without a lead_id or use a placeholder
    const referralResult = await db.insertReferral({
      lead_id: "temp", // In production, look up actual lead_id by email
      referred_email: friendEmail,
      status: "invited",
    })

    // Send referral email
    const emailResult = await sendReferralInviteEmail(
      { name: yourName, email: yourEmail },
      friendEmail,
      `https://birchtreefinancial.ca/referral?ref=${referralResult.data?.id || ""}`
    )

    // Track event
    await db.insertEvent({
      type: "referral_sent",
      meta: {
        referrer_name: yourName,
        referrer_email: yourEmail,
        referred_email: friendEmail,
      },
    })

    return NextResponse.json({
      ok: true,
      referral_id: referralResult.data?.id,
      email_sent: emailResult.ok,
    })
  } catch (error: any) {
    console.error("[API] referrals/create error:", error)
    return NextResponse.json(
      { ok: false, reason: "server_error", message: error.message },
      { status: 500 }
    )
  }
}

