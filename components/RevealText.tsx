"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

interface RevealTextProps {
  children: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  className?: string
  /** Stagger value kept for backward compatibility. Currently unused — the new
   *  implementation reveals the whole element in a single motion frame, which
   *  is cheap and reads as one editorial gesture rather than per-word noise. */
  staggerDelay?: number
}

/**
 * RevealText — single-element reveal on viewport entry.
 *
 * Previously this split each heading into per-word motion spans with
 * clip-path masks and per-word transition delays (5–15 motion elements per
 * heading). On a page with 4 headings that was 20–60 IntersectionObserver
 * targets and 40+ animated transforms. Replaced with a single fade+y on the
 * heading element. Same API, no caller changes needed.
 */
export default function RevealText({
  children,
  as: Tag = "h2",
  className = "",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  const reduce = useReducedMotion()

  const MotionTag = motion[Tag] as React.ElementType

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={
        isInView
          ? reduce
            ? { opacity: 1 }
            : { opacity: 1, y: 0 }
          : reduce
            ? { opacity: 0 }
            : { opacity: 0, y: 20 }
      }
      transition={{
        duration: reduce ? 0.3 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
