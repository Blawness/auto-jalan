import { db } from "@/lib/db"
import { spareparts, vehicles } from "@/lib/schema"
import { TopBar } from "@/components/layout/TopBar"
import { SparepartCard } from "@/components/sparepart/SparepartCard"
import { eq, and } from "drizzle-orm"

type Props = { searchParams: Promise<{ merek?: string; model?: string; tahun?: string }> }

export default async function SparepartListPage({ searchParams }: Props) {
  const params = await searchParams
  const conditions = []
  if (params.merek) conditions.push(eq(vehicles.merek, params.merek))
  if (params.model) conditions.push(eq(vehicles.model, params.model))

  const matchingVehicles = conditions.length > 0 ? await db.select().from(vehicles).where(and(...conditions)) : []
  const vehicleIds = matchingVehicles.map((v) => v.id)

  const allParts = await db.select().from(spareparts)
  const filtered = vehicleIds.length > 0
    ? allParts.filter((p) => p.compatibleVehicleIds.some((vid) => vehicleIds.includes(vid)))
    : allParts

  return (
    <div>
      <TopBar title="List Sparepart" />
      <div className="p-4">
        {filtered.length === 0 ? (
          <div className="py-12 text-center"><p className="text-gray-500">Tidak ada sparepart untuk filter ini</p></div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((p) => (
              <SparepartCard key={p.id} id={p.id} nama={p.nama} harga={p.harga} foto={p.foto} keaslian={p.keaslian} stok={p.stok} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
