"use client"

import { useRouter } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cartStore"
import { formatRupiah } from "@/lib/utils"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function KeranjangPage() {
  const router = useRouter()
  const { items, removeItem, setQty } = useCartStore()

  const total = items.reduce((sum, item) => sum + 85000 * item.qty, 0)

  if (items.length === 0) {
    return (
      <div>
        <TopBar title="Keranjang" />
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag className="mb-4 h-16 w-16 text-gray-300" />
          <p className="text-sm text-gray-500">Keranjang masih kosong</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/sparepart">Cari Sparepart</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <TopBar title="Keranjang" />
      <div className="space-y-3 p-4">
        {items.map((item) => (
          <div key={item.sparepartId} className="flex items-center gap-3 rounded-xl border bg-white p-3">
            <div className="h-14 w-14 rounded-lg bg-gray-100" />
            <div className="flex-1">
              <p className="text-sm font-medium">Sparepart #{item.sparepartId}</p>
              <p className="text-sm font-bold text-blue-600">{formatRupiah(85000 * item.qty)}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setQty(item.sparepartId, item.qty - 1)}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center text-sm">{item.qty}</span>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setQty(item.sparepartId, item.qty + 1)}>
                <Plus className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500" onClick={() => removeItem(item.sparepartId)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="rounded-xl border bg-white p-4">
          <div className="flex justify-between text-sm font-bold">
            <span>Total</span>
            <span className="text-blue-600">{formatRupiah(total)}</span>
          </div>
        </div>

        <Button className="w-full" onClick={() => router.push("/pemesanan/checkout")}>
          Checkout
        </Button>
      </div>
    </div>
  )
}
