import { PostHog } from "posthog-node"

// Only initialize PostHog on the server side
const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  host: "https://eu.i.posthog.com",
  flushAt: 1,
  flushInterval: 0
})

export default function PostHogClient() {
  return posthogClient
}
