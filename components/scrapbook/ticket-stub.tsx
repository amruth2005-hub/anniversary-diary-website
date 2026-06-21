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
      <div className="flex-1 p-3">
        <p className="font-serif text-[10px] uppercase tracking-[0.25em] text-ink-soft">
          {label}
        </p>
        <div className="mt-1 flex items-end gap-2 font-serif text-ink">
          <span className="text-2xl font-bold">{from}</span>
          <span className="pb-1 text-ink-soft">→</span>
          <span className="text-2xl font-bold">{to}</span>
        </div>
        <p className="mt-1 font-hand text-lg text-ink-soft">
          a trip to remember
        </p>
      </div>
      {/* perforation */}
      <div
        aria-hidden="true"
        className="w-px border-l-2 border-dashed border-ink-soft/40"
      />
      <div className="flex w-16 flex-col items-center justify-center bg-parchment-deep/60 p-2 text-center">
        <span className="font-serif text-[9px] uppercase tracking-widest text-ink-soft">
          Seat
        </span>
        <span className="font-serif text-xl font-bold text-ink">{seat}</span>
      </div>
    </div>
  )
}
