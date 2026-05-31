"use server"

import { db } from "@/lib/db"
import { reviews, mekaniks, orders } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { v4 as uuid } from "uuid"
import { rateLimitByUser } from "@/lib/rate-limit"

const idPattern = /^[a-z0-9-]+$/i

export async function submitReview(data: {
  mekanikId?: string
  orderId?: string
  ratingMekanik: number
  ratingSparepart?: number
  tags: string[]
  teks?: string
}) {
  const rateError = await rateLimitByUser(10)
  if (rateError) return { error: rateError }

  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  if (typeof data.ratingMekanik !== "number" || data.ratingMekanik < 1 || data.ratingMekanik > 5) return { error: "Rating mekanik harus 1-5" }
  if (data.ratingSparepart != null && (typeof data.ratingSparepart !== "number" || data.ratingSparepart < 1 || data.ratingSparepart > 5)) return { error: "Rating sparepart harus 1-5" }
  if (!Array.isArray(data.tags)) return { error: "Tags tidak valid" }
  if (data.tags.length > 5) return { error: "Maksimal 5 tags" }
  if (data.tags.some(t => typeof t !== "string" || t.length > 50)) return { error: "Tag tidak valid" }

  // mekanikId/orderId are optional context (some flows, e.g. SOS, don't carry
  // a real order). Only keep references that actually exist so the insert never
  // trips a foreign-key constraint; otherwise store null.
  let mekanikId: string | null = data.mekanikId?.trim() || null
  if (mekanikId) {
    if (!idPattern.test(mekanikId)) return { error: "ID mekanik tidak valid" }
    const [m] = await db.select({ id: mekaniks.id }).from(mekaniks).where(eq(mekaniks.id, mekanikId)).limit(1)
    if (!m) mekanikId = null
  }

  let orderId: string | null = data.orderId?.trim() || null
  if (orderId) {
    if (!idPattern.test(orderId)) return { error: "ID pesanan tidak valid" }
    const [o] = await db.select({ id: orders.id }).from(orders).where(eq(orders.id, orderId)).limit(1)
    if (!o) orderId = null
  }

  await db.insert(reviews).values({
    id: uuid(),
    userId: session.user.id,
    mekanikId,
    orderId,
    ratingMekanik: data.ratingMekanik,
    ratingSparepart: data.ratingSparepart ?? null,
    tags: data.tags,
    teks: data.teks?.trim() ?? null,
  })

  return { success: true }
}
