'use client'

import { motion } from 'framer-motion'

/**
 * SVG bullseye mark — matches original logo color structure:
 *   navy outer ring → red → white → red → white center
 * Colors bumped up for visibility on dark background.
 * Arrow is white, passes through the center, shooting upper-right.
 */
function TargetSVG() {
  return (
    <>
      <defs>
        {/* Subtle red-blue glow makes the icon pop on deep-navy */}
        <filter id="logo-glow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#E11D2E" floodOpacity="0.35" />
          <feDropShadow dx="0" dy="0" stdDeviation="5"   floodColor="#1E4F9C" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#logo-glow)">
        {/* Outermost navy ring — brighter navy #1E5CB3 pops on deep-navy bg */}
        <circle cx="40" cy="40" r="37" fill="#1E5CB3" />
        {/* Thin white separator */}
        <circle cx="40" cy="40" r="29.5" fill="#F8FAFC" />
        {/* Red ring */}
        <circle cx="40" cy="40" r="28" fill="#E11D2E" />
        {/* White ring */}
        <circle cx="40" cy="40" r="20" fill="#F8FAFC" />
        {/* Inner red ring */}
        <circle cx="40" cy="40" r="12" fill="#E11D2E" />
        {/* White center bull */}
        <circle cx="40" cy="40" r="5.5" fill="#F8FAFC" />

        {/* Arrow — white, thick, passes through exact center (40,40), shoots upper-right */}
        {/* Line from lower-left (25,58) through center to just below arrowhead (54,23) */}
        <line
          x1="25" y1="58"
          x2="54" y2="23"
          stroke="#F8FAFC"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        {/* Arrowhead triangle — tip at (61,15), wings at (58,26) and (50,21) */}
        <polygon points="61,15 58,27 50,21" fill="#F8FAFC" />
      </g>
    </>
  )
}

/**
 * Full header logo — animated icon + stacked wordmark.
 * Icon springs upward (arrow "shoots up"), wordmark slides in.
 */
export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center gap-3.5 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
    >
      {/* Icon — spring overshoot simulates arrow shooting upward */}
      <motion.svg
        width="54"
        height="54"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 0.4, y: 24, opacity: 0 }}
        animate={{ scale: 1,   y: 0,  opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 12, delay: 0.08 }}
      >
        <TargetSVG />
      </motion.svg>

      {/* Wordmark — stacked like original, slides in after icon */}
      <motion.div
        className="flex flex-col leading-none"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.28 }}
      >
        <span className="font-headline text-pure-white text-[1.55rem] leading-none tracking-[0.04em]">
          PRIME
        </span>
        <span className="font-headline text-pure-white text-[1.55rem] leading-none tracking-[0.04em]">
          AMBITION
        </span>
        <span className="font-body text-steel-gray text-[8.5px] tracking-[0.42em] font-semibold uppercase mt-1">
          MARKETING
        </span>
      </motion.div>
    </motion.div>
  )
}
