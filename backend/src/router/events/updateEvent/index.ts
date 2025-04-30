import { trpc } from '../../../lib/trpc.js'
import { canEditEvent } from '../../../utils/can.js'
import { zUpdateEventTrpcInput } from './input.js'

export const updateEventTrpcRoute = trpc.procedure.input(zUpdateEventTrpcInput).mutation(async ({ ctx, input }) => {
  const { eventId, ...eventInput } = input
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }
  const event = await ctx.prisma.event.findUnique({
    where: {
      id: eventId,
    },
  })
  if (!event) {
    throw new Error('NOT_FOUND')
  }
  if (!canEditEvent(ctx.me, event)) {
    throw new Error('NOT_YOUR_IDEA')
  }
  if (event.nick !== input.nick) {
    const exEvent = await ctx.prisma.event.findUnique({
      where: {
        nick: input.nick,
      },
    })
    if (exEvent) {
      throw new Error('Idea with this nick already exists')
    }
  }
  await ctx.prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      ...eventInput,
    },
  })
  return true
})
