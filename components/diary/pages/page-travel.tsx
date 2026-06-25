'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { VintagePostcard } from '@/components/scrapbook/vintage-postcard'
import { TicketStub } from '@/components/scrapbook/ticket-stub'
import { TapedPhoto } from '@/components/scrapbook/taped-photo'

export function PageTravel() {
  const postcardRef = useRef<HTMLDivElement>(null)
  const ticketOneRef = useRef<HTMLDivElement>(null)
  const ticketTwoRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
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

    // photo reveal
    tl.fromTo(
      photoRef.current,
      {
        y: -40,
        opacity: 0,
        rotate: 8,
      },
      {
        y: 0,
        opacity: 1,
        rotate: 4,
        duration: 1.1,
        ease: 'power4.out',
      },
      '-=0.6'
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
    gsap.to(photoRef.current, {
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
      <Half className="gap-6">
        <PageTitle kicker="Chapter two">
          July 18 — the day Bangaram became real
        </PageTitle>

        {/* postcard */}
        <div
          ref={postcardRef}
          onMouseEnter={flipPostcard}
          onMouseLeave={resetPostcard}
          style={{ transformStyle: 'preserve-3d' }}
          className="cursor-pointer"
        >
          <VintagePostcard
            destination="July 18"
            message="I couldn’t even look into your eyes that day."
            rotation={-2}
          />
        </div>

        {/* memory tickets */}
        <div className="mt-3 flex flex-col gap-4">
          <div ref={ticketOneRef}>
            <TicketStub
              from="Stranger"
              to="Bangaram"
              seat="18"
              rotation={-2}
            />
          </div>

          <div ref={ticketTwoRef} className="self-end">
            <TicketStub
              from="Pizza"
              to="First Kiss"
              seat="3X"
              label="The Return"
              rotation={2}
            />
          </div>
        </div>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="items-center justify-center">
        <div className="relative h-full min-h-[20rem] w-full">
          {/* first meet photo */}
          <div ref={photoRef}>
            <TapedPhoto
              rotation={4}
              corners="all"
              caption="our first meeting"
              className="absolute right-4 top-3 w-52 md:w-60"
            />
          </div>

          {/* handwritten diary note */}
          <div ref={noteRef}>
            <HandText className="absolute bottom-4 left-4 max-w-[16rem] rotate-[-2deg] text-lg leading-relaxed">
              On the way back,
              after pizza and silence,
              I kissed you three times.

              That was the moment
              I knew there was no going back.
            </HandText>
          </div>
        </div>
      </Half>
    </SpreadGrid>
  )
}