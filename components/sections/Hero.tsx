'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import GHLForm from '@/components/form/GHLForm'

export default function Hero() {
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const form = document.getElementById('lead-form')
    if (!form) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative bg-deep-navy overflow-hidden">
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#F8FAFC 1px,transparent 1px),linear-gradient(90deg,#F8FAFC 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        {/*
          Mobile: form first (order-first), copy second (order-last)
          Desktop: copy left, form right (lg:order-none restores natural order)
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* ── FORM (mobile: top, desktop: right) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full order-last lg:order-last lg:sticky lg:top-8"
          >
            <GHLForm />
          </motion.div>

          {/* ── COPY (mobile: below form, desktop: left) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-5 order-first lg:order-first"
          >
            {/* Pre-qualifier */}
            <p className="text-volt-red text-[11px] sm:text-sm font-body font-semibold uppercase tracking-[0.18em]">
              For $1M+ per Year Hardscapers Ready To Grow
            </p>

            {/* H1 — no forced <br> so it wraps naturally on any width */}
            <h1 className="font-display font-bold text-pure-white leading-[1.1] text-[clamp(1.75rem,6vw,3.75rem)]">
              GET OVER 80 QUALIFIED BIG PROJECTS IN 12 WEEKS —{' '}
              <span className="text-volt-red">GUARANTEED</span>{' '}
              OR YOU DON&apos;T PAY
            </h1>

            {/* Sub-headline */}
            <p className="font-body text-steel-gray text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed">
              Our AI-powered marketing system fills your calendar with
              pre-qualified projects — so you scale with confidence, not guesswork.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                '250% Avg. Lead Increase',
                'No Long-Term Contracts',
                'Results in 30 Days',
              ].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 bg-dark-slate border border-steel-gray/20 rounded-full px-3 py-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-volt-red shrink-0" />
                  <span className="text-pure-white text-[11px] sm:text-xs font-body font-medium">{badge}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <p className="text-steel-gray text-xs sm:text-sm font-body">
              Trusted by{' '}
              <span className="text-pure-white font-medium">200+ contractors</span>{' '}
              nationwide — averaging{' '}
              <span className="text-volt-red font-medium">$50K–$80K in new monthly revenue</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile sticky CTA — only when form is scrolled out of view ── */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pt-3 pb-safe bg-gradient-to-t from-deep-navy via-deep-navy/95 to-transparent"
        initial={{ y: 80 }}
        animate={{ y: showSticky ? 0 : 80 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
      >
        <a
          href="#lead-form"
          className="tap-target flex items-center justify-center gap-2 w-full bg-volt-red text-white
                     font-body font-semibold text-sm py-4 rounded-xl shadow-red-glow"
        >
          Book My Free Strategy Call
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
