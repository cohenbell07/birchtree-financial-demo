import { MetadataRoute } from 'next'

// AI answer-engine crawlers we explicitly welcome so Birchtree can be surfaced
// and cited in ChatGPT, Claude, Perplexity, and Google AI Overviews/AI Mode.
// (Goal here is visibility, not content protection — see docs/seo playbook §4F.)
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Be explicit so a permissive default is never misread as a block.
      {
        userAgent: aiCrawlers,
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://www.birchtreefinancial.ca/sitemap.xml',
    host: 'https://www.birchtreefinancial.ca',
  }
}

