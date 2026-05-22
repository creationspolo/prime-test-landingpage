'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-dark-slate border-t border-steel-gray/10"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-volt-red" />

      {/* Background glow — reduced on mobile for perf */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-volt-red/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="space-y-5 sm:space-y-6"
        >
          <p className="text-volt-red text-[10px] sm:text-xs uppercase tracking-[0.2em] font-body font-semibold">
            Don&apos;t Leave Money on the Table
          </p>

          <h2 className="font-display font-bold text-pure-white text-[clamp(1.75rem,5vw,3.25rem)] leading-tight">
            READY TO FILL YOUR CALENDAR?
          </h2>

          <p className="text-steel-gray font-body text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            Book a free 30-minute strategy call. We&apos;ll map out exactly how to
            add $50K–$80K in new monthly revenue to your hardscape business.
          </p>

          {/* Button — full-width on mobile, auto on desktop */}
          <div>
            <a
              href="#lead-form"
              className="tap-target inline-flex items-center justify-center gap-3 w-full sm:w-auto
                         bg-volt-red hover:bg-red-700 active:bg-red-800 text-white
                         font-body font-bold text-sm sm:text-base
                         px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-lg
                         transition shadow-red-glow"
            >
              BOOK MY STRATEGY CALL
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <p className="text-steel-gray text-[11px] sm:text-xs font-body max-w-sm mx-auto leading-relaxed">
            <span className="text-pure-white font-medium">100% Risk-Free.</span>{' '}
            80+ qualified projects in 12 weeks —{' '}
            <span className="text-volt-red font-medium">GUARANTEED or you don&apos;t pay.</span>{' '}
            No long-term contracts.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
