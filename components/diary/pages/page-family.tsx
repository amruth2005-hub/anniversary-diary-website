'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { TapedPhoto } from '@/components/scrapbook/taped-photo'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'
import { WaxSeal } from '@/components/scrapbook/decorations'

export function PageFamily() {
  const photoRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Family photo enters
    tl.fromTo(
      photoRef.current,
      {
        opacity: 0,
        y: 35,
        rotate: 4,
      },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.9,
        ease: 'power3.out',
      }
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
    gsap.to(photoRef.current, {
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
      <Half className="gap-4 md:gap-6">
        <PageTitle kicker="Chapter seven">
          The people watching us grow
        </PageTitle>

        <HandText>
          They may not fully understand us yet. Maybe they worry more than they
          trust. But deep down, they want what is best for us.
        </HandText>

        <div ref={noteRef}>
          <TornPaperFrame rotation={2} className="max-w-xs self-end">
            That first time you spoke to my mother...
            it felt like two worlds quietly touching for the first time.
          </TornPaperFrame>
        </div>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="items-center justify-start md:justify-center">
        <div className="relative flex w-full flex-col items-center justify-start gap-2 sm:gap-5 md:h-full md:min-h-[22rem] md:justify-center">
          <div ref={photoRef}>
            <TapedPhoto
              rotation={3}
              corners="all"
              caption="The day my world met yours."
              className="w-full max-w-sm"
            >
              <img
                src="/memories/family-meet.jpeg"
                alt="The day my world met yours"
                className="h-full w-full object-contain"
              />
            </TapedPhoto>
          </div>

          <HandText className="max-w-sm rotate-[-2deg] text-center text-base sm:text-lg md:text-2xl">
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
