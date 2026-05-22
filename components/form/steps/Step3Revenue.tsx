'use client'

import { useFormContext } from 'react-hook-form'
import type { LeadFormData } from '../MultiStepForm'

const RANGES = [
  { value: '0-150k',   label: '$0 – $150k' },
  { value: '150k-500k', label: '$150k – $500k' },
  { value: '500k-1m',  label: '$500k – $1M' },
  { value: '1m-3m',    label: '$1M – $3M' },
  { value: '3m+',      label: '$3M+' },
] as const

export default function Step3Revenue() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormData>()

  return (
    <div>
      <p className="text-pure-white font-body text-sm mb-4 leading-relaxed">
        What&apos;s your current annual revenue?
      </p>
      <div className="grid grid-cols-2 gap-3">
        {RANGES.map(({ value, label }) => (
          <label
            key={value}
            className="flex items-center gap-3 p-3 rounded-md border border-steel-gray/30
                       cursor-pointer hover:border-volt-red hover:bg-volt-red/5 transition group
                       col-span-1 last:col-span-2 last:max-w-[50%] last:mx-auto last:w-full"
          >
            <input
              {...register('revenue')}
              type="radio"
              value={value}
              className="accent-volt-red w-4 h-4 shrink-0"
            />
            <span className="text-pure-white font-body text-sm font-medium">{label}</span>
          </label>
        ))}
      </div>
      {errors.revenue && (
        <p className="mt-2 text-volt-red text-xs">{errors.revenue.message}</p>
      )}
    </div>
  )
}
