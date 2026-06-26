'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpreadGrid, Half } from '../page-elements'
import { WaxSeal } from '@/components/scrapbook/decorations'
import { PolaroidFrame } from '@/components/scrapbook/polaroid-frame'

export function PageLetter() {
  const titleRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      titleRef.current,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    )

    tl.fromTo(
      letterRef.current,
      {
        y: 80,
        opacity: 0,
        rotate: -3,
      },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.1,
        ease: 'power4.out',
      },
      '-=0.3'
    )

    tl.fromTo(
      textRef.current ? Array.from(textRef.current.children) : [],
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.25,
        duration: 0.7,
        ease: 'power2.out',
      },
      '-=0.4'
    )

    tl.fromTo(
      sealRef.current,
      {
        scale: 0.8,
      },
      {
        scale: 1.15,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      },
      '-=0.5'
    )

    tl.fromTo(
      photoRef.current,
      {
        x: 80,
        opacity: 0,
        rotate: 0,
      },
      {
        x: 0,
        opacity: 1,
        rotate: 0,
        duration: 1,
        ease: 'power4.out',
      },
      '-=0.7'
    )

    gsap.to(letterRef.current, {
      y: -4,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to(photoRef.current, {
      y: -6,
      duration: 2.6,
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
            The night everything changed
          </p>

          <h2 className="mt-1 font-serif text-2xl font-bold text-ink md:text-4xl">
            June 26 → June 27
          </h2>
        </div>

        {/* Letter */}
        <div
          ref={letterRef}
          className="mt-4 rounded-sm border border-parchment-edge bg-[oklch(0.95_0.025_88)] px-4 py-4 shadow-[0_10px_25px_rgba(40,25,15,0.18)] md:mt-6 md:px-6 md:py-5"
        >
          <div
            ref={textRef}
            className="space-y-2 font-hand text-xl leading-snug text-ink md:space-y-3 md:text-2xl"
          >
            <p>Bangaram,</p>

            <p>
              On June 26th, when the curtain opened at midnight, I gathered
              every little bit of courage I had and asked you to be mine.
            </p>

            <p>
              I still remember that video call. My heart was louder than my
              words.
            </p>

            <p>
              And on June 27th, when you finally answered me... everything
              changed.
            </p>

            <p>
              That’s why maybe we celebrate both days — because one was when I
              gave my heart, and the other was when you kept it.
            </p>

            <p className="text-wax">Forever, my Bangaram.</p>
          </div>
        </div>

        {/* Seal */}
        <div ref={sealRef}>
          <WaxSeal label="♥" className="mt-5 self-start rotate-[-6deg]" />
        </div>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="items-center justify-center">
        <div ref={photoRef} className="flex flex-col items-center">
          <PolaroidFrame
            caption="dress gift"
            rotation={3}
            tape
            className="w-40 max-w-full sm:w-56 md:w-64"
          >
            <img
              src="/memories/dress-gift.jpeg"
              alt="The dress gift memory"
              className="h-full w-full object-contain"
            />
          </PolaroidFrame>
          <p className="mt-3 max-w-[13rem] text-center font-hand text-lg leading-snug text-ink-soft sm:mt-5 sm:max-w-xs sm:text-xl">
            The dress I gave you, and you made it beautiful.
          </p>
        </div>
      </Half>
    </SpreadGrid>
  )
}
