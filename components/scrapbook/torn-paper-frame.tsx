import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * A scrap of paper with a torn bottom edge. Good for handwritten
 * notes, quotes, and little captions placed around photos.
 */
export function TornPaperFrame({
  rotation = -1,
  className,
  children,
}: {
  rotation?: number
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn('relative inline-block', className)}
    >
      <div className="torn-edge bg-[oklch(0.94_0.03_88)] px-5 pb-6 pt-4 shadow-[0_6px_14px_rgba(40,25,15,0.2)]">
        <div className="font-hand text-xl leading-snug text-ink">
          {children}
        </div>
      </div>
    </div>
  )
}
