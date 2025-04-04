import { trpc } from '../../lib/trpc.js'
import { zCreateEventTrpcInput } from './input.js'

export const createEventTrpcRoute = trpc.procedure.input(zCreateEventTrpcInput).mutation(async ({ input, ctx }) => {
  const exText = await ctx.prisma.event.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exText) {
    throw Error('Баян!')
  }
  await ctx.prisma.event.create({
    data: input,
  })
  return true
})
