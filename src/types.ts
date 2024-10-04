import { z } from "zod"

export interface Env {
  API_URL: string
  INBOXES_AUTH_TOKEN: string
  INBOXES_EMAIL: string
  SUCCESS_FORWARD_TO: string
  FAILURE_FORWARD_TO: string
}

const _emailZodSchema = z.object({
  from: z.object({
    name: z.string().optional().optional(),
    address: z.string().email().optional(),
  }),
  to: z.object({
    address: z.string().email(),
  }),
  subject: z.string().optional(),
  messageId: z.string(),
  date: z.string().datetime(),
  html: z.string().optional(),
})

export type Payload = z.infer<typeof _emailZodSchema>
