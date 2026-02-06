import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://birchtreefinancial.ca'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/team',
    '/services',
    '/resources',
    '/faq',
    '/contact',
    '/ai-advisor',
    '/blog',
    '/helpful-tools',
    '/referral',
    '/why-you-need-a-will',
  ]

  // Team members
  const teamMembers = [
    'melissa-birch',
    'kevin-birch',
    'kaleb-birch',
    'crystal',
    'art-birch',
  ]

  // Services
  const services = [
    'retirement-planning',
    'investment-management',
    'insurance-strategies',
    'tax-optimization-strategies',
    'wealth-building-advisory',
    'estate-planning-guidance',
  ]

  // Resource pages
  const resources = [
    'understanding-retirement-planning-basics',
    'tax-efficient-investment-strategies',
    'estate-planning-essentials',
    'financial-advisory-checklist',
    'investment-portfolio-basics',
  ]

  // Tool pages
  const tools = [
    'risk-profiler',
    'retirement-calculator',
    'bank-loan-calculator',
    'cpp-oas-optimizer',
    'net-worth-tracker',
    'resp-planner',
    'savings-calculator',
    'tax-optimization-calculator',
    'tfsa-rrsp-analyzer',
  ]

  // Build sitemap entries
  const routes: MetadataRoute.Sitemap = []

  // Add static pages
  staticPages.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
    })
  })

  // Add team member pages
  teamMembers.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/team/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Add service pages
  services.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Add resource pages
  resources.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/resources/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Add tool pages
  tools.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Add blog posts dynamically
  try {
    const blogPosts = getAllPosts()
    blogPosts.forEach((post) => {
      routes.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  } catch (error) {
    // Silently fail if blog posts can't be loaded
    console.warn('[Sitemap] Error loading blog posts:', error)
  }

  return routes
}

