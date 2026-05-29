import { db } from "@/lib/db"
import { bengkels } from "@/lib/schema"
import { TopBar } from "@/components/layout/TopBar"
import { BengkelMapClient } from "./map/BengkelMapClient"

export default async function BengkelPage() {
  const allBengkels = await db.select().from(bengkels)
  return (
    <div>
      <TopBar title="Cari Bengkel" />
      <BengkelMapClient bengkels={allBengkels} />
    </div>
  )
}
