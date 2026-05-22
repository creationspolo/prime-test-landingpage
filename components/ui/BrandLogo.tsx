'use client'

import { motion } from 'framer-motion'

// ── Shared SVG shapes: bullseye rings + arrow ──
function TargetSVG() {
  return (
    <>
      {/* Bullseye: white → red → white → red → white (transparent bg — no white box) */}
      <circle cx="40" cy="40" r="36" fill="#F8FAFC" />
      <circle cx="40" cy="40" r="27" fill="#E11D2E" />
      <circle cx="40" cy="40" r="19" fill="#F8FAFC" />
      <circle cx="40" cy="40" r="11" fill="#E11D2E" />
      <circle cx="40" cy="40" r="5"  fill="#F8FAFC" />
      {/* Arrow shaft + head, white, shooting upper-right */}
      <line x1="22" y1="62" x2="55" y2="20" stroke="#F8FAFC" strokeWidth="4.5" strokeLinecap="round" />
      <polygon points="62,10 59,22 51,17" fill="#F8FAFC" />
    </>
  )
}

/**
 * Icon-only mark (target + arrow).
 * Used in the hero section as a brand accent next to the headline.
 */
export function BrandIcon({
  size = 48,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      /* Arrow shoots upward with spring overshoot */
      initial={{ scale: 0.45, y: 18, opacity: 0 }}
      animate={{ scale: 1,    y: 0,  opacity: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 17, delay: 0.18 }}
    >
      <TargetSVG />
    </motion.svg>
  )
}

/**
 * Full logo: animated icon + "PRIME AMBITION / MARKETING" wordmark.
 * Used in the site header (top-left corner).
 */
export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
    >
      {/* Icon — springs up with overshoot to sell the "arrow shooting up" */}
      <motion.svg
        width="50"
        height="50"
        viewBox="0 0 80 80"
        fill="none"
        initial={{ scale: 0.4, y: 22, opacity: 0 }}
        animate={{ scale: 1,   y: 0,  opacity: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 13, delay: 0.1 }}
      >
        <TargetSVG />
      </motion.svg>

      {/* Wordmark slides in from left */}
      <motion.div
        className="flex flex-col leading-none"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.38, ease: 'easeOut', delay: 0.3 }}
      >
        <span className="font-headline text-pure-white text-[1.5rem] leading-none tracking-[0.05em]">
          PRIME AMBITION
        </span>
        <span className="font-body text-steel-gray text-[9px] tracking-[0.38em] font-semibold uppercase mt-1">
          MARKETING
        </span>
      </motion.div>
    </motion.div>
  )
}
