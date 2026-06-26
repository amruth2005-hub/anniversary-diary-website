import { cn } from '@/lib/utils'

/**
 * A perforated ticket / boarding-pass stub for travel pages.
 */
export function TicketStub({
  from = 'FROM',
  to = 'TO',
  label = 'Boarding Pass',
  seat = '2A',
  rotation = -2,
  className,
}: {
  from?: string
  to?: string
  label?: string
  seat?: string
  rotation?: number
  className?: string
}) {
  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn(
        'relative flex w-full max-w-xs overflow-hidden rounded-md bg-[oklch(0.95_0.02_88)] shadow-[0_6px_14px_rgba(40,25,15,0.25)] ring-1 ring-parchment-edge',
        className,
      )}
    >
      <div className="min-w-0 flex-1 p-2 sm:p-3">
        <p className="font-serif text-[9px] uppercase tracking-[0.18em] text-ink-soft sm:text-[10px] sm:tracking-[0.25em]">
          {label}
        </p>
        <div className="mt-1 flex min-w-0 items-end gap-1 font-serif text-ink sm:gap-2">
          <span className="truncate text-lg font-bold sm:text-2xl">{from}</span>
          <span className="pb-1 text-ink-soft">→</span>
          <span className="truncate text-lg font-bold sm:text-2xl">{to}</span>
        </div>
        <p className="mt-1 font-hand text-base text-ink-soft sm:text-lg">
          a trip to remember
        </p>
      </div>
      {/* perforation */}
      <div
        aria-hidden="true"
        className="w-px border-l-2 border-dashed border-ink-soft/40"
      />
      <div className="flex w-12 flex-col items-center justify-center bg-parchment-deep/60 p-2 text-center sm:w-16">
        <span className="font-serif text-[8px] uppercase tracking-widest text-ink-soft sm:text-[9px]">
          Seat
        </span>
        <span className="font-serif text-lg font-bold text-ink sm:text-xl">{seat}</span>
      </div>
    </div>
  )
}
