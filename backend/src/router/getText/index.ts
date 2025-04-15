import { z } from 'zod'
import { trpc } from '../../lib/trpc.js'

export const getTextTrpcRoute = trpc.procedure
  .input(
    z.object({
      home: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const text = await ctx.prisma.event.findUnique({
      where: {
        nick: input.home,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
          },
        },
      },
    })
    return { text }
  })
