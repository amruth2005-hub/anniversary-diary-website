'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { VintagePostcard } from '@/components/scrapbook/vintage-postcard'
import { TicketStub } from '@/components/scrapbook/ticket-stub'
import { TapeStrip } from '@/components/scrapbook/decorations'

export function PageTravel() {
  const postcardRef = useRef<HTMLDivElement>(null)
  const ticketOneRef = useRef<HTMLDivElement>(null)
  const ticketTwoRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // postcard intro
    tl.fromTo(
      postcardRef.current,
      {
        y: 70,
        opacity: 0,
        rotate: 6,
      },
      {
        y: 0,
        opacity: 1,
        rotate: -2,
        duration: 1,
        ease: 'power4.out',
      }
    )

    // tickets stagger
    tl.fromTo(
      [ticketOneRef.current, ticketTwoRef.current],
      {
        x: -120,
        opacity: 0,
        rotate: -8,
      },
      {
        x: 0,
        opacity: 1,
        rotate: 0,
        stagger: 0.2,
        duration: 0.95,
        ease: 'power3.out',
      },
      '-=0.5'
    )

    // note reveal
    tl.fromTo(
      noteRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.4'
    )

    // floating memory effect
    gsap.to(postcardRef.current, {
      y: -6,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  const flipPostcard = () => {
    gsap.to(postcardRef.current, {
      rotateY: 180,
      duration: 0.9,
      ease: 'power3.out',
    })
  }

  const resetPostcard = () => {
    gsap.to(postcardRef.current, {
      rotateY: 0,
      duration: 0.9,
      ease: 'power3.out',
    })
  }

  return (
    <SpreadGrid>
      {/* LEFT PAGE */}
      <Half className="gap-4 md:gap-6">
        <PageTitle kicker="Chapter two">
          July 18 — the day Bangaram became real
        </PageTitle>

        {/* memory tickets */}
        <div className="mt-2 flex flex-col gap-3 md:mt-3 md:gap-4">
          <div ref={ticketOneRef}>
            <TicketStub
              from="Stranger"
              to="Bangaram"
              seat="18"
              rotation={-2}
              className="max-w-[15rem] sm:max-w-xs"
            />
          </div>

          <div ref={ticketTwoRef} className="self-end">
            <TicketStub
              from="Pizza"
              to="First Kiss"
              seat="3X"
              label="The Return"
              rotation={2}
              className="max-w-[15rem] sm:max-w-xs"
            />
          </div>
        </div>

        {/* handwritten diary note */}
        <div ref={noteRef}>
          <HandText className="mt-1 max-w-sm rotate-[-2deg] leading-snug md:mt-2 md:text-lg md:leading-relaxed">
            On the way back,
            after pizza and silence,
            I kissed you three times.

            That was the moment
            I knew there was no going back.
          </HandText>
        </div>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="items-center justify-center">
        <div className="relative flex h-full min-h-[16rem] w-full items-center justify-center md:min-h-[20rem]">
          <div
            ref={postcardRef}
            onMouseEnter={flipPostcard}
            onMouseLeave={resetPostcard}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-full max-w-md cursor-pointer"
          >
            <TapeStrip
              className="-top-3 left-10 h-5 w-16"
              rotation={-12}
            />

            <VintagePostcard
              destination="July 18"
              message="I couldn’t even look into your eyes that day."
              rotation={-2}
            >
              <img
                src="/memories/journey-selfie.jpeg"
                alt="Our journey selfie together"
                className="h-full w-full object-contain"
              />
            </VintagePostcard>
          </div>
        </div>
      </Half>
    </SpreadGrid>
  )
}
