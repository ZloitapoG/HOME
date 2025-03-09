import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const news = _.times(100, (i) => ({
  nick: `build-news-${i}`,
  name: `Новость ${i}`,
  description: `Описание ${i}`,
  text: _.times(100, (j) => `<p>Text paragraph ${j} for news ${i}...</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getNews: trpc.procedure.query(() => {
    //throw new Error('Test error')
    return { news: news.map((text) => _.pick(text, ['nick', 'name', 'description'])) }
  }),
  getText: trpc.procedure
    .input(
      z.object({
        home: z.string(),
      })
    )
    .query(({ input }) => {
      const text = news.find((text) => text.nick === input.home)
      return { text: text || null }
    }),
})
export type TrpcRouter = typeof trpcRouter
