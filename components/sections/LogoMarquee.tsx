'use client'

const LOGOS = [
  'Apex Roofing',
  'Summit HVAC',
  'TrueNorth Plumbing',
  'ProBuild Contractors',
  'Ironclad Electric',
  'Crestview Construction',
  'Blue Ridge Mechanical',
  'Peak Performance Contractors',
]

const TRACK = [...LOGOS, ...LOGOS]

function LogoItem({ name }: { name: string }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center px-5 sm:px-8 h-11 sm:h-14
                 border border-steel-gray/20 rounded-md text-steel-gray
                 hover:text-pure-white hover:border-steel-gray/50 transition-colors duration-300"
    >
      <span className="font-body font-semibold text-xs sm:text-sm whitespace-nowrap">{name}</span>
    </div>
  )
}

export default function LogoMarquee() {
  return (
    <section className="py-10 sm:py-14 bg-deep-navy border-y border-steel-gray/10 overflow-hidden">
      <div className="mb-4 sm:mb-6 text-center px-4">
        <p className="text-steel-gray text-[10px] sm:text-xs font-body uppercase tracking-[0.2em]">
          Trusted by Contractors Nationwide
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade masks — narrower on mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-deep-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-deep-navy to-transparent z-10 pointer-events-none" />

        <div className="flex gap-3 sm:gap-4 animate-marquee marquee-track w-max">
          {TRACK.map((name, i) => (
            <LogoItem key={i} name={name} />
          ))}
        </div>
      </div>
    </section>
  )
}
