import { z } from 'zod'
import { news } from '../../lib/events.js'
import { trpc } from '../../lib/trpc.js'

export const getTextTrpcRoute = trpc.procedure
  .input(
    z.object({
      home: z.string(),
    })
  )
  .query(({ input }) => {
    const text = news.find((text) => text.nick === input.home)
    return { text: text || null }
  })
