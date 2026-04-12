"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const values = [
  { angle: 0, label: "Excellence", dx: 0, dy: -15 },
  { angle: 90, label: "Trust", dx: 15, dy: 0 },
  { angle: 180, label: "Service", dx: 0, dy: 15 },
  { angle: 270, label: "Client-First", dx: -15, dy: 0 },
]

export default function ValuesCompass({ className = "" }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  const prefersReduced = useReducedMotion()
  const show = isInView || prefersReduced

  const cx = 200, cy = 200, outerR = 140, innerR = 90

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="compassGlow">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0" />
        </radialGradient>
        <filter id="compassFilter">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <motion.circle
        cx={cx} cy={cy} r="160"
        fill="url(#compassGlow)"
        initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      />

      {/* Outer circle */}
      <motion.circle
        cx={cx} cy={cy} r={outerR}
        stroke="#D7C38A" strokeWidth="1.5" strokeOpacity="0.2" fill="none"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Inner circle */}
      <motion.circle
        cx={cx} cy={cy} r={innerR}
        stroke="#D7C38A" strokeWidth="1" strokeOpacity="0.12" fill="none"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />

      {/* Middle circle */}
      <motion.circle
        cx={cx} cy={cy} r="50"
        stroke="#D7C38A" strokeWidth="0.8" strokeOpacity="0.08" fill="none"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Compass star points and spokes */}
      {values.map((v, i) => {
        const rad = (v.angle * Math.PI) / 180
        const tipX = cx + Math.sin(rad) * outerR
        const tipY = cy - Math.cos(rad) * outerR
        const midX = cx + Math.sin(rad) * innerR
        const midY = cy - Math.cos(rad) * innerR
        const labelX = cx + Math.sin(rad) * (outerR + 30)
        const labelY = cy - Math.cos(rad) * (outerR + 30)

        // Diamond shape points for each compass arm
        const leftRad = ((v.angle - 15) * Math.PI) / 180
        const rightRad = ((v.angle + 15) * Math.PI) / 180
        const sideX1 = cx + Math.sin(leftRad) * 50
        const sideY1 = cy - Math.cos(leftRad) * 50
        const sideX2 = cx + Math.sin(rightRad) * 50
        const sideY2 = cy - Math.cos(rightRad) * 50

        return (
          <g key={v.label}>
            {/* Spoke line */}
            <motion.line
              x1={cx} y1={cy} x2={tipX} y2={tipY}
              stroke="#D7C38A" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"
              initial={prefersReduced ? false : { pathLength: 0 }}
              animate={show ? { pathLength: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
            />

            {/* Diamond arm */}
            <motion.path
              d={`M${cx} ${cy} L${sideX1} ${sideY1} L${tipX} ${tipY} L${sideX2} ${sideY2} Z`}
              fill="#D7C38A" fillOpacity="0.08"
              stroke="#D7C38A" strokeWidth="0.8" strokeOpacity="0.2"
              initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
              animate={show ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.0 + i * 0.15 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />

            {/* Tip node */}
            <motion.circle
              cx={tipX} cy={tipY} r="6"
              fill="#D7C38A" fillOpacity="0.7"
              stroke="#D7C38A" strokeWidth="1" strokeOpacity="0.4"
              filter="url(#compassFilter)"
              initial={prefersReduced ? false : { scale: 0 }}
              animate={show ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.3 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            />

            {/* Value label */}
            <motion.text
              x={labelX} y={labelY + 4}
              textAnchor="middle"
              fill="#D7C38A" fillOpacity="0.7"
              fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600"
              letterSpacing="0.05em"
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={show ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.6 + i * 0.1 }}
            >
              {v.label.toUpperCase()}
            </motion.text>
          </g>
        )
      })}

      {/* Center node */}
      <motion.circle
        cx={cx} cy={cy} r="12"
        fill="#D7C38A" fillOpacity="0.8"
        filter="url(#compassFilter)"
        initial={prefersReduced ? false : { scale: 0 }}
        animate={show ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <motion.circle
        cx={cx} cy={cy} r="5"
        fill="white" fillOpacity="0.3"
        initial={prefersReduced ? false : { scale: 0 }}
        animate={show ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.8 }}
      />

      {/* Pulse from center */}
      {show && !prefersReduced && (
        <motion.circle
          cx={cx} cy={cy} r="12"
          fill="none" stroke="#D7C38A" strokeOpacity="0.3" strokeWidth="1"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeOut" }}
        />
      )}

      {/* Diagonal tick marks between compass points */}
      {[45, 135, 225, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = cx + Math.sin(rad) * (outerR - 8)
        const y1 = cy - Math.cos(rad) * (outerR - 8)
        const x2 = cx + Math.sin(rad) * (outerR + 4)
        const y2 = cy - Math.cos(rad) * (outerR + 4)
        return (
          <motion.line
            key={`tick-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#D7C38A" strokeWidth="1" strokeOpacity="0.15" strokeLinecap="round"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 2 + i * 0.05 }}
          />
        )
      })}
    </svg>
  )
}
