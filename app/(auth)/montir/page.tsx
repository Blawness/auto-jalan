import { db } from "@/lib/db"
import { services } from "@/lib/schema"
import { TopBar } from "@/components/layout/TopBar"
import { ServiceCard } from "./ServiceCard"

export default async function MontirPage() {
  const allServices = await db.select().from(services)
  return (
    <div>
      <TopBar title="Panggil Montir" />
      <div className="space-y-3 p-4">
        {allServices.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  )
}
