"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const services = [
  { label: "Retirement", angle: 0 },
  { label: "Investment", angle: 60 },
  { label: "Insurance", angle: 120 },
  { label: "Tax", angle: 180 },
  { label: "Wealth", angle: 240 },
  { label: "Estate", angle: 300 },
]

export default function ServiceWheel({ className = "" }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  const prefersReduced = useReducedMotion()
  const show = isInView || prefersReduced

  const cx = 400, cy = 220, spokeR = 160, arcR = 130

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 800 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="wheelGlow">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0" />
        </radialGradient>
        <filter id="wheelFilter">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <motion.circle
        cx={cx} cy={cy} r="180"
        fill="url(#wheelGlow)"
        initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      />

      {/* Outer connecting arc */}
      <motion.circle
        cx={cx} cy={cy} r={spokeR}
        stroke="#D7C38A" strokeWidth="1" strokeOpacity="0.12" fill="none"
        strokeDasharray="8 6"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      />

      {/* Inner circle */}
      <motion.circle
        cx={cx} cy={cy} r={arcR}
        stroke="#D7C38A" strokeWidth="0.8" strokeOpacity="0.08" fill="none"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* Spokes and service nodes */}
      {services.map((svc, i) => {
        const rad = ((svc.angle - 90) * Math.PI) / 180
        const tipX = cx + Math.cos(rad) * spokeR
        const tipY = cy + Math.sin(rad) * spokeR
        const labelX = cx + Math.cos(rad) * (spokeR + 35)
        const labelY = cy + Math.sin(rad) * (spokeR + 35)

        return (
          <g key={svc.label}>
            {/* Spoke */}
            <motion.line
              x1={cx} y1={cy} x2={tipX} y2={tipY}
              stroke="#D7C38A" strokeWidth="1.5" strokeOpacity="0.2" strokeLinecap="round"
              initial={prefersReduced ? false : { pathLength: 0 }}
              animate={show ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.12, ease: "easeOut" }}
            />

            {/* Outer glow */}
            <motion.circle
              cx={tipX} cy={tipY} r="20"
              fill="#D7C38A" fillOpacity="0.06"
              initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
              animate={show ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.12 }}
            />

            {/* Service node */}
            <motion.circle
              cx={tipX} cy={tipY} r="10"
              fill="#D7C38A" fillOpacity="0.5"
              stroke="#D7C38A" strokeWidth="1.5" strokeOpacity="0.4"
              filter="url(#wheelFilter)"
              initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
              animate={show ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.3 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
            />

            {/* Service label */}
            <motion.text
              x={labelX} y={labelY + 4}
              textAnchor="middle"
              fill="#0B1A2C" fillOpacity="0.5"
              fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600"
              letterSpacing="0.04em"
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={show ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.6 + i * 0.1 }}
            >
              {svc.label.toUpperCase()}
            </motion.text>
          </g>
        )
      })}

      {/* Connecting arcs between adjacent service nodes */}
      {services.map((_, i) => {
        const rad1 = ((services[i].angle - 90) * Math.PI) / 180
        const rad2 = ((services[(i + 1) % 6].angle - 90) * Math.PI) / 180
        const x1 = cx + Math.cos(rad1) * spokeR
        const y1 = cy + Math.sin(rad1) * spokeR
        const x2 = cx + Math.cos(rad2) * spokeR
        const y2 = cy + Math.sin(rad2) * spokeR
        const midRad = (((services[i].angle + 30) - 90) * Math.PI) / 180
        const ctrlX = cx + Math.cos(midRad) * (spokeR + 25)
        const ctrlY = cy + Math.sin(midRad) * (spokeR + 25)

        return (
          <motion.path
            key={`arc-${i}`}
            d={`M${x1} ${y1} Q${ctrlX} ${ctrlY} ${x2} ${y2}`}
            stroke="#D7C38A" strokeWidth="0.8" strokeOpacity="0.1" fill="none"
            initial={prefersReduced ? false : { pathLength: 0 }}
            animate={show ? { pathLength: 1 } : {}}
            transition={{ duration: 0.4, delay: 2.0 + i * 0.08 }}
          />
        )
      })}

      {/* Center hub */}
      <motion.circle
        cx={cx} cy={cy} r="28"
        fill="#D7C38A" fillOpacity="0.12"
        stroke="#D7C38A" strokeWidth="1.5" strokeOpacity="0.3"
        initial={prefersReduced ? false : { scale: 0 }}
        animate={show ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <motion.circle
        cx={cx} cy={cy} r="16"
        fill="#D7C38A" fillOpacity="0.4"
        filter="url(#wheelFilter)"
        initial={prefersReduced ? false : { scale: 0 }}
        animate={show ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      />

      {/* Center label */}
      <motion.text
        x={cx} y={cy - 40}
        textAnchor="middle"
        fill="#0B1A2C" fillOpacity="0.35"
        fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600"
        letterSpacing="0.08em"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 2.5 }}
      >
        YOUR FINANCIAL
      </motion.text>
      <motion.text
        x={cx} y={cy - 28}
        textAnchor="middle"
        fill="#0B1A2C" fillOpacity="0.35"
        fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600"
        letterSpacing="0.08em"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 2.6 }}
      >
        PLAN
      </motion.text>

      {/* Pulse from center */}
      {show && !prefersReduced && (
        <motion.circle
          cx={cx} cy={cy} r="16"
          fill="none" stroke="#D7C38A" strokeOpacity="0.3" strokeWidth="1"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" }}
        />
      )}
    </svg>
  )
}
