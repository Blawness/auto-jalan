import { db } from "@/lib/db"
import { spareparts } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { KeaslianBadge } from "@/components/sparepart/KeaslianBadge"
import { StokBadge } from "@/components/sparepart/StokBadge"
import { formatRupiah } from "@/lib/utils"
import { AddToCartButton } from "./AddToCartButton"

type Props = { params: Promise<{ id: string }> }

export default async function SparepartDetailPage({ params }: Props) {
  const { id } = await params
  const [part] = await db.select().from(spareparts).where(eq(spareparts.id, id)).limit(1)
  if (!part) notFound()

  return (
    <div>
      <TopBar title="Detail Sparepart" />
      <div className="space-y-4 p-4">
        <div className="flex h-56 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
          <img src={part.foto} alt={part.nama} className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x300/e2e8f0/64748b?text=No+Image" }} />
        </div>
        <div className="flex items-start justify-between">
          <div><h2 className="text-lg font-bold">{part.nama}</h2><p className="mt-1 text-xl font-bold text-blue-600">{formatRupiah(part.harga)}</p></div>
          <KeaslianBadge keaslian={part.keaslian} />
        </div>
        <StokBadge stok={part.stok} />
        <div className="space-y-2 rounded-xl border bg-white p-4">
          <h3 className="text-sm font-semibold">Spesifikasi</h3>
          {Object.entries(part.spesifikasi as Record<string, string>).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="capitalize text-gray-500">{key.replace(/_/g, " ")}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
        <AddToCartButton partId={part.id} stok={part.stok} />
      </div>
    </div>
  )
}
