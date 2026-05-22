import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy':  '#0A1120',
        'dark-slate': '#111827',
        'volt-red':   '#E11D2E',
        'pure-white': '#F8FAFC',
        'steel-gray': '#9CA3AF',
      },
      fontFamily: {
        display:   ['var(--font-playfair)', 'Georgia', 'serif'],
        body:      ['var(--font-inter)', 'system-ui', 'sans-serif'],
        headline:  ['var(--font-bebas)', 'Impact', 'sans-serif'],
      },
      fontSize: {
        'h1': ['clamp(2.25rem,5vw,4rem)',      { lineHeight: '1.125', fontWeight: '700' }],
        'h2': ['clamp(1.75rem,3.5vw,3rem)',    { lineHeight: '1.167', fontWeight: '700' }],
        'h3': ['clamp(1.25rem,2.5vw,2.25rem)', { lineHeight: '1.222', fontWeight: '700' }],
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(225,29,46,0.4)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(225,29,46,0)' },
        },
        // Animated background grid — moves diagonally to create depth
        'grid-drift': {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '80px 80px' },
        },
        // Glowing orbs drift slowly
        'orb-a': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':      { transform: 'translate(40px, -50px) scale(1.08)' },
          '66%':      { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
        'orb-b': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '40%':      { transform: 'translate(-50px, 40px) scale(1.1)' },
          '75%':      { transform: 'translate(35px, -25px) scale(0.92)' },
        },
        'orb-c': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%':      { transform: 'translate(25px, 45px) scale(1.06)' },
        },
        // Horizontal scan line sweeps down
        'scan': {
          '0%':   { top: '-2px', opacity: '0' },
          '5%':   { opacity: '1' },
          '95%':  { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        // Red accent bar pulses width
        'bar-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scaleX(1)' },
          '50%':      { opacity: '1',   transform: 'scaleX(1.04)' },
        },
      },
      animation: {
        marquee:      'marquee 28s linear infinite',
        'pulse-red':  'pulse-red 2s ease-in-out infinite',
        'grid-drift': 'grid-drift 8s linear infinite',
        'orb-a':      'orb-a 18s ease-in-out infinite',
        'orb-b':      'orb-b 22s ease-in-out infinite',
        'orb-c':      'orb-c 15s ease-in-out infinite',
        'scan':       'scan 6s linear infinite',
        'bar-glow':   'bar-glow 3s ease-in-out infinite',
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #E11D2E 0%, #8B0000 100%)',
      },
      boxShadow: {
        'red-glow':  '0 0 0 2px #E11D2E, 0 0 20px rgba(225,29,46,0.35)',
        'red-glow2': '0 0 60px rgba(225,29,46,0.25), 0 0 120px rgba(225,29,46,0.1)',
      },
    },
  },
  plugins: [],
}

export default config
