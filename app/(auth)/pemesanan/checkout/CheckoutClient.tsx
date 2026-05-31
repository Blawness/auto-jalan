"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { HargaBreakdown } from "@/components/pemesanan/HargaBreakdown"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUiStore } from "@/stores/uiStore"
import { useCartStore } from "@/stores/cartStore"
import { useScrolledToBottom } from "@/hooks/useScrolledToBottom"
import { createOrder } from "@/lib/actions/orders"
import { toast } from "sonner"
import { Loader2, ShieldCheck, Car, ShoppingBag } from "lucide-react"

type Vehicle = { id: string; merek: string; model: string; tipe: "motor" | "mobil" }

const HARGA_SPAREPART = 85000

export function CheckoutClient({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [vehicleId, setVehicleId] = useState("")
  const { selectedMekanikId, selectedServiceId } = useUiStore()
  const { items, clear } = useCartStore()
  const { ref, reachedBottom } = useScrolledToBottom()

  // Service booking when a montir + jasa were picked; otherwise this is a
  // straight sparepart purchase from the cart (no montir required).
  const isServiceOrder = Boolean(selectedMekanikId && selectedServiceId)

  const sparepartTotal = items.reduce((sum, i) => sum + HARGA_SPAREPART * i.qty, 0)
  const jasaMekanik = isServiceOrder ? 150000 : 0
  const biayaKedatangan = isServiceOrder ? 25000 : 0

  const motor = useMemo(() => vehicles.filter((v) => v.tipe === "motor"), [vehicles])
  const mobil = useMemo(() => vehicles.filter((v) => v.tipe === "mobil"), [vehicles])

  const nothingToCheckout = !isServiceOrder && items.length === 0

  async function handlePesan() {
    if (isServiceOrder && !vehicleId) {
      toast.error("Pilih kendaraan yang akan diservis")
      return
    }
    setLoading(true)
    const result = await createOrder({
      mekanikId: isServiceOrder ? selectedMekanikId : null,
      serviceId: isServiceOrder ? selectedServiceId : null,
      vehicleId: isServiceOrder ? vehicleId : null,
      sparepartItems: items,
      biayaKedatangan,
    })
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }

    clear()
    if (isServiceOrder) {
      useUiStore.getState().resetFlow()
      router.push(`/pemesanan/ongoing?orderId=${result.orderId}&mekanikId=${selectedMekanikId}`)
    } else {
      toast.success("Pesanan sparepart berhasil dibuat")
      router.push("/riwayat")
    }
  }

  if (nothingToCheckout) {
    return (
      <div>
        <TopBar title="Checkout" />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="mb-4 h-16 w-16 text-gray-300" />
          <p className="text-sm text-gray-500">Belum ada yang bisa di-checkout</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/sparepart")}>
            Cari Sparepart
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <TopBar title="Checkout" />
      <div className="space-y-4 p-4">
        {isServiceOrder && (
          <div className="space-y-2 rounded-xl border bg-white p-4">
            <Label className="flex items-center gap-1.5 text-sm font-semibold">
              <Car className="h-4 w-4 text-blue-600" />
              Kendaraan yang Diservis
            </Label>
            <Select value={vehicleId} onValueChange={setVehicleId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kendaraan Anda" />
              </SelectTrigger>
              <SelectContent>
                {mobil.length > 0 && (
                  <SelectGroup>
                    <SelectLabel>Mobil</SelectLabel>
                    {mobil.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.merek} {v.model}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
                {motor.length > 0 && (
                  <SelectGroup>
                    <SelectLabel>Motor</SelectLabel>
                    {motor.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.merek} {v.model}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Montir akan menyiapkan suku cadang sesuai kendaraan Anda.
            </p>
          </div>
        )}

        <HargaBreakdown
          sparepartTotal={sparepartTotal}
          jasaMekanik={jasaMekanik}
          biayaKedatangan={biayaKedatangan}
        />

        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
          <ShieldCheck className="h-6 w-6 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-800">Fixed Price Guarantee</p>
            <p className="text-xs text-green-600">Harga tidak akan berubah setelah pemesanan</p>
          </div>
        </div>

        <div ref={ref} />

        <Button className="w-full" disabled={!reachedBottom || loading} onClick={handlePesan}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {reachedBottom ? "Pesan Sekarang" : "Scroll ke bawah untuk memesan"}
        </Button>
      </div>
    </div>
  )
}
