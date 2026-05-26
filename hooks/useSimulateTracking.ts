"use client"

import { useEffect, useRef } from "react"
import { useUiStore } from "@/stores/uiStore"

const USER_LAT = -6.2088
const USER_LNG = 106.8456

export function useSimulateTracking() {
  const sosState = useUiStore((s) => s.sosState)
  const updateSOSPosition = useUiStore((s) => s.updateSOSPosition)
  const setSOSStatus = useUiStore((s) => s.setSOSStatus)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (sosState.status !== "tracking") return

    let mechLat = sosState.mechLat
    let mechLng = sosState.mechLng
    let eta = sosState.eta

    intervalRef.current = setInterval(() => {
      const dLat = USER_LAT - mechLat
      const dLng = USER_LNG - mechLng
      const distance = Math.sqrt(dLat * dLat + dLng * dLng)

      if (distance < 0.001) {
        setSOSStatus("arrived")
        if (intervalRef.current) clearInterval(intervalRef.current)
        return
      }

      const step = 0.003
      mechLat += (dLat / distance) * step
      mechLng += (dLng / distance) * step
      eta = Math.max(0, eta - 0.1)

      updateSOSPosition(mechLat, mechLng, Math.ceil(eta))
    }, 2000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [sosState.status])

  return sosState
}
