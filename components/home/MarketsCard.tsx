"use client"

import { useEffect, useRef, useState } from "react"

type Item = {
  key: string
  label: string
  price: number | null
  change: number | null
  changePercent: number | null
}

const UP = "#2F7D5B"
const DOWN = "#C0492F"

// Seed values so the card is fully populated on first paint (and if the live
// feed is ever unreachable). Replaced by real quotes within ~1s.
const FALLBACK: Item[] = [
  { key: "tsx", label: "S&P/TSX Composite", price: 34769.14, change: 251.4, changePercent: 0.73 },
  { key: "sp500", label: "S&P 500", price: 7580.06, change: 16.4, changePercent: 0.22 },
  { key: "nasdaq", label: "Nasdaq 100", price: 30333.18, change: 109.3, changePercent: 0.36 },
  { key: "dow", label: "Dow Jones", price: 51032.46, change: 363.5, changePercent: 0.72 },
  { key: "gold", label: "Gold", price: 4593.0, change: 60.6, changePercent: 1.34 },
  { key: "silver", label: "Silver", price: 75.88, change: -0.03, changePercent: -0.04 },
]

const REFRESH_MS = 20000

const fmtPrice = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const fmtPct = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`

export default function MarketsCard() {
  const [items, setItems] = useState<Item[]>(FALLBACK)
  const [updated, setUpdated] = useState<string | null>(null)
  const [live, setLive] = useState(false)
  const prevPrices = useRef<Record<string, number>>({})
  const [flash, setFlash] = useState<Record<string, "up" | "down">>({})

  useEffect(() => {
    let active = true
    let flashTimer: ReturnType<typeof setTimeout> | undefined

    const load = async () => {
      try {
        const res = await fetch("/api/markets", { cache: "no-store" })
        if (!res.ok) return
        const data = await res.json()
        if (!active || !Array.isArray(data.items)) return

        const nextFlash: Record<string, "up" | "down"> = {}
        const merged: Item[] = (data.items as Item[]).map((it) => {
          if (it.price == null) {
            // Keep the last good value for any symbol that failed this round.
            const last = prevPrices.current[it.key]
            return last != null
              ? { ...it, price: last }
              : FALLBACK.find((f) => f.key === it.key) ?? it
          }
          const prev = prevPrices.current[it.key]
          if (prev != null && it.price !== prev) {
            nextFlash[it.key] = it.price > prev ? "up" : "down"
          }
          prevPrices.current[it.key] = it.price
          return it
        })

        setItems(merged)
        setLive(true)
        setUpdated(
          new Date(data.updatedAt ?? Date.now()).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
          }),
        )

        if (Object.keys(nextFlash).length) {
          setFlash(nextFlash)
          flashTimer = setTimeout(() => active && setFlash({}), 950)
        }
      } catch {
        /* keep last known values */
      }
    }

    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      active = false
      clearInterval(id)
      if (flashTimer) clearTimeout(flashTimer)
    }
  }, [])

  return (
    <div
      className="rounded-xl border border-midnight/10 bg-white/95 p-5 backdrop-blur-sm"
      style={{ boxShadow: "0 12px 40px rgba(11,26,44,0.12)" }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="whitespace-nowrap font-heading text-[0.88rem] font-bold text-midnight">
          Markets at a glance
        </p>
        <span className="flex flex-shrink-0 items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            {live && (
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: UP }}
              />
            )}
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: live ? UP : "rgba(11,26,44,0.25)" }}
            />
          </span>
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-midnight/45">
            {live ? "Live" : "—"}
          </span>
        </span>
      </div>

      <div className="mt-3 divide-y divide-midnight/[0.07]">
        {items.map((m) => {
          const up = (m.changePercent ?? 0) >= 0
          const flashState = flash[m.key]
          return (
            <div
              key={m.key}
              className="flex items-center justify-between gap-3 py-2.5"
            >
              <span className="text-[0.72rem] leading-tight text-midnight/60">
                {m.label}
              </span>
              <span
                className="-mx-1.5 rounded-md px-1.5 py-0.5 text-right transition-colors duration-700"
                style={{
                  background: flashState
                    ? flashState === "up"
                      ? "rgba(47,125,91,0.12)"
                      : "rgba(192,73,47,0.12)"
                    : "transparent",
                }}
              >
                <span className="block text-[0.78rem] font-semibold tabular-nums text-midnight">
                  {m.price != null ? fmtPrice(m.price) : "—"}
                </span>
                <span
                  className="block text-[0.68rem] font-medium tabular-nums"
                  style={{ color: up ? UP : DOWN }}
                >
                  {m.changePercent != null ? fmtPct(m.changePercent) : ""}
                </span>
              </span>
            </div>
          )
        })}
      </div>

      <p className="mt-3 text-[0.6rem] leading-tight text-midnight/40">
        {updated ? `Updated ${updated}` : "Connecting…"}
      </p>
    </div>
  )
}
