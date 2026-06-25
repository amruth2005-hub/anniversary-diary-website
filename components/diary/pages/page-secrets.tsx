'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { Envelope } from '@/components/scrapbook/envelope'
import { LoveNote } from '@/components/scrapbook/love-note'

export function PageSecrets() {
  const leftEnvelopeRef = useRef<HTMLDivElement>(null)
  const rightEnvelopeRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

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
        duration: 0.8,
        ease: 'power3.out',
      }
    )

    tl.fromTo(
      leftEnvelopeRef.current,
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
      '-=0.3'
    )

    tl.fromTo(
      rightEnvelopeRef.current,
      {
        opacity: 0,
        x: 40,
        rotate: 8,
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
      noteRef.current,
      {
        opacity: 0,
        y: 40,
        rotate: -6,
      },
      {
        opacity: 1,
        y: 0,
        rotate: -1,
        duration: 0.9,
        ease: 'back.out(1.8)',
      },
      '-=0.3'
    )

    gsap.to(noteRef.current, {
      y: '-=4',
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  const lift = (el: HTMLDivElement | null) => {
    if (!el) return
    gsap.to(el, {
      y: -8,
      scale: 1.03,
      rotate: '+=2',
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  const reset = (el: HTMLDivElement | null) => {
    if (!el) return
    gsap.to(el, {
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  return (
    <SpreadGrid>
      {/* LEFT PAGE */}
      <Half className="gap-6">
        <div ref={titleRef} className="max-w-[420px] mb-10">
          <PageTitle kicker="Chapter six">What you may never know</PageTitle>

          <HandText className="leading-relaxed">
            Some things I’ve felt, but maybe never said the right way.
          </HandText>
        </div>

        <div
          ref={leftEnvelopeRef}
          onMouseEnter={() => lift(leftEnvelopeRef.current)}
          onMouseLeave={() => reset(leftEnvelopeRef.current)}
        >
          <Envelope
            className="w-56 mt-4"
            label="open when you miss me"
            sealLabel="♥"
            rotation={-2}
          >
            You understand my pain just by hearing my voice. That’s something
            no one else ever did.
          </Envelope>
        </div>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="relative justify-center gap-6">
        <div
          ref={rightEnvelopeRef}
          onMouseEnter={() => lift(rightEnvelopeRef.current)}
          onMouseLeave={() => reset(rightEnvelopeRef.current)}
        >
          <Envelope
            className="w-56 self-end mb-28"
            label="open when you doubt yourself"
            sealLabel="B&M"
            rotation={2}
          >
            With a little push, you kept proving yourself — in projects, in
            life, in everything.
          </Envelope>
        </div>

        <div
          ref={noteRef}
          className="absolute right-12 bottom-0 z-20"
          onMouseEnter={() => lift(noteRef.current)}
          onMouseLeave={() => reset(noteRef.current)}
        >
          <LoveNote
            teaser="the truth you should know"
            rotation={-1}
          >
            After God and my parents, you became one of the biggest reasons
            behind my success.
          </LoveNote>
        </div>
      </Half>
    </SpreadGrid>
  )
}