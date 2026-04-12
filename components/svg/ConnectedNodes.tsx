"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const nodes = [
  { x: 400, y: 150, r: 18, label: "You", primary: true },
  { x: 200, y: 80, r: 12, label: "Retirement" },
  { x: 600, y: 75, r: 12, label: "Investment" },
  { x: 140, y: 200, r: 10, label: "Insurance" },
  { x: 660, y: 210, r: 10, label: "Tax" },
  { x: 280, y: 260, r: 11, label: "Estate" },
  { x: 520, y: 265, r: 11, label: "Wealth" },
  { x: 80, y: 120, r: 7 },
  { x: 720, y: 130, r: 7 },
  { x: 100, y: 280, r: 6 },
  { x: 700, y: 280, r: 6 },
]

const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 7], [2, 8], [1, 3], [2, 4], [5, 3], [6, 4],
  [5, 6], [1, 2], [7, 9], [8, 10], [3, 9], [4, 10],
  [5, 9], [6, 10],
]

export default function ConnectedNodes({ className = "" }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  const prefersReduced = useReducedMotion()
  const show = isInView || prefersReduced

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 800 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="centerGlow">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#D7C38A" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0" />
        </radialGradient>
        <filter id="nodeGlowFilter">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Large center glow */}
      <motion.circle
        cx={400} cy={150} r="100"
        fill="url(#centerGlow)"
        initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      />

      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <motion.line
          key={`line-${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#D7C38A" strokeOpacity={nodes[a].primary || nodes[b].primary ? 0.2 : 0.08}
          strokeWidth={nodes[a].primary || nodes[b].primary ? 1.5 : 0.8}
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
          animate={show ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: "easeOut" }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          {/* Outer ring for labeled nodes */}
          {node.label && (
            <motion.circle
              cx={node.x} cy={node.y} r={node.r + 6}
              fill="none" stroke="#D7C38A"
              strokeOpacity={node.primary ? 0.3 : 0.1}
              strokeWidth={node.primary ? 1.5 : 0.8}
              initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
              animate={show ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.06 }}
            />
          )}
          {/* Main node */}
          <motion.circle
            cx={node.x} cy={node.y} r={node.r}
            fill={node.primary ? "#D7C38A" : "#1B2A3D"}
            fillOpacity={node.primary ? 0.9 : 0.4}
            stroke={node.primary ? "#D7C38A" : "#0B1A2C"}
            strokeOpacity={0.4}
            strokeWidth={node.primary ? 2 : 1}
            filter={node.primary ? "url(#nodeGlowFilter)" : undefined}
            initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 1.0 + i * 0.08,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          />
          {/* Labels */}
          {node.label && (
            <motion.text
              x={node.x} y={node.y + node.r + 18}
              textAnchor="middle"
              fill={node.primary ? "#D7C38A" : "#0B1A2C"}
              fillOpacity={node.primary ? 0.8 : 0.4}
              fontSize={node.primary ? "13" : "10"}
              fontFamily="Inter, sans-serif"
              fontWeight={node.primary ? "600" : "400"}
              letterSpacing="0.03em"
              initial={prefersReduced ? false : { opacity: 0, y: node.y + node.r + 12 }}
              animate={show ? { opacity: 1, y: node.y + node.r + 18 } : {}}
              transition={{ duration: 0.4, delay: 1.8 + i * 0.06 }}
            >
              {node.label}
            </motion.text>
          )}
        </g>
      ))}

      {/* Pulse rings from center */}
      {show && !prefersReduced && [0, 1, 2].map((i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={400} cy={150} r="18"
          fill="none" stroke="#D7C38A" strokeOpacity="0.3" strokeWidth="1"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5, delay: 2 + i * 1, ease: "easeOut" }}
        />
      ))}
    </svg>
  )
}
