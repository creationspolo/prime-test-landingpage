'use client'

import { useFormContext } from 'react-hook-form'
import type { LeadFormData } from '../MultiStepForm'

const PROBLEMS = [
  { value: 'referrals', label: 'We rely too heavily on referrals' },
  { value: 'ads',       label: "Ads aren't working / too expensive" },
  { value: 'tracking',  label: 'No reliable tracking system' },
  { value: 'closing',   label: 'Getting leads but not closing' },
] as const

export default function Step2Problem() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormData>()

  return (
    <div>
      <p className="text-pure-white font-body text-sm mb-4 leading-relaxed">
        What&apos;s your biggest problem getting clients right now?
      </p>
      <div className="space-y-3">
        {PROBLEMS.map(({ value, label }) => (
          <label
            key={value}
            className="flex items-center gap-3 p-3 rounded-md border border-steel-gray/30
                       cursor-pointer hover:border-volt-red hover:bg-volt-red/5 transition group"
          >
            <input
              {...register('problem')}
              type="radio"
              value={value}
              className="accent-volt-red w-4 h-4 shrink-0"
            />
            <span className="text-pure-white font-body text-sm group-hover:text-pure-white">
              {label}
            </span>
          </label>
        ))}
      </div>
      {errors.problem && (
        <p className="mt-2 text-volt-red text-xs">{errors.problem.message}</p>
      )}
    </div>
  )
}
