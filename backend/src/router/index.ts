import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc.js'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}/index.js'`)
import { createEventTrpcRoute } from './createEvent/index.js'
import { getMeTrpcRoute } from './getMe/index.js'
import { getNewsTrpcRoute } from './getNews/index.js'
import { getTextTrpcRoute } from './getText/index.js'
import { signInTrpcRoute } from './signIn/index.js'
import { signUpTrpcRoute } from './signUp/index.js'
import { updateEventTrpcRoute } from './updateEvent/index.js'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createEvent: createEventTrpcRoute,
  getMe: getMeTrpcRoute,
  getNews: getNewsTrpcRoute,
  getText: getTextTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateEvent: updateEventTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
