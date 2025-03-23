import _ from 'lodash'
import { news } from '../../lib/events.js'
import { trpc } from '../../lib/trpc.js'

export const getNewsTrpcRoute = trpc.procedure.query(() => {
  return { news: news.map((text) => _.pick(text, ['nick', 'name', 'description'])) }
})
