'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { PhotoPlaceholder } from '@/components/scrapbook/photo-placeholder'
import { cn } from '@/lib/utils'

const panels = [
  { caption: 'ego vs ego', rotation: -1 },
  { caption: 'third person chaos', rotation: 1.5 },
  { caption: 'stubborn silence', rotation: -1.5 },
  { caption: 'still us', rotation: 1 },
]

function ComicPanel({
  caption,
  rotation,
}: {
  caption: string
  rotation: number
}) {
  return (
    <figure
      style={{ transform: `rotate(${rotation}deg)` }}
      className="relative bg-[oklch(0.96_0.02_90)] p-2 shadow-[0_5px_12px_rgba(40,25,15,0.22)] ring-2 ring-ink/70"
    >
      <div className="aspect-square overflow-hidden">
        <PhotoPlaceholder label="panel" />
      </div>

      <figcaption className="mt-1 bg-ink px-2 py-0.5 text-center font-hand text-base text-parchment">
        {caption}
      </figcaption>
    </figure>
  )
}

export function PageComic() {
  const titleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }
    )

    tl.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    )

    tl.fromTo(
      bubbleRef.current,
      {
        opacity: 0,
        scale: 0.6,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: 'back.out(2)',
      },
      '-=0.2'
    )

    tl.fromTo(
      panelRefs.current,
      {
        opacity: 0,
        y: 40,
        rotate: 8,
        scale: 0.85,
      },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.65,
        ease: 'back.out(1.7)',
      },
      '-=0.2'
    )

    gsap.to(panelRefs.current, {
      y: '-=4',
      stagger: 0.12,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  const wobble = (el: HTMLDivElement | null) => {
    if (!el) return
    gsap.to(el, {
      rotation: gsap.utils.random(-4, 4),
      x: gsap.utils.random(-3, 3),
      y: gsap.utils.random(-3, 3),
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  const reset = (el: HTMLDivElement | null) => {
    if (!el) return
    gsap.to(el, {
      rotation: 0,
      x: 0,
      y: 0,
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  return (
    <SpreadGrid>
      {/* LEFT PAGE */}
      <Half>
        <div ref={titleRef}>
          <PageTitle kicker="Chapter five">
            Us, with all our chaos
          </PageTitle>
        </div>

        <div ref={textRef}>
          <HandText>
            Sometimes our egos get hurt.
            Sometimes stubbornness takes over.
            Sometimes someone else stands between us and creates noise.

            But somehow, even through silence,
            you understand my pain just by hearing my voice.

            And with every push, every fight, every breakdown —
            we keep making each other better.
          </HandText>
        </div>

        <div
          ref={bubbleRef}
          className={cn(
            'mt-6 inline-block rounded-2xl bg-[oklch(0.96_0.02_90)] px-4 py-3',
            'font-hand text-xl text-ink shadow ring-1 ring-ink/30',
            'relative after:absolute after:-bottom-2 after:left-8 after:h-4 after:w-4 after:rotate-45 after:bg-[oklch(0.96_0.02_90)] after:ring-1 after:ring-ink/30'
          )}
        >
          We break. We fix. We stay.
        </div>
      </Half>

      {/* RIGHT PAGE */}
      <Half className="justify-center">
        <div className="grid grid-cols-2 gap-4">
          {panels.map((p, i) => (
            <div
              key={p.caption}
              ref={(el) => {
                if (el) panelRefs.current[i] = el
              }}
              onMouseEnter={() => wobble(panelRefs.current[i])}
              onMouseLeave={() => reset(panelRefs.current[i])}
            >
              <ComicPanel
                caption={p.caption}
                rotation={p.rotation}
              />
            </div>
          ))}
        </div>
      </Half>
    </SpreadGrid>
  )
}