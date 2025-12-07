import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const EMAIL_FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS || "Birchtree Financial <no-reply@birchtreefinancial.ca>"

let resendClient: Resend | null = null

if (RESEND_API_KEY) {
  try {
    resendClient = new Resend(RESEND_API_KEY)
  } catch (error) {
    console.warn("[Email] Failed to initialize Resend client:", error)
  }
} else {
  console.warn("[Email] RESEND_API_KEY not set. Email features will be disabled.")
}

interface Lead {
  name: string
  email: string
  phone?: string
  source?: string
}

interface ToolResult {
  tool: string
  summary: string
  data?: any
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  attachments?: Array<{ filename: string; content: Buffer | string }>
) {
  if (!resendClient) {
    console.warn("[Email] sendEmail: Email service not configured")
    return { ok: false, reason: "email_not_configured" as const }
  }

  try {
    const result = await resendClient.emails.send({
      from: EMAIL_FROM_ADDRESS,
      to,
      subject,
      html,
      attachments: attachments?.map((att) => ({
        filename: att.filename,
        content: att.content,
      })),
    })

    if (result.error) {
      console.error("[Email] sendEmail error:", result.error)
      return { ok: false, reason: "send_failed" as const, error: result.error }
    }

    return { ok: true, id: result.data?.id }
  } catch (error: any) {
    console.error("[Email] sendEmail exception:", error)
    return { ok: false, reason: "send_failed" as const, error: error.message }
  }
}

export async function sendLeadWelcomeEmail(lead: Lead) {
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
            <h1>Welcome to Birchtree Financial</h1>
          </div>
          <div class="content">
            <p>Hi ${lead.name},</p>
            <p>Thank you for your interest in Birchtree Financial. We're excited to help you on your financial journey.</p>
            <p>Our team will review your information and reach out shortly to discuss how we can assist you.</p>
            <a href="https://birchtreefinancial.ca/contact" class="button">Schedule a Consultation</a>
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              Best regards,<br>
              The Birchtree Financial Team
            </p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail(lead.email, "Welcome to Birchtree Financial", html)
}

export async function sendToolResultsEmail(lead: Lead, toolResult: ToolResult) {
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
          .result-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #16A085; }
          .button { display: inline-block; background: #16A085; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your ${toolResult.tool === "risk-profiler" ? "Risk Profile" : "Retirement"} Results</h1>
          </div>
          <div class="content">
            <p>Hi ${lead.name},</p>
            <p>Thank you for using our ${toolResult.tool === "risk-profiler" ? "Investment Risk Profiler" : "Retirement Calculator"} tool.</p>
            <div class="result-box">
              <h3>Summary</h3>
              <p>${toolResult.summary}</p>
            </div>
            <p>For personalized financial advice tailored to your specific situation, we recommend scheduling a consultation with one of our advisors.</p>
            <a href="https://birchtreefinancial.ca/contact" class="button">Schedule a Consultation</a>
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              Best regards,<br>
              The Birchtree Financial Team
            </p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail(lead.email, `Your ${toolResult.tool === "risk-profiler" ? "Risk Profile" : "Retirement"} Results`, html)
}

export async function sendDripSequenceEmail({
  lead,
  sequenceId,
  step,
}: {
  lead: Lead
  sequenceId: string
  step: number
}) {
  const templates: Record<string, Record<number, { subject: string; content: string }>> = {
    default: {
      1: {
        subject: "Understanding RRSP and TFSA Strategies",
        content: `
          <p>Hi ${lead.name},</p>
          <p>As you plan for your financial future, understanding Canadian tax-advantaged accounts is crucial.</p>
          <p><strong>RRSP (Registered Retirement Savings Plan):</strong> Contributions reduce your taxable income, and investments grow tax-deferred until withdrawal.</p>
          <p><strong>TFSA (Tax-Free Savings Account):</strong> Contributions are made with after-tax dollars, but all growth and withdrawals are tax-free.</p>
          <p>Our advisors can help you optimize both accounts based on your income, goals, and timeline.</p>
          <a href="https://birchtreefinancial.ca/contact" class="button">Learn More</a>
        `,
      },
      2: {
        subject: "Ready to Book Your Consultation?",
        content: `
          <p>Hi ${lead.name},</p>
          <p>We hope you've found our resources helpful. Are you ready to take the next step?</p>
          <p>Schedule a complimentary consultation to discuss your financial goals and discover how Birchtree Financial can help you achieve them.</p>
          <a href="https://birchtreefinancial.ca/contact" class="button">Book Your Consultation</a>
          <p>Our team is here to provide personalized guidance tailored to your unique situation.</p>
        `,
      },
    },
  }

  const template = templates[sequenceId]?.[step] || templates.default[step]
  if (!template) {
    return { ok: false, reason: "template_not_found" as const }
  }

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
            ${template.content}
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              Best regards,<br>
              The Birchtree Financial Team
            </p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail(lead.email, template.subject, html)
}

export async function sendReviewRequestEmail(lead: Lead) {
  const reviewUrl = process.env.GOOGLE_REVIEW_URL || "https://g.page/r/YOUR_GOOGLE_REVIEW_LINK"
  
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
            <h1>Share Your Experience</h1>
          </div>
          <div class="content">
            <p>Hi ${lead.name},</p>
            <p>Thank you for choosing Birchtree Financial. We hope you had a great experience with our services.</p>
            <p>If you're happy with our service, we'd love to hear about it! Your feedback helps others discover quality financial planning.</p>
            <a href="${reviewUrl}" class="button">Leave a Review</a>
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              Best regards,<br>
              The Birchtree Financial Team
            </p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail(lead.email, "Share Your Experience with Birchtree Financial", html)
}

export async function sendReferralInviteEmail(lead: Lead, referredEmail: string, referralLink?: string) {
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
            <h1>You've Been Referred to Birchtree Financial</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>${lead.name} thought you might be interested in Birchtree Financial's comprehensive financial planning services.</p>
            <p>We help individuals and families across Canada achieve their financial goals through personalized, intelligent advisory services.</p>
            ${referralLink ? `<a href="${referralLink}" class="button">Learn More</a>` : '<a href="https://birchtreefinancial.ca" class="button">Learn More</a>'}
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              Best regards,<br>
              The Birchtree Financial Team
            </p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail(referredEmail, `${lead.name} Referred You to Birchtree Financial`, html)
}

