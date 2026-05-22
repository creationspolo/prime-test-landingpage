'use client'

import { useFormContext } from 'react-hook-form'
import type { LeadFormData } from '../MultiStepForm'

const inputClass =
  'w-full bg-deep-navy border border-steel-gray/40 rounded-md px-4 py-3 text-pure-white ' +
  'placeholder:text-steel-gray focus:outline-none focus:border-volt-red focus:ring-1 ' +
  'focus:ring-volt-red transition text-sm font-body'

export default function Step4City() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormData>()

  return (
    <div>
      <p className="text-pure-white font-body text-sm mb-4 leading-relaxed">
        Last step — what city are you based in?
      </p>
      <label className="block text-steel-gray text-xs font-body uppercase tracking-widest mb-1.5">
        City / Metro Area
      </label>
      <input
        {...register('city')}
        type="text"
        placeholder="e.g. Dallas, TX"
        className={inputClass}
        autoComplete="address-level2"
      />
      {errors.city && (
        <p className="mt-1 text-volt-red text-xs">{errors.city.message}</p>
      )}
      <p className="mt-4 text-steel-gray text-xs leading-relaxed">
        By submitting you agree to receive SMS and email communications.
        We respect your privacy and never spam.
      </p>
    </div>
  )
}
