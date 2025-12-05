import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-heading font-bold text-forest mb-3 sm:mb-4">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-slate mb-3 sm:mb-4">
          Page Not Found
        </h2>
        <p className="text-base sm:text-lg text-slate mb-6 sm:mb-8 max-w-md mx-auto px-4">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild size="lg" className="relative z-10 text-white [&>*]:text-white">
          <Link href="/" className="text-white">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

