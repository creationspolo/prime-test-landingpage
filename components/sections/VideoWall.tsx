'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Testimonial = {
  id: number
  result: string
  name: string
  business: string
  videoSrc?: string
  videoType?: 'mp4' | 'mov'
  youtubeId?: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    result: 'TRIPLE HIS REVENUE AND DID OVER 70K IN REV FIRST MONTH WORKING WITH US',
    name: 'Jesus Malfa',
    business: 'Landscape Contractor',
    videoSrc: '/testimony%20part%205%20(05-22).mp4',
    videoType: 'mp4',
  },
  {
    id: 2,
    result: 'ADDED ADDITIONAL 50-80K MONTHLY',
    name: 'Ricardo',
    business: 'General Contractor — Coachella Valley',
    videoSrc: '/testtimonial%20video%20pt5%2005-21-26.mp4',
    videoType: 'mp4',
  },
  {
    id: 3,
    result: 'CLOSING OVER 100K EVERY MONTH CONSISTENTLY',
    name: 'Yair',
    business: 'Landscape Designer',
    videoSrc: '/new%20testmony%20zoom%20call%20yair.mp4',
    videoType: 'mp4',
  },
  {
    id: 4,
    result: 'CONSISTENTLY CLOSES MORE THAN 10 DEALS EVERY MONTH',
    name: 'Brian M.',
    business: 'General Contractor',
    videoSrc: '/prime%20ambiton%20inperson%20d(05-22-26).mp4',
    videoType: 'mp4',
  },
  {
    id: 5,
    result: 'CLOSED OVER 7 JOBS HIS FIRST MONTH WORKING WITH US',
    name: '',
    business: '',
    videoSrc: '/IMG_3984.MOV',
    videoType: 'mov',
  },
]

function VideoPlayer({ t }: { t: Testimonial }) {
  if (t.videoSrc) {
    return (
      <video
        controls
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'contain', background: '#111827' }}
      >
        {/* URL-encoded paths ensure mobile browsers (Safari/Chrome) load the source correctly */}
        <source src={t.videoSrc} type="video/mp4" />
        {t.videoType === 'mov' && <source src={t.videoSrc} type="video/quicktime" />}
      </video>
    )
  }

  if (t.youtubeId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${t.youtubeId}?rel=0&modestbranding=1`}
        title={t.result}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
      />
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-14 h-14 rounded-full bg-volt-red flex items-center justify-center shadow-red-glow">
        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )
}

function VideoCard({
  testimonial,
  index,
  isRight,
}: {
  testimonial: Testimonial
  index: number
  isRight: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      /* On mobile always fade-in (no horizontal slide to avoid overflow) */
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
      className={`flex flex-col lg:flex-row ${isRight ? 'lg:flex-row-reverse' : ''} gap-5 lg:gap-10 items-center`}
    >
      {/* Result copy */}
      <div className={`w-full lg:flex-1 ${isRight ? 'lg:text-right' : ''}`}>
        <p className="text-volt-red text-[10px] sm:text-xs uppercase tracking-widest font-body font-semibold mb-1.5">
          Client Result
        </p>
        <h3 className="font-display font-bold text-pure-white text-[clamp(1.25rem,4vw,2.1rem)] leading-tight text-balance">
          {testimonial.result}
        </h3>
        {(testimonial.name || testimonial.business) && (
          <p className="text-steel-gray font-body text-xs sm:text-sm mt-2">
            {testimonial.name}
            {testimonial.name && testimonial.business && ' — '}
            {testimonial.business}
          </p>
        )}
      </div>

      {/* Video */}
      <div className="w-full lg:flex-1">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-dark-slate border border-steel-gray/20 shadow-xl">
          <VideoPlayer t={testimonial} />
        </div>
      </div>
    </motion.div>
  )
}

export default function VideoWall() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-dark-slate">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-display font-bold text-[clamp(1.5rem,4vw,2.75rem)] text-pure-white mb-3">
            REAL CONTRACTORS. REAL RESULTS.
          </h2>
          <div className="w-12 h-1 bg-volt-red mx-auto rounded-full" />
        </div>

        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {TESTIMONIALS.map((t, i) => (
            <VideoCard key={t.id} testimonial={t} index={i} isRight={i % 2 !== 0} />
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 bg-volt-red hover:bg-red-700 active:bg-red-800 text-white
                       font-body font-semibold text-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-md transition tap-target"
          >
            GET MY FREE STRATEGY CALL
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
