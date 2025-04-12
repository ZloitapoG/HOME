import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import { type AppContext, createAppContext } from './lib/ctx.js'
import { env } from './lib/env.js'
import { applyPassportToExpressApp } from './lib/passport.js'
import { applyTrpcToExpressApp } from './lib/trpc.js'
import { trpcRouter } from './router/index.js'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    const expressApp = express()
    expressApp.use(cors())
    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })
    applyPassportToExpressApp(expressApp, ctx)
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    expressApp.listen(env.PORT, () => {
      console.info(`Listening at http://localhost:${env.PORT}`)
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
