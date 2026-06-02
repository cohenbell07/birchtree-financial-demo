import { ImageResponse } from "next/og"

// Branded default social-share image, applied site-wide to any route that
// doesn't supply its own. Generated at build/request time — no asset file
// needed, always on-brand and factual.
export const runtime = "nodejs"
export const alt =
  "Birchtree Financial — Financial Advisor in Olds, Alberta"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0B1A2C 0%, #152439 100%)",
          fontFamily: "Georgia, serif",
          color: "#FBFAF6",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#D7C38A",
            marginBottom: 28,
          }}
        >
          Birchtree Financial
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Financial Advisor in Olds, Alberta
        </div>
        <div
          style={{
            width: 120,
            height: 4,
            background: "#D7C38A",
            margin: "36px 0",
            borderRadius: 2,
          }}
        />
        <div style={{ fontSize: 30, color: "#C9D2DE", maxWidth: 880 }}>
          Retirement · Investment · Insurance · Tax · Estate planning for
          Albertans and Canadians.
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 24,
            color: "#8A97A8",
            fontFamily: "Arial, sans-serif",
          }}
        >
          birchtreefinancial.ca · (403) 556-7777
        </div>
      </div>
    ),
    { ...size }
  )
}
