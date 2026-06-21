import { SpreadGrid, Half, HandText } from '../page-elements'
import { PolaroidFrame } from '@/components/scrapbook/polaroid-frame'
import { TapedPhoto } from '@/components/scrapbook/taped-photo'
import { CoffeeStain, WaxSeal } from '@/components/scrapbook/decorations'

export function PageCover() {
  return (
    <SpreadGrid>
      {/* Left: title + intro note */}
      <Half className="justify-center">
        <CoffeeStain className="-left-2 top-2 opacity-70" size={110} />
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-ink-soft">
          Our little book of
        </p>
        <h1 className="mt-2 font-serif text-5xl font-bold leading-none text-ink md:text-6xl">
          Two Years
        </h1>
        <p className="mt-1 font-hand text-3xl text-wax">together &amp; counting</p>

        <div className="mt-6 max-w-sm border-l-2 border-parchment-edge pl-4">
          <HandText>
            I made this for you — a place to keep every memory we&apos;ve
            collected. Turn the pages slowly. Each one is a little piece of us.
          </HandText>
          <p className="mt-3 font-hand text-xl text-ink">— always yours</p>
        </div>
      </Half>

      {/* Right: cover photo collage */}
      <Half className="items-center justify-center">
        <div className="relative h-full min-h-[18rem] w-full">
          <PolaroidFrame
            caption="day one"
            rotation={-5}
            tape
            className="absolute left-2 top-2 w-40 md:w-48"
          />
          <TapedPhoto
            caption="us"
            rotation={4}
            corners="diagonal"
            className="absolute bottom-4 right-2 w-44 md:w-52"
          />
          <WaxSeal
            label="2yr"
            className="absolute bottom-2 left-6 rotate-[-8deg]"
          />
        </div>
      </Half>
    </SpreadGrid>
  )
}
