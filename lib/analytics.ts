/**
 * Analytics event bus — wire to GTM dataLayer or Meta Pixel as needed.
 * GTM: push to window.dataLayer  (uncomment block A)
 * Meta: call fbq('trackCustom', ...)  (uncomment block B)
 */

type EventName =
  | 'form_start'
  | 'step_completed'
  | 'form_submit'
  | 'form_success'

interface EventPayload {
  step?: number
  [key: string]: unknown
}

export function pushEvent(name: EventName, payload: EventPayload = {}): void {
  if (typeof window === 'undefined') return

  const event = { event: name, ...payload }

  // — Block A: GTM dataLayer —
  // (window as any).dataLayer = (window as any).dataLayer || []
  // ;(window as any).dataLayer.push(event)

  // — Block B: Meta Pixel —
  // if (typeof (window as any).fbq === 'function') {
  //   ;(window as any).fbq('trackCustom', name, payload)
  // }

  if (process.env.NODE_ENV !== 'production') {
    console.log('[analytics]', event)
  }
}
