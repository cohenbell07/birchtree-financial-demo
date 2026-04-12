"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const milestones = [
  { x: 100, year: "1994", label: "Founded" },
  { x: 300, year: "2005", label: "500 Clients" },
  { x: 500, year: "2015", label: "Next Generation" },
  { x: 700, year: "2024", label: "$1B+ AUM" },
]

export default function TimelineGrowth({ className = "" }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  const prefersReduced = useReducedMotion()
  const show = isInView || prefersReduced

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 800 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="timelineLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#D7C38A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="1" />
        </linearGradient>
        <filter id="timeGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Main horizontal timeline */}
      <motion.line
        x1="40" y1="90" x2="760" y2="90"
        stroke="url(#timelineLineGrad)" strokeWidth="2.5" strokeLinecap="round"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Milestones */}
      {milestones.map((m, i) => (
        <g key={m.year}>
          {/* Vertical tick */}
          <motion.line
            x1={m.x} y1="70" x2={m.x} y2="110"
            stroke="#D7C38A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"
            initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
            animate={show ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.35 }}
          />

          {/* Glow circle */}
          <motion.circle
            cx={m.x} cy={90} r="16"
            fill="#D7C38A" fillOpacity="0.08"
            initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.35 }}
          />

          {/* Node */}
          <motion.circle
            cx={m.x} cy={90} r="7"
            fill="#D7C38A" stroke="white" strokeWidth="2" strokeOpacity="0.6"
            filter="url(#timeGlow)"
            initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Year label */}
          <motion.text
            x={m.x} y={55}
            textAnchor="middle"
            fill="#D7C38A" fillOpacity="0.9"
            fontSize="14" fontFamily="'Libre Baskerville', Georgia, serif" fontWeight="700"
            initial={prefersReduced ? false : { opacity: 0, y: 60 }}
            animate={show ? { opacity: 1, y: 55 } : {}}
            transition={{ duration: 0.4, delay: 1.0 + i * 0.35 }}
          >
            {m.year}
          </motion.text>

          {/* Description label */}
          <motion.text
            x={m.x} y={130}
            textAnchor="middle"
            fill="#0B1A2C" fillOpacity="0.45"
            fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500"
            letterSpacing="0.03em"
            initial={prefersReduced ? false : { opacity: 0, y: 125 }}
            animate={show ? { opacity: 1, y: 130 } : {}}
            transition={{ duration: 0.4, delay: 1.1 + i * 0.35 }}
          >
            {m.label}
          </motion.text>

          {/* Upward growth branch from each milestone */}
          <motion.path
            d={`M${m.x} 70 C${m.x} 60, ${m.x + (i % 2 === 0 ? 15 : -15)} 45, ${m.x + (i % 2 === 0 ? 25 : -25)} 35`}
            stroke="#D7C38A" strokeWidth="1" strokeLinecap="round" fill="none" strokeOpacity="0.25"
            initial={prefersReduced ? false : { pathLength: 0 }}
            animate={show ? { pathLength: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.3 + i * 0.35 }}
          />

          {/* Small leaf at branch tip */}
          <motion.ellipse
            cx={m.x + (i % 2 === 0 ? 28 : -28)} cy={32}
            rx="5" ry="3"
            transform={`rotate(${i % 2 === 0 ? -30 : 30} ${m.x + (i % 2 === 0 ? 28 : -28)} 32)`}
            fill="#D7C38A" fillOpacity="0.2"
            initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.5 + i * 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </g>
      ))}

      {/* Arrow tip at the end */}
      <motion.path
        d="M750 82 L768 90 L750 98"
        stroke="#D7C38A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.3, delay: 2.2 }}
      />
    </svg>
  )
}
