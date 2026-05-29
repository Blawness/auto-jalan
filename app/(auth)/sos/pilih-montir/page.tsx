"use client"

import { useRouter } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"
import { useUiStore } from "@/stores/uiStore"
import { formatRupiah } from "@/lib/utils"

const mockMontirs = [
  {
    id: "m1",
    nama: "Budi Santoso",
    foto: "/images/mekaniks/m1.jpg",
    bengkel: "Bengkel Maju Jaya Motor",
    tarif: 85000,
    eta: 8,
    rating: 4.8,
    jarak: "1.2 km",
    lat: -6.22,
    lng: 106.86,
  },
  {
    id: "m2",
    nama: "Agus Prasetyo",
    foto: "/images/mekaniks/m2.jpg",
    bengkel: "Servis Motor Pak Agus",
    tarif: 70000,
    eta: 12,
    rating: 4.5,
    jarak: "1.8 km",
    lat: -6.215,
    lng: 106.855,
  },
  {
    id: "m3",
    nama: "Hendra Wijaya",
    foto: "/images/mekaniks/m3.jpg",
    bengkel: "Bengkel Honda Hendra",
    tarif: 100000,
    eta: 6,
    rating: 4.9,
    jarak: "0.9 km",
    lat: -6.205,
    lng: 106.848,
  },
]

export default function PilihMontirPage() {
  const router = useRouter()
  const initSOSTracking = useUiStore((s) => s.initSOSTracking)

  function pilih(montir: typeof mockMontirs[0]) {
    initSOSTracking({
      mechId: montir.id,
      mechName: montir.nama,
      mechFoto: montir.foto,
      mechLat: montir.lat,
      mechLng: montir.lng,
    })
    router.push("/sos/mencari")
  }

  return (
    <div>
      <TopBar title="Pilih Montir" />
      <div className="space-y-3 p-4">
        <p className="text-sm text-gray-500">
          {mockMontirs.length} montir siap menerima panggilan Anda. Pilih salah satu:
        </p>

        {mockMontirs.map((montir) => (
          <div
            key={montir.id}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={montir.foto}
                alt={montir.nama}
                className="h-14 w-14 rounded-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    "https://placehold.co/56x56/e2e8f0/64748b?text=M"
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{montir.nama}</p>
                <p className="text-xs text-gray-500 truncate">{montir.bengkel}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-0.5 text-amber-500 font-medium">
                    <Star className="h-3 w-3 fill-amber-500" />
                    {montir.rating}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="h-3 w-3" />
                    {montir.jarak}
                  </span>
                  <span>·</span>
                  <span>~{montir.eta} menit</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-500">Tarif</p>
                <p className="font-bold text-blue-600">{formatRupiah(montir.tarif)}</p>
              </div>
            </div>
            <Button className="mt-3 w-full" size="sm" onClick={() => pilih(montir)}>
              Pilih Montir Ini
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
