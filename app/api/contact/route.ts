import { NextRequest, NextResponse } from "next/server"
import { sendContactFormEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, reason: "missing_required_fields" },
        { status: 400 }
      )
    }

    const result = await sendContactFormEmail({
      name,
      email,
      phone: phone || "",
      subject,
      message,
    })

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, reason: result.reason },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error("[API] contact error:", error)
    return NextResponse.json(
      { ok: false, reason: "server_error", message: error.message },
      { status: 500 }
    )
  }
}
