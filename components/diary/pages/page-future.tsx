'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpreadGrid, Half, HandText } from '../page-elements'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'

export function PageFuture() {
  const titleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const tornRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }
    )

    tl.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
      },
      '-=0.5'
    )

    tl.fromTo(
      tornRef.current,
      {
        opacity: 0,
        x: -40,
        rotate: -8,
      },
      {
        opacity: 1,
        x: 0,
        rotate: -2,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    )

    tl.fromTo(
      paperRef.current,
      {
        opacity: 0,
        scale: 0.96,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.3'
    )

    tl.fromTo(
      footerRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.4'
    )

    gsap.to(paperRef.current, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to(footerRef.current, {
      opacity: 0.55,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <SpreadGrid>
      {/* LEFT PAGE */}
      <Half className="justify-center">
        <div ref={titleRef}>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink-soft">
            The chapters ahead
          </p>

          <h2 className="mt-2 font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">
            What we’re building
          </h2>
        </div>

        <div ref={textRef}>
          <HandText className="mt-4 max-w-sm">
            There is still so much left for us to prove — to our parents, to
            the world, and to ourselves. Not with words, but with the lives we
            build, the peace we protect, and the success we earn.
          </HandText>
        </div>

        <div ref={tornRef}>
          <TornPaperFrame rotation={-2} className="mt-6 self-start">
            one day, they’ll understand us →
          </TornPaperFrame>
        </div>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="justify-center gap-4">
        <div
          ref={paperRef}
          className="paper-lines h-44 w-full rounded-sm bg-parchment-deep/40 ring-1 ring-parchment-edge shadow-[0_0_20px_rgba(255,220,160,0.12)]"
        />

        <p
          ref={footerRef}
          className="text-center font-hand text-2xl text-ink-soft/70"
        >
          still blank — because our best pages haven’t happened yet
        </p>
      </Half>
    </SpreadGrid>
  )
}