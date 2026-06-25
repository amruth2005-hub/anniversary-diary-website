'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { TicketStub } from '@/components/scrapbook/ticket-stub'
import { VintagePostcard } from '@/components/scrapbook/vintage-postcard'
import { TapedPhoto } from '@/components/scrapbook/taped-photo'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'

export function PageJourney() {
  const ticketRef = useRef<HTMLDivElement>(null)
  const postcardRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Ticket entry
    tl.fromTo(
      ticketRef.current,
      {
        opacity: 0,
        x: -60,
        rotate: -6,
      },
      {
        opacity: 1,
        x: 0,
        rotate: 0,
        duration: 0.8,
        ease: 'power3.out',
      }
    )

    // Postcard reveal
    tl.fromTo(
      postcardRef.current,
      {
        opacity: 0,
        y: 40,
        rotate: 5,
      },
      {
        opacity: 1,
        y: 0,
        rotate: -2,
        duration: 0.9,
        ease: 'power4.out',
      },
      '-=0.4'
    )

    // Photo pop
    tl.fromTo(
      photoRef.current,
      {
        opacity: 0,
        scale: 0.88,
        rotate: 6,
      },
      {
        opacity: 1,
        scale: 1,
        rotate: 3,
        duration: 1,
        ease: 'back.out(1.8)',
      },
      '-=0.4'
    )

    // Final emotional note
    tl.fromTo(
      noteRef.current,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      },
      '-=0.3'
    )

    // floating memory effect
    gsap.to(photoRef.current, {
      y: -4,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <SpreadGrid>
      {/* LEFT PAGE */}
      <Half className="gap-6">
        <PageTitle kicker="Chapter three">
          Our first journey
        </PageTitle>

        <div ref={ticketRef}>
          <TicketStub
            from="Chennai"
            to="Nellore"
            seat="Us"
            label="First Train"
            rotation={-2}
          />
        </div>

        <div ref={postcardRef}>
          <VintagePostcard
            destination="Chennai Central"
            message="From the metro station to Chennai Central, every step felt heavier because it mattered."
            rotation={-2}
          />
        </div>

        <HandText className="max-w-sm">
          From Chennai to Nellore,
          this was our first and only trip.

          Meeting you at the metro,
          walking through Chennai Central,
          sitting beside you on that train...

          it felt like time slowed down for us.
        </HandText>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="items-center justify-center">
        <div className="relative h-full min-h-[22rem] w-full">
          <div ref={photoRef}>
            <TapedPhoto
              rotation={3}
              corners="all"
              caption="our first trip"
              className="absolute right-4 top-3 w-56 md:w-64"
            />
          </div>

          <div ref={noteRef}>
            <TornPaperFrame
              rotation={-3}
              className="absolute left-2 bottom-6 max-w-xs"
            >
              At Nellore stop,
              you were emotional.

              I gave you courage.

              But only God knows
              how much I was hiding my tears too.
            </TornPaperFrame>
          </div>
        </div>
      </Half>
    </SpreadGrid>
  )
}