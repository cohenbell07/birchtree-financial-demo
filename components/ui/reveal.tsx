"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  /** Stagger between child elements when used as a wrapper (in seconds). */
  stagger?: number
  /** Initial y-offset in pixels. Default 24. */
  y?: number
  /** Delay before this element animates (seconds). */
  delay?: number
  /** Render as inline-block for use mid-paragraph. */
  inline?: boolean
  className?: string
}

/**
 * Reveal — single, restrained on-scroll entrance.
 *
 * Replaces ad-hoc `motion.div initial={{ opacity: 0, y: 30 }} whileInView ...`
 * blocks scattered through every page. One choreography, one easing, respects
 * reduced-motion. Use it sparingly — the design principle is one entrance per
 * section, not one entrance per element.
 */
export function Reveal({
  children,
  y = 24,
  delay = 0,
  inline = false,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  const reduce = useReducedMotion()

  const initial = reduce ? { opacity: 0 } : { opacity: 0, y }
  const animate = reduce
    ? isInView
      ? { opacity: 1 }
      : { opacity: 0 }
    : isInView
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: reduce ? 0.3 : 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1], // ease-out-quart
      }}
      className={cn(inline && "inline-block", className)}
    >
      {children}
    </motion.div>
  )
}

interface RevealStaggerProps {
  children: React.ReactNode
  /** Seconds between each child. Default 0.08. */
  stagger?: number
  /** Initial y-offset. Default 20. */
  y?: number
  className?: string
}

/**
 * RevealStagger — wrap a list/grid of items so each fades+rises in sequence
 * once the parent enters the viewport. Children are not transformed by their
 * authors; the wrapper handles it via variants.
 */
export function RevealStagger({
  children,
  stagger = 0.08,
  y = 20,
  className,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0.3 : 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
