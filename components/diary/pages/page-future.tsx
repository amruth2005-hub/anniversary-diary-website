import { SpreadGrid, Half, HandText } from '../page-elements'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'

export function PageFuture() {
  return (
    <SpreadGrid>
      <Half className="justify-center">
        <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink-soft">
          To be continued
        </p>
        <h2 className="mt-2 font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">
          More pages waiting to be written
        </h2>
        <HandText className="mt-4 max-w-sm">
          This is where our next chapters go — the trips we haven&apos;t taken,
          the inside jokes we haven&apos;t made yet, the ordinary days that will
          somehow become favorites.
        </HandText>
        <TornPaperFrame rotation={-2} className="mt-6 self-start">
          year three, here we come →
        </TornPaperFrame>
      </Half>

      <Half className="justify-center gap-4">
        <div className="paper-lines h-44 w-full rounded-sm bg-parchment-deep/40 ring-1 ring-parchment-edge" />
        <p className="text-center font-hand text-2xl text-ink-soft/70">
          blank on purpose — let&apos;s fill it together
        </p>
      </Half>
    </SpreadGrid>
  )
}
