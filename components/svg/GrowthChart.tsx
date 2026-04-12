"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

export default function GrowthChart({ className = "" }: { className?: string }) {
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
        <linearGradient id="chartAreaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#D7C38A" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mainLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.3" />
          <stop offset="30%" stopColor="#D7C38A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="secondLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1B2A3D" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1B2A3D" stopOpacity="0.3" />
        </linearGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background grid - fine financial chart grid */}
      {[60, 110, 160, 210, 260].map((y, i) => (
        <motion.line
          key={`hgrid-${i}`}
          x1="60" y1={y} x2="760" y2={y}
          stroke="#0B1A2C" strokeOpacity="0.06" strokeWidth="0.5"
          strokeDasharray="4 6"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        />
      ))}
      {[160, 260, 360, 460, 560, 660].map((x, i) => (
        <motion.line
          key={`vgrid-${i}`}
          x1={x} y1="40" x2={x} y2="270"
          stroke="#0B1A2C" strokeOpacity="0.04" strokeWidth="0.5"
          strokeDasharray="4 6"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.04 }}
        />
      ))}

      {/* Y axis */}
      <motion.line
        x1="60" y1="40" x2="60" y2="270"
        stroke="#0B1A2C" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {/* X axis */}
      <motion.line
        x1="60" y1="270" x2="760" y2="270"
        stroke="#0B1A2C" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />

      {/* Secondary comparison line (lighter, shows market average) */}
      <motion.path
        d="M60 220 C120 215, 200 210, 280 200 C360 190, 440 185, 520 175 C600 165, 680 160, 760 155"
        stroke="url(#secondLineGrad)" strokeWidth="1.5" strokeLinecap="round" fill="none"
        strokeDasharray="6 4"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
      />

      {/* Gradient fill area under main line */}
      <motion.path
        d="M60 270 L60 230 C100 225, 140 210, 200 195 C260 178, 300 165, 360 140 C420 115, 460 100, 520 80 C580 60, 640 50, 700 42 L760 38 L760 270 Z"
        fill="url(#chartAreaFill)"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.8 }}
      />

      {/* Main growth line — bold, glowing */}
      <motion.path
        d="M60 230 C100 225, 140 210, 200 195 C260 178, 300 165, 360 140 C420 115, 460 100, 520 80 C580 60, 640 50, 760 38"
        stroke="url(#mainLineGrad)" strokeWidth="3" strokeLinecap="round" fill="none"
        filter="url(#glowFilter)"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
      />

      {/* Data points with labels */}
      {[
        { cx: 60, cy: 230, label: "" },
        { cx: 200, cy: 195, label: "" },
        { cx: 360, cy: 140, label: "" },
        { cx: 520, cy: 80, label: "" },
        { cx: 700, cy: 42, label: "" },
        { cx: 760, cy: 38, label: "" },
      ].map((pt, i) => (
        <g key={i}>
          {/* Glow ring behind point */}
          <motion.circle
            cx={pt.cx} cy={pt.cy} r="10"
            fill="#D7C38A" fillOpacity="0.1"
            initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 2.6 + i * 0.12 }}
          />
          {/* Point */}
          <motion.circle
            cx={pt.cx} cy={pt.cy} r="5"
            fill="#D7C38A" stroke="white" strokeWidth="2" strokeOpacity="0.8"
            initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 2.8 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </g>
      ))}

      {/* Axis labels */}
      {["2020", "2022", "2024", "2026"].map((label, i) => (
        <motion.text
          key={label}
          x={160 + i * 200} y="290"
          textAnchor="middle"
          fill="#0B1A2C" fillOpacity="0.3"
          fontSize="11" fontFamily="Inter, sans-serif"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 3.2 + i * 0.1 }}
        >
          {label}
        </motion.text>
      ))}

      {/* "Your Growth" label near the top of the line */}
      <motion.text
        x="680" y="30"
        fill="#D7C38A" fillOpacity="0.6"
        fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600"
        letterSpacing="0.05em"
        initial={prefersReduced ? false : { opacity: 0, x: 660 }}
        animate={show ? { opacity: 1, x: 680 } : {}}
        transition={{ duration: 0.5, delay: 3.5 }}
      >
        YOUR GROWTH
      </motion.text>

      {/* "Market Avg" label */}
      <motion.text
        x="690" y="148"
        fill="#0B1A2C" fillOpacity="0.25"
        fontSize="10" fontFamily="Inter, sans-serif"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 3.2 }}
      >
        Market Avg
      </motion.text>
    </svg>
  )
}
