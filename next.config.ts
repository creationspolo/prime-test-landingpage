import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Allow local public images with spaces in filenames during development
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

export default nextConfig
