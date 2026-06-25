'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

export function DiaryCover({
  onOpen,
  opening,
}: {
  onOpen: () => void
  opening: boolean
}) {
  const coverRef = useRef<HTMLButtonElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!coverRef.current) return

    // breathing leather effect
    gsap.to(coverRef.current, {
      y: -4,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // golden shimmer
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: 0.85,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }
  }, [])

  return (
    <button
      ref={coverRef}
      type="button"
      onClick={onOpen}
      aria-label="Open the diary"
      className={cn(
        'group relative aspect-[4/5] w-[min(78vw,22rem)] cursor-pointer rounded-r-xl rounded-l-md',
        'leather-texture shadow-[0_30px_60px_-15px_rgba(0,0,0,0.65)] transition-all duration-500',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/60',
        opening
          ? 'scale-95 opacity-0'
          : 'hover:-translate-y-2 hover:rotate-[1deg] hover:shadow-[0_45px_75px_-15px_rgba(0,0,0,0.72)]'
      )}
    >
      {/* spine */}
      <span
        aria-hidden="true"
        className="absolute inset-y-3 left-2 w-4 rounded bg-leather-dark/90 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.55)]"
      />

      {/* leather fold lines */}
      <span className="absolute left-8 top-0 h-full w-px bg-black/10" />
      <span className="absolute left-12 top-0 h-full w-px bg-black/8" />

      {/* elastic band */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-8 w-2 bg-leather-dark/60 shadow-[inset_0_0_4px_rgba(0,0,0,0.45)]"
      />

      {/* embossed frame */}
      <span
        aria-hidden="true"
        className="absolute inset-5 rounded-md border-2 border-gold/30 shadow-[inset_0_0_12px_rgba(255,215,120,0.08)]"
      />

      {/* inner paper shadow hint */}
      <span
        aria-hidden="true"
        className="absolute inset-x-5 bottom-4 h-3 rounded-full bg-black/15 blur-md"
      />

      {/* content */}
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
        <span
          ref={titleRef}
          className="font-serif text-xs uppercase tracking-[0.4em] text-gold/80"
        >
          Our Diary
        </span>

        <span className="font-serif text-4xl font-bold leading-tight text-parchment drop-shadow-md">
          Two Years
        </span>

        <span className="font-hand text-2xl text-gold/90">
          of you & me
        </span>

        <span className="mt-6 rounded-full border border-gold/40 px-4 py-1 font-serif text-[11px] uppercase tracking-[0.25em] text-parchment/80 transition-colors group-hover:bg-gold/10">
          tap to open
        </span>
      </span>
    </button>
  )
}