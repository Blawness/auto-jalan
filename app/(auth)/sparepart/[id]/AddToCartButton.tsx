"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cartStore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function AddToCartButton({ partId, stok }: { partId: string; stok: number }) {
  const addItem = useCartStore((s) => s.addItem)
  const router = useRouter()

  function handleAdd() {
    addItem(partId)
    toast.success("Ditambahkan ke keranjang")
  }

  return (
    <div className="space-y-2">
      <Button className="w-full" onClick={handleAdd} disabled={stok <= 0}>
        {stok <= 0 ? "Stok Kosong" : "Tambah ke Keranjang"}
      </Button>
      <Button variant="outline" className="w-full" onClick={() => { handleAdd(); router.push("/keranjang") }} disabled={stok <= 0}>
        Beli Sekarang
      </Button>
    </div>
  )
}
