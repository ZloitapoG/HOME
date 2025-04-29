import { trpc } from '../../../lib/trpc.js'
import { zSetEventLikeEventTrpcInput } from './input.js'

export const setEventLikeTrpcRoute = trpc.procedure
  .input(zSetEventLikeEventTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { eventId, isLikedByMe } = input
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
    if (isLikedByMe) {
      await ctx.prisma.eventLike.upsert({
        where: {
          eventId_userId: {
            eventId,
            userId: ctx.me.id,
          },
        },
        create: {
          userId: ctx.me.id,
          eventId,
        },
        update: {},
      })
    } else {
      await ctx.prisma.eventLike.delete({
        where: {
          eventId_userId: {
            eventId,
            userId: ctx.me.id,
          },
        },
      })
    }
    const likesCount = await ctx.prisma.eventLike.count({
      where: {
        eventId,
      },
    })
    return {
      event: {
        id: event.id,
        likesCount,
        isLikedByMe,
      },
    }
  })
