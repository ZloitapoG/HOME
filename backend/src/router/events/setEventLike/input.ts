import { z } from 'zod'

export const zSetEventLikeEventTrpcInput = z.object({
  eventId: z.string().min(1),
  isLikedByMe: z.boolean(),
})
