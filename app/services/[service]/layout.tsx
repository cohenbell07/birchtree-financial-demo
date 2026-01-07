import { Metadata } from "next"
import { notFound } from "next/navigation"

const serviceDetails: Record<
  string,
  {
    title: string
    description: string
  }
> = {
  "retirement-planning": {
    title: "Retirement Planning",
    description: "Secure your future with a comprehensive retirement strategy tailored to your goals and timeline.",
  },
  "investment-management": {
    title: "Investment Management",
    description: "Expert portfolio management designed to grow and protect your wealth through disciplined investment strategies.",
  },
  "insurance-strategies": {
    title: "Insurance Strategies",
    description: "Protect what matters most with customized insurance solutions tailored to your unique needs.",
  },
  "tax-optimization-strategies": {
    title: "Tax Optimization Strategies",
    description: "Minimize your tax burden while maximizing financial efficiency through strategic tax planning.",
  },
  "wealth-building-advisory": {
    title: "Wealth Building & Advisory",
    description: "Strategic advisory services to build, preserve, and transfer your wealth effectively.",
  },
  "estate-planning-guidance": {
    title: "Estate Planning Guidance",
    description: "Ensure your wealth is transferred according to your wishes while minimizing taxes and preserving family harmony.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service: serviceSlug } = await params
  const service = serviceDetails[serviceSlug]

  if (!service) {
    notFound()
  }

  return {
    title: service.title,
    description: service.description,
  }
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

