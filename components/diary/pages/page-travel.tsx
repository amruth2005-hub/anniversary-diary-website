import { SpreadGrid, Half, PageTitle, HandText } from '../page-elements'
import { VintagePostcard } from '@/components/scrapbook/vintage-postcard'
import { TicketStub } from '@/components/scrapbook/ticket-stub'
import { TapedPhoto } from '@/components/scrapbook/taped-photo'

export function PageTravel() {
  return (
    <SpreadGrid>
      <Half>
        <PageTitle kicker="Chapter two">Places we wandered</PageTitle>
        <VintagePostcard
          destination="the coast"
          message="Salt air, your hand in mine."
          rotation={-2}
        />
        <div className="mt-6 flex flex-col gap-3">
          <TicketStub from="HOME" to="SEA" seat="2A" rotation={-2} />
          <TicketStub
            from="SEA"
            to="MTN"
            seat="14C"
            label="Train Ticket"
            rotation={2}
            className="self-end"
          />
        </div>
      </Half>

      <Half className="items-center justify-center">
        <div className="relative h-full min-h-[18rem] w-full">
          <TapedPhoto
            rotation={4}
            corners="all"
            caption="getting lost on purpose"
            className="absolute right-2 top-2 w-48 md:w-56"
          />
          <HandText className="absolute bottom-2 left-0 max-w-[14rem] rotate-[-2deg]">
            Every map we followed somehow led back to us.
          </HandText>
        </div>
      </Half>
    </SpreadGrid>
  )
}
