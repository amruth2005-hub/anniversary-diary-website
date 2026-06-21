'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * A folded paper note that expands when tapped, like unfolding a
 * passed note. Closed state shows a teaser line.
 */
export function LoveNote({
  teaser = 'read me',
  rotation = 1,
  className,
  children,
}: {
  teaser?: string
  rotation?: number
  className?: string
  children?: ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn(
        'group relative block cursor-pointer text-left focus:outline-none',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-sm bg-[oklch(0.94_0.03_88)] shadow-[0_6px_14px_rgba(40,25,15,0.22)] ring-1 ring-parchment-edge">
        {/* fold crease lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-ink-soft/15"
        />
        <div
          className={cn(
            'px-5 transition-all duration-500',
            open ? 'py-5' : 'py-3',
          )}
        >
          {open ? (
            <div className="font-hand text-xl leading-snug text-ink">
              {children ?? 'I would choose you, again and again.'}
            </div>
          ) : (
            <div className="flex items-center gap-2 font-hand text-lg text-ink-soft">
              <span className="inline-block h-2 w-2 rounded-full bg-wax" />
              {teaser}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
