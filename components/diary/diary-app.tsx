'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { diaryPages } from './diary-pages'
import { DiaryCover } from './diary-cover'
import { DiaryBook } from './diary-book'
import { PageTabs } from './page-tabs'

export function DiaryApp() {
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const total = diaryPages.length

  const open = useCallback(() => {
    setOpening(true)
    window.setTimeout(() => setOpened(true), 450)
  }, [])

  const goTo = useCallback(
    (next: number) => {
      setIndex((prev) => {
        const clamped = Math.max(0, Math.min(total - 1, next))
        setDirection(clamped >= prev ? 'next' : 'prev')
        return clamped
      })
    },
    [total],
  )

  // Arrow-key navigation once the diary is open.
  useEffect(() => {
    if (!opened) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(index + 1)
      if (e.key === 'ArrowLeft') goTo(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [opened, index, goTo])

  const Current = diaryPages[index].Component
  const pageLabel = `${index + 1} / ${total}`

  return (
    <main
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden p-4 md:p-8"
      style={{
        background:
          'radial-gradient(circle at 50% 30%, oklch(0.32 0.04 55), oklch(0.22 0.03 50) 75%)',
      }}
    >
      {/* subtle desk vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 200px rgba(0,0,0,0.55)',
        }}
      />

      {!opened ? (
        <div className="relative z-10 flex flex-col items-center gap-6">
          <DiaryCover onOpen={open} opening={opening} />
        </div>
      ) : (
        <div className="relative z-10 flex w-full max-w-6xl items-stretch justify-center gap-2 md:gap-3">
          {/* Prev */}
          <NavButton
            label="Previous page"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
          >
            <ChevronLeft className="size-6" />
          </NavButton>

          <div className="min-w-0 flex-1">
            <DiaryBook turnKey={index} direction={direction} pageLabel={pageLabel}>
              <Current />
            </DiaryBook>
          </div>

          {/* Next */}
          <NavButton
            label="Next page"
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
          >
            <ChevronRight className="size-6" />
          </NavButton>

          {/* Page selector tabs */}
          <div className="hidden w-32 shrink-0 self-center lg:block">
            <PageTabs current={index} onSelect={goTo} />
          </div>
        </div>
      )}

      {/* Mobile / tablet page selector */}
      {opened && (
        <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center lg:hidden">
          <div className="flex items-center gap-2 rounded-full bg-leather-dark/80 px-3 py-1.5 backdrop-blur">
            {diaryPages.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to ${p.tab}`}
                aria-current={i === index ? 'page' : undefined}
                onClick={() => goTo(i)}
                className={cn(
                  'size-2.5 rounded-full transition-all',
                  i === index ? 'scale-125 bg-gold' : 'bg-parchment/40',
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
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex size-11 shrink-0 items-center justify-center self-center rounded-full',
        'bg-parchment/90 text-ink shadow-lg transition-all',
        'hover:bg-parchment hover:scale-105',
        'disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100',
      )}
    >
      {children}
    </button>
  )
}
