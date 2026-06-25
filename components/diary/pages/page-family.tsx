'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { PolaroidFrame } from '@/components/scrapbook/polaroid-frame'
import { TapedPhoto } from '@/components/scrapbook/taped-photo'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'
import { WaxSeal } from '@/components/scrapbook/decorations'

export function PageFamily() {
  const photoOneRef = useRef<HTMLDivElement>(null)
  const photoTwoRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Left photo enters
    tl.fromTo(
      photoOneRef.current,
      {
        opacity: 0,
        x: -40,
        rotate: -6,
      },
      {
        opacity: 1,
        x: 0,
        rotate: -2,
        duration: 0.9,
        ease: 'power3.out',
      }
    )

    // Right photo enters
    tl.fromTo(
      photoTwoRef.current,
      {
        opacity: 0,
        x: 40,
        rotate: 6,
      },
      {
        opacity: 1,
        x: 0,
        rotate: 3,
        duration: 0.9,
        ease: 'power3.out',
      },
      '-=0.5'
    )

    // Note reveal
    tl.fromTo(
      noteRef.current,
      {
        opacity: 0,
        y: 35,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      },
      '-=0.4'
    )

    // Wax seal pop
    tl.fromTo(
      sealRef.current,
      {
        scale: 0.6,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(2)',
      },
      '-=0.2'
    )

    // subtle breathing
    gsap.to(photoOneRef.current, {
      y: -4,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to(photoTwoRef.current, {
      y: -4,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <SpreadGrid>
      {/* LEFT PAGE */}
      <Half className="gap-6">
        <PageTitle kicker="Chapter seven">
          The people watching us grow
        </PageTitle>

        <HandText>
          They may not fully understand us yet. Maybe they worry more than they
          trust. But deep down, they want what is best for us.
        </HandText>

        <div ref={photoOneRef}>
          <PolaroidFrame
            caption="your first talk with amma"
            rotation={-2}
            tape
            className="w-52"
          />
        </div>

        <div ref={noteRef}>
          <TornPaperFrame rotation={2} className="max-w-xs self-end">
            That first time you spoke to my mother...
            it felt like two worlds quietly touching for the first time.
          </TornPaperFrame>
        </div>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="items-center justify-center">
        <div className="relative h-full min-h-[22rem] w-full">
          <div ref={photoTwoRef}>
            <TapedPhoto
              rotation={3}
              corners="all"
              caption="meeting aunty"
              className="absolute right-6 top-6 w-56"
            />
          </div>

          <HandText className="absolute bottom-10 left-2 max-w-[16rem] rotate-[-2deg]">
            They worry about our future. They don’t fully believe in us yet.
            But one day, we’ll prove to them — and to ourselves —
            that what we have is rare.
          </HandText>

          <div ref={sealRef}>
            <WaxSeal
              label="∞"
              className="absolute bottom-4 right-6 rotate-[-8deg]"
            />
          </div>
        </div>
      </Half>
    </SpreadGrid>
  )
}