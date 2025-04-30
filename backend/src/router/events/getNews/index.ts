import { trpc } from '../../../lib/trpc.js'
import { zGetIdeasTrpcInput } from './input.js'

export const getNewsTrpcRoute = trpc.procedure.input(zGetIdeasTrpcInput).query(async ({ ctx, input }) => {
  const rawNews = await ctx.prisma.event.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createAt: true,
      serialNumder: true,
      _count: { select: { eventsLikes: true } },
    },
    where: {
      blockedAt: null,
      ...(!input.search
        ? {}
        : {
            OR: [
              { name: { contains: input.search, mode: 'insensitive' } },
              { description: { contains: input.search, mode: 'insensitive' } },
              { text: { contains: input.search, mode: 'insensitive' } },
            ],
          }),
    },
    orderBy: [{ createAt: 'desc' }, { serialNumder: 'desc' }],
    cursor: input.cursor ? { serialNumder: input.cursor } : undefined,
    take: input.limit + 1,
  })

  const nextEvent = rawNews.at(input.limit)
  const nextCursor = nextEvent?.serialNumder
  const events = rawNews.slice(0, input.limit).map((event) => ({
    ...event,
    likesCount: event._count.eventsLikes,
  }))

  return { events, nextCursor }
})
