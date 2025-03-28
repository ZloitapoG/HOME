import { news } from '../../lib/events.js'
import { trpc } from '../../lib/trpc.js'
import { zCreateEventTrpcInput } from './input.js'

export const createEventTrpcRoute = trpc.procedure.input(zCreateEventTrpcInput).mutation(({ input }) => {
  if (news.find((text) => text.nick === input.nick)) {
    throw Error('Баян!')
  }
  news.unshift(input)
  return true
})
