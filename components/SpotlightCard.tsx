"use client"

import { useRef, useCallback, type ReactNode, type MouseEvent } from "react"
import { useReducedMotion } from "framer-motion"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  spotlightSize?: number
  borderGlow?: boolean
  dark?: boolean
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(215, 195, 138, 0.07)",
  spotlightSize = 350,
  borderGlow = true,
  dark = false,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // All updates via direct DOM — zero React re-renders on mouse move
  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || prefersReduced) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const el = cardRef.current
      el.style.setProperty("--x", `${x}px`)
      el.style.setProperty("--y", `${y}px`)
      el.style.setProperty("--spotlight-opacity", "1")
    },
    [prefersReduced]
  )

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty("--spotlight-opacity", "0")
  }, [])

  const borderColor = dark ? "rgba(215,195,138,0.12)" : "rgba(215,195,138,0.15)"
  const hoverBorderColor = dark ? "rgba(215,195,138,0.3)" : "rgba(215,195,138,0.35)"

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card relative rounded-2xl overflow-hidden ${className}`}
      style={{
        "--x": "0px",
        "--y": "0px",
        "--spotlight-opacity": "0",
        "--spotlight-color": spotlightColor,
        "--spotlight-size": `${spotlightSize}px`,
        "--border-color": borderColor,
        "--border-hover-color": hoverBorderColor,
        "--bg": dark
          ? "rgba(11,26,44,0.6)"
          : "linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(250,248,243,0.95) 50%, rgba(245,243,238,0.92) 100%)",
        "--shadow": dark
          ? "0 2px 8px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2)"
          : "0 1px 3px rgba(11,26,44,0.04), 0 4px 16px rgba(11,26,44,0.06), 0 8px 32px rgba(215,195,138,0.04)",
        "--shadow-hover": dark
          ? "0 4px 16px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.3), 0 0 1px rgba(215,195,138,0.15)"
          : "0 4px 12px rgba(11,26,44,0.08), 0 16px 48px rgba(11,26,44,0.1), 0 0 0 1px rgba(215,195,138,0.15), 0 0 24px rgba(215,195,138,0.06)",
        "--top-line": dark
          ? "rgba(215,195,138,0.08)"
          : "rgba(215,195,138,0.25)",
        "--top-line-hover": dark
          ? "rgba(215,195,138,0.25)"
          : "rgba(215,195,138,0.5)",
      } as React.CSSProperties}
    >
      {/* Border glow — driven by CSS vars, no JS repaints */}
      {borderGlow && (
        <div className="spotlight-border absolute inset-0 rounded-2xl pointer-events-none" />
      )}

      {/* Card body */}
      <div className="spotlight-body relative rounded-2xl h-full overflow-hidden">
        {/* Spotlight overlay */}
        <div className="spotlight-glow absolute inset-0 rounded-2xl pointer-events-none" />

        {/* Gold top accent line — always visible */}
        <div className="spotlight-edge absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-20" />

        {/* Shine sweep on hover — pure CSS, GPU composited */}
        {!dark && (
          <div className="spotlight-shine absolute inset-0 pointer-events-none z-10" />
        )}

        {/* Subtle inner corner glow for light cards */}
        {!dark && (
          <div
            className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-40"
            style={{
              background: "radial-gradient(circle at 100% 0%, rgba(215,195,138,0.12) 0%, transparent 70%)",
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  )
}
