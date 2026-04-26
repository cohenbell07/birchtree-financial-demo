/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },
  experimental: {
    // optimizePackageImports tree-shakes named imports from these packages
    // at the route level. Stable since Next 14.1.
    optimizePackageImports: ['lucide-react'],
  },
  // Suppress source maps in production for smaller bundles & no dev-tool clutter.
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
