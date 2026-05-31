import { db } from "@/lib/db"
import { spareparts, vehicles } from "@/lib/schema"
import { TopBar } from "@/components/layout/TopBar"
import { SparepartCard } from "@/components/sparepart/SparepartCard"
import { ListSearchBar } from "./ListSearchBar"

type Props = { searchParams: Promise<{ merek?: string; model?: string; tahun?: string; q?: string; tipe?: string }> }

export default async function SparepartListPage({ searchParams }: Props) {
  const params = await searchParams
  const allParts = await db.select().from(spareparts)
  const allVehicles = await db.select().from(vehicles)
  const tipe = params.tipe === "motor" || params.tipe === "mobil" ? params.tipe : undefined

  let filtered = allParts

  if (params.merek || params.model || tipe) {
    const matchingVehicles = allVehicles.filter((v) => {
      if (params.merek && v.merek !== params.merek) return false
      if (params.model && v.model !== params.model) return false
      if (tipe && v.tipe !== tipe) return false
      return true
    })
    const vehicleIds = new Set(matchingVehicles.map((v) => v.id))
    filtered = filtered.filter((p) => p.compatibleVehicleIds.some((vid) => vehicleIds.has(vid)))
  }

  if (params.q) {
    const q = params.q.toLowerCase()
    const matchingVehicleIds = new Set(
      allVehicles
        .filter((v) => (!tipe || v.tipe === tipe) && (v.model.toLowerCase().includes(q) || v.merek.toLowerCase().includes(q)))
        .map((v) => v.id)
    )
    filtered = filtered.filter(
      (p) =>
        p.nama.toLowerCase().includes(q) ||
        p.compatibleVehicleIds.some((vid) => matchingVehicleIds.has(vid))
    )
  }

  const title = params.merek
    ? `Sparepart ${params.merek}`
    : params.q
    ? `Hasil: "${params.q}"`
    : "Semua Sparepart"

  return (
    <div>
      <TopBar title={title} />
      <div className="p-4">
        <ListSearchBar initialQuery={params.q ?? ""} initialMerek={params.merek ?? ""} />
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">Tidak ada sparepart ditemukan</p>
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3">
            {filtered.map((p) => (
              <SparepartCard key={p.id} id={p.id} nama={p.nama} harga={p.harga} foto={p.foto} keaslian={p.keaslian} stok={p.stok} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
