'use client'

import { useState } from 'react'
import { HeartBurst } from '../heart-burst'
import { SpreadGrid, Half, HandText } from '../page-elements'
import { PolaroidFrame } from '@/components/scrapbook/polaroid-frame'
import { CoffeeStain, WaxSeal } from '@/components/scrapbook/decorations'

export function PageCover() {
  const [showHeart, setShowHeart] = useState(true)

  return (
    <div className="relative h-full">
      <SpreadGrid>
        <Half className="justify-start pt-1 md:justify-center md:pt-0">
          <CoffeeStain className="-left-2 top-2 opacity-70" size={110} />

          <p className="font-serif text-xs uppercase tracking-[0.35em] text-ink-soft">
            Our little book of
          </p>

          <h1 className="mt-2 font-serif text-5xl font-bold leading-none text-ink md:text-6xl">
            Two Years
          </h1>

          <p className="mt-1 font-hand text-3xl text-wax">
            together &amp; counting
          </p>

          <div className="mt-4 max-w-sm border-l-2 border-parchment-edge pl-4 md:mt-6">
            <HandText>
              I made this for you — a place to keep every memory we&apos;ve
              collected. Turn the pages slowly. Each one is a little piece of us.
            </HandText>

            <p className="mt-2 font-hand text-xl text-ink md:mt-3">
              — always yours
            </p>
          </div>
        </Half>

        <Half className="items-center justify-start md:justify-center">
          <div className="relative h-36 min-h-0 w-full md:h-full md:min-h-[18rem]">
            <PolaroidFrame
              caption="us now"
              rotation={-5}
              tape
              className="pointer-events-none absolute right-2 top-0 w-32 max-w-[calc(100%-1rem)] opacity-60 md:right-6 md:top-6 md:w-44"
            >
              <img
                src="/memories/latest-selfie.jpeg"
                alt="Our latest selfie together"
                className="h-full w-full object-contain opacity-80"
              />
            </PolaroidFrame>

            <WaxSeal
              label="2yr"
              className="absolute bottom-0 left-4 rotate-[-8deg] md:bottom-2 md:left-6"
            />
          </div>
        </Half>
      </SpreadGrid>

      {showHeart && (
        <HeartBurst onContinue={() => setShowHeart(false)} />
      )}
    </div>
  )
}
