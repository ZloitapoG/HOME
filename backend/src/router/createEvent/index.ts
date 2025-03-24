import { z } from 'zod'
import { news } from '../../lib/events.js'
import { trpc } from '../../lib/trpc.js'

export const createEventTrpcRoute = trpc.procedure
  .input(
    z.object({
      name: z.string().min(1, 'Заголовок пустой! :Р'),
      nick: z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/, 'Тут можно только маленькие буквы, числа и дефисы'),
      description: z.string().min(1, 'Описание пустое!  :Р'),
      text: z.string().min(100, 'Текст не может быть меньше 100 буковок :Р'),
    })
  )
  .mutation(({ input }) => {
    news.unshift(input)
    return true
  })
