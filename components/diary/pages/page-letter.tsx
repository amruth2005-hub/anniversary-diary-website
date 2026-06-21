import { SpreadGrid, Half } from '../page-elements'
import { WaxSeal } from '@/components/scrapbook/decorations'
import { PolaroidFrame } from '@/components/scrapbook/polaroid-frame'

export function PageLetter() {
  return (
    <SpreadGrid>
      <Half className="justify-center">
        <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink-soft">
          A letter
        </p>
        <h2 className="mt-1 font-serif text-3xl font-bold text-ink md:text-4xl">
          To you, on two years
        </h2>
        <div className="mt-5 space-y-3 font-hand text-2xl leading-snug text-ink">
          <p>My love,</p>
          <p>
            Two years ago I had no idea how much my life was about to change. You
            became my favorite place — my calm, my chaos, my home.
          </p>
          <p>
            Thank you for every ordinary Tuesday and every adventure in between.
            I&apos;d relive all of it just to find my way back to you.
          </p>
          <p className="text-wax">Forever, and then some.</p>
        </div>
        <WaxSeal label="♥" className="mt-5 self-start rotate-[-6deg]" />
      </Half>

      <Half className="items-center justify-center">
        <PolaroidFrame
          caption="just us"
          rotation={3}
          tape
          className="w-56 md:w-64"
        />
      </Half>
    </SpreadGrid>
  )
}
