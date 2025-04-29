"use client"

import { Suspense, useEffect } from "react"
import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { usePathname, useSearchParams } from "next/navigation"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog only on the client side
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: 'https://eu.i.posthog.com',
      ui_host: "https://eu.posthog.com",
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
      capture_pageview: false, // We'll handle this manually
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </PHProvider>
  )
}

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = window.location.href
      posthog?.capture("$pageview", { "$current_url": url })
    }
  }, [pathname, searchParams])

  return null
}
