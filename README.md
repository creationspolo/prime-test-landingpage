# Prime Ambition Marketing — Landing Page

High-converting direct-response landing page built with Next.js 14, Tailwind CSS, React Hook Form, and Framer Motion.

## Quick Start

```bash
cd prime-ambition-landing
npm install
npm run dev
# → http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

---

## Swap-In Guide

### 1. Ad Creative (Hero section)
- Drop your winning creative into `/public/ad-creative.jpg` (or `.mp4` for video)
- For video: replace the `<Image>` tag in `components/sections/Hero.tsx` with:
  ```tsx
  <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
    <source src="/ad-creative.mp4" type="video/mp4" />
  </video>
  ```

### 2. Client Win Screenshots (RecentWins section)
- Create `/public/wins/` and add `win-1.jpg` through `win-10.jpg`
- Recommended size: 400×300px WebP
- Update the `label` values in the `WINS` array in `components/sections/RecentWins.tsx`
- Uncomment the `<Image>` block in `WinCard` and remove the placeholder `<div>`

### 3. Video Testimonials (VideoWall section)
- Open `components/sections/VideoWall.tsx`
- Replace `videoId` values in the `TESTIMONIALS` array with real YouTube video IDs
- Uncomment the `<iframe>` block inside `VideoCard` and remove the placeholder

### 4. Client Logos (LogoMarquee section)
- Drop SVG or PNG logos into `/public/logos/`
- Update `LOGOS` array in `components/sections/LogoMarquee.tsx`
- Uncomment the `<Image>` tag in `LogoItem` and remove the `<span>` placeholder

### 5. Lead Destination (API route)
- Open `app/api/lead/route.ts`
- Uncomment and configure the `fetch()` to your CRM webhook (GoHighLevel, HubSpot, Zapier, etc.)
- Set `CRM_WEBHOOK_URL` in `.env.local`:
  ```
  CRM_WEBHOOK_URL=https://your-webhook-url.com/lead
  ```

### 6. Calendar Embed (Success state)
- Open `components/form/MultiStepForm.tsx`
- Find the `[ Calendar embed goes here ]` placeholder in `SuccessState`
- Replace the placeholder `<div>` with your Calendly or Cal.com embed script

### 7. Analytics (GTM / Meta Pixel)
- Open `lib/analytics.ts`
- Uncomment Block A for GTM or Block B for Meta Pixel
- Add your GTM container snippet to `app/layout.tsx`

---

## Brand Tokens (Tailwind)

| Token | Hex | Usage |
|---|---|---|
| `deep-navy` | `#0A1120` | Primary background (60%) |
| `dark-slate` | `#111827` | Cards / surfaces (20%) |
| `volt-red` | `#E11D2E` | CTAs, highlights (10%) |
| `pure-white` | `#F8FAFC` | Text on dark (5%) |
| `steel-gray` | `#9CA3AF` | Muted text (5%) |

## Performance Notes
- Ad creative uses `loading="lazy"` to protect LCP
- Google Fonts loaded via `next/font` with `display: swap`
- All section components use `useInView` for scroll-triggered reveals
- Target: Lighthouse 95+ / <1.5s LCP on 4G
