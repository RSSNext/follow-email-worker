import { ofetch } from "ofetch"
import PostalMime from "postal-mime"

import type { Env, Payload } from "./types"

export default {
  async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
    let webhookSuccess = false
    try {
      const email = await PostalMime.parse(message.raw)

      if (email.to) {
        const toAddresses = email.to
          .map((to) => to.address)
          .filter((address): address is string => !!address && address.endsWith(env.INBOXES_EMAIL))

        for (const address of toAddresses) {
          const payload: Payload = {
            from: {
              name: email.from.name,
              address: email.from.address,
            },
            to: {
              address,
            },
            subject: email.subject,
            messageId: email.messageId,
            date: email.date ?? new Date().toISOString(),
            html: email.html,
          }

          await ofetch(`${env.API_URL}/inboxes/email`, {
            method: "POST",
            body: payload,
            headers: {
              "X-Follow-Auth-Token": env.INBOXES_AUTH_TOKEN,
            },
            retry: 1,
            retryDelay: 10_000,
          })
          webhookSuccess = true
        }
      }
    } catch (error) {
      console.error(error)
    }

    message.forward(webhookSuccess ? env.SUCCESS_FORWARD_TO : env.FAILURE_FORWARD_TO)
  },
}
