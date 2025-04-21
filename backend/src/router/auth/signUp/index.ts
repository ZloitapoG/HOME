import { trpc } from '../../../lib/trpc.js'
import { getPasswordHash } from '../../../utils/getPasswordHash.js'
import { signJWT } from '../../../utils/signJWT.js'
import { zSignUpTrpcInput } from './input.js'

export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const exUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exUser) {
    throw new Error('User with this nick already exists')
  }
  const user = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  })
  const token = signJWT(user.id)
  return { token }
})
