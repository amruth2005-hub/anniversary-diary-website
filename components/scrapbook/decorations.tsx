import { cn } from '@/lib/utils'

/**
 * Small reusable decorative elements that make pages feel hand-assembled:
 * tape strips, wax seals, coffee stains, and paper clips.
 * All are purely decorative and hidden from screen readers.
 */

export function TapeStrip({
  className,
  rotation = 0,
}: {
  className?: string
  rotation?: number
}) {
  return (
    <div
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn(
        'tape-strip pointer-events-none absolute h-6 w-20 opacity-90 shadow-sm',
        className,
      )}
    />
  )
}

export function WaxSeal({
  className,
  label = 'C&M',
}: {
  className?: string
  label?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none flex size-14 items-center justify-center rounded-full bg-wax font-serif text-sm font-bold tracking-wide text-parchment shadow-[inset_0_2px_6px_rgba(255,255,255,0.25),0_4px_8px_rgba(0,0,0,0.35)]',
        className,
      )}
      style={{
        backgroundImage:
          'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), transparent 55%)',
      }}
    >
      <span className="rounded-full border border-parchment/40 px-2 py-1">
        {label}
      </span>
    </div>
  )
}

export function CoffeeStain({
  className,
  size = 90,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={cn('coffee-stain pointer-events-none absolute', className)}
    />
  )
}

export function PaperClip({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute h-10 w-4 rounded-full border-[3px] border-ink-soft/50',
        className,
      )}
    />
  )
}
