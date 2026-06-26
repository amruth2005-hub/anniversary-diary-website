'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpreadGrid, Half, PageTitle } from '../page-elements'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'
import { LoveNote } from '@/components/scrapbook/love-note'
import { CoffeeStain, TapeStrip } from '@/components/scrapbook/decorations'

const littleThings = [
  'spotify jam nights together',
  'video calls until sleep wins',
  'celebrating something every month from june to september',
  'we hate sweets, but chocolates always win',
]

export function PageLittleThings() {
  const titleRef = useRef<HTMLDivElement>(null)
  const listRefs = useRef<HTMLLIElement[]>([])
  const stainRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const noteRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }
    )

    tl.fromTo(
      listRefs.current,
      {
        opacity: 0,
        x: -40,
        rotate: -4,
      },
      {
        opacity: 1,
        x: 0,
        rotate: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
      },
      '-=0.3'
    )

    tl.fromTo(
      chatRef.current,
      {
        opacity: 0,
        y: 35,
        rotate: -4,
      },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      },
      '-=0.25'
    )

    tl.fromTo(
      noteRefs.current,
      {
        opacity: 0,
        y: 35,
        rotate: 4,
      },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        stagger: 0.18,
        duration: 0.8,
        ease: 'back.out(1.7)',
      },
      '-=0.25'
    )

    gsap.to(stainRef.current, {
      rotate: 4,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to(noteRefs.current, {
      y: -4,
      stagger: 0.2,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to(chatRef.current, {
      y: -4,
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
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const reset = (el: HTMLDivElement | null) => {
    if (!el) return
    gsap.to(el, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <SpreadGrid>
      {/* LEFT PAGE */}
      <Half>
        <div ref={titleRef}>
          <PageTitle kicker="Chapter four">
            The little things that kept us close
          </PageTitle>
        </div>

        <div ref={stainRef}>
          <CoffeeStain
            className="bottom-6 right-4 opacity-60"
            size={90}
          />
        </div>

        <ul className="mt-2 flex flex-col gap-2 sm:mt-4 sm:gap-4">
          {littleThings.map((thing, i) => (
            <li
              key={thing}
              ref={(el) => {
                if (el) listRefs.current[i] = el
              }}
            >
              <TornPaperFrame rotation={i % 2 === 0 ? -2 : 2}>
                {thing}
              </TornPaperFrame>
            </li>
          ))}
        </ul>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="justify-start gap-2 sm:justify-center sm:gap-5">
        <p className="font-hand text-lg text-ink sm:text-2xl">tap to unfold ↓</p>

        <div
          ref={chatRef}
          className="self-center"
          onMouseEnter={() => lift(chatRef.current)}
          onMouseLeave={() => reset(chatRef.current)}
        >
          <figure
            style={{ transform: 'rotate(-1deg)' }}
            className="relative bg-[oklch(0.97_0.015_90)] p-2 shadow-[0_6px_14px_rgba(40,25,15,0.25)]"
          >
            <TapeStrip
              className="-left-3 -top-2 h-5 w-16"
              rotation={-34}
            />
            <TapeStrip
              className="-right-3 -top-2 h-5 w-16"
              rotation={34}
            />

            <div className="aspect-[3/4] w-36 max-w-[64vw] overflow-hidden bg-parchment-deep sm:w-48 md:w-56">
              <img
                src="/memories/ammu-bangaram-chat.jpeg"
                alt="Ammu Bangaram chat memory"
                className="h-full w-full object-contain"
              />
            </div>

            <figcaption className="mt-0.5 text-center font-hand text-base text-ink-soft sm:mt-1 sm:text-lg">
              Ammu &amp; Bangaram
            </figcaption>
          </figure>
        </div>

        <div className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-0.5 sm:block sm:space-y-5 sm:overflow-visible sm:pb-0">
          {[
            {
              teaser: 'Ammu',
              text: 'The softest name you ever gave me. Somehow it became home.',
              rotation: -1,
            },
            {
              teaser: 'your favorites',
              text: 'Teddy, pizza, green, Kinder Joy, Gems... little things that somehow always remind me of you.',
              rotation: 2,
            },
            {
              teaser: 'when distance hurts',
              text: 'Even when miles separate us, your voice alone tells me everything you feel.',
              rotation: -2,
            },
          ].map((note, i) => (
            <div
              key={note.teaser}
              ref={(el) => {
                if (el) noteRefs.current[i] = el
              }}
              className="shrink-0 sm:shrink"
              onMouseEnter={() => lift(noteRefs.current[i])}
              onMouseLeave={() => reset(noteRefs.current[i])}
            >
              <LoveNote
                teaser={note.teaser}
                rotation={note.rotation}
                className="w-44 sm:w-auto"
              >
                {note.text}
              </LoveNote>
            </div>
          ))}
        </div>
      </Half>
    </SpreadGrid>
  )
}
