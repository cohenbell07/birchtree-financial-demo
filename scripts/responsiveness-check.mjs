/**
 * responsiveness-check skill — standard mode (8 breakpoints, multi-URL).
 * Per skill protocol: single browser session per URL, resize through
 * breakpoints, screenshot above-fold + a below-fold sample, detect transitions.
 */
import { chromium } from "playwright-core"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const BASE = process.env.BASE || "http://localhost:3007"
const OUT_DIR = "docs/screenshots/responsiveness"
mkdirSync(OUT_DIR, { recursive: true })

const URLS = [
  { slug: "home", path: "/" },
  { slug: "about", path: "/about" },
  { slug: "services", path: "/services" },
  { slug: "team", path: "/team" },
  { slug: "contact", path: "/contact" },
]

const BREAKPOINTS = [
  { w: 320, label: "iPhone-SE" },
  { w: 375, label: "iPhone-14" },
  { w: 768, label: "iPad-portrait" },
  { w: 1024, label: "iPad-landscape" },
  { w: 1280, label: "laptop" },
  { w: 1440, label: "desktop" },
  { w: 1920, label: "FullHD" },
  { w: 2560, label: "ultrawide" },
]

function pad(n) { return String(n).padStart(4, "0") }

async function checkUrl(browser, urlInfo) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()
  // Capture console + page errors so we know if anything is broken
  const consoleErrors = []
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`))
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`console.error: ${msg.text().slice(0, 200)}`)
  })

  const results = []
  console.log(`\n=== ${urlInfo.slug} (${urlInfo.path}) ===`)

  await page.goto(BASE + urlInfo.path, { waitUntil: "networkidle", timeout: 45000 })

  for (const bp of BREAKPOINTS) {
    await page.setViewportSize({ width: bp.w, height: 900 })
    // Wait for CSS reflow
    await page.waitForTimeout(700)

    // Above-fold
    const aboveShot = join(OUT_DIR, `${urlInfo.slug}_${pad(bp.w)}_above.png`)
    await page.screenshot({ path: aboveShot, clip: { x: 0, y: 0, width: bp.w, height: 900 } })

    // Capture a "mid" scroll sample
    await page.evaluate(() => window.scrollTo(0, Math.min(document.body.scrollHeight * 0.45, 2400)))
    await page.waitForTimeout(400)
    const midShot = join(OUT_DIR, `${urlInfo.slug}_${pad(bp.w)}_mid.png`)
    await page.screenshot({ path: midShot, clip: { x: 0, y: 0, width: bp.w, height: 900 } })

    // Layout metrics
    const metrics = await page.evaluate(() => {
      const body = document.body
      const html = document.documentElement
      return {
        documentWidth: Math.max(body.scrollWidth, html.scrollWidth),
        documentHeight: Math.max(body.scrollHeight, html.scrollHeight),
        innerWidth: window.innerWidth,
        // Detect any overflowing element wider than viewport
        overflowing: Array.from(document.querySelectorAll("body *"))
          .filter((el) => {
            const r = el.getBoundingClientRect()
            return r.width > window.innerWidth + 4 && r.width > 0
          })
          .slice(0, 8)
          .map((el) => {
            const r = el.getBoundingClientRect()
            return {
              tag: el.tagName.toLowerCase(),
              cls: (el.className || "").toString().slice(0, 80),
              w: Math.round(r.width),
              x: Math.round(r.x),
            }
          }),
        // Measure h1 size
        h1Px: (() => {
          const h1 = document.querySelector("h1")
          if (!h1) return null
          const cs = window.getComputedStyle(h1)
          return parseFloat(cs.fontSize)
        })(),
        // Touch-target audit on small viewports — buttons/links < 44px
        smallTaps:
          window.innerWidth <= 768
            ? Array.from(document.querySelectorAll("a, button"))
                .filter((el) => {
                  const r = el.getBoundingClientRect()
                  return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)
                })
                .slice(0, 6)
                .map((el) => {
                  const r = el.getBoundingClientRect()
                  return {
                    tag: el.tagName.toLowerCase(),
                    text: (el.textContent || "").trim().slice(0, 30),
                    w: Math.round(r.width),
                    h: Math.round(r.height),
                  }
                })
            : [],
      }
    })

    // Reset scroll for next breakpoint
    await page.evaluate(() => window.scrollTo(0, 0))

    const overflowFlag = metrics.documentWidth > metrics.innerWidth + 4
    console.log(
      `  ${pad(bp.w)} (${bp.label})  doc=${metrics.documentWidth}  h1=${metrics.h1Px?.toFixed(0)}px  ` +
      `overflow=${overflowFlag ? "YES" : "no"}  overflowing-els=${metrics.overflowing.length}  small-taps=${metrics.smallTaps.length}`
    )

    results.push({
      width: bp.w,
      label: bp.label,
      ...metrics,
      overflowFlag,
      aboveShot,
      midShot,
    })
  }

  await ctx.close()
  return { url: urlInfo, results, consoleErrors }
}

const browser = await chromium.launch()
const all = []
for (const u of URLS) {
  const r = await checkUrl(browser, u)
  all.push(r)
}
await browser.close()

writeFileSync(
  join(OUT_DIR, "summary.json"),
  JSON.stringify(all, null, 2),
)

console.log("\nDone.")
