import { db } from "@/lib/db"
import { mekaniks, bengkels } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { MekanikProfile } from "@/components/mekanik/MekanikProfile"
import { PilihMontirButton } from "./PilihMontirButton"

type Props = { params: Promise<{ id: string }> }

export default async function MontirDetailPage({ params }: Props) {
  const { id } = await params
  const [mekanik] = await db.select().from(mekaniks).where(eq(mekaniks.id, id)).limit(1)
  if (!mekanik) notFound()

  const [bengkel] = mekanik.bengkelId
    ? await db.select().from(bengkels).where(eq(bengkels.id, mekanik.bengkelId)).limit(1)
    : [null]

  return (
    <div>
      <TopBar title="Profil Montir" />
      <div className="space-y-4 p-4">
        <MekanikProfile
          nama={mekanik.nama} foto={mekanik.foto} bengkel={bengkel?.nama ?? "Mandiri"}
          platKendaraan={mekanik.platKendaraan} sertifikasi={mekanik.sertifikasi}
          rating={mekanik.rating} jumlahUlasan={mekanik.jumlahUlasan} jarak={mekanik.jarak} spesialisasi={mekanik.spesialisasi}
        />
        <PilihMontirButton mekanikId={mekanik.id} />
      </div>
    </div>
  )
}
