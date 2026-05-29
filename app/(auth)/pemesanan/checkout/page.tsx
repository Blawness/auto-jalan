"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { HargaBreakdown } from "@/components/pemesanan/HargaBreakdown"
import { Button } from "@/components/ui/button"
import { useUiStore } from "@/stores/uiStore"
import { useCartStore } from "@/stores/cartStore"
import { useScrolledToBottom } from "@/hooks/useScrolledToBottom"
import { createOrder } from "@/lib/actions/orders"
import { toast } from "sonner"
import { Loader2, ShieldCheck } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { selectedMekanikId, selectedServiceId } = useUiStore()
  const { items, clear } = useCartStore()
  const { ref, reachedBottom } = useScrolledToBottom()

  const sparepartTotal = 85000
  const jasaMekanik = 150000
  const biayaKedatangan = 25000

  async function handlePesan() {
    if (!selectedMekanikId || !selectedServiceId) {
      toast.error("Pilih montir dan jasa terlebih dahulu")
      return
    }
    setLoading(true)
    const result = await createOrder({
      mekanikId: selectedMekanikId,
      serviceId: selectedServiceId,
      sparepartItems: items,
      biayaKedatangan,
    })
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
    } else {
      clear()
      useUiStore.getState().resetFlow()
      router.push(`/pemesanan/ongoing?orderId=${result.orderId}&mekanikId=${selectedMekanikId}`)
    }
  }

  return (
    <div>
      <TopBar title="Checkout" />
      <div className="space-y-4 p-4">
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
