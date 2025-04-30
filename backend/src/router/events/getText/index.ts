import _ from 'lodash'
import { z } from 'zod'
import { trpc } from '../../../lib/trpc.js'

export const getTextTrpcRoute = trpc.procedure
  .input(
    z.object({
      home: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const rawText = await ctx.prisma.event.findUnique({
      where: {
        nick: input.home,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        eventsLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            eventsLikes: true,
          },
        },
      },
    })
    if (rawText?.blockedAt) {
      throw new Error('Новость предками не одобрена')
    }
    const isLikedByMe = !!rawText?.eventsLikes.length
    const likesCount = rawText?._count.eventsLikes || 0
    const text = rawText && { ..._.omit(rawText, ['eventsLikes', '_count']), isLikedByMe, likesCount }
    return { text }
  })
