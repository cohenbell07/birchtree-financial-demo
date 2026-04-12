"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const members = [
  { x: 400, y: 140, r: 22, label: "Birchtree", primary: true },
  { x: 180, y: 80, r: 16, label: "Melissa" },
  { x: 620, y: 80, r: 16, label: "Kevin" },
  { x: 140, y: 200, r: 14, label: "Crystal" },
  { x: 660, y: 200, r: 14, label: "Kaleb" },
  { x: 400, y: 260, r: 16, label: "Art" },
]

const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 3], [2, 4], [1, 2], [3, 5], [4, 5],
]

export default function TeamNetwork({ className = "" }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  const prefersReduced = useReducedMotion()
  const show = isInView || prefersReduced

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 800 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="teamCenterGlow">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0" />
        </radialGradient>
        <filter id="teamGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Center glow */}
      <motion.circle
        cx={400} cy={140} r="90"
        fill="url(#teamCenterGlow)"
        initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      />

      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <motion.line
          key={`conn-${i}`}
          x1={members[a].x} y1={members[a].y}
          x2={members[b].x} y2={members[b].y}
          stroke="#D7C38A"
          strokeOpacity={members[a].primary || members[b].primary ? 0.25 : 0.1}
          strokeWidth={members[a].primary || members[b].primary ? 1.5 : 1}
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
          animate={show ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: "easeOut" }}
        />
      ))}

      {/* Member nodes */}
      {members.map((m, i) => (
        <g key={m.label}>
          {/* Outer ring */}
          <motion.circle
            cx={m.x} cy={m.y} r={m.r + 8}
            fill="none" stroke="#D7C38A"
            strokeOpacity={m.primary ? 0.25 : 0.1}
            strokeWidth={m.primary ? 1.5 : 0.8}
            initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
          />

          {/* Person silhouette circle */}
          <motion.circle
            cx={m.x} cy={m.y} r={m.r}
            fill={m.primary ? "#D7C38A" : "#D7C38A"}
            fillOpacity={m.primary ? 0.6 : 0.25}
            stroke="#D7C38A" strokeWidth={m.primary ? 2 : 1} strokeOpacity={0.5}
            filter={m.primary ? "url(#teamGlow)" : undefined}
            initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.1 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Simple person icon inside node */}
          <motion.g
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.4 + i * 0.1 }}
          >
            {/* Head */}
            <circle cx={m.x} cy={m.y - m.r * 0.2} r={m.r * 0.22}
              fill="white" fillOpacity={m.primary ? 0.7 : 0.4} />
            {/* Body */}
            <path
              d={`M${m.x - m.r * 0.25} ${m.y + m.r * 0.15} Q${m.x} ${m.y + m.r * 0.02}, ${m.x + m.r * 0.25} ${m.y + m.r * 0.15}`}
              stroke="white" strokeOpacity={m.primary ? 0.7 : 0.4} strokeWidth="1.5" fill="none" strokeLinecap="round"
            />
          </motion.g>

          {/* Name label */}
          <motion.text
            x={m.x} y={m.y + m.r + 22}
            textAnchor="middle"
            fill="#D7C38A" fillOpacity={m.primary ? 0.8 : 0.5}
            fontSize={m.primary ? "13" : "11"} fontFamily="Inter, sans-serif"
            fontWeight={m.primary ? "700" : "500"}
            letterSpacing="0.02em"
            initial={prefersReduced ? false : { opacity: 0, y: m.y + m.r + 16 }}
            animate={show ? { opacity: 1, y: m.y + m.r + 22 } : {}}
            transition={{ duration: 0.3, delay: 1.6 + i * 0.08 }}
          >
            {m.label}
          </motion.text>
        </g>
      ))}

      {/* Pulse rings from center */}
      {show && !prefersReduced && [0, 1].map((i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={400} cy={140} r="22"
          fill="none" stroke="#D7C38A" strokeOpacity="0.25" strokeWidth="1"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, delay: 2 + i * 1.5, ease: "easeOut" }}
        />
      ))}
    </svg>
  )
}
