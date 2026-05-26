import { db } from "@/lib/db"
import { bengkels, mekaniks } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { SafeImage } from "@/components/ui/safe-image"
import { Star, MapPin, Clock } from "lucide-react"
import { MekanikCard } from "@/components/mekanik/MekanikCard"

type Props = { params: Promise<{ id: string }> }

export default async function BengkelDetailPage({ params }: Props) {
  const { id } = await params
  const [bengkel] = await db.select().from(bengkels).where(eq(bengkels.id, id)).limit(1)
  if (!bengkel) notFound()

  const bengkelMekaniks = await db.select().from(mekaniks).where(eq(mekaniks.bengkelId, id))

  return (
    <div>
      <TopBar title="Profil Bengkel" />
      <div className="space-y-4 p-4">
        <div className="rounded-xl border bg-white p-5">
          <SafeImage src={bengkel.foto} alt={bengkel.nama} className="h-40 w-full rounded-lg object-cover" fallback="https://placehold.co/400x200/e2e8f0/64748b?text=..." />
          <h2 className="mt-3 text-lg font-bold">{bengkel.nama}</h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span>{bengkel.rating}</span></div>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500"><MapPin className="h-4 w-4" /><span>{bengkel.alamat}</span></div>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500"><Clock className="h-4 w-4" /><span>{bengkel.jamBuka}</span></div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-2 text-sm font-semibold">Spesialisasi</h3>
          <div className="flex flex-wrap gap-2">{bengkel.spesialisasi.map((s: string) => <span key={s} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">{s}</span>)}</div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Montir yang Bertugas</h3>
          <div className="space-y-3">
            {bengkelMekaniks.map((m) => (
              <MekanikCard key={m.id} id={m.id} nama={m.nama} foto={m.foto} bengkel={bengkel.nama} rating={m.rating} jarak={m.jarak} spesialisasi={m.spesialisasi} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
