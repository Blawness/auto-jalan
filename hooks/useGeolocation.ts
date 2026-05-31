"use client"

import { useEffect, useState } from "react"

export const JAKARTA_CENTER: [number, number] = [-6.2088, 106.8456]

export type GeoStatus = "locating" | "granted" | "denied" | "unavailable"

/**
 * Requests the browser's real location, falling back to Jakarta if the user
 * denies permission, the request times out, or the API is unavailable.
 */
export function useGeolocation() {
  const [coords, setCoords] = useState<[number, number]>(JAKARTA_CENTER)
  const [status, setStatus] = useState<GeoStatus>("locating")

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      // Defer so we don't call setState synchronously inside the effect body.
      const t = setTimeout(() => setStatus("unavailable"), 0)
      return () => clearTimeout(t)
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords([pos.coords.latitude, pos.coords.longitude])
        setStatus("granted")
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    )
  }, [])

  return { coords, status, usingFallback: status !== "granted" }
}
