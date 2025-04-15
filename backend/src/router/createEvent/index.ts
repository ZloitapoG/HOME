import { trpc } from '../../lib/trpc.js'
import { zCreateEventTrpcInput } from './input.js'

export const createEventTrpcRoute = trpc.procedure.input(zCreateEventTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw Error('Не авторизован, чёрт!')
  }
  const exText = await ctx.prisma.event.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exText) {
    throw Error('Баян!')
  }
  await ctx.prisma.event.create({
    data: { ...input, authorID: ctx.me.id },
  })
  return true
})
