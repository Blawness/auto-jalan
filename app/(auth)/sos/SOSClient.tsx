"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useGeolocation } from "@/hooks/useGeolocation"
import { Siren, MapPin, Clock, Shield, Pencil, Check, Bike, Car, Camera, X, LocateFixed } from "lucide-react"

export function SOSClient() {
  const router = useRouter()
  const { coords, status, usingFallback } = useGeolocation()
  const [editing, setEditing] = useState(false)
  const [alamat, setAlamat] = useState("Jl. Sudirman, Jakarta Pusat")
  const [tipe, setTipe] = useState<"motor" | "mobil">("motor")
  const [masalah, setMasalah] = useState("")
  const [modelKendaraan, setModelKendaraan] = useState("")
  const [foto, setFoto] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Bersihkan object URL foto saat diganti / unmount.
  useEffect(() => {
    return () => {
      if (foto) URL.revokeObjectURL(foto)
    }
  }, [foto])

  function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (foto) URL.revokeObjectURL(foto)
    setFoto(URL.createObjectURL(file))
  }

  const gpsLabel =
    status === "locating"
      ? "Mendeteksi lokasi GPS..."
      : usingFallback
      ? "GPS tidak aktif — pakai lokasi default"
      : `Terdeteksi: ${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`

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
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <span className="font-medium text-gray-800">{alamat}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <LocateFixed className={`h-3.5 w-3.5 ${usingFallback ? "text-gray-400" : "text-blue-600"}`} />
              <span className="text-gray-500">{gpsLabel}</span>
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

        {/* Tipe kendaraan — wajib, selalu terlihat agar montir tahu jenis kendaraan */}
        <div className="border-t pt-3">
          <p className="mb-1 text-xs font-medium text-gray-500">
            Jenis Kendaraan <span className="text-red-500">*</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setTipe("motor")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-semibold transition-colors ${tipe === "motor" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600"}`}
            >
              <Bike className="h-4 w-4" /> Motor
            </button>
            <button
              onClick={() => setTipe("mobil")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-semibold transition-colors ${tipe === "mobil" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600"}`}
            >
              <Car className="h-4 w-4" /> Mobil
            </button>
          </div>
        </div>

        {editing && (
          <div className="space-y-3 border-t pt-3">
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Alamat Manual</p>
              <Input value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Masukkan alamat lengkap" />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Tipe / Model Kendaraan</p>
              <Input
                value={modelKendaraan}
                onChange={(e) => setModelKendaraan(e.target.value)}
                placeholder="Contoh: Toyota Avanza 2019 / Honda Beat 2021"
              />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Rincian Masalah</p>
              <Textarea
                value={masalah}
                onChange={(e) => setMasalah(e.target.value)}
                placeholder="Ceritakan masalah kendaraan Anda..."
                rows={2}
              />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">Foto Kerusakan</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFoto}
              />
              {foto ? (
                <div className="relative w-fit">
                  <img src={foto} alt="Foto kerusakan" className="h-28 w-28 rounded-lg border object-cover" />
                  <button
                    onClick={() => setFoto(null)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white"
                    aria-label="Hapus foto"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-gray-400"
                >
                  <Camera className="h-6 w-6" />
                  <span className="text-[11px]">Ambil Foto</span>
                </button>
              )}
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
