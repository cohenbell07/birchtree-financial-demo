import { Metadata } from "next"
import { notFound } from "next/navigation"

const resourceMetadata: Record<string, { title: string; description: string }> = {
  "understanding-retirement-planning-basics": {
    title: "Understanding Retirement Planning Basics",
    description: "A comprehensive guide to getting started with retirement planning, covering key concepts and strategies.",
  },
  "tax-efficient-investment-strategies": {
    title: "Tax-Efficient Investment Strategies",
    description: "Learn how to minimize taxes on your investments while maximizing returns.",
  },
  "estate-planning-essentials": {
    title: "Estate Planning Essentials",
    description: "Important considerations for creating an effective estate plan that protects your legacy.",
  },
  "financial-advisory-checklist": {
    title: "Financial Advisory Checklist",
    description: "A step-by-step guide to organizing your financial life and planning for the future.",
  },
  "investment-portfolio-basics": {
    title: "Investment Portfolio Basics",
    description: "Understanding asset allocation, diversification, and building a solid investment portfolio.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const resource = resourceMetadata[resolvedParams.slug]

  if (!resource) {
    return {
      title: "Resource Not Found | Birchtree Financial",
    }
  }

  return {
    title: `${resource.title} | Birchtree Financial`,
    description: resource.description,
  }
}

export default async function ResourceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const resource = resourceMetadata[resolvedParams.slug]

  if (!resource) {
    notFound()
  }

  return <>{children}</>
}

