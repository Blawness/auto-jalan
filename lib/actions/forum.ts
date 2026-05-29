"use server"

import { db } from "@/lib/db"
import { forumThreads, forumAnswers } from "@/lib/schema"
import { auth } from "@/lib/auth"
import { v4 as uuid } from "uuid"

export async function createThread(data: {
  judul: string
  kategori: string
  deskripsi: string
}) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const judul = data.judul?.trim()
  const kategori = data.kategori?.trim()
  const deskripsi = data.deskripsi?.trim()

  if (!judul || judul.length < 3) return { error: "Judul minimal 3 karakter" }
  if (!kategori) return { error: "Pilih kategori" }
  if (!deskripsi || deskripsi.length < 10) return { error: "Deskripsi minimal 10 karakter" }

  await db.insert(forumThreads).values({
    id: uuid(),
    userId: session.user.id,
    judul,
    kategori,
    deskripsi,
  })

  return { success: true }
}

export async function createAnswer(data: {
  threadId: string
  isi: string
}) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const threadId = data.threadId?.trim()
  const isi = data.isi?.trim()

  if (!threadId) return { error: "ID thread tidak valid" }
  if (!isi || isi.length < 3) return { error: "Jawaban minimal 3 karakter" }

  await db.insert(forumAnswers).values({
    id: uuid(),
    userId: session.user.id,
    threadId,
    isi,
  })

  return { success: true }
}
