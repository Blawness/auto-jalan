import { db } from "@/lib/db"
import { bengkels } from "@/lib/schema"
import { TopBar } from "@/components/layout/TopBar"
import { BengkelMapClient } from "./BengkelMapClient"

export default async function BengkelMapPage() {
  const allBengkels = await db.select().from(bengkels)
  return (
    <div>
      <TopBar title="Peta Bengkel" />
      <div className="p-4"><BengkelMapClient bengkels={allBengkels} /></div>
    </div>
  )
}
