import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Shared building blocks for diary page spreads so every page keeps a
 * consistent inner rhythm while still feeling hand-arranged.
 */

/** Two-half spread: side-by-side on desktop, stacked on small screens. */
export function SpreadGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid min-h-full grid-cols-1 content-start gap-3 md:h-full md:grid-cols-2 md:content-stretch md:gap-x-16 md:gap-y-8',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** One page of the spread. */
export function Half({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('relative flex flex-col', className)}>
      {children}
    </section>
  )
}

export function PageTitle({
  children,
  kicker,
  className,
}: {
  children: ReactNode
  kicker?: string
  className?: string
}) {
  return (
    <header className={cn('mb-3 md:mb-5', className)}>
      {kicker && (
        <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink-soft/80">
          {kicker}
        </p>
      )}
      <h2 className="font-serif text-2xl font-bold leading-tight text-ink md:text-4xl">
        {children}
      </h2>
    </header>
  )
}

/** Handwritten paragraph block. */
export function HandText({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'font-hand text-lg leading-snug text-ink-soft md:text-2xl',
        className,
      )}
    >
      {children}
    </p>
  )
}
