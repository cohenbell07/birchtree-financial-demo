/* Snap focused regions of the redesigned service detail page. */
import { chromium } from "playwright-core"
import { mkdirSync } from "node:fs"

mkdirSync("docs/screenshots/services", { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
const page = await ctx.newPage()

await page.goto("http://localhost:3007/services/retirement-planning", {
  waitUntil: "networkidle",
})
await page.waitForTimeout(1200)

// Hero area
await page.screenshot({ path: "docs/screenshots/services/01-hero.png" })

// Body area — scroll to ~y=600 so cards are in view, wait for Reveal
await page.evaluate(() => window.scrollTo(0, 600))
await page.waitForTimeout(800)
await page.screenshot({ path: "docs/screenshots/services/02-overview.png" })

await page.evaluate(() => window.scrollTo(0, 1100))
await page.waitForTimeout(800)
await page.screenshot({ path: "docs/screenshots/services/03-cards.png" })

await page.evaluate(() => window.scrollTo(0, 1700))
await page.waitForTimeout(800)
await page.screenshot({ path: "docs/screenshots/services/04-callout.png" })

await page.evaluate(() => window.scrollTo(0, 2200))
await page.waitForTimeout(800)
await page.screenshot({ path: "docs/screenshots/services/05-cta.png" })

await browser.close()
console.log("done")
