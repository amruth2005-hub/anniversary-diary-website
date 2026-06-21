'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * The realistic open-book frame: landscape spread, center binding/spine,
 * page shadows, and a curling corner. It renders whatever page content is
 * passed in and animates a page-turn when `turnKey` / `direction` change.
 */
export function DiaryBook({
  children,
  turnKey,
  direction,
  pageLabel,
}: {
  children: ReactNode
  turnKey: number
  direction: 'next' | 'prev'
  pageLabel: string
}) {
  return (
    <div
      className="w-full"
      style={{ perspective: '2200px' }}
    >
      <div
        className={cn(
          'relative mx-auto h-[74dvh] w-full max-w-5xl md:h-auto md:aspect-[3/2]',
          'rounded-md shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65)]',
        )}
      >
        {/* book base / page stack edges */}
        <div className="absolute -inset-x-2 -bottom-2 top-1 -z-10 rounded-md bg-leather-dark/80" />
        <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 rounded-md bg-parchment-edge" />

        {/* parchment surface */}
        <div className="paper-texture absolute inset-0 overflow-hidden rounded-md ring-1 ring-parchment-edge">
          {/* center binding shadow */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 hidden w-16 -translate-x-1/2 md:block"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(60,40,25,0.28) 45%, rgba(60,40,25,0.32) 50%, rgba(60,40,25,0.28) 55%, transparent)',
            }}
          />
          {/* stitched spine line */}
          <div
            aria-hidden="true"
            className="absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 border-l border-dashed border-ink-soft/40 md:block"
          />
          {/* outer edge page shadows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-md shadow-[inset_0_0_40px_rgba(60,40,25,0.25)]"
          />

          {/* page content */}
          <div
            key={turnKey}
            className={cn(
              'preserve-3d relative h-full overflow-y-auto px-6 py-7 md:px-12 md:py-10',
              direction === 'next' ? 'animate-turn-next' : 'animate-turn-prev',
            )}
          >
            {children}
          </div>

          {/* page number */}
          <span className="pointer-events-none absolute bottom-3 right-6 font-serif text-xs italic tracking-wide text-ink-soft/70">
            {pageLabel}
          </span>

          {/* curling corner */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-10 w-10"
            style={{
              background:
                'linear-gradient(135deg, transparent 50%, rgba(120,90,60,0.35) 52%, rgba(80,55,35,0.5) 100%)',
              borderTopLeftRadius: '0.5rem',
              boxShadow: '-3px -3px 6px rgba(0,0,0,0.15)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
