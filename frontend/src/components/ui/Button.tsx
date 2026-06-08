import * as React from 'react'
import { cn } from '../../lib/utils'

type Variant = 'default' | 'primary' | 'danger' | 'ghost'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium shadow-sm transition active:translate-y-[1px] disabled:opacity-50 disabled:pointer-events-none',
        variant === 'default' && 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50',
        variant === 'primary' && 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800',
        variant === 'danger' && 'bg-rose-600 text-white border-rose-600 hover:bg-rose-500',
        variant === 'ghost' && 'bg-transparent text-slate-900 border-transparent hover:bg-slate-100',
        className
      )}
      {...props}
    />
  )
}
