"use server"

import { db } from "@/lib/db"
import { orders, orderItems, spareparts, services, vehicles } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { v4 as uuid } from "uuid"
import { rateLimitByUser } from "@/lib/rate-limit"

const idPattern = /^[a-z0-9-]+$/i

export async function createOrder(data: {
  mekanikId?: string | null
  serviceId?: string | null
  vehicleId?: string | null
  sparepartItems?: { sparepartId: string; qty: number }[]
  biayaKedatangan?: number
}) {
  const rateError = await rateLimitByUser(10)
  if (rateError) return { error: rateError }

  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const mekanikId = data.mekanikId?.trim() || null
  const serviceId = data.serviceId?.trim() || null
  const vehicleId = data.vehicleId?.trim() || null
  const sparepartItems = Array.isArray(data.sparepartItems) ? data.sparepartItems : []
  const biayaKedatangan = typeof data.biayaKedatangan === "number" ? data.biayaKedatangan : 0

  // A service booking needs a mekanik + jasa; a sparepart purchase needs items.
  // Neither requires the other anymore.
  const isServiceOrder = Boolean(mekanikId || serviceId)
  if (isServiceOrder) {
    if (!mekanikId || !idPattern.test(mekanikId)) return { error: "ID mekanik tidak valid" }
    if (!serviceId || !idPattern.test(serviceId)) return { error: "Pilih layanan" }
  }
  if (vehicleId && !idPattern.test(vehicleId)) return { error: "Kendaraan tidak valid" }
  if (biayaKedatangan < 0 || biayaKedatangan > 1000000) return { error: "Biaya kedatangan tidak valid" }
  if (sparepartItems.length > 50) return { error: "Maksimal 50 sparepart per pesanan" }
  if (!isServiceOrder && sparepartItems.length === 0) {
    return { error: "Keranjang kosong" }
  }

  // Validate optional FKs so we never throw a DB constraint error.
  if (serviceId) {
    const [svc] = await db.select().from(services).where(eq(services.id, serviceId)).limit(1)
    if (!svc) return { error: "Layanan tidak ditemukan" }
  }
  if (vehicleId) {
    const [veh] = await db.select().from(vehicles).where(eq(vehicles.id, vehicleId)).limit(1)
    if (!veh) return { error: "Kendaraan tidak ditemukan" }
  }

  let sparepartTotal = 0
  for (const item of sparepartItems) {
    if (!item.sparepartId || typeof item.qty !== "number" || item.qty < 1) return { error: "Data sparepart tidak valid" }
    const [part] = await db
      .select()
      .from(spareparts)
      .where(eq(spareparts.id, item.sparepartId))
      .limit(1)
    if (part) sparepartTotal += part.harga * item.qty
  }

  const jasaMekanik = isServiceOrder ? 150000 : 0
  const subtotal = sparepartTotal + jasaMekanik + biayaKedatangan
  const totalHarga = Math.round(subtotal * 1.05)

  const orderId = uuid()
  await db.insert(orders).values({
    id: orderId,
    userId: session.user.id,
    mekanikId,
    serviceId,
    vehicleId,
    status: "ongoing",
    totalHarga,
  })

  for (const item of sparepartItems) {
    const [part] = await db
      .select()
      .from(spareparts)
      .where(eq(spareparts.id, item.sparepartId))
      .limit(1)
    await db.insert(orderItems).values({
      id: uuid(),
      orderId,
      sparepartId: item.sparepartId,
      qty: item.qty,
      hargaSatuan: part?.harga ?? 0,
    })
  }

  return { orderId }
}

export async function completeOrder(orderId: string) {
  const rateError = await rateLimitByUser(20)
  if (rateError) return { error: rateError }

  if (!orderId?.trim()) return { error: "ID pesanan tidak valid" }
  if (!/^[a-z0-9-]+$/i.test(orderId.trim())) return { error: "ID pesanan tidak valid" }

  await db.update(orders).set({ status: "selesai" }).where(eq(orders.id, orderId))
}
