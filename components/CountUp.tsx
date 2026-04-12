"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

interface CountUpProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export default function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" })
  const shouldReduceMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!isInView || hasStarted) return
    if (shouldReduceMotion) {
      setDisplayValue(target)
      setHasStarted(true)
      return
    }

    setHasStarted(true)
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const t = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(eased * target)

      setDisplayValue(current)

      if (t < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration, hasStarted, shouldReduceMotion])

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}{displayValue}{suffix}
      </span>
      <span className="sr-only">
        {prefix}{target}{suffix}
      </span>
    </span>
  )
}
