import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/supabaseServer"
import { sendEmail } from "@/lib/email"

/**
 * Outreach framework - foundation for future lead source integrations
 * 
 * This endpoint accepts a list of potential contacts and sends outreach emails.
 * 
 * NOTE: Real lead sources (directories, LinkedIn scraping, etc.) are NOT implemented here.
 * This is a clean hook point for future integrations.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { recipients } = body

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { ok: false, reason: "missing_recipients" },
        { status: 400 }
      )
    }

    const results = []

    for (const recipient of recipients) {
      try {
        const { email, name, context } = recipient

        if (!email) {
          continue
        }

        // Generate outreach email using template
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #0B1A2C; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #0B1A2C 0%, #16A085 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #F5F7FA; padding: 30px; border-radius: 0 0 8px 8px; }
                .button { display: inline-block; background: #16A085; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Birchtree Financial</h1>
                </div>
                <div class="content">
                  <p>Hi ${name || "there"},</p>
                  <p>We noticed you might be interested in professional financial advisory services.</p>
                  <p>Birchtree Financial offers comprehensive financial advisory and investment management tailored to your unique needs.</p>
                  <a href="https://birchtreefinancial.ca/contact" class="button">Learn More</a>
                  <p style="margin-top: 30px; font-size: 12px; color: #666;">
                    Best regards,<br>
                    The Birchtree Financial Team
                  </p>
                </div>
              </div>
            </body>
          </html>
        `

        const emailResult = await sendEmail(
          email,
          "Professional Financial Advisory Services",
          html
        )

        // Track outreach event
        await db.insertEvent({
          type: "outreach_sent",
          meta: {
            email,
            name,
            context,
            success: emailResult.ok,
          },
        })

        results.push({
          email,
          success: emailResult.ok,
          error: emailResult.ok ? null : emailResult.reason,
        })
      } catch (error: any) {
        console.error(`[Outreach] Error processing recipient:`, error)
        results.push({
          email: recipient.email,
          success: false,
          error: error.message,
        })
      }
    }

    return NextResponse.json({
      ok: true,
      processed: results.length,
      results,
    })
  } catch (error: any) {
    console.error("[API] outreach/send-test error:", error)
    return NextResponse.json(
      { ok: false, reason: "server_error", message: error.message },
      { status: 500 }
    )
  }
}

