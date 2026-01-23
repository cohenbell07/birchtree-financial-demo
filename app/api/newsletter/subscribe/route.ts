import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/supabaseServer"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validation
    if (!email) {
      return NextResponse.json(
        { ok: false, reason: "missing_email" },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, reason: "invalid_email" },
        { status: 400 }
      )
    }

    // Check if email already exists (using normalized email)
    const existingSubscriber = await db.getNewsletterSubscriber(email)
    
    if (existingSubscriber.data) {
      return NextResponse.json({
        ok: true,
        message: "You're already subscribed!",
        already_subscribed: true,
      })
    }

    // Add subscriber to database (email will be normalized inside insertNewsletterSubscriber)
    const subscriberResult = await db.insertNewsletterSubscriber({
      email,
      status: "active",
    })

    const subscriberId = (subscriberResult.data as any)?.id
    
    // Handle duplicate gracefully (in case check above missed it due to race condition)
    if (!subscriberId && subscriberResult.error && 'code' in subscriberResult.error && subscriberResult.error.code === "23505") {
      // Try to fetch existing subscriber
      const existing = await db.getNewsletterSubscriber(email)
      if (existing.data) {
        return NextResponse.json({
          ok: true,
          message: "You're already subscribed!",
          already_subscribed: true,
        })
      }
    }

    // Send welcome email
    const emailResult = await sendNewsletterWelcomeEmail(email)

    // Track event
    if (subscriberId) {
      await db.insertEvent({
        type: "newsletter_subscribed",
        meta: {
          email,
          subscriber_id: subscriberId,
        },
      })
    }

    return NextResponse.json({
      ok: true,
      message: "Successfully subscribed to newsletter!",
      subscriber_id: subscriberId,
      email_sent: emailResult.ok,
    })
  } catch (error: any) {
    console.error("[API] newsletter/subscribe error:", error)
    return NextResponse.json(
      { ok: false, reason: "server_error", message: error.message },
      { status: 500 }
    )
  }
}

async function sendNewsletterWelcomeEmail(email: string) {
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
            <h1>Welcome to Birchtree Financial Newsletter</h1>
          </div>
          <div class="content">
            <p>Thank you for subscribing to our newsletter!</p>
            <p>You'll now receive monthly financial insights, market updates, and exclusive resources delivered straight to your inbox.</p>
            <p>We're committed to providing you with valuable information to help you make informed financial decisions.</p>
            <a href="https://birchtreefinancial.ca/resources" class="button">Explore Our Resources</a>
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              If you have any questions or need personalized financial guidance, don't hesitate to reach out.<br><br>
              Best regards,<br>
              The Birchtree Financial Team
            </p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail(
    email,
    "Welcome to Birchtree Financial Newsletter",
    html
  )
}

