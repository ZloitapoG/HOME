import { trpc } from '../lib/trpc.js'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}/index.js'`)
import { createEventTrpcRoute } from './createEvent/index.js'
import { getNewsTrpcRoute } from './getNews/index.js'
import { getTextTrpcRoute } from './getText/index.js'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createEvent: createEventTrpcRoute,
  getNews: getNewsTrpcRoute,
  getText: getTextTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
