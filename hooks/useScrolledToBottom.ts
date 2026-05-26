"use client"

import { useEffect, useRef, useState } from "react"

export function useScrolledToBottom() {
  const [reachedBottom, setReachedBottom] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setReachedBottom(true)
      },
      { threshold: 1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, reachedBottom }
}
