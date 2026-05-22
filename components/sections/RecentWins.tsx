'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const WINS = [
  { id: 1, src: '/abrham results.png',             alt: 'Abraham client results' },
  { id: 2, src: '/hardscape results.png',           alt: 'Hardscape project results' },
  { id: 3, src: '/hardscape results pt2 ric.jpeg',  alt: 'Ricardo hardscape results' },
  { id: 4, src: '/photo_5093770796211047484_y.jpg', alt: 'Client result screenshot' },
  { id: 5, src: '/photo_5093770796211047485_y.jpg', alt: 'Client result screenshot' },
  { id: 6, src: '/photo_5093770796211047486_y.jpg', alt: 'Client result screenshot' },
  { id: 7, src: '/photo_5093770796211047487_y.jpg', alt: 'Client result screenshot' },
]

const INTERVAL = 3800

export default function RecentWins() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setCurrent(idx)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % WINS.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + WINS.length) % WINS.length, -1)
  }, [current, goTo])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    timeoutRef.current = setTimeout(next, INTERVAL)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [current, paused, next])

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
    touchStartY.current = e.changedTouches[0].clientY
    setPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = touchStartY.current - e.changedTouches[0].clientY
    // Only treat as a horizontal swipe if dx dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx > 0) next()
      else prev()
    }
    // Brief delay before re-enabling auto-advance so the swipe animation settles
    setTimeout(() => setPaused(false), 600)
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-deep-navy">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-7 sm:mb-10">
          <h2 className="font-display font-bold text-[clamp(1.5rem,4vw,2.75rem)] text-pure-white mb-3">
            CLIENT RECENT WINS
          </h2>
          <div className="w-12 h-1 bg-volt-red mx-auto rounded-full" />
          <p className="text-steel-gray font-body text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Real results from real contractors — texts, dashboards, and payment notifications.
          </p>
        </div>

        {/* Slideshow container */}
        <div
          className="relative rounded-2xl overflow-hidden bg-dark-slate border border-steel-gray/20 shadow-2xl select-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slide area — fluid height via aspect ratio on mobile, fixed on desktop */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 flex items-center justify-center p-3 sm:p-6"
              >
                <Image
                  src={WINS[current].src}
                  alt={WINS[current].alt}
                  fill
                  className="object-contain"
                  priority={current === 0}
                  draggable={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="tap-target absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10
                       w-9 h-9 sm:w-11 sm:h-11 rounded-full
                       bg-deep-navy/75 border border-steel-gray/30 text-pure-white
                       hover:bg-volt-red hover:border-volt-red active:scale-95 transition"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next"
            className="tap-target absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10
                       w-9 h-9 sm:w-11 sm:h-11 rounded-full
                       bg-deep-navy/75 border border-steel-gray/30 text-pure-white
                       hover:bg-volt-red hover:border-volt-red active:scale-95 transition"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide counter */}
          <div className="absolute top-2 right-2 bg-deep-navy/75 rounded-full px-2.5 py-1 z-10">
            <span className="text-pure-white text-[11px] font-body font-medium">
              {current + 1} / {WINS.length}
            </span>
          </div>

          {/* Swipe hint — mobile only, fades out after first touch */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:hidden z-10 pointer-events-none">
            <p className="text-steel-gray/60 text-[10px] font-body">swipe to browse</p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-steel-gray/20 z-10">
            <motion.div
              key={`bar-${current}`}
              className="h-full bg-volt-red"
              initial={{ width: '0%' }}
              animate={{ width: paused ? undefined : '100%' }}
              transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {WINS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 tap-target ${
                i === current
                  ? 'w-5 h-2 bg-volt-red'
                  : 'w-2 h-2 bg-steel-gray/40 hover:bg-steel-gray active:bg-volt-red/60'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail strip — hidden on very small screens, visible sm+ */}
        <div className="hidden sm:flex gap-2 mt-3 overflow-x-auto pb-1 justify-center scrollbar-none">
          {WINS.map((win, i) => (
            <button
              key={win.id}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`View ${win.alt}`}
              className={`relative shrink-0 w-14 h-10 sm:w-16 sm:h-12 rounded-md overflow-hidden border-2 transition tap-target
                ${i === current
                  ? 'border-volt-red shadow-red-glow'
                  : 'border-steel-gray/20 hover:border-steel-gray/60 active:border-volt-red/50'
                }`}
            >
              <Image
                src={win.src}
                alt={win.alt}
                fill
                className="object-contain bg-dark-slate"
                sizes="64px"
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-10">
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 border border-volt-red text-volt-red
                       font-body font-semibold text-sm px-6 py-3 rounded-md
                       hover:bg-volt-red hover:text-white active:bg-red-700 transition tap-target"
          >
            I Want Results Like These
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
