import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { Envelope } from '@/components/scrapbook/envelope'
import { LoveNote } from '@/components/scrapbook/love-note'

export function PageSecrets() {
  return (
    <SpreadGrid>
      <Half className="gap-5">
        <PageTitle kicker="Chapter five">Hidden notes</PageTitle>
        <HandText>
          A few things tucked away just for you. Open them whenever you need a
          reminder.
        </HandText>
        <Envelope label="open when you miss me" sealLabel="♥" rotation={-2}>
          Close your eyes. I&apos;m thinking about you right now too.
        </Envelope>
      </Half>

      <Half className="justify-center gap-5">
        <Envelope
          label="open on a hard day"
          sealLabel="C&amp;M"
          rotation={2}
          className="self-end"
        >
          You are stronger than today, and I&apos;m proud of you — always.
        </Envelope>
        <LoveNote teaser="a secret only you get to read" rotation={-1}>
          You&apos;re the best decision I never planned.
        </LoveNote>
      </Half>
    </SpreadGrid>
  )
}
