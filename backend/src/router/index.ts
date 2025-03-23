import { trpc } from '../lib/trpc.js'
import { getNewsTrpcRoute } from './getNews/index.js'
import { getTextTrpcRoute } from './getText/index.js'

export const trpcRouter = trpc.router({
  getText: getTextTrpcRoute,
  getNews: getNewsTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
