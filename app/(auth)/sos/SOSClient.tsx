"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Siren, MapPin, Clock, Shield, Pencil, Check } from "lucide-react"

export function SOSClient() {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [alamat, setAlamat] = useState("Jl. Sudirman, Jakarta Pusat")
  const [tipe, setTipe] = useState<"motor" | "mobil">("motor")
  const [masalah, setMasalah] = useState("")

  return (
    <div className="space-y-4 p-4">
      <Card className="border-red-200 bg-red-50 p-5">
        <div className="flex items-center gap-3">
          <Siren className="h-8 w-8 text-red-500" />
          <div>
            <h2 className="text-lg font-bold text-red-700">Darurat!</h2>
            <p className="text-sm text-red-600">Montir akan segera dikirim ke lokasi Anda</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-3 p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="font-medium text-gray-800">{alamat}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Estimasi kedatangan: 10–15 menit</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Biaya darurat: Rp 25.000</span>
            </div>
          </div>
          <button
            onClick={() => setEditing((v) => !v)}
            className="ml-2 flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
          >
            {editing ? <Check className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
            {editing ? "Simpan" : "Edit"}
          </button>
        </div>

        {editing && (
          <div className="space-y-3 border-t pt-3">
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Alamat</p>
              <Input value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Masukkan alamat lengkap" />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Tipe Kendaraan</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setTipe("motor")}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors ${tipe === "motor" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600"}`}
                >
                  Motor
                </button>
                <button
                  onClick={() => setTipe("mobil")}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors ${tipe === "mobil" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600"}`}
                >
                  Mobil
                </button>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Masalah (opsional)</p>
              <Textarea
                value={masalah}
                onChange={(e) => setMasalah(e.target.value)}
                placeholder="Ceritakan masalah kendaraan Anda..."
                rows={2}
              />
            </div>
          </div>
        )}
      </Card>

      <Button
        className="h-12 w-full bg-red-500 text-base font-bold text-white hover:bg-red-600"
        onClick={() => router.push("/sos/pilih-montir")}
      >
        <Siren className="mr-2 h-5 w-5" />
        Panggil Montir Sekarang
      </Button>
    </div>
  )
}
