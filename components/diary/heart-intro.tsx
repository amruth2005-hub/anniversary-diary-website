'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function HeartIntro({
  onContinue,
}: {
  onContinue: () => void
}) {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<SVGPathElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const nodesRef = useRef<HTMLDivElement[]>([])

  const memories = [
    '🎵 Ravali Ra',
    'June 26',
    'June 27',
    'July 18',
    'Chennai → Nellore',
    'Distance',
    'Fights',
    'Amma',
    'Aunty',
    'Future',
  ]

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      leftRef.current,
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    )

    tl.fromTo(
      rightRef.current,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.55'
    )

    if (pulseRef.current) {
      const pulseLength = pulseRef.current.getTotalLength()

      gsap.set(pulseRef.current, {
        strokeDasharray: pulseLength,
        strokeDashoffset: pulseLength,
      })

      tl.to(
        pulseRef.current,
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.4'
      )
    }

    tl.fromTo(
      nodesRef.current,
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: 'back.out(2)',
      },
      '-=0.5'
    )

    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()

      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      tl.to(
        pathRef.current,
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.inOut',
        },
        '-=0.4'
      )
    }

    tl.fromTo(
      heartRef.current,
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(2)',
      },
      '-=0.3'
    )

    tl.fromTo(
      quoteRef.current,
      {
        opacity: 0,
        y: 12,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
      },
      '-=0.75'
    )
  }, [])

  const onHover = () => {
    gsap.to(pathRef.current, {
      attr: {
        d: 'M100 150 C220 20, 320 280, 430 120 S620 30, 730 210 S850 70, 900 150',
      },
      duration: 0.6,
      ease: 'power2.out',
    })

    gsap.to(heartRef.current, {
      scale: 1.22,
      duration: 0.45,
      ease: 'back.out(2)',
    })

    gsap.to(nodesRef.current, {
      y: () => gsap.utils.random(-10, 10),
      stagger: 0.04,
      duration: 0.45,
    })
  }

  const onLeave = () => {
    gsap.to(pathRef.current, {
      attr: {
        d: 'M100 150 C220 40, 320 260, 430 130 S620 60, 730 180 S850 90, 900 150',
      },
      duration: 0.6,
      ease: 'power2.out',
    })

    gsap.to(nodesRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.4,
    })

    gsap.to(heartRef.current, {
      scale: 1,
      duration: 0.4,
    })
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="relative flex w-full max-w-5xl flex-col items-center gap-8">
        <div className="relative flex items-center gap-6">
          <div
            ref={leftRef}
            className="font-hand text-4xl text-rose-300"
          >
            Ammu
          </div>

          <svg className="h-10 w-44" viewBox="0 0 180 40">
            <defs>
              <linearGradient id="emotionPulse">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>

            <path
              ref={pulseRef}
              d="M5 20 L45 20 L52 8 L62 32 L75 5 L88 28 L102 12 L118 22 L176 20"
              fill="none"
              stroke="url(#emotionPulse)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <div
            ref={rightRef}
            className="font-hand text-4xl text-amber-200"
          >
            Bangaram
          </div>
        </div>

        <div
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className="relative h-[280px] w-full"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 300"
          >
            <path
              ref={pathRef}
              d="M100 150 C220 40, 320 260, 430 130 S620 60, 730 180 S850 90, 900 150"
              fill="none"
              stroke="#d4a373"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 8"
            />
          </svg>

          {memories.map((memory, i) => (
            <div
              key={memory}
              ref={(el) => {
                if (el) nodesRef.current[i] = el
              }}
              className="absolute rounded-full bg-[rgba(255,245,220,0.92)] px-3 py-1 text-sm text-ink shadow-md"
              style={{
                left: `${10 + i * 8}%`,
                top: `${110 + (i % 2 === 0 ? -55 : 35)}px`,
              }}
            >
              {memory}
            </div>
          ))}

          <div
            ref={heartRef}
            className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-7xl text-red-500"
          >
            ♥
          </div>
        </div>

        <p
          ref={quoteRef}
          className="max-w-2xl text-center font-hand text-2xl text-parchment"
        >
          A diary can hold our memories...
          but never the full weight of what we are.
        </p>

        <button
          onClick={onContinue}
          className="rounded-full border border-gold/40 px-6 py-2 text-parchment transition hover:bg-gold/10"
        >
          Continue
        </button>
      </div>
    </div>
  )
}