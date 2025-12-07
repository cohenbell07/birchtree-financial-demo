import twilio from "twilio"

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER

let twilioClient: ReturnType<typeof twilio> | null = null

if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  try {
    twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  } catch (error) {
    console.warn("[SMS] Failed to initialize Twilio client:", error)
  }
} else {
  console.warn("[SMS] TWILIO credentials not set. SMS features will be disabled.")
}

interface Lead {
  name: string
  phone?: string
}

export async function sendSms(to: string, message: string) {
  if (!twilioClient || !TWILIO_FROM_NUMBER) {
    console.warn("[SMS] sendSms: SMS service not configured")
    return { ok: false, reason: "sms_not_configured" as const }
  }

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: TWILIO_FROM_NUMBER,
      to,
    })

    return { ok: true, sid: result.sid }
  } catch (error: any) {
    console.error("[SMS] sendSms error:", error)
    return { ok: false, reason: "send_failed" as const, error: error.message }
  }
}

export async function sendSmsFollowup(lead: Lead, templateId: string) {
  if (!lead.phone) {
    return { ok: false, reason: "no_phone_number" as const }
  }

  const templates: Record<string, string> = {
    consultation_reminder: `Hi ${lead.name}, this is Birchtree Financial. Ready to take control of your financial future? Schedule a complimentary consultation: https://birchtreefinancial.ca/contact`,
    drip_3days: `Hi ${lead.name}, quick check-in from Birchtree Financial. Have questions about your financial planning? We're here to help: https://birchtreefinancial.ca/contact`,
  }

  const message = templates[templateId] || templates.consultation_reminder

  return sendSms(lead.phone, message)
}

