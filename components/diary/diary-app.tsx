'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

import { diaryPages } from './diary-pages'
import { DiaryCover } from './diary-cover'
import { DiaryBook } from './diary-book'
import { PageTabs } from './page-tabs'
import { HeartIntro } from './heart-intro'
import { AnniversaryGreeting } from './anniversary-greeting'

type Stage = 'cover' | 'intro' | 'greeting' | 'diary'

export function DiaryApp() {
  const [stage, setStage] = useState<Stage>('cover')
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const stageRef = useRef<HTMLDivElement>(null)
  const bookWrapperRef = useRef<HTMLDivElement>(null)

  const total = diaryPages.length

  // REAL transition animation (old exits first)
  const transitionStage = (nextStage: Stage) => {
    if (!stageRef.current) {
      setStage(nextStage)
      return
    }

    gsap.timeline()
      .to(stageRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.95,
        duration: 0.8,
        ease: 'power4.inOut',
      })
      .call(() => {
        setStage(nextStage)
      })
  }

  // REAL entry animation (new enters after mount)
  useEffect(() => {
    if (!stageRef.current) return

    gsap.fromTo(
      stageRef.current,
      {
        opacity: 0,
        y: 35,
        scale: 1.04,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power4.out',
      }
    )
  }, [stage])

  const goTo = useCallback(
    (next: number) => {
      setIndex((prev) => {
        const clamped = Math.max(0, Math.min(total - 1, next))
        setDirection(clamped >= prev ? 'next' : 'prev')
        return clamped
      })
    },
    [total]
  )

  const restartAll = () => {
    setStage('cover')
    setIndex(0)
    setDirection('next')
  }

  // Diary open animation
  useEffect(() => {
    if (stage !== 'diary' || !bookWrapperRef.current) return

    gsap.fromTo(
      bookWrapperRef.current,
      {
        scale: 0.88,
        opacity: 0,
        y: 55,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power4.out',
      }
    )
  }, [stage])

  // Keyboard navigation
  useEffect(() => {
    if (stage !== 'diary') return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(index + 1)
      if (e.key === 'ArrowLeft') goTo(index - 1)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, index, goTo])

  const Current = diaryPages[index].Component
  const pageLabel = `${index + 1} / ${total}`

  return (
    <main
      className="relative box-border flex h-dvh max-h-dvh w-full items-center justify-center overflow-hidden p-3 md:p-8"
      style={{
        background:
          'radial-gradient(circle at 50% 30%, oklch(0.32 0.04 55), oklch(0.22 0.03 50) 75%)',
      }}
    >
      {/* Background vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 220px rgba(0,0,0,0.58)',
        }}
      />

      {/* Stage wrapper */}
      <div
        ref={stageRef}
        className="relative z-10 flex h-full w-full items-center justify-center"
      >
        {/* STAGE 1 — Diary Cover */}
        {stage === 'cover' && (
          <DiaryCover
            onOpen={() => transitionStage('intro')}
            opening={false}
          />
        )}

        {/* STAGE 2 — Emotional Thread Intro */}
        {stage === 'intro' && (
          <HeartIntro
            onContinue={() => transitionStage('greeting')}
          />
        )}

        {/* STAGE 3 — Anniversary Greeting */}
        {stage === 'greeting' && (
          <AnniversaryGreeting
            onContinue={() => transitionStage('diary')}
          />
        )}

        {/* STAGE 4 — Actual Diary */}
        {stage === 'diary' && (
          <div
            ref={bookWrapperRef}
            className="relative flex w-full max-w-6xl items-center justify-center md:items-stretch md:gap-3"
          >
            {/* Previous */}
            <div className="absolute left-1 top-1/2 z-40 -translate-y-1/2 md:static md:translate-y-0">
              <NavButton
                label="Previous page"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
              >
                <ChevronLeft className="size-6" />
              </NavButton>
            </div>

            {/* Diary content */}
            <div className="relative min-w-0 flex-1">
              {index === 0 && (
                <button
                  onClick={restartAll}
                  className="absolute right-6 top-6 z-40 rounded-full border border-gold/30 px-4 py-1 text-xs uppercase tracking-[0.22em] text-ink transition hover:bg-gold/10"
                >
                  Back
                </button>
              )}

              <DiaryBook
                turnKey={index}
                direction={direction}
                pageLabel={pageLabel}
              >
                <Current />
              </DiaryBook>
            </div>

            {/* Next */}
            <div className="absolute right-1 top-1/2 z-40 -translate-y-1/2 md:static md:translate-y-0">
              <NavButton
                label="Next page"
                onClick={() => goTo(index + 1)}
                disabled={index === total - 1}
              >
                <ChevronRight className="size-6" />
              </NavButton>
            </div>

            {/* Desktop Tabs */}
            <div className="hidden w-32 shrink-0 self-center lg:block">
              <PageTabs current={index} onSelect={goTo} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Tabs */}
      {stage === 'diary' && (
        <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center lg:hidden">
          <div className="flex items-center gap-2 rounded-full bg-leather-dark/80 px-3 py-1.5 backdrop-blur">
            {diaryPages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                className={cn(
                  'size-2.5 rounded-full transition-all',
                  i === index ? 'scale-125 bg-gold' : 'bg-parchment/40'
                )}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

function NavButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'flex size-11 shrink-0 items-center justify-center self-center rounded-full',
        'bg-parchment/90 text-ink shadow-lg transition-all',
        'hover:scale-105 hover:bg-parchment',
        'disabled:opacity-30'
      )}
    >
      {children}
    </button>
  )
}
