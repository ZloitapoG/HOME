import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc.js'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}/index.js'`)
import { getMeTrpcRoute } from './auth/getMe/index.js'
import { signInTrpcRoute } from './auth/signIn/index.js'
import { signUpTrpcRoute } from './auth/signUp/index.js'
import { updatePasswordTrpcRoute } from './auth/updatePassword/index.js'
import { updateProfileTrpcRoute } from './auth/updateProfile/index.js'
import { blockEventTrpcRoute } from './events/blockevent/index.js'
import { createEventTrpcRoute } from './events/createEvent/index.js'
import { getNewsTrpcRoute } from './events/getNews/index.js'
import { getTextTrpcRoute } from './events/getText/index.js'
import { setEventLikeTrpcRoute } from './events/setEventLike/index.js'
import { updateEventTrpcRoute } from './events/updateEvent/index.js'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  blockEvent: blockEventTrpcRoute,
  createEvent: createEventTrpcRoute,
  getNews: getNewsTrpcRoute,
  getText: getTextTrpcRoute,
  setEventLike: setEventLikeTrpcRoute,
  updateEvent: updateEventTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
