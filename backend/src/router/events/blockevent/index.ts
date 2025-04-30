import { trpc } from '../../../lib/trpc.js'
import { canBlockEvent } from '../../../utils/can.js'
import { zBlockEventInput } from './input.js'

export const blockEventTrpcRoute = trpc.procedure.input(zBlockEventInput).mutation(async ({ ctx, input }) => {
  const { eventId } = input
  if (!canBlockEvent(ctx.me)) {
    throw new Error('PERMISSION_DENIED')
  }
  const idea = await ctx.prisma.event.findUnique({
    where: {
      id: eventId,
    },
  })
  if (!idea) {
    throw new Error('NOT_FOUND')
  }
  await ctx.prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      blockedAt: new Date(),
    },
  })
  return true
})
