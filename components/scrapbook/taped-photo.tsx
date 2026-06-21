import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { PhotoPlaceholder } from './photo-placeholder'
import { TapeStrip } from './decorations'

/**
 * A bare photo print held down by tape at two corners.
 * `corners` controls which corners get a tape strip.
 */
export function TapedPhoto({
  rotation = 2,
  className,
  src,
  alt,
  caption,
  corners = 'top',
  children,
}: {
  rotation?: number
  className?: string
  src?: string
  alt?: string
  caption?: string
  corners?: 'top' | 'diagonal' | 'all'
  children?: ReactNode
}) {
  return (
    <figure
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn(
        'relative inline-block bg-[oklch(0.97_0.015_90)] p-2 shadow-[0_6px_14px_rgba(40,25,15,0.25)]',
        className,
      )}
    >
      {(corners === 'top' || corners === 'all' || corners === 'diagonal') && (
        <TapeStrip className="-left-3 -top-2 h-5 w-16" rotation={-38} />
      )}
      {(corners === 'top' || corners === 'all') && (
        <TapeStrip className="-right-3 -top-2 h-5 w-16" rotation={38} />
      )}
      {(corners === 'diagonal' || corners === 'all') && (
        <TapeStrip className="-bottom-2 -right-3 h-5 w-16" rotation={-38} />
      )}
      <div className="aspect-[4/3] w-full overflow-hidden bg-parchment-deep">
        {children ?? <PhotoPlaceholder src={src} alt={alt} />}
      </div>
      {caption && (
        <figcaption className="mt-1 text-center font-hand text-lg text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
