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
  if (!session?.user?.id) throw new Error("Not authenticated")

  await db.insert(forumThreads).values({
    id: uuid(),
    userId: session.user.id,
    judul: data.judul,
    kategori: data.kategori,
    deskripsi: data.deskripsi,
  })

  return { success: true }
}

export async function createAnswer(data: {
  threadId: string
  isi: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  await db.insert(forumAnswers).values({
    id: uuid(),
    userId: session.user.id,
    threadId: data.threadId,
    isi: data.isi,
  })

  return { success: true }
}
