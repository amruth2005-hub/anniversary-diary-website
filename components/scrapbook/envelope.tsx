'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { WaxSeal } from './decorations'

/**
 * A sealed envelope that opens on click to reveal a hidden note.
 * Animation here is intentionally simple (CSS transition) so a richer
 * GSAP version can replace it later.
 */
export function Envelope({
  label = 'Open me',
  rotation = -2,
  className,
  sealLabel,
  children,
}: {
  label?: string
  rotation?: number
  className?: string
  sealLabel?: string
  children?: ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn('relative inline-block', className)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group relative block w-full cursor-pointer text-left focus:outline-none"
      >
        {/* Envelope body */}
        <div className="relative h-36 w-56 overflow-hidden rounded-sm bg-[oklch(0.84_0.05_78)] shadow-[0_8px_16px_rgba(40,25,15,0.3)] ring-1 ring-parchment-edge">
          {/* side flaps */}
          <div className="absolute inset-0 [clip-path:polygon(0_0,50%_45%,100%_0)] bg-[oklch(0.8_0.05_76)]" />
          <div className="absolute inset-0 [clip-path:polygon(0_100%,50%_55%,100%_100%)] bg-[oklch(0.82_0.05_77)]" />
          <div className="absolute inset-y-0 left-0 w-1/2 [clip-path:polygon(0_0,55%_50%,0_100%)] bg-[oklch(0.86_0.05_79)]" />
          <div className="absolute inset-y-0 right-0 w-1/2 [clip-path:polygon(100%_0,45%_50%,100%_100%)] bg-[oklch(0.86_0.05_79)]" />
          {/* top flap */}
          <div
            className={cn(
              'absolute inset-x-0 top-0 h-1/2 origin-top [clip-path:polygon(0_0,100%_0,50%_100%)] bg-[oklch(0.78_0.055_74)] transition-transform duration-500',
              open && '[transform:rotateX(180deg)]',
            )}
          />
          <WaxSeal
            label={sealLabel ?? '♥'}
            className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <span className="mt-2 block text-center font-hand text-lg text-parchment/90">
          {open ? 'Close' : label}
        </span>
      </button>

      {/* Hidden note */}
      <div
        className={cn(
          'grid transition-all duration-500',
          open
            ? 'mt-3 grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="rounded-sm bg-[oklch(0.95_0.025_88)] p-4 font-hand text-xl leading-snug text-ink shadow-inner">
            {children ?? 'A little secret, just for you.'}
          </div>
        </div>
      </div>
    </div>
  )
}
