import { z } from 'zod'

export const zBlockEventInput = z.object({
  eventId: z.string().min(1),
})
