'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function HeartBurst({
  onContinue,
}: {
  onContinue?: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const fireRef = useRef<HTMLDivElement[]>([])
  const waterRef = useRef<HTMLDivElement[]>([])
  const arrowRef = useRef<HTMLDivElement>(null)
  const heartRef = useRef<SVGSVGElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline()

    // ENTRY
    tl.fromTo(
      containerRef.current,
      {
        scale: 0.55,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.3,
        ease: 'power4.out',
      }
    )

    // HEART BREATHING
    gsap.to(heartRef.current, {
      scale: 1.03,
      repeat: -1,
      yoyo: true,
      duration: 2.4,
      ease: 'sine.inOut',
      transformOrigin: 'center center',
    })

    // GLOW BREATHING
    gsap.to(glowRef.current, {
      scale: 1.2,
      opacity: 0.45,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.inOut',
    })

    // FIRE (Ammu)
    fireRef.current.forEach((el, i) => {
      gsap.to(el, {
        x: -115 + i * 40,
        y: -80 + i * 35,
        duration: 1.2,
        ease: 'power3.out',
      })

      gsap.to(el, {
        y: `+=${gsap.utils.random(-10, 10)}`,
        x: `+=${gsap.utils.random(-8, 8)}`,
        repeat: -1,
        yoyo: true,
        duration: gsap.utils.random(1.4, 2),
        ease: 'sine.inOut',
      })
    })

    // WATER (Bangaram)
    waterRef.current.forEach((el, i) => {
      gsap.to(el, {
        x: 90 - i * 35,
        y: 70 + i * 30,
        duration: 1.2,
        ease: 'power3.out',
      })

      gsap.to(el, {
        y: `+=${gsap.utils.random(-10, 10)}`,
        x: `+=${gsap.utils.random(-8, 8)}`,
        repeat: -1,
        yoyo: true,
        duration: gsap.utils.random(1.5, 2.1),
        ease: 'sine.inOut',
      })
    })

    // DESTINY ARROW (Ammu26 -> Bangaram27)
    tl.fromTo(
      arrowRef.current,
      {
        x: -170,
        y: 50,
        rotate: -28,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 130,
        y: -50,
        rotate: 18,
        opacity: 1,
        scale: 1,
        duration: 1.8,
        delay: 0.6,
        ease: 'power4.out',
      }
    )

    // IMPACT PULSE
    tl.to(
      heartRef.current,
      {
        scale: 1.18,
        duration: 0.25,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      },
      '-=0.25'
    )

    tl.to(
      glowRef.current,
      {
        scale: 1.5,
        opacity: 0.7,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
      },
      '-=0.3'
    )

    // FLOATING ARROW AFTER COLLISION
    gsap.to(arrowRef.current, {
      y: '-=6',
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'sine.inOut',
    })
  }, [])

  const burst = () => {
    const all = [...fireRef.current, ...waterRef.current]

    all.forEach((piece) => {
      gsap.killTweensOf(piece)

      gsap.to(piece, {
        x: `+=${gsap.utils.random(-35, 35)}`,
        y: `+=${gsap.utils.random(-35, 35)}`,
        rotation: `+=${gsap.utils.random(-25, 25)}`,
        duration: 0.55,
        ease: 'power3.out',
      })
    })

    gsap.to(heartRef.current, {
      scale: 1.12,
      duration: 0.45,
      ease: 'back.out(2)',
    })

    gsap.to(glowRef.current, {
      scale: 1.35,
      opacity: 0.75,
      duration: 0.4,
    })
  }

  const rebuild = () => {
    const all = [...fireRef.current, ...waterRef.current]

    all.forEach((piece) => {
      gsap.to(piece, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: 'power3.inOut',
      })
    })

    gsap.to(heartRef.current, {
      scale: 1,
      duration: 0.45,
    })

    gsap.to(glowRef.current, {
      scale: 1,
      opacity: 0.35,
      duration: 0.45,
    })
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px]">
      <div
        ref={containerRef}
        onMouseEnter={burst}
        onMouseLeave={rebuild}
        className="relative h-[520px] w-[520px] cursor-pointer"
      >
        {/* CENTER GLOW */}
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 z-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/20 blur-3xl"
        />

        {/* FIRE SYMBOLS */}
        {['A26', '∞', 'A'].map((f, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) fireRef.current[i] = el
            }}
            className="absolute left-1/2 top-1/2 z-20 text-3xl font-bold text-orange-300"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            {f}
          </div>
        ))}

        {/* WATER SYMBOLS */}
        {['B27', '∞', 'B'].map((w, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) waterRef.current[i] = el
            }}
            className="absolute left-1/2 top-1/2 z-20 text-3xl font-bold text-blue-300"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            {w}
          </div>
        ))}

        {/* DESTINY ARROW */}
        <div
          ref={arrowRef}
          className="absolute left-1/2 top-1/2 z-30 text-5xl text-yellow-300 drop-shadow-[0_0_10px_rgba(255,215,100,0.7)]"
        >
          ➶
        </div>

        {/* HEART */}
        <svg
          ref={heartRef}
          viewBox="0 0 300 300"
          className="absolute inset-0 z-10 h-full w-full pointer-events-none"
        >
          <path
            d="M150 260 
               C80 190, 20 130, 55 70 
               C90 15, 145 40, 150 90
               C155 40, 210 15, 245 70
               C280 130, 220 190, 150 260"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="20"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#ff6a00" />
              <stop offset="40%" stopColor="#ff3b3b" />
              <stop offset="60%" stopColor="#ffd166" />
              <stop offset="100%" stopColor="#4da6ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <button
        onClick={onContinue}
        className="mt-8 rounded-full border border-gold/40 px-6 py-2 text-parchment transition hover:bg-gold/10"
      >
        Continue
      </button>
    </div>
  )
}