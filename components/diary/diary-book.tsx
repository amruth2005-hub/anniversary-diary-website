'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

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
  const pageRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<HTMLDivElement>(null)

  // whole diary idle breathing
  useEffect(() => {
    if (!bookRef.current) return

    gsap.to(bookRef.current, {
      y: -4,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  // realistic page flip
  useEffect(() => {
    if (!pageRef.current) return

    const tl = gsap.timeline()

    tl.fromTo(
      pageRef.current,
      {
        rotationY: direction === 'next' ? -110 : 110,
        x: direction === 'next' ? -40 : 40,
        opacity: 0.65,
        scale: 0.96,
        transformOrigin:
          direction === 'next' ? 'left center' : 'right center',
      },
      {
        rotationY: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power4.out',
      }
    )

    tl.fromTo(
      '.page-glow',
      { opacity: 0.35 },
      {
        opacity: 0,
        duration: 0.9,
      },
      0
    )
  }, [turnKey, direction])

  return (
    <div
      className="w-full"
      style={{
        perspective: '2400px',
      }}
    >
      <div
        ref={bookRef}
        className={cn(
          'relative mx-auto h-[80vh] w-full max-w-6xl',
          'rounded-md shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65)]'
        )}
      >
        {/* stacked book base */}
        <div className="absolute -inset-x-2 -bottom-2 top-1 -z-10 rounded-md bg-[#3d2416]" />
        <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 rounded-md bg-[#c8a97e]" />

        {/* paper spread */}
        <div className="paper-texture absolute inset-0 overflow-hidden rounded-md ring-1 ring-[#9a7a55]">

          {/* center spine */}
          <div
            className="absolute inset-y-0 left-1/2 w-24 -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(30,15,8,0.45), rgba(15,8,4,0.6), rgba(30,15,8,0.45), transparent)',
            }}
          />

          {/* stitched seam */}
          <div className="absolute inset-y-8 left-1/2 -translate-x-1/2 border-l border-dashed border-[#6d4d32]" />

          {/* ambient page glow during flip */}
          <div className="page-glow absolute inset-0 bg-white/20 blur-2xl opacity-0 pointer-events-none" />

          {/* inner shadow */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(60,40,25,0.18)]" />

          {/* flipping content */}
          <div
            ref={pageRef}
            key={turnKey}
            className="relative h-full overflow-y-auto px-8 py-8 md:px-14 md:py-12"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {children}
          </div>

          {/* page number */}
          <span className="absolute bottom-4 right-8 font-serif italic text-sm text-[#7a5d43]">
            {pageLabel}
          </span>

          {/* folded page corner */}
          <div
            className="absolute bottom-0 right-0 h-14 w-14"
            style={{
              background:
                'linear-gradient(135deg, transparent 50%, rgba(120,90,60,0.35) 52%, rgba(80,55,35,0.5) 100%)',
              boxShadow: '-3px -3px 8px rgba(0,0,0,0.15)',
            }}
          />
        </div>
      </div>
    </div>
  )
}