'use client'

import { cn } from '@/lib/utils'

/**
 * The closed leather diary shown on first load. Clicking anywhere on the
 * cover (or pressing Enter/Space) opens the book.
 */
export function DiaryCover({
  onOpen,
  opening,
}: {
  onOpen: () => void
  opening: boolean
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open the diary"
      className={cn(
        'group relative aspect-[4/5] w-[min(78vw,22rem)] cursor-pointer rounded-r-xl rounded-l-md',
        'leather-texture shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] transition-all duration-500',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/60',
        opening ? 'scale-95 opacity-0' : 'hover:-translate-y-1 hover:shadow-[0_40px_70px_-15px_rgba(0,0,0,0.65)]',
      )}
    >
      {/* spine */}
      <span
        aria-hidden="true"
        className="absolute inset-y-3 left-2 w-3 rounded bg-leather-dark/80 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.5)]"
      />
      {/* elastic band */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-8 w-2 bg-leather-dark/60 shadow-[inset_0_0_4px_rgba(0,0,0,0.4)]"
      />

      {/* embossed inner frame */}
      <span
        aria-hidden="true"
        className="absolute inset-5 rounded-md border-2 border-gold/30"
      />

      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
        <span className="font-serif text-xs uppercase tracking-[0.4em] text-gold/80">
          Our Diary
        </span>
        <span className="font-serif text-4xl font-bold leading-tight text-parchment drop-shadow">
          Two Years
        </span>
        <span className="font-hand text-2xl text-gold/90">
          of you &amp; me
        </span>
        <span className="mt-6 rounded-full border border-gold/40 px-4 py-1 font-serif text-[11px] uppercase tracking-[0.25em] text-parchment/80 transition-colors group-hover:bg-gold/10">
          tap to open
        </span>
      </span>
    </button>
  )
}
