import { sendEventBlockedEmail } from '../../../lib/emails.js'
import { trpc } from '../../../lib/trpc.js'
import { canBlockEvent } from '../../../utils/can.js'
import { zBlockEventInput } from './input.js'

export const blockEventTrpcRoute = trpc.procedure.input(zBlockEventInput).mutation(async ({ ctx, input }) => {
  const { eventId } = input
  if (!canBlockEvent(ctx.me)) {
    throw new Error('PERMISSION_DENIED')
  }
  const event = await ctx.prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      author: true,
    },
  })
  if (!event) {
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
  void sendEventBlockedEmail({ user: event.author, event })
  return true
})
