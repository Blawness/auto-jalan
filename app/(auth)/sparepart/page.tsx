import { db } from "@/lib/db"
import { vehicles } from "@/lib/schema"
import { TopBar } from "@/components/layout/TopBar"
import { SparepartFilter } from "./SparepartFilter"

export default async function SparepartPage() {
  const result = await db.selectDistinct({ merek: vehicles.merek }).from(vehicles).orderBy(vehicles.merek)
  const brands = result.map((r) => r.merek)
  return (
    <div>
      <TopBar title="Cari Sparepart" />
      <SparepartFilter brands={brands} />
    </div>
  )
}
