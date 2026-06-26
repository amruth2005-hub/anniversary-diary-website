'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function AnniversaryGreeting({
  onContinue,
}: {
  onContinue: () => void
}) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sparklesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const tl = gsap.timeline()

    // title words reveal
    if (titleRef.current) {
      const words = Array.from(titleRef.current.children)

      tl.fromTo(
        words,
        {
          opacity: 0,
          y: 40,
          rotateX: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.18,
          duration: 0.8,
          ease: 'back.out(1.8)',
        }
      )
    }

    // subtitle fade
    tl.fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.5'
    )

    // button reveal
    tl.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        scale: 0.85,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(2)',
      },
      '-=0.4'
    )

    // floating sparkles
    gsap.to(sparklesRef.current, {
      y: () => gsap.utils.random(-25, 25),
      x: () => gsap.utils.random(-15, 15),
      opacity: () => gsap.utils.random(0.35, 0.9),
      stagger: 0.12,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // title breathing
    gsap.to(titleRef.current, {
      scale: 1.02,
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: 'sine.inOut',
    })

    // button glow pulse
    gsap.to(buttonRef.current, {
      boxShadow: '0 0 25px rgba(255,200,120,0.25)',
      repeat: -1,
      yoyo: true,
      duration: 1.6,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-8 sm:px-6">
      {/* sparkles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) sparklesRef.current[i] = el
          }}
          className="absolute text-xl text-gold/50"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
        >
          ✦
        </div>
      ))}

      <div className="flex max-w-5xl flex-col items-center text-center">
        <h1
          ref={titleRef}
          className="flex flex-col gap-2 font-serif text-4xl leading-tight text-parchment sm:text-5xl md:text-7xl"
        >
          <span>Happy Anniversary</span>
          <span>of Togetherness</span>
          <span>to Us</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 max-w-2xl font-hand text-xl leading-relaxed text-gold/80 sm:mt-8 sm:text-2xl"
        >
          Two years of love, distance, chaos, healing, patience,
          and choosing each other over and over again.
        </p>

        <button
          ref={buttonRef}
          onClick={onContinue}
          className="mt-8 rounded-full border border-gold/40 px-8 py-3 text-parchment transition hover:bg-gold/10 sm:mt-10"
        >
          Open Our Diary
        </button>
      </div>
    </div>
  )
}
