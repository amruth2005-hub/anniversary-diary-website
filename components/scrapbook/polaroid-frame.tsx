import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { PhotoPlaceholder } from './photo-placeholder'
import { TapeStrip } from './decorations'

/**
 * Classic white-border polaroid with a handwritten caption strip
 * at the bottom. Slightly rotated so it looks hand-placed.
 */
export function PolaroidFrame({
  caption,
  rotation = -3,
  className,
  src,
  alt,
  tape = false,
  children,
}: {
  caption?: string
  rotation?: number
  className?: string
  src?: string
  alt?: string
  tape?: boolean
  children?: ReactNode
}) {
  return (
    <figure
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn(
        'relative inline-block bg-[oklch(0.96_0.02_90)] p-3 pb-12 shadow-[0_8px_18px_rgba(40,25,15,0.28)]',
        className,
      )}
    >
      {tape && (
        <TapeStrip className="-top-3 left-1/2 -translate-x-1/2" rotation={-4} />
      )}
      <div className="aspect-square w-full overflow-hidden bg-parchment-deep">
        {children ?? <PhotoPlaceholder src={src} alt={alt} />}
      </div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-2 text-center font-hand text-xl text-ink">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
