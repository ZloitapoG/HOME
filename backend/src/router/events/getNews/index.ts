import { trpc } from '../../../lib/trpc.js'
import { zGetIdeasTrpcInput } from './input.js'

export const getNewsTrpcRoute = trpc.procedure.input(zGetIdeasTrpcInput).query(async ({ ctx, input }) => {
  const news = await ctx.prisma.event.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createAt: true,
      serialNumder: true,
    },
    orderBy: [
      {
        createAt: 'desc',
      },
      {
        serialNumder: 'desc',
      },
    ],
    cursor: input.cursor ? { serialNumder: input.cursor } : undefined,
    take: input.limit + 1,
  })
  const nextEvent = news.at(input.limit)
  const nextCursor = nextEvent?.serialNumder
  const eventsExceptNext = news.slice(0, input.limit)
  return { news: eventsExceptNext, nextCursor }
})
