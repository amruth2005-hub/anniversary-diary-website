import { SpreadGrid, Half, PageTitle } from '../page-elements'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'
import { LoveNote } from '@/components/scrapbook/love-note'
import { CoffeeStain } from '@/components/scrapbook/decorations'

const littleThings = [
  'the way you steal my hoodie',
  'your terrible morning playlist',
  'how you save the last bite for me',
  'your laugh at your own jokes',
]

export function PageLittleThings() {
  return (
    <SpreadGrid>
      <Half>
        <PageTitle kicker="Chapter three">The little things</PageTitle>
        <CoffeeStain className="bottom-6 right-4 opacity-60" size={90} />
        <ul className="flex flex-col gap-3">
          {littleThings.map((thing, i) => (
            <li key={thing}>
              <TornPaperFrame rotation={i % 2 === 0 ? -2 : 2}>
                {thing}
              </TornPaperFrame>
            </li>
          ))}
        </ul>
      </Half>

      <Half className="justify-center gap-4">
        <p className="font-hand text-2xl text-ink">tap to unfold &darr;</p>
        <LoveNote teaser="a thing I never said out loud" rotation={-1}>
          You make ordinary days feel like something worth keeping.
        </LoveNote>
        <LoveNote teaser="my favorite little moment" rotation={2}>
          Dancing in the kitchen with no music playing.
        </LoveNote>
        <LoveNote teaser="something I promise" rotation={-2}>
          To keep noticing the little things, always.
        </LoveNote>
      </Half>
    </SpreadGrid>
  )
}
