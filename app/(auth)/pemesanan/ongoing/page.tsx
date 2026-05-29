"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { EscrowBanner } from "@/components/pemesanan/EscrowBanner"
import { SliderButton } from "@/components/pemesanan/SliderButton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { formatRupiah } from "@/lib/utils"
import { Star, Car, Award, AlertTriangle } from "lucide-react"

function OngoingPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") ?? ""
  const mekanikId = searchParams.get("mekanikId") ?? ""
  const [showKonfirmasi, setShowKonfirmasi] = useState(false)
  const [showKomplain, setShowKomplain] = useState(false)

  return (
    <div>
      <TopBar title="Pesanan Berjalan" />
      <div className="space-y-4 p-4">
        <EscrowBanner />

        <div className="rounded-xl border bg-white p-5">
          <div className="flex items-center gap-4">
            <img
              src="/images/mekaniks/m1.jpg"
              className="h-16 w-16 rounded-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  "https://placehold.co/200x200/e2e8f0/64748b?text=..."
              }}
            />
            <div>
              <h2 className="text-lg font-bold">Budi Santoso</h2>
              <p className="text-sm text-gray-500">Bengkel Maju Jaya Motor</p>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />4.7
                </span>
                <span className="text-gray-300">&middot;</span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Car className="h-3 w-3" />B 3344 DEF
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {["Teknisi AHASS", "Service Injeksi"].map((s) => (
              <span
                key={s}
                className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700"
              >
                <Award className="h-3 w-3" />
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 rounded-xl border bg-white p-4">
          <h3 className="text-sm font-semibold">Detail Pesanan</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Jasa</span>
            <span>Servis Ringan</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className="font-medium text-blue-600">Sedang dikerjakan</span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span>Total</span>
            <span className="text-blue-600">{formatRupiah(241500)}</span>
          </div>
        </div>

        <SliderButton onComplete={() => setShowKonfirmasi(true)} />

        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
          onClick={() => setShowKomplain(true)}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Ajukan Komplain
        </Button>
      </div>

      <Dialog open={showKonfirmasi} onOpenChange={setShowKonfirmasi}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Selesai</DialogTitle>
            <DialogDescription>
              Dana akan dilepas ke montir setelah Anda konfirmasi. Pastikan service sudah sesuai.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowKonfirmasi(false)}>
              Batal
            </Button>
            <Button
              onClick={() => {
                setShowKonfirmasi(false)
                router.push(`/ulasan?orderId=${orderId}&mekanikId=${mekanikId}`)
              }}
            >
              Konfirmasi & Lanjut Ulasan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showKomplain} onOpenChange={setShowKomplain}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajukan Komplain</DialogTitle>
            <DialogDescription>
              Tim kami akan menghubungi Anda dalam 1x24 jam untuk menindaklanjuti komplain Anda.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowKomplain(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function OngoingPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-gray-500">Memuat...</div>}>
      <OngoingPageInner />
    </Suspense>
  )
}
