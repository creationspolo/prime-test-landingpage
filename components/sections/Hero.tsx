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

      {/* ── Layer 1: animated moving grid ── */}
      <div className="animated-grid absolute inset-0 pointer-events-none" />

      {/* ── Layer 2: floating glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full
                        bg-volt-red/[0.07] blur-[120px] animate-orb-a" />
        <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full
                        bg-indigo-600/[0.06] blur-[100px] animate-orb-b" />
        <div className="absolute top-1/2 right-1/4 w-[280px] h-[280px] rounded-full
                        bg-volt-red/[0.05] blur-[80px] animate-orb-c" />
      </div>

      {/* ── Layer 3: horizontal scan line sweeping downward ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-px animate-scan"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(225,29,46,0.25) 30%, rgba(225,29,46,0.5) 50%, rgba(225,29,46,0.25) 70%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* ── COPY — mobile: first (top), desktop: left ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col gap-6 order-first lg:order-first"
          >
            {/* Pre-qualifier with animated accent bar */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-volt-red animate-bar-glow" />
              <p className="text-volt-red text-[11px] sm:text-xs font-body font-semibold uppercase tracking-[0.22em]">
                For $1M+ per Year Concrete &amp; Hardscapers Ready To Grow
              </p>
            </div>

            {/* ── MEGA HEADLINE — Bebas Neue ── */}
            <div className="font-headline select-none">
              <div className="text-[clamp(3rem,8.5vw,6.5rem)] text-pure-white leading-none">
                GET OVER 80
              </div>
              <div className="text-[clamp(3rem,8.5vw,6.5rem)] text-pure-white leading-none">
                QUALIFIED BIG
              </div>
              <div className="text-[clamp(3rem,8.5vw,6.5rem)] text-pure-white leading-none">
                PROJECTS IN
              </div>
              <div className="text-[clamp(3rem,8.5vw,6.5rem)] text-pure-white leading-none">
                12 WEEKS
              </div>

              {/* GUARANTEED — larger, red glow */}
              <div className="relative inline-block mt-1">
                <div className="text-[clamp(3.5rem,10vw,7.5rem)] text-volt-red leading-none glow-red">
                  GUARANTEED
                </div>
                <div className="h-[3px] bg-volt-red rounded-full mt-1 animate-bar-glow" />
              </div>

              {/* OR YOU DON'T PAY */}
              <div className="text-[clamp(2rem,5.5vw,4.25rem)] text-pure-white/75 leading-none mt-2 tracking-widest">
                OR YOU DON&apos;T PAY
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                '250% Avg. Lead Increase',
                'No Long-Term Contracts',
                'Results in 30 Days',
              ].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 bg-dark-slate/80 border border-volt-red/20
                             rounded-full px-3 py-1.5 backdrop-blur-sm"
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

          {/* ── FORM — mobile: second (below copy), desktop: right ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="w-full order-last lg:order-last lg:sticky lg:top-8"
          >
            <GHLForm />
          </motion.div>

        </div>
      </div>

      {/* ── Mobile sticky CTA ── */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pt-3 pb-safe
                   bg-gradient-to-t from-deep-navy via-deep-navy/95 to-transparent"
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
