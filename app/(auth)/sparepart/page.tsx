import { db } from "@/lib/db"
import { vehicles } from "@/lib/schema"
import { TopBar } from "@/components/layout/TopBar"
import { SparepartFilter } from "./SparepartFilter"

export default async function SparepartPage() {
  const rows = await db
    .selectDistinct({ merek: vehicles.merek, tipe: vehicles.tipe })
    .from(vehicles)
    .orderBy(vehicles.merek)

  // A brand can have both motor & mobil models — track which types each covers
  // so the category toggle can filter the brand list.
  const map = new Map<string, Set<"motor" | "mobil">>()
  for (const r of rows) {
    if (!map.has(r.merek)) map.set(r.merek, new Set())
    map.get(r.merek)!.add(r.tipe)
  }
  const brands = [...map.entries()].map(([merek, tipes]) => ({
    merek,
    tipes: [...tipes],
  }))

  return (
    <div>
      <TopBar title="Cari Sparepart" />
      <SparepartFilter brands={brands} />
    </div>
  )
}
