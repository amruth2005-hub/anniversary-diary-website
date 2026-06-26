'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

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

  const wrapperRef = useRef<HTMLButtonElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // idle floating motion
  useEffect(() => {
    if (!wrapperRef.current) return

    gsap.to(wrapperRef.current, {
      y: -2,
      rotation: rotation + 0.8,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [rotation])

  const toggleNote = () => {
    if (!noteRef.current || !contentRef.current) return

    if (!open) {
      const tl = gsap.timeline()

      // folded paper lifts
      tl.to(noteRef.current, {
        rotateX: -18,
        scale: 1.04,
        y: -8,
        duration: 0.25,
        ease: 'power2.out',
      })

      // unfold content
      tl.fromTo(
        contentRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
        }
      )

      // settle naturally
      tl.to(noteRef.current, {
        rotateX: 0,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: 'back.out(1.6)',
      })
    } else {
      const tl = gsap.timeline()

      // fold back up
      tl.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
      })

      tl.to(
        noteRef.current,
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
        },
        '-=0.15'
      )
    }

    setOpen(!open)
  }

  return (
    <button
      ref={wrapperRef}
      type="button"
      onClick={toggleNote}
      aria-expanded={open}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn(
        'group relative block cursor-pointer text-left focus:outline-none',
        className
      )}
    >
      <div
        ref={noteRef}
        className={cn(
          'relative overflow-hidden rounded-sm bg-[oklch(0.94_0.03_88)]',
          'shadow-[0_8px_18px_rgba(40,25,15,0.24)]',
          'ring-1 ring-parchment-edge'
        )}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* paper texture lines */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px bg-ink-soft/15 md:block" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-ink-soft/10 md:block" />

        {/* teaser */}
        <div className="px-4 py-2 sm:px-5 sm:py-3">
          <div className="flex items-center gap-2 font-hand text-base text-ink-soft sm:text-lg">
            <span className="inline-block h-2 w-2 rounded-full bg-wax" />
            {teaser}
          </div>
        </div>

        {/* hidden unfolded content */}
        <div
          ref={contentRef}
          className="h-0 max-w-[260px] overflow-hidden px-4 opacity-0"
        >
          <div className="pb-3 font-hand text-base leading-snug text-ink sm:pb-4 sm:text-lg">
            {children ?? 'I would choose you, again and again.'}
          </div>
        </div>

        {/* bottom soft shadow */}
        <div className="absolute bottom-1 left-4 right-4 h-2 rounded-full bg-black/8 blur-md" />
      </div>
    </button>
  )
}
