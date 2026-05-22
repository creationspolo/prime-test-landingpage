'use client'

import { useFormContext } from 'react-hook-form'
import type { LeadFormData } from '../MultiStepForm'

const inputClass =
  'w-full bg-deep-navy border border-steel-gray/40 rounded-md px-4 py-3 text-pure-white ' +
  'placeholder:text-steel-gray focus:outline-none focus:border-volt-red focus:ring-1 ' +
  'focus:ring-volt-red transition text-sm font-body'

const labelClass = 'block text-steel-gray text-xs font-body uppercase tracking-widest mb-1.5'

export default function Step1Contact() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormData>()

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>Full Name</label>
        <input
          {...register('name')}
          type="text"
          placeholder="John Smith"
          className={inputClass}
          autoComplete="name"
        />
        {errors.name && (
          <p className="mt-1 text-volt-red text-xs">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Phone Number</label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="(555) 000-0000"
          className={inputClass}
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="mt-1 text-volt-red text-xs">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Email Address</label>
        <input
          {...register('email')}
          type="email"
          placeholder="john@yourcompany.com"
          className={inputClass}
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-volt-red text-xs">{errors.email.message}</p>
        )}
      </div>
    </div>
  )
}
