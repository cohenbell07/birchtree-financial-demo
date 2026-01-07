import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHeader({
  title,
  subtitle,
  className = "",
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative gradient-bg text-white py-10 sm:py-16 md:py-20 lg:py-24 overflow-hidden ${className}`}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-midnight/30" />
      
      {/* Ultra-light noise texture */}
      <div className="absolute inset-0 texture-noise pointer-events-none" />
      
      {/* Subtle gradient orbs - reduced blur for performance */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-emerald/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-3 sm:mb-4 md:mb-6 text-balance section-title leading-tight sm:leading-normal"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-silver/90 max-w-3xl text-balance leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
