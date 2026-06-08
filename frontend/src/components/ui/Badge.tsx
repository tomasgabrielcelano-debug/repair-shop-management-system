import * as React from 'react'
import { cn } from '../../lib/utils'

type Variant = 'default' | 'success' | 'warning' | 'danger'

export function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-slate-50 text-slate-700 border-slate-200',
        variant === 'success' && 'bg-emerald-50 text-emerald-700 border-emerald-200',
        variant === 'warning' && 'bg-amber-50 text-amber-800 border-amber-200',
        variant === 'danger' && 'bg-rose-50 text-rose-700 border-rose-200',
        className
      )}
      {...props}
    />
  )
}
