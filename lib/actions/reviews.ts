"use server"

import { db } from "@/lib/db"
import { reviews } from "@/lib/schema"
import { auth } from "@/lib/auth"
import { v4 as uuid } from "uuid"

export async function submitReview(data: {
  mekanikId: string
  orderId: string
  ratingMekanik: number
  ratingSparepart?: number
  tags: string[]
  teks?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  await db.insert(reviews).values({
    id: uuid(),
    userId: session.user.id,
    mekanikId: data.mekanikId,
    orderId: data.orderId,
    ratingMekanik: data.ratingMekanik,
    ratingSparepart: data.ratingSparepart ?? null,
    tags: data.tags,
    teks: data.teks ?? null,
  })

  return { success: true }
}
