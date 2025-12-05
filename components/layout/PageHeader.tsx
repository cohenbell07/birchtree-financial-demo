import { motion } from "framer-motion"
import ParticleBackground from "@/components/ParticleBackground"

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
      className={`relative gradient-bg text-white py-16 sm:py-20 md:py-24 overflow-hidden ${className}`}
    >
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-midnight/30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mint/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 sm:mb-6 text-balance"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl text-silver/90 max-w-3xl text-balance"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
