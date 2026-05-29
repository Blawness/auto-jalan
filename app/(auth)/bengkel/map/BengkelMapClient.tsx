"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const TrackingMap = dynamic(
  () => import("@/components/tracking/TrackingMap").then((m) => ({ default: m.TrackingMap })),
  { ssr: false }
)

type Bengkel = { id: string; nama: string; lat: number; lng: number; rating: number; jamBuka: string }

export function BengkelMapClient({ bengkels }: { bengkels: Bengkel[] }) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const filtered = query.trim()
    ? bengkels.filter((b) => b.nama.toLowerCase().includes(query.toLowerCase()))
    : bengkels

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-0 z-30 p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="border-gray-200 bg-white/95 pl-9 shadow-md backdrop-blur-sm"
            placeholder="Cari nama bengkel..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <TrackingMap
        center={[-6.2088, 106.8456]}
        markers={filtered.map((b) => ({
          id: b.id,
          lat: b.lat,
          lng: b.lng,
          label: b.nama,
          rating: b.rating,
          jamBuka: b.jamBuka,
        }))}
        onMarkerClick={(id) => router.push(`/bengkel/${id}`)}
      />
    </div>
  )
}
