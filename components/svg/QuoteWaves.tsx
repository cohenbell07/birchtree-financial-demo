"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

export default function QuoteWaves({ className = "" }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  const prefersReduced = useReducedMotion()
  const show = isInView || prefersReduced

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 800 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="waveGrad1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#D7C38A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="waveGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Large quotation marks — prominent and bold */}
      <motion.path
        d="M80 90 C80 50, 115 30, 145 30 C135 55, 120 68, 120 90 C120 112, 138 125, 145 125 C145 150, 120 160, 105 160 C82 160, 65 138, 65 115 C65 92, 76 75, 80 90 Z"
        fill="#D7C38A" fillOpacity="0.15"
        stroke="#D7C38A" strokeWidth="1.5" strokeOpacity="0.3"
        initial={prefersReduced ? false : { pathLength: 0, fillOpacity: 0 }}
        animate={show ? { pathLength: 1, fillOpacity: 0.15 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.path
        d="M170 90 C170 50, 205 30, 235 30 C225 55, 210 68, 210 90 C210 112, 228 125, 235 125 C235 150, 210 160, 195 160 C172 160, 155 138, 155 115 C155 92, 166 75, 170 90 Z"
        fill="#D7C38A" fillOpacity="0.1"
        stroke="#D7C38A" strokeWidth="1.5" strokeOpacity="0.2"
        initial={prefersReduced ? false : { pathLength: 0, fillOpacity: 0 }}
        animate={show ? { pathLength: 1, fillOpacity: 0.1 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
      />

      {/* Flowing sound/voice waves — 7 waves spreading right */}
      {[
        { d: "M260 70 C320 50, 400 85, 480 60 C560 35, 640 65, 750 50", w: 2, opacity: 0.3, delay: 0.8 },
        { d: "M260 100 C330 82, 410 115, 500 92 C590 70, 660 95, 770 82", w: 1.8, opacity: 0.25, delay: 1.0 },
        { d: "M260 130 C340 115, 425 148, 520 125 C615 102, 680 128, 780 115", w: 1.6, opacity: 0.2, delay: 1.2 },
        { d: "M260 160 C350 148, 440 178, 540 158 C640 138, 700 160, 790 148", w: 1.4, opacity: 0.16, delay: 1.4 },
        { d: "M270 190 C360 180, 450 205, 555 188 C660 172, 720 192, 800 182", w: 1.2, opacity: 0.12, delay: 1.6 },
        { d: "M275 220 C370 212, 460 235, 570 220 C680 205, 735 222, 800 215", w: 1, opacity: 0.09, delay: 1.8 },
        { d: "M280 250 C380 244, 475 262, 585 250 C695 238, 750 252, 800 248", w: 0.8, opacity: 0.06, delay: 2.0 },
      ].map((wave, i) => (
        <motion.path
          key={i}
          d={wave.d}
          stroke="url(#waveGrad1)" strokeWidth={wave.w}
          strokeLinecap="round" fill="none"
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
          animate={show ? { pathLength: 1, opacity: wave.opacity } : {}}
          transition={{ duration: 1.5, delay: wave.delay, ease: "easeOut" }}
        />
      ))}

      {/* Accent dots along wave crests */}
      {[
        { cx: 400, cy: 85, r: 3.5 },
        { cx: 500, cy: 92, r: 3 },
        { cx: 620, cy: 65, r: 2.5 },
        { cx: 540, cy: 158, r: 3 },
        { cx: 680, cy: 128, r: 2.5 },
        { cx: 750, cy: 50, r: 3 },
        { cx: 660, cy: 192, r: 2 },
        { cx: 480, cy: 60, r: 3.5 },
      ].map((dot, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={dot.cx} cy={dot.cy} r={dot.r}
          fill="#D7C38A" fillOpacity="0.3"
          initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 2.2 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}
    </svg>
  )
}
