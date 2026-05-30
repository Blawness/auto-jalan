"use server"

import { db } from "@/lib/db"
import { orders, orderItems, spareparts } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { v4 as uuid } from "uuid"
import { rateLimitByUser } from "@/lib/rate-limit"

export async function createOrder(data: {
  mekanikId: string
  serviceId: string
  sparepartItems: { sparepartId: string; qty: number }[]
  biayaKedatangan: number
}) {
  const rateError = await rateLimitByUser(10)
  if (rateError) return { error: rateError }

  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  if (!data.mekanikId?.trim()) return { error: "Pilih mekanik" }
  if (!/^[a-z0-9-]+$/i.test(data.mekanikId.trim())) return { error: "ID mekanik tidak valid" }
  if (!data.serviceId?.trim()) return { error: "Pilih layanan" }
  if (!/^[a-z0-9-]+$/i.test(data.serviceId.trim())) return { error: "ID layanan tidak valid" }
  if (typeof data.biayaKedatangan !== "number" || data.biayaKedatangan < 0) return { error: "Biaya kedatangan tidak valid" }
  if (data.biayaKedatangan > 1000000) return { error: "Biaya kedatangan terlalu besar" }
  if (!Array.isArray(data.sparepartItems) || data.sparepartItems.length === 0) return { error: "Pilih minimal satu sparepart" }
  if (data.sparepartItems.length > 50) return { error: "Maksimal 50 sparepart per pesanan" }

  let sparepartTotal = 0
  for (const item of data.sparepartItems) {
    if (!item.sparepartId || typeof item.qty !== "number" || item.qty < 1) return { error: "Data sparepart tidak valid" }
    const [part] = await db
      .select()
      .from(spareparts)
      .where(eq(spareparts.id, item.sparepartId))
      .limit(1)
    if (part) sparepartTotal += part.harga * item.qty
  }

  const jasaMekanik = 150000
  const subtotal = sparepartTotal + jasaMekanik + data.biayaKedatangan
  const totalHarga = Math.round(subtotal * 1.05)

  const orderId = uuid()
  await db.insert(orders).values({
    id: orderId,
    userId: session.user.id,
    mekanikId: data.mekanikId,
    serviceId: data.serviceId,
    status: "ongoing",
    totalHarga,
  })

  for (const item of data.sparepartItems) {
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
