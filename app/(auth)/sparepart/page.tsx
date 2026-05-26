import { db } from "@/lib/db"
import { vehicles } from "@/lib/schema"
import { TopBar } from "@/components/layout/TopBar"
import { SparepartFilter } from "./SparepartFilter"

export default async function SparepartPage() {
  const allVehicles = await db.select().from(vehicles)
  return (
    <div>
      <TopBar title="Cari Sparepart" />
      <SparepartFilter vehicles={allVehicles} />
    </div>
  )
}
