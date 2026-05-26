"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

const TrackingMap = dynamic(
  () => import("@/components/tracking/TrackingMap").then((m) => ({ default: m.TrackingMap })),
  { ssr: false }
)

type Bengkel = { id: string; nama: string; lat: number; lng: number; rating: number; jamBuka: string }

export function BengkelMapClient({ bengkels }: { bengkels: Bengkel[] }) {
  const router = useRouter()
  return (
    <TrackingMap
      center={[-6.2088, 106.8456]}
      markers={bengkels.map((b) => ({ id: b.id, lat: b.lat, lng: b.lng, label: b.nama, rating: b.rating, jamBuka: b.jamBuka }))}
      onMarkerClick={(id) => router.push(`/bengkel/${id}`)}
    />
  )
}
