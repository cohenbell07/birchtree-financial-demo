"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface AnimatedTreeProps {
  className?: string
  color?: string
}

export default function AnimatedTree({ className = "h-12 w-12", color = "#0B1A2C" }: AnimatedTreeProps) {
  const shouldReduceMotion = useReducedMotion()
  const [hasAnimated, setHasAnimated] = useState(true) // default true = no animation

  useEffect(() => {
    const alreadyAnimated = sessionStorage.getItem("treeAnimated")
    if (!alreadyAnimated && !shouldReduceMotion) {
      setHasAnimated(false)
    }
  }, [shouldReduceMotion])

  const onAnimationComplete = () => {
    sessionStorage.setItem("treeAnimated", "true")
    setHasAnimated(true)
  }

  // If already animated or reduced motion, render static tree
  const showStatic = hasAnimated || shouldReduceMotion

  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Birch tree logo"
    >
      {/* Trunk - curved organic line */}
      <motion.path
        d="M60 130 C60 130, 58 110, 59 95 C60 80, 62 70, 60 55"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        initial={showStatic ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Main branches */}
      <motion.g
        initial={showStatic ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: showStatic ? 0 : 0.5 }}
      >
        {/* Right main branch */}
        <motion.path
          d="M60 75 C65 72, 75 68, 85 62"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={showStatic ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: showStatic ? 0 : 0.5, ease: "easeOut" }}
        />
        {/* Left main branch */}
        <motion.path
          d="M60 70 C55 67, 45 62, 35 58"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={showStatic ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: showStatic ? 0 : 0.55, ease: "easeOut" }}
        />
        {/* Right upper branch */}
        <motion.path
          d="M60 62 C66 58, 72 52, 78 46"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={showStatic ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: showStatic ? 0 : 0.6, ease: "easeOut" }}
        />
        {/* Left upper branch */}
        <motion.path
          d="M60 58 C54 54, 46 48, 40 42"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={showStatic ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: showStatic ? 0 : 0.65, ease: "easeOut" }}
        />
        {/* Right lower branch */}
        <motion.path
          d="M60 85 C67 82, 76 78, 82 74"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={showStatic ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: showStatic ? 0 : 0.7, ease: "easeOut" }}
        />
        {/* Left lower branch */}
        <motion.path
          d="M60 82 C53 79, 44 75, 38 72"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={showStatic ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: showStatic ? 0 : 0.7, ease: "easeOut" }}
        />
        {/* Small sub-branches */}
        <motion.path
          d="M75 66 C78 62, 82 58, 86 54"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={showStatic ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: showStatic ? 0 : 0.8, ease: "easeOut" }}
        />
        <motion.path
          d="M45 60 C42 56, 38 52, 34 48"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={showStatic ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: showStatic ? 0 : 0.8, ease: "easeOut" }}
        />
      </motion.g>

      {/* Leaves - organic leaf shapes clustered around branch tips */}
      {[
        // Right side leaves
        { cx: 88, cy: 60, rx: 6, ry: 3.5, rotate: -30 },
        { cx: 82, cy: 52, rx: 5.5, ry: 3, rotate: -45 },
        { cx: 90, cy: 50, rx: 5, ry: 3, rotate: -20 },
        { cx: 78, cy: 44, rx: 5.5, ry: 3, rotate: -55 },
        { cx: 84, cy: 42, rx: 5, ry: 2.8, rotate: -35 },
        { cx: 86, cy: 72, rx: 5.5, ry: 3, rotate: -25 },
        { cx: 80, cy: 76, rx: 5, ry: 3, rotate: -15 },
        // Top leaves
        { cx: 65, cy: 38, rx: 5.5, ry: 3, rotate: -60 },
        { cx: 60, cy: 34, rx: 5, ry: 3, rotate: -80 },
        { cx: 55, cy: 38, rx: 5.5, ry: 3, rotate: 60 },
        { cx: 70, cy: 42, rx: 5, ry: 2.8, rotate: -50 },
        { cx: 50, cy: 42, rx: 5, ry: 2.8, rotate: 50 },
        // Left side leaves
        { cx: 32, cy: 56, rx: 6, ry: 3.5, rotate: 30 },
        { cx: 38, cy: 48, rx: 5.5, ry: 3, rotate: 45 },
        { cx: 30, cy: 46, rx: 5, ry: 3, rotate: 20 },
        { cx: 42, cy: 40, rx: 5.5, ry: 3, rotate: 55 },
        { cx: 36, cy: 38, rx: 5, ry: 2.8, rotate: 35 },
        { cx: 34, cy: 70, rx: 5.5, ry: 3, rotate: 25 },
        { cx: 40, cy: 74, rx: 5, ry: 3, rotate: 15 },
        // Extra canopy fullness
        { cx: 72, cy: 36, rx: 4.5, ry: 2.5, rotate: -40 },
        { cx: 48, cy: 36, rx: 4.5, ry: 2.5, rotate: 40 },
        { cx: 60, cy: 28, rx: 5, ry: 3, rotate: 0 },
        { cx: 68, cy: 30, rx: 4.5, ry: 2.5, rotate: -30 },
        { cx: 52, cy: 30, rx: 4.5, ry: 2.5, rotate: 30 },
      ].map((leaf, i) => (
        <motion.ellipse
          key={i}
          cx={leaf.cx}
          cy={leaf.cy}
          rx={leaf.rx}
          ry={leaf.ry}
          transform={`rotate(${leaf.rotate} ${leaf.cx} ${leaf.cy})`}
          fill={color}
          opacity={0.85}
          initial={showStatic ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{
            duration: 0.35,
            delay: showStatic ? 0 : 1.0 + i * 0.03,
            ease: [0.34, 1.56, 0.64, 1], // spring-like overshoot
          }}
          onAnimationComplete={i === 23 ? onAnimationComplete : undefined}
        />
      ))}

      {/* Root lines */}
      <motion.g
        initial={showStatic ? false : { opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.4, delay: showStatic ? 0 : 0.3 }}
      >
        <path
          d="M60 130 C55 133, 48 135, 44 136"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M60 130 C65 133, 72 135, 76 136"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
    </svg>
  )
}
