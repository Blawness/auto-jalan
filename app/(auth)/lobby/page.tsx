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
  const userName = session?.user?.name ?? "User"
  const initial = (session?.user?.name ?? "U")[0].toUpperCase()

  const brands = await getBrands()
  const popularSpareparts = await getPopularSpareparts()

  return (
    <LobbyClient
      userName={userName}
      initial={initial}
      brands={brands}
      spareparts={popularSpareparts}
    />
  )
}
