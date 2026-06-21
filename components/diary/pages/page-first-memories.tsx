import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { PolaroidFrame } from '@/components/scrapbook/polaroid-frame'
import { TapedPhoto } from '@/components/scrapbook/taped-photo'
import { TornPaperFrame } from '@/components/scrapbook/torn-paper-frame'
import { PaperClip } from '@/components/scrapbook/decorations'

export function PageFirstMemories() {
  return (
    <SpreadGrid>
      <Half>
        <PageTitle kicker="Chapter one">How it started</PageTitle>
        <TapedPhoto
          rotation={-3}
          corners="top"
          caption="the very first photo"
          className="w-52"
        />
        <TornPaperFrame rotation={2} className="mt-6 max-w-xs self-end">
          The first time we talked, I knew I&apos;d remember it forever.
        </TornPaperFrame>
        <HandText className="mt-6">
          Some firsts you never forget — the first hello, the first laugh, the
          first &quot;just five more minutes.&quot;
        </HandText>
      </Half>

      <Half className="items-center justify-center">
        <div className="relative h-full min-h-[18rem] w-full">
          <PaperClip className="-top-1 right-24 rotate-12" />
          <PolaroidFrame
            caption="first date"
            rotation={5}
            className="absolute right-2 top-0 w-40 md:w-44"
          />
          <PolaroidFrame
            caption="our spot"
            rotation={-6}
            tape
            className="absolute bottom-2 left-0 w-40 md:w-44"
          />
        </div>
      </Half>
    </SpreadGrid>
  )
}
