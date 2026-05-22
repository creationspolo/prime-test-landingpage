'use client'

import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { pushEvent } from '@/lib/analytics'
import Step1Contact from './steps/Step1Contact'
import Step2Problem from './steps/Step2Problem'
import Step3Revenue from './steps/Step3Revenue'
import Step4City from './steps/Step4City'

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  name:    z.string().min(2, 'Please enter your full name'),
  phone:   z.string().min(10, 'Please enter a valid phone number'),
  email:   z.string().email('Please enter a valid email'),
  problem: z.string().min(1, 'Please select an option'),
  revenue: z.string().min(1, 'Please select your revenue range'),
  city:    z.string().min(2, 'Please enter your city'),
  // UTM hidden fields
  utm_source:   z.string().optional(),
  utm_medium:   z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content:  z.string().optional(),
  utm_term:     z.string().optional(),
})

export type LeadFormData = z.infer<typeof schema>

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { component: Step1Contact, fields: ['name', 'phone', 'email'] as const },
  { component: Step2Problem, fields: ['problem'] as const },
  { component: Step3Revenue, fields: ['revenue'] as const },
  { component: Step4City,    fields: ['city'] as const },
]

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <div className="text-center py-6 space-y-5">
      <div className="w-16 h-16 rounded-full bg-volt-red/10 border-2 border-volt-red flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-volt-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="font-display font-bold text-xl text-pure-white mb-2">
          You&apos;re on the list.
        </h3>
        <p className="text-steel-gray text-sm leading-relaxed">
          A strategist will reach out within 24 hours to schedule your call.
        </p>
      </div>

      {/* What's next */}
      <div className="bg-deep-navy rounded-lg p-4 text-left space-y-3 border border-steel-gray/20">
        <p className="text-volt-red text-xs uppercase tracking-widest font-body font-semibold">
          What happens next
        </p>
        {[
          'Check your email for a confirmation',
          'Our team reviews your application',
          'You get a personalized strategy call link',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-volt-red text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-body font-semibold">
              {i + 1}
            </span>
            <p className="text-pure-white text-sm font-body">{step}</p>
          </div>
        ))}
      </div>

      {/* Calendar embed placeholder */}
      <div className="rounded-lg border border-steel-gray/30 bg-deep-navy p-6 text-center">
        <p className="text-steel-gray text-xs uppercase tracking-widest mb-2 font-body">
          Book your call now
        </p>
        {/* SWAP: replace this div with your Calendly / Cal.com embed script */}
        <div className="h-40 flex items-center justify-center border border-dashed border-steel-gray/40 rounded">
          <span className="text-steel-gray text-sm font-body">
            [ Calendar embed goes here ]
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const methods = useForm<LeadFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '', phone: '', email: '',
      problem: '', revenue: '', city: '',
      utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', utm_term: '',
    },
  })

  // Capture UTM params from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
    utmKeys.forEach((key) => {
      const val = params.get(key)
      if (val) methods.setValue(key, val)
    })
  }, [methods])

  const totalSteps = STEPS.length
  const progress = ((currentStep) / totalSteps) * 100

  async function handleNext() {
    const fields = STEPS[currentStep].fields
    const valid = await methods.trigger(fields as any)
    if (!valid) return

    if (currentStep === 0) pushEvent('form_start')
    pushEvent('step_completed', { step: currentStep + 1 })

    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      await handleSubmit()
    }
  }

  async function handleSubmit() {
    const data = methods.getValues()
    setSubmitting(true)
    pushEvent('form_submit')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        pushEvent('form_success')
        setSubmitted(true)
      }
    } catch (err) {
      console.error('[form] submit error', err)
    } finally {
      setSubmitting(false)
    }
  }

  const StepComponent = STEPS[currentStep].component
  const isLastStep = currentStep === totalSteps - 1

  return (
    <div
      id="lead-form"
      className="bg-dark-slate rounded-xl border border-steel-gray/20 overflow-hidden w-full max-w-md mx-auto shadow-2xl"
    >
      {/* Progress bar */}
      {!submitted && (
        <div className="h-1 bg-steel-gray/20">
          <motion.div
            className="h-full bg-volt-red"
            animate={{ width: `${submitted ? 100 : progress}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>
      )}

      <div className="p-6 sm:p-8">
        {submitted ? (
          <SuccessState />
        ) : (
          <FormProvider {...methods}>
            {/* Card header */}
            <div className="mb-6">
              <p className="text-volt-red text-xs uppercase tracking-widest font-body font-semibold mb-1">
                Step {currentStep + 1} of {totalSteps}
              </p>
              <h2 className="font-display font-bold text-lg text-pure-white">
                FILL OUT THE QUICK FORM
              </h2>
            </div>

            {/* Animated step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}
              >
                <StepComponent />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-6 flex items-center gap-3">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="px-4 py-3 rounded-md border border-steel-gray/40 text-steel-gray text-sm
                             hover:border-pure-white hover:text-pure-white transition font-body"
                >
                  Back
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={submitting}
                className="flex-1 bg-volt-red hover:bg-red-700 disabled:opacity-60 text-white
                           font-body font-semibold text-sm py-3 px-6 rounded-md
                           flex items-center justify-center gap-2 transition animate-pulse-red"
              >
                {submitting ? (
                  'Submitting...'
                ) : isLastStep ? (
                  'SUBMIT & BOOK MY CALL'
                ) : (
                  <>
                    NEXT
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Step dots */}
            <div className="flex items-center justify-center gap-1.5 mt-5">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentStep ? 'bg-volt-red w-4' : i < currentStep ? 'bg-volt-red/50' : 'bg-steel-gray/30'
                  }`}
                />
              ))}
            </div>
          </FormProvider>
        )}
      </div>
    </div>
  )
}
