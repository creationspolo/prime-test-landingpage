'use client'

import { BrandLogo } from '@/components/ui/BrandLogo'

export default function SiteHeader() {
  return (
    <header className="relative z-20 bg-deep-navy/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <BrandLogo />
      </div>
    </header>
  )
}
