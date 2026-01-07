"use client"

// Lightweight CSS-only background component - no JavaScript animations
export default function HeroBackground() {
  return (
    <>
      {/* Premium gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 vignette" />
      
      {/* Very subtle financial grid pattern - CSS only */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(27, 42, 61, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27, 42, 61, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Subtle accent gradients - static */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-emerald/3 rounded-full blur-3xl" />
      
      {/* Ultra-light noise texture */}
      <div className="absolute inset-0 texture-noise pointer-events-none" />
    </>
  )
}

