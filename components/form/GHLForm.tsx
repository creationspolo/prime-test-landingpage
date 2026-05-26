'use client'

import Script from 'next/script'
import { useState, useEffect, useRef } from 'react'

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

function fireLead() {
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead')
  setTimeout(() => { window.location.href = '/thank-you' }, 1000)
}

export default function GHLForm() {
  const [loaded, setLoaded] = useState(false)
  const firedRef = useRef(false)
  const loadCountRef = useRef(0)

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (firedRef.current) return
      const d = e.data
      // GHL posts a message when the survey completes
      if (
        (typeof d === 'string' && d.includes('submitSurvey')) ||
        (typeof d === 'object' && d !== null && (d.type === 'submitSurvey' || d.type === 'form_submitted'))
      ) {
        firedRef.current = true
        fireLead()
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  function handleIframeLoad() {
    setLoaded(true)
    loadCountRef.current += 1
    // GHL reloads the iframe on submission — second load = form submitted
    if (loadCountRef.current >= 2 && !firedRef.current) {
      firedRef.current = true
      fireLead()
    }
  }

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

      {/* GHL Survey embed
          Height is capped at 85dvh on small screens so it never overflows the viewport.
          form_embed.js will override this once loaded with the real content height.  */}
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
        onLoad={handleIframeLoad}
      />

      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  )
}
