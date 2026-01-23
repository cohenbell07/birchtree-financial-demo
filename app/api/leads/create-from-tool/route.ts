import { NextRequest, NextResponse } from "next/server"
import { db, Lead } from "@/lib/supabaseServer"
import { sendToolResultsEmail, sendEmail } from "@/lib/email"
import { sendSmsFollowup } from "@/lib/sms"
import { generateToolReportPDF } from "@/lib/pdf"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, source, tool_data } = body

    // Validation
    if (!name || !email || !source) {
      return NextResponse.json(
        { ok: false, reason: "missing_required_fields" },
        { status: 400 }
      )
    }

    // Create lead in database
    const leadResult = await db.insertLead({
      name,
      email,
      phone: phone || null,
      source,
      tool_data: tool_data || null,
      status: "new",
    })

    const leadId = (leadResult.data as Lead | null)?.id
    const isDuplicate = leadResult.isDuplicate || false

    // Track event (only for new leads, not duplicates)
    if (leadId && !isDuplicate) {
      await db.insertEvent({
        lead_id: leadId,
        type: "lead_created",
        meta: { source, tool: source },
      })
    } else if (leadId && isDuplicate) {
      // Track duplicate submission event
      await db.insertEvent({
        lead_id: leadId,
        type: "lead_resubmitted",
        meta: { source, tool: source },
      })
    }

    // Generate PDF report (optional)
    let pdfBuffer: Buffer | null = null
    try {
      pdfBuffer = await generateToolReportPDF({
        tool: source,
        leadName: name,
        date: new Date().toLocaleDateString(),
        inputs: tool_data?.formData || {},
        outputs: tool_data,
        summary: tool_data?.summary,
      })
    } catch (error) {
      console.warn("[API] PDF generation failed, continuing without PDF:", error)
    }

    // Send welcome email with tool results (with optional PDF attachment)
    const emailResult = await sendToolResultsEmail(
      { name, email, phone, source },
      {
        tool: source,
        summary: tool_data?.summary || "Thank you for using our tool.",
        data: tool_data,
      }
    )

    // If PDF was generated, send it as attachment
    if (pdfBuffer) {
      const pdfFileName = `${source}-report-${Date.now()}.pdf`
      await sendEmail(
        email,
        `Your ${source === "risk-profiler" ? "Risk Profile" : "Retirement"} Report`,
        `<p>Hi ${name},</p><p>Please find your detailed report attached.</p>`,
        [{ filename: pdfFileName, content: pdfBuffer }]
      )
    }

    // Schedule drip sequence (only for new leads, not duplicates)
    if (leadId && !isDuplicate) {
      const now = new Date()
      
      // Schedule drip emails
      const dripSchedule = [
        { days: 2, step: 1 },
        { days: 5, step: 2 },
      ]

      for (const drip of dripSchedule) {
        const scheduledFor = new Date(now)
        scheduledFor.setDate(scheduledFor.getDate() + drip.days)

        await db.insertEvent({
          lead_id: leadId,
          type: "drip_scheduled",
          meta: {
            sequence_id: "default",
            step: drip.step,
            scheduled_for: scheduledFor.toISOString(),
            sent: false,
            lead_name: name,
            lead_email: email,
            lead_phone: phone || null,
            source: source,
          },
        })
      }

      // Schedule SMS (if phone provided and configured)
      if (phone) {
        const smsDate = new Date(now)
        smsDate.setDate(smsDate.getDate() + 3)

        await db.insertEvent({
          lead_id: leadId,
          type: "sms_scheduled",
          meta: {
            template_id: "drip_3days",
            scheduled_for: smsDate.toISOString(),
            sent: false,
            lead_name: name,
            lead_phone: phone,
          },
        })
      }
    }

    return NextResponse.json({
      ok: true,
      lead_id: leadId,
      email_sent: emailResult.ok,
      is_duplicate: isDuplicate,
      message: isDuplicate 
        ? "You've already submitted this form. We've updated your information." 
        : "Thank you for your submission!",
    })
  } catch (error: any) {
    console.error("[API] create-from-tool error:", error)
    return NextResponse.json(
      { ok: false, reason: "server_error", message: error.message },
      { status: 500 }
    )
  }
}

