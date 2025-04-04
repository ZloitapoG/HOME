import { trpc } from '../../lib/trpc.js'

export const getNewsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const news = await ctx.prisma.event.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createAt: true,
    },
    orderBy: {
      createAt: 'desc',
    },
  })
  return { news }
})
