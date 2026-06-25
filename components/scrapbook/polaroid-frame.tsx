'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { PhotoPlaceholder } from './photo-placeholder'
import { TapeStrip } from './decorations'

export function PolaroidFrame({
  caption,
  rotation = -3,
  className,
  src,
  alt,
  tape = false,
  children,
}: {
  caption?: string
  rotation?: number
  className?: string
  src?: string
  alt?: string
  tape?: boolean
  children?: ReactNode
}) {
  const polaroidRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!polaroidRef.current) return

    // idle floating/wiggle
    gsap.to(polaroidRef.current, {
      y: -5,
      rotation: rotation + 1.5,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [rotation])

  return (
    <figure
      ref={polaroidRef}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn(
        'relative inline-block bg-[oklch(0.96_0.02_90)] p-3 pb-12',
        'shadow-[0_10px_22px_rgba(40,25,15,0.32)]',
        'transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03]',
        'hover:shadow-[0_18px_32px_rgba(40,25,15,0.38)]',
        className,
      )}
    >
      {tape && (
        <TapeStrip
          className="-top-3 left-1/2 -translate-x-1/2"
          rotation={-4}
        />
      )}

      {/* paper texture shadow */}
      <div className="absolute inset-0 rounded-sm bg-white/30 pointer-events-none" />

      {/* photo frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-parchment-deep">
        {children ?? <PhotoPlaceholder src={src} alt={alt} />}
      </div>

      {/* handwritten caption */}
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-2 text-center font-hand text-xl text-ink">
          {caption}
        </figcaption>
      )}

      {/* bottom shadow for realism */}
      <div className="absolute bottom-1 left-4 right-4 h-3 rounded-full bg-black/10 blur-md" />
    </figure>
  )
}