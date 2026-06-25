'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { WaxSeal } from './decorations'

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

  const wrapperRef = useRef<HTMLDivElement>(null)
  const flapRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)

  // idle floating when closed
  useEffect(() => {
    if (!wrapperRef.current) return

    gsap.to(wrapperRef.current, {
      y: -3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  const toggleEnvelope = () => {
    if (
      !flapRef.current ||
      !letterRef.current ||
      !sealRef.current ||
      !wrapperRef.current
    )
      return

    if (!open) {
      const tl = gsap.timeline()

      // wax seal pop
      tl.to(sealRef.current, {
        scale: 0,
        rotation: 30,
        duration: 0.25,
        ease: 'back.in(2)',
      })

      // envelope slight lift
      tl.to(
        wrapperRef.current,
        {
          y: -6,
          duration: 0.25,
          ease: 'power1.out',
        },
        0
      )

      // flap opens
      tl.to(
        flapRef.current,
        {
          rotateX: 180,
          duration: 0.55,
          ease: 'power2.out',
        },
        '-=0.05'
      )

      // letter comes out with overshoot
      tl.fromTo(
        letterRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: -10,
          opacity: 1,
          duration: 0.85,
          ease: 'back.out(1.8)',
        },
        '-=0.15'
      )
    } else {
      const tl = gsap.timeline()

      // letter slides back
      tl.to(letterRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in',
      })

      // flap closes
      tl.to(
        flapRef.current,
        {
          rotateX: 0,
          duration: 0.45,
          ease: 'power2.inOut',
        },
        '-=0.1'
      )

      // seal returns
      tl.to(
        sealRef.current,
        {
          scale: 1,
          rotation: 0,
          duration: 0.25,
          ease: 'back.out(2)',
        },
        '-=0.15'
      )

      // reset lift
      tl.to(
        wrapperRef.current,
        {
          y: 0,
          duration: 0.25,
          ease: 'power1.inOut',
        },
        '-=0.2'
      )
    }

    setOpen(!open)
  }

  return (
    <div
      ref={wrapperRef}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn('relative inline-block', className)}
    >
      <button
        type="button"
        onClick={toggleEnvelope}
        aria-expanded={open}
        className="group relative block w-full cursor-pointer text-left focus:outline-none"
      >
        {/* Envelope */}
        <div className="relative h-36 w-56 overflow-hidden rounded-sm bg-[oklch(0.84_0.05_78)] shadow-[0_10px_20px_rgba(40,25,15,0.35)] ring-1 ring-parchment-edge">

          {/* flaps */}
          <div className="absolute inset-0 [clip-path:polygon(0_0,50%_45%,100%_0)] bg-[oklch(0.8_0.05_76)]" />
          <div className="absolute inset-0 [clip-path:polygon(0_100%,50%_55%,100%_100%)] bg-[oklch(0.82_0.05_77)]" />
          <div className="absolute inset-y-0 left-0 w-1/2 [clip-path:polygon(0_0,55%_50%,0_100%)] bg-[oklch(0.86_0.05_79)]" />
          <div className="absolute inset-y-0 right-0 w-1/2 [clip-path:polygon(100%_0,45%_50%,100%_100%)] bg-[oklch(0.86_0.05_79)]" />

          {/* top flap */}
          <div
            ref={flapRef}
            className="absolute inset-x-0 top-0 h-1/2 origin-top [clip-path:polygon(0_0,100%_0,50%_100%)] bg-[oklch(0.78_0.055_74)]"
          />

          {/* wax seal */}
          <div
            ref={sealRef}
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <WaxSeal label={sealLabel ?? '♥'} className="size-12" />
          </div>
        </div>

        <span className="mt-2 block text-center font-hand text-lg text-parchment/90">
          {open ? 'Close' : label}
        </span>
      </button>

      {/* hidden letter */}
      <div
        ref={letterRef}
        className="absolute left-1/2 top-[110%] z-20 mt-3 w-60 -translate-x-1/2 rounded-sm bg-[oklch(0.95_0.025_88)] p-4 font-hand text-xl leading-snug text-ink shadow-xl opacity-0"
      >
        {children ?? 'A little secret, just for you.'}
      </div>
    </div>
  )
}