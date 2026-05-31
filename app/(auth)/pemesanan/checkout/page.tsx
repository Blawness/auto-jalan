import { db } from "@/lib/db"
import { vehicles } from "@/lib/schema"
import { asc } from "drizzle-orm"
import { CheckoutClient } from "./CheckoutClient"

export default async function CheckoutPage() {
  const allVehicles = await db
    .select({
      id: vehicles.id,
      merek: vehicles.merek,
      model: vehicles.model,
      tipe: vehicles.tipe,
    })
    .from(vehicles)
    .orderBy(asc(vehicles.merek), asc(vehicles.model))

  return <CheckoutClient vehicles={allVehicles} />
}
