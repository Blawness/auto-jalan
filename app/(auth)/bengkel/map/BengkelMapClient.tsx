"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { Search, LocateFixed } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/useGeolocation"

const TrackingMap = dynamic(
  () => import("@/components/tracking/TrackingMap").then((m) => ({ default: m.TrackingMap })),
  { ssr: false }
)

type Bengkel = { id: string; nama: string; lat: number; lng: number; rating: number; jamBuka: string }

export function BengkelMapClient({ bengkels }: { bengkels: Bengkel[] }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [applied, setApplied] = useState("")
  const { coords, status, usingFallback } = useGeolocation()

  const term = applied.trim().toLowerCase()
  const filtered = term
    ? bengkels.filter((b) => b.nama.toLowerCase().includes(term))
    : bengkels

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setApplied(query)
  }

  return (
    <div className="relative">
      {/* Search bar + tombol Cari mengambang di atas peta */}
      <div className="absolute left-0 right-0 top-0 z-30 space-y-2 p-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="border-gray-200 bg-white/95 pl-9 shadow-md backdrop-blur-sm"
              placeholder="Cari lokasi atau nama bengkel..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="shadow-md">Cari</Button>
        </form>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-gray-600 shadow-sm backdrop-blur-sm">
          <LocateFixed className={`h-3.5 w-3.5 ${usingFallback ? "text-gray-400" : "text-blue-600"}`} />
          {status === "locating"
            ? "Mendeteksi lokasi Anda..."
            : usingFallback
            ? "Lokasi default: Jakarta"
            : "Menampilkan bengkel di sekitar Anda"}
        </div>
      </div>

      <TrackingMap
        center={coords}
        userMarker={{ lat: coords[0], lng: coords[1], label: "Lokasi Anda" }}
        height="h-[calc(100vh-7.5rem)]"
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
