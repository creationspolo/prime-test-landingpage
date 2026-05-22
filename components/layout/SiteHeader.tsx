'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function SiteHeader() {
  return (
    <header className="relative z-20 bg-deep-navy/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center sm:justify-start">

        {/* Outer container slides up on load */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Arrow/logo shoots upward with a spring overshoot */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
              delay: 0.15,
            }}
            className="bg-white rounded-xl px-4 py-2 shadow-lg"
          >
            <Image
              src="/logo.png"
              alt="Prime Ambition Marketing"
              width={200}
              height={60}
              priority
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </motion.div>
        </motion.div>

      </div>
    </header>
  )
}
