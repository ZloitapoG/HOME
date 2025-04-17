import { z } from 'zod'
import { zCreateEventTrpcInput } from '../createEvent/input.js'

export const zUpdateEventTrpcInput = zCreateEventTrpcInput.extend({
  eventId: z.string().min(1),
})
