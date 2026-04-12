"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

export default function TrustShield({ className = "" }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  const prefersReduced = useReducedMotion()
  const show = isInView || prefersReduced

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 400 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="shieldFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0.02" />
        </linearGradient>
        <filter id="shieldGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="shieldRadial">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Large background glow */}
      <motion.circle
        cx="200" cy="190" r="160"
        fill="url(#shieldRadial)"
        initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      />

      {/* Radiating circles */}
      {[100, 130, 160, 190].map((r, i) => (
        <motion.circle
          key={`ring-${i}`}
          cx="200" cy="190" r={r}
          stroke="#D7C38A" strokeOpacity={0.1 - i * 0.02} strokeWidth="0.8" fill="none"
          initial={prefersReduced ? false : { scale: 0.3, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.6 + i * 0.12 }}
        />
      ))}

      {/* Main shield — large and prominent */}
      <motion.path
        d="M200 40 L310 90 C310 90, 325 190, 305 260 C285 330, 200 380, 200 380 C200 380, 115 330, 95 260 C75 190, 90 90, 90 90 Z"
        stroke="#D7C38A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        fill="url(#shieldFill)"
        filter="url(#shieldGlow)"
        initial={prefersReduced ? false : { pathLength: 0, fillOpacity: 0 }}
        animate={show ? { pathLength: 1, fillOpacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Inner shield detail line */}
      <motion.path
        d="M200 70 L290 110 C290 110, 302 190, 286 250 C270 310, 200 350, 200 350 C200 350, 130 310, 114 250 C98 190, 110 110, 110 110 Z"
        stroke="#D7C38A" strokeWidth="1" strokeOpacity="0.25" fill="none"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      />

      {/* Checkmark — large and bold */}
      <motion.path
        d="M150 200 L185 240 L260 155"
        stroke="#D7C38A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        filter="url(#shieldGlow)"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
      />

      {/* Corner decorative elements */}
      {[
        { x: 40, y: 50, size: 20 },
        { x: 350, y: 45, size: 18 },
        { x: 30, y: 340, size: 15 },
        { x: 360, y: 350, size: 16 },
      ].map((corner, i) => (
        <motion.g key={`corner-${i}`}
          initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 2.0 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <line x1={corner.x} y1={corner.y} x2={corner.x + corner.size} y2={corner.y}
            stroke="#D7C38A" strokeOpacity="0.3" strokeWidth="1" />
          <line x1={corner.x} y1={corner.y} x2={corner.x} y2={corner.y + corner.size}
            stroke="#D7C38A" strokeOpacity="0.3" strokeWidth="1" />
        </motion.g>
      ))}

      {/* Floating dots */}
      {[
        { cx: 55, cy: 100, r: 3 }, { cx: 345, cy: 90, r: 2.5 },
        { cx: 40, cy: 250, r: 2 }, { cx: 360, cy: 260, r: 2.5 },
        { cx: 200, cy: 15, r: 3 }, { cx: 100, cy: 40, r: 2 },
        { cx: 300, cy: 35, r: 2 }, { cx: 60, cy: 370, r: 2 },
        { cx: 340, cy: 375, r: 2 },
      ].map((dot, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={dot.cx} cy={dot.cy} r={dot.r}
          fill="#D7C38A" fillOpacity="0.35"
          initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.8 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}

      {/* Pulse from shield */}
      {show && !prefersReduced && (
        <motion.path
          d="M200 40 L310 90 C310 90, 325 190, 305 260 C285 330, 200 380, 200 380 C200 380, 115 330, 95 260 C75 190, 90 90, 90 90 Z"
          stroke="#D7C38A" strokeWidth="1" fill="none"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.15, opacity: 0 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: "easeOut" }}
          style={{ transformOrigin: "200px 210px" }}
        />
      )}
    </svg>
  )
}
