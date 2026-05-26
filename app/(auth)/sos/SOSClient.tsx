"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Siren, MapPin, Clock, Shield } from "lucide-react"

export function SOSClient() {
  const router = useRouter()

  return (
    <div className="space-y-4 p-4">
      <Card className="border-red-200 bg-red-50 p-5">
        <div className="mb-3 flex items-center gap-3">
          <Siren className="h-8 w-8 text-red-500" />
          <div>
            <h2 className="text-lg font-bold text-red-700">Darurat!</h2>
            <p className="text-sm text-red-600">Montir akan segera dikirim</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">Lokasi terdeteksi:</span>
        </div>
        <p className="pl-6 text-sm font-medium">Jl. Sudirman, Jakarta Pusat (auto-detected)</p>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">Estimasi kedatangan: 10-15 menit</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">Biaya darurat: Rp 25.000 (tambahan)</span>
        </div>
      </Card>

      <Button
        className="h-12 w-full bg-red-500 text-lg text-white hover:bg-red-600"
        onClick={() => router.push("/sos/mencari")}
      >
        <Siren className="mr-2 h-5 w-5" />
        Panggil Montir Sekarang
      </Button>
    </div>
  )
}
