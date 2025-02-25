import { initTRPC } from '@trpc/server'
const news = [
  { nick: 'build news 1', name: 'Новость 1', description: 'Описание 1' },
  { nick: 'build news 2', name: 'Новость 2', description: 'Описание 2' },
  { nick: 'build news 3', name: 'Новость 3', description: 'Описание 3' },
  { nick: 'build news 4', name: 'Новость 4', description: 'Описание 4' },
  { nick: 'build news 5', name: 'Новость 5', description: 'Описание 5' },
]

const trpc = initTRPC.create()
//if (true) console.log(213);

export const trpcRouter = trpc.router({
  getNews: trpc.procedure.query(() => {
    //throw new Error('Test error')
    return { news }
  }),
})
export type TrpcRouter = typeof trpcRouter
