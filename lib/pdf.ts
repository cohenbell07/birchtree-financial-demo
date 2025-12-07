import PDFDocument from "pdfkit"
import { Readable } from "stream"

interface ToolReportData {
  tool: string
  leadName: string
  date: string
  inputs: any
  outputs: any
  summary?: string
}

/**
 * Generate a PDF report for tool results
 * Returns a Buffer that can be attached to emails or saved
 */
export async function generateToolReportPDF(data: ToolReportData): Promise<Buffer | null> {
  try {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    })

    const buffers: Buffer[] = []
    doc.on("data", buffers.push.bind(buffers))
    doc.on("end", () => {})

    // Header with gradient effect (simulated with colored box)
    doc
      .rect(0, 0, 612, 100)
      .fillColor("#0B1A2C")
      .fill()

    doc
      .fillColor("#FFFFFF")
      .fontSize(24)
      .text("Birchtree Financial", 50, 30, { align: "left" })
      .fontSize(12)
      .text("Your Financial Future, Elevated Through Intelligence", 50, 60)

    // Title
    doc
      .fillColor("#16A085")
      .fontSize(20)
      .text(
        data.tool === "risk-profiler"
          ? "Investment Risk Profile Report"
          : "Retirement Planning Report",
        50,
        120
      )

    // Lead info
    doc
      .fillColor("#0B1A2C")
      .fontSize(12)
      .text(`Prepared for: ${data.leadName}`, 50, 160)
      .text(`Date: ${data.date}`, 50, 180)

    // Summary section
    if (data.summary) {
      doc
        .fillColor("#0B1A2C")
        .fontSize(14)
        .text("Summary", 50, 220)
        .fontSize(10)
        .fillColor("#333333")
        .text(data.summary, 50, 245, {
          width: 512,
          align: "left",
        })
    }

    let yPos = data.summary ? 320 : 250

    // Tool-specific content
    if (data.tool === "risk-profiler") {
      doc
        .fillColor("#16A085")
        .fontSize(14)
        .text("Your Risk Profile", 50, yPos)
        .fillColor("#0B1A2C")
        .fontSize(12)
        .text(`Category: ${data.outputs?.category || "N/A"}`, 50, yPos + 25)

      if (data.outputs?.scores) {
        doc.fontSize(12).text("Risk Factors:", 50, yPos + 50)
        let scoreY = yPos + 75
        data.outputs.scores.forEach((score: any) => {
          doc
            .fontSize(10)
            .text(`${score.category}: ${score.value}`, 70, scoreY)
          scoreY += 20
        })
      }
    } else if (data.tool === "retirement-calculator") {
      doc
        .fillColor("#16A085")
        .fontSize(14)
        .text("Projected Retirement Savings", 50, yPos)
        .fillColor("#0B1A2C")
        .fontSize(20)
        .text(
          `$${data.outputs?.projectedSavings?.toLocaleString() || "0"}`,
          50,
          yPos + 25
        )

      if (data.inputs) {
        doc.fontSize(12).text("Your Inputs:", 50, yPos + 60)
        let inputY = yPos + 85
        Object.entries(data.inputs).forEach(([key, value]) => {
          if (value) {
            doc
              .fontSize(10)
              .text(`${key}: ${value}`, 70, inputY)
            inputY += 20
          }
        })
      }
    }

    // Footer
    const pageHeight = doc.page.height
    doc
      .fillColor("#666666")
      .fontSize(8)
      .text(
        "This report is for informational purposes only and does not constitute personalized financial advice.",
        50,
        pageHeight - 80,
        { width: 512, align: "center" }
      )
      .text(
        "Please consult with a qualified financial advisor for personalized recommendations.",
        50,
        pageHeight - 60,
        { width: 512, align: "center" }
      )
      .text("Birchtree Financial | birchtreefinancial.ca", 50, pageHeight - 40, {
        width: 512,
        align: "center",
      })

    doc.end()

    // Wait for PDF to finish generating
    return new Promise((resolve) => {
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers)
        resolve(pdfBuffer)
      })
    })
  } catch (error) {
    console.error("[PDF] Generation error:", error)
    return null
  }
}

