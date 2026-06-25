'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpreadGrid, Half, PageTitle } from '../page-elements'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'
import { LoveNote } from '@/components/scrapbook/love-note'
import { CoffeeStain } from '@/components/scrapbook/decorations'

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

        <ul className="flex flex-col gap-4 mt-4">
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
      <Half className="justify-center gap-5">
        <p className="font-hand text-2xl text-ink">tap to unfold ↓</p>

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
            onMouseEnter={() => lift(noteRefs.current[i])}
            onMouseLeave={() => reset(noteRefs.current[i])}
          >
            <LoveNote teaser={note.teaser} rotation={note.rotation}>
              {note.text}
            </LoveNote>
          </div>
        ))}
      </Half>
    </SpreadGrid>
  )
}