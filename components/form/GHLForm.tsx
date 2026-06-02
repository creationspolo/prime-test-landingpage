'use client'

import Script from 'next/script'
import { useState } from 'react'

export default function GHLForm() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      id="lead-form"
      className="bg-dark-slate rounded-xl border border-steel-gray/20 overflow-hidden w-full shadow-2xl"
    >
      {/* Card header */}
      <div className="px-4 sm:px-6 pt-5 pb-2">
        <p className="text-volt-red text-[10px] sm:text-xs uppercase tracking-widest font-body font-semibold mb-1">
          Free Strategy Call
        </p>
        <h2 className="font-display font-bold text-base sm:text-lg text-pure-white">
          FILL OUT THE QUICK FORM
        </h2>
      </div>

      {/* Skeleton — shown while iframe loads */}
      {!loaded && (
        <div className="px-4 sm:px-6 pb-5 space-y-3 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-11 rounded-md bg-steel-gray/10" />
          ))}
          <div className="h-11 rounded-md bg-volt-red/20" />
        </div>
      )}

      {/* GHL Survey embed */}
      <iframe
        src="https://api.leadconnectorhq.com/widget/survey/gvZ7vBtoA7ZuTXJOY0zn"
        style={{
          border: 'none',
          width: '100%',
          minHeight: 'min(520px, 85dvh)',
          display: loaded ? 'block' : 'none',
        }}
        scrolling="no"
        id="gvZ7vBtoA7ZuTXJOY0zn"
        title="Book Your Free Strategy Call"
        onLoad={() => setLoaded(true)}
      />

      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  )
}
