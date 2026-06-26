'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpreadGrid, Half, HandText } from '../page-elements'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'
import { TapeStrip } from '@/components/scrapbook/decorations'

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
      <Half className="justify-start md:justify-center">
        <div ref={titleRef}>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink-soft">
            The chapters ahead
          </p>

          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-ink md:text-5xl">
            What we’re building
          </h2>
        </div>

        <div ref={textRef}>
          <HandText className="mt-3 max-w-sm md:mt-4">
            There is still so much left for us to prove — to our parents, to
            the world, and to ourselves. Not with words, but with the lives we
            build, the peace we protect, and the success we earn.
          </HandText>
        </div>

        <div ref={tornRef}>
          <TornPaperFrame rotation={-2} className="mt-4 self-start md:mt-6">
            one day, they’ll understand us →
          </TornPaperFrame>
        </div>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="justify-start gap-2 sm:gap-4 md:justify-center">
        <div
          ref={paperRef}
          className="relative mx-auto w-full max-w-[13.5rem] rotate-[2deg] bg-[oklch(0.97_0.015_90)] p-2 shadow-[0_10px_25px_rgba(40,25,15,0.2)] ring-1 ring-parchment-edge sm:max-w-sm"
        >
          <TapeStrip
            className="-top-3 left-1/2 -translate-x-1/2"
            rotation={-3}
          />

          <div className="aspect-[3/4] overflow-hidden rounded-sm bg-parchment-deep">
            <img
              src="/memories/latest-selfie.jpeg"
              alt="Our latest selfie together"
              className="h-full w-full object-contain opacity-75"
            />
          </div>
        </div>

        <p
          ref={footerRef}
          className="text-center font-hand text-xl text-ink-soft/70 sm:text-2xl"
        >
          And if life asked me again, I’d still choose you.
        </p>
      </Half>
    </SpreadGrid>
  )
}
