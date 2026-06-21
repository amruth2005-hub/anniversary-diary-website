import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Generic empty photo slot. Used inside every frame type.
 * Replace with a real <img> later by passing `src`.
 */
export function PhotoPlaceholder({
  className,
  label = 'Add photo',
  src,
  alt = '',
}: {
  className?: string
  label?: string
  src?: string
  alt?: string
}) {
  if (src) {
    return (
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        className={cn('h-full w-full object-cover', className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-2 bg-parchment-deep/70 text-ink-soft/70',
        className,
      )}
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(120,90,60,0.06) 0px, rgba(120,90,60,0.06) 8px, transparent 8px, transparent 16px)',
      }}
    >
      <ImageIcon className="size-6 opacity-60" aria-hidden="true" />
      <span className="font-hand text-lg leading-none">{label}</span>
    </div>
  )
}
