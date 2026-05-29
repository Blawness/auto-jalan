import { db } from "@/lib/db"
import { mekaniks, services } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { JasaClient } from "./JasaClient"

type Props = { params: Promise<{ id: string }> }

export default async function JasaPage({ params }: Props) {
  const { id } = await params
  const [mekanik] = await db.select().from(mekaniks).where(eq(mekaniks.id, id)).limit(1)
  if (!mekanik) notFound()

  const allServices = await db.select().from(services)

  return <JasaClient mekanikId={id} mekanikNama={mekanik.nama} spesialisasi={mekanik.spesialisasi} allServices={allServices} />
}
