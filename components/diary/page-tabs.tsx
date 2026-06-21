'use client'

import { cn } from '@/lib/utils'
import { diaryPages } from './diary-pages'

/**
 * Vertical ribbon tabs along the right edge for jumping to any page.
 */
export function PageTabs({
  current,
  onSelect,
}: {
  current: number
  onSelect: (index: number) => void
}) {
  return (
    <nav
      aria-label="Diary pages"
      className="flex flex-col gap-1.5"
    >
      {diaryPages.map((page, i) => {
        const active = i === current
        return (
          <button
            key={page.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-l-md px-3 py-1.5 text-right font-serif text-[11px] uppercase tracking-wider transition-all',
              'shadow-[0_2px_4px_rgba(0,0,0,0.25)]',
              active
                ? 'bg-parchment text-ink translate-x-0'
                : 'bg-leather text-parchment/70 translate-x-3 hover:translate-x-1 hover:text-parchment',
            )}
          >
            {page.tab}
          </button>
        )
      })}
    </nav>
  )
}
