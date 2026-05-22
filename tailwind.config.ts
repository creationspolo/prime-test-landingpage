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
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['clamp(2.25rem,5vw,4rem)',   { lineHeight: '1.125', fontWeight: '700' }],
        'h2': ['clamp(1.75rem,3.5vw,3rem)', { lineHeight: '1.167', fontWeight: '700' }],
        'h3': ['clamp(1.25rem,2.5vw,2.25rem)', { lineHeight: '1.222', fontWeight: '700' }],
        'h4': ['clamp(1.125rem,2vw,1.75rem)', { lineHeight: '1.286', fontWeight: '600' }],
        'h5': ['clamp(1rem,1.5vw,1.375rem)', { lineHeight: '1.364', fontWeight: '600' }],
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(225,29,46,0.4)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(225,29,46,0)' },
        },
      },
      animation: {
        marquee:     'marquee 28s linear infinite',
        'fade-up':   'fade-up 0.5s ease-out both',
        'pulse-red': 'pulse-red 2s ease-in-out infinite',
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #E11D2E 0%, #8B0000 100%)',
      },
      boxShadow: {
        'red-glow': '0 0 0 2px #E11D2E, 0 0 20px rgba(225,29,46,0.35)',
      },
    },
  },
  plugins: [],
}

export default config
