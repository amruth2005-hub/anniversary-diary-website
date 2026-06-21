import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { PhotoPlaceholder } from '@/components/scrapbook/photo-placeholder'
import { cn } from '@/lib/utils'

const panels = [
  { caption: 'the plan', rotation: -1 },
  { caption: 'the reality', rotation: 1.5 },
  { caption: 'no regrets', rotation: -1.5 },
  { caption: 'do it again?', rotation: 1 },
]

function ComicPanel({
  caption,
  rotation,
}: {
  caption: string
  rotation: number
}) {
  return (
    <figure
      style={{ transform: `rotate(${rotation}deg)` }}
      className="relative bg-[oklch(0.96_0.02_90)] p-2 shadow-[0_5px_12px_rgba(40,25,15,0.22)] ring-2 ring-ink/70"
    >
      <div className="aspect-square overflow-hidden">
        <PhotoPlaceholder label="panel" />
      </div>
      <figcaption className="mt-1 bg-ink px-2 py-0.5 text-center font-hand text-base text-parchment">
        {caption}
      </figcaption>
    </figure>
  )
}

export function PageComic() {
  return (
    <SpreadGrid>
      <Half>
        <PageTitle kicker="Chapter four">Us, but make it a comic</PageTitle>
        <HandText>
          For every serious memory, there&apos;s a ridiculous one. These are the
          stories we still can&apos;t tell without laughing.
        </HandText>
        <div
          className={cn(
            'mt-6 inline-block rounded-2xl bg-[oklch(0.96_0.02_90)] px-4 py-3',
            'font-hand text-xl text-ink shadow ring-1 ring-ink/30',
            'relative after:absolute after:-bottom-2 after:left-8 after:h-4 after:w-4 after:rotate-45 after:bg-[oklch(0.96_0.02_90)] after:ring-1 after:ring-ink/30',
          )}
        >
          &quot;remember when…&quot; — every single time
        </div>
      </Half>

      <Half className="justify-center">
        <div className="grid grid-cols-2 gap-4">
          {panels.map((p) => (
            <ComicPanel key={p.caption} caption={p.caption} rotation={p.rotation} />
          ))}
        </div>
      </Half>
    </SpreadGrid>
  )
}
