import { db } from "@/lib/db"
import { mekaniks, bengkels } from "@/lib/schema"
import { TopBar } from "@/components/layout/TopBar"
import { MekanikCard } from "@/components/mekanik/MekanikCard"
import { notFound } from "next/navigation"

type Props = { searchParams: Promise<{ serviceId?: string }> }

export default async function MontirListPage({ searchParams }: Props) {
  const params = await searchParams
  if (!params.serviceId) notFound()

  const allMekaniks = await db.select().from(mekaniks)
  const allBengkels = await db.select().from(bengkels)
  const bengkelMap = new Map(allBengkels.map((b) => [b.id, b]))

  return (
    <div>
      <TopBar title="Pilih Montir" />
      <div className="space-y-3 p-4">
        {allMekaniks.map((m) => {
          const bengkel = m.bengkelId ? bengkelMap.get(m.bengkelId) : null
          return (
            <MekanikCard
              key={m.id}
              id={m.id}
              nama={m.nama}
              foto={m.foto}
              bengkel={bengkel?.nama ?? "Mandiri"}
              rating={m.rating}
              jarak={m.jarak}
              spesialisasi={m.spesialisasi}
            />
          )
        })}
      </div>
    </div>
  )
}
