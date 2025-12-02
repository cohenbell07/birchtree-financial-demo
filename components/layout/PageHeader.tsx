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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-forest to-forest-dark text-white py-12 sm:py-16 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 sm:mb-4 text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-cream max-w-3xl text-balance">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  )
}

