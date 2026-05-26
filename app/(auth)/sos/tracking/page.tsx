"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { useUiStore } from "@/stores/uiStore"
import { useSimulateTracking } from "@/hooks/useSimulateTracking"
import { MekanikFloatingCard } from "@/components/tracking/MekanikFloatingCard"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const TrackingMap = dynamic(
  () => import("@/components/tracking/TrackingMap").then((m) => ({ default: m.TrackingMap })),
  { ssr: false }
)

export default function SOSTrackingPage() {
  const router = useRouter()
  const sosState = useSimulateTracking()
  const arrivedRef = useRef(false)

  useEffect(() => {
    if (sosState.status === "arrived" && !arrivedRef.current) {
      arrivedRef.current = true
      toast.success("Montir telah tiba di lokasi!")
    }
  }, [sosState.status])

  const distance = calculateDistance(-6.2088, 106.8456, sosState.mechLat, sosState.mechLng)

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-0 z-30 border-b bg-white/90 p-3 backdrop-blur-sm">
        <h2 className="text-sm font-semibold">Live Tracking</h2>
      </div>

      <TrackingMap
        center={[-6.2088, 106.8456]}
        markers={[]}
        userMarker={{ lat: -6.2088, lng: 106.8456, label: "Lokasi Anda" }}
        mechMarker={{ lat: sosState.mechLat, lng: sosState.mechLng, label: sosState.mechName }}
        height="h-screen"
      />

      <MekanikFloatingCard
        nama={sosState.mechName}
        foto={sosState.mechFoto}
        eta={sosState.eta}
        distance={`${distance.toFixed(1)} km`}
      />

      {sosState.status === "arrived" && (
        <div className="absolute bottom-32 left-4 right-4 z-40">
          <Button className="w-full" onClick={() => router.push("/pemesanan/ongoing")}>
            Lihat Pesanan
          </Button>
        </div>
      )}
    </div>
  )
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = (lat2 - lat1) * 111.32
  const dLng = (lng2 - lng1) * Math.cos((lat1 * Math.PI) / 180) * 111.32
  return Math.sqrt(dLat * dLat + dLng * dLng)
}
