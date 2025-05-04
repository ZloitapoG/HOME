import { sendWelcomeEmail } from '../../../lib/emails.js'
import { trpc } from '../../../lib/trpc.js'
import { getPasswordHash } from '../../../utils/getPasswordHash.js'
import { signJWT } from '../../../utils/signJWT.js'
import { zSignUpTrpcInput } from './input.js'

export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const exUserWithNick = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exUserWithNick) {
    throw new Error('Пользователь с таким ником уже есть...')
  }
  const exUserWithEmail = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  })
  if (exUserWithEmail) {
    throw new Error('Пользователь с таким мылом уже есть...')
  }
  const user = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      email: input.email,
      password: getPasswordHash(input.password),
    },
  })
  void sendWelcomeEmail({ user })
  const token = signJWT(user.id)
  return { token }
})
