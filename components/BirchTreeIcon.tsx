"use client"

// Elegant birch tree line art icon for mission section
export default function BirchTreeIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tree trunk */}
      <path
        d="M32 40 L32 75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Left branches */}
      <path
        d="M32 45 L20 48 M32 50 L18 52 M32 55 L22 58 M32 60 L25 62"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-80"
      />
      {/* Right branches */}
      <path
        d="M32 45 L44 48 M32 50 L46 52 M32 55 L42 58 M32 60 L39 62"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-80"
      />
      {/* Top canopy */}
      <path
        d="M20 30 Q32 15 44 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 25 Q32 10 42 25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        className="opacity-70"
      />
      {/* Root lines */}
      <path
        d="M32 75 L28 78 M32 75 L36 78"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-60"
      />
    </svg>
  )
}

