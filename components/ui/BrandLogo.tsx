'use client'

import { motion } from 'framer-motion'

/*
  Improved bullseye SVG — closely matches the original Prime Ambition logo:
  · 5-ring structure: navy → white → red → white → red center
  · Arrow (same dark navy) enters lower-left, exits dramatically top-right
  · Wordmark uses Playfair Display serif to match original
*/

function TargetSVG() {
  return (
    <>
      <defs>
        <filter id="logo-glow" x="-22%" y="-22%" width="144%" height="144%">
          <feDropShadow dx="0" dy="0" stdDeviation="2"   floodColor="#D42B2B" floodOpacity="0.45" />
          <feDropShadow dx="0" dy="0" stdDeviation="5.5" floodColor="#1E3D7A" floodOpacity="0.30" />
        </filter>
      </defs>

      <g filter="url(#logo-glow)">
        {/* ── Ring 1: dark navy outer ── */}
        <circle cx="42" cy="48" r="38" fill="#1E3D7A" />
        {/* ── White separator ── */}
        <circle cx="42" cy="48" r="30.5" fill="#F8FAFC" />
        {/* ── Ring 2: red ── */}
        <circle cx="42" cy="48" r="28" fill="#D42B2B" />
        {/* ── White separator ── */}
        <circle cx="42" cy="48" r="19.5" fill="#F8FAFC" />
        {/* ── Ring 3: red inner ── */}
        <circle cx="42" cy="48" r="14" fill="#D42B2B" />
        {/* ── White center bullseye ── */}
        <circle cx="42" cy="48" r="6.5" fill="#F8FAFC" />

        {/* ── Arrow shaft — enters lower-left, exits upper-right ── */}
        <line
          x1="8"  y1="86"
          x2="72" y2="18"
          stroke="#1E3D7A"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        {/* ── Arrowhead triangle ── */}
        <polygon points="82,6 77,22 66,15" fill="#1E3D7A" />
      </g>
    </>
  )
}

export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
    >
      {/* Icon — springs up on load */}
      <motion.svg
        width="60"
        height="56"
        viewBox="0 0 92 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 0.4, y: 24, opacity: 0 }}
        animate={{ scale: 1,   y: 0,  opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.08 }}
      >
        <TargetSVG />
      </motion.svg>

      {/* Wordmark — Playfair Display serif (matches original) */}
      <motion.div
        className="flex flex-col leading-none"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1,  x: 0  }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.26 }}
      >
        <span className="font-display font-bold text-pure-white leading-[0.95] tracking-[0.02em]" style={{ fontSize: '1.65rem' }}>
          PRIME
        </span>
        <span className="font-display font-bold text-pure-white leading-[0.95] tracking-[0.02em]" style={{ fontSize: '1.65rem' }}>
          AMBITION
        </span>
        <span className="font-body text-steel-gray font-semibold uppercase mt-1.5" style={{ fontSize: '8px', letterSpacing: '0.42em' }}>
          MARKETING
        </span>
      </motion.div>
    </motion.div>
  )
}
