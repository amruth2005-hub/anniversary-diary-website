import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { PhotoPlaceholder } from './photo-placeholder'

/**
 * A vintage travel postcard: image panel on the left, a stamp box and
 * faux postmark on the right. Use for travel / destination memories.
 */
export function VintagePostcard({
  rotation = 1.5,
  destination = 'Somewhere',
  message = 'Wish you were here…',
  className,
  src,
  alt,
  children,
}: {
  rotation?: number
  destination?: string
  message?: string
  className?: string
  src?: string
  alt?: string
  children?: ReactNode
}) {
  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn(
        'relative grid w-full grid-cols-2 gap-3 rounded-sm bg-[oklch(0.93_0.035_85)] p-3 shadow-[0_8px_18px_rgba(40,25,15,0.28)] ring-1 ring-parchment-edge',
        className,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-sm bg-parchment-deep">
        {children ?? <PhotoPlaceholder src={src} alt={alt} label="Postcard" />}
      </div>
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <span className="font-serif text-xs uppercase tracking-[0.2em] text-ink-soft">
            Post Card
          </span>
          <span
            aria-hidden="true"
            className="flex h-9 w-7 items-center justify-center rounded-[2px] border border-dashed border-ink-soft/60 text-[8px] text-ink-soft/70"
          >
            STAMP
          </span>
        </div>
        <p className="mt-1 font-hand text-xl leading-tight text-ink">
          {message}
        </p>
        <span className="mt-auto font-serif text-sm italic text-ink-soft">
          — {destination}
        </span>
      </div>
    </div>
  )
}
