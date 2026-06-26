'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { PolaroidFrame } from '@/components/scrapbook/polaroid-frame'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'
import { PaperClip } from '@/components/scrapbook/decorations'

export function PageFirstMemories() {
  const photoRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const polaroidOneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      photoRef.current,
      {
        opacity: 0,
        y: 40,
        rotate: -8,
      },
      {
        opacity: 1,
        y: 0,
        rotate: -3,
        duration: 0.9,
        ease: 'power3.out',
      }
    )

    tl.fromTo(
      noteRef.current,
      {
        opacity: 0,
        x: 40,
        rotate: 5,
      },
      {
        opacity: 1,
        x: 0,
        rotate: 2,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.45'
    )

    tl.fromTo(
      polaroidOneRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.8)',
      },
      '-=0.35'
    )
  }, [])

  const lift = (el: HTMLDivElement | null) => {
    if (!el) return
    gsap.to(el, {
      y: -8,
      rotate: '+=2',
      scale: 1.03,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  const reset = (el: HTMLDivElement | null) => {
    if (!el) return
    gsap.to(el, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  return (
    <SpreadGrid>
      {/* LEFT PAGE */}
      <Half className="gap-4 md:gap-5">
        <PageTitle kicker="Chapter one">
          From strangers to Bangaram
        </PageTitle>

        <div
          ref={photoRef}
          onMouseEnter={() => lift(photoRef.current)}
          onMouseLeave={() => reset(photoRef.current)}
        >
          <PolaroidFrame
            caption="first meet"
            rotation={-3}
            tape
            className="w-48 max-w-full sm:w-64"
          >
            <img
              src="/memories/first-meet.jpeg"
              alt="Her shy smile from our first meet"
              className="h-full w-full object-contain"
            />
          </PolaroidFrame>
        </div>

        <div ref={noteRef}>
          <TornPaperFrame
            rotation={2}
            className="mt-2 max-w-xs self-end md:mt-4"
          >
            Back in 10th grade,
            we were only names in each other&apos;s world.

            Nothing felt special then.
            Until life circled back.
          </TornPaperFrame>
        </div>

        <HandText className="mt-2 max-w-sm md:mt-4">
          It started with a music note on Instagram.
          “Ravali Ra” was the song that unknowingly brought us closer.

          Ten days.
          That&apos;s all it took for two strangers
          to realize this wasn&apos;t ordinary anymore.
        </HandText>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="items-center justify-center">
        <div className="relative flex min-h-[12rem] w-full items-center justify-center overflow-visible md:block md:h-full md:min-h-[24rem]">
          <PaperClip className="absolute right-20 top-6 hidden rotate-12 md:block" />

          {/* Ravali Ra */}
          <div
            ref={polaroidOneRef}
            className="relative md:absolute md:right-8 md:top-12"
            onMouseEnter={() => lift(polaroidOneRef.current)}
            onMouseLeave={() => reset(polaroidOneRef.current)}
          >
            <PolaroidFrame
              caption="early us"
              rotation={5}
              className="w-40 max-w-[calc(100%-1rem)] md:w-52"
            >
              <img
                src="/memories/early-selfie.jpeg"
                alt="One of our early selfies together"
                className="h-full w-full object-contain"
              />
            </PolaroidFrame>
          </div>
        </div>
      </Half>
    </SpreadGrid>
  )
}
