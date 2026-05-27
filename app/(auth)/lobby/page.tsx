import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { vehicles, spareparts } from "@/lib/schema"
import { sql } from "drizzle-orm"
import { LobbyClient } from "./lobby-client"

async function getBrands() {
  const result = await db
    .selectDistinct({ merek: vehicles.merek })
    .from(vehicles)
    .orderBy(vehicles.merek)

  return result.map((r) => r.merek)
}

async function getPopularSpareparts() {
  return await db
    .select({
      id: spareparts.id,
      nama: spareparts.nama,
      harga: spareparts.harga,
      keaslian: spareparts.keaslian,
      stok: spareparts.stok,
    })
    .from(spareparts)
    .where(sql`${spareparts.stok} > 0`)
    .orderBy(sql`${spareparts.stok} DESC`)
    .limit(4)
}

export default async function LobbyPage() {
  const session = await auth()
  const isGuest = !session?.user
  const userName = session?.user?.name ?? "Tamu"
  const initial = isGuest ? "?" : (session!.user!.name![0] ?? "U").toUpperCase()

  const brands = await getBrands()
  const popularSpareparts = await getPopularSpareparts()

  return (
    <LobbyClient
      isGuest={isGuest}
      userName={userName}
      initial={initial}
      brands={brands}
      spareparts={popularSpareparts}
    />
  )
}
