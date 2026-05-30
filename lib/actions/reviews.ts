"use server"

import { db } from "@/lib/db"
import { reviews } from "@/lib/schema"
import { auth } from "@/lib/auth"
import { v4 as uuid } from "uuid"
import { rateLimitByUser } from "@/lib/rate-limit"

export async function submitReview(data: {
  mekanikId: string
  orderId: string
  ratingMekanik: number
  ratingSparepart?: number
  tags: string[]
  teks?: string
}) {
  const rateError = await rateLimitByUser(10)
  if (rateError) return { error: rateError }

  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  if (!data.mekanikId?.trim()) return { error: "Mekanik tidak valid" }
  if (!/^[a-z0-9-]+$/i.test(data.mekanikId.trim())) return { error: "ID mekanik tidak valid" }
  if (!data.orderId?.trim()) return { error: "Pesanan tidak valid" }
  if (!/^[a-z0-9-]+$/i.test(data.orderId.trim())) return { error: "ID pesanan tidak valid" }
  if (typeof data.ratingMekanik !== "number" || data.ratingMekanik < 1 || data.ratingMekanik > 5) return { error: "Rating mekanik harus 1-5" }
  if (data.ratingSparepart != null && (typeof data.ratingSparepart !== "number" || data.ratingSparepart < 1 || data.ratingSparepart > 5)) return { error: "Rating sparepart harus 1-5" }
  if (!Array.isArray(data.tags)) return { error: "Tags tidak valid" }
  if (data.tags.length > 5) return { error: "Maksimal 5 tags" }
  if (data.tags.some(t => typeof t !== "string" || t.length > 50)) return { error: "Tag tidak valid" }

  await db.insert(reviews).values({
    id: uuid(),
    userId: session.user.id,
    mekanikId: data.mekanikId,
    orderId: data.orderId,
    ratingMekanik: data.ratingMekanik,
    ratingSparepart: data.ratingSparepart ?? null,
    tags: data.tags,
    teks: data.teks?.trim() ?? null,
  })

  return { success: true }
}
