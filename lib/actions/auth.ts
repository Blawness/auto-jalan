"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { signIn } from "@/lib/auth"
import { v4 as uuid } from "uuid"
import { rateLimitByUser } from "@/lib/rate-limit"

export async function registerUser(formData: {
  nama: string
  email: string
  noHP: string
  password: string
}) {
  const rateError = await rateLimitByUser(10)
  if (rateError) return { error: rateError }

  const nama = formData.nama?.trim()
  const email = formData.email?.toLowerCase().trim()
  const noHP = formData.noHP?.trim()
  const password = formData.password

  if (!nama || nama.length < 2) return { error: "Nama minimal 2 karakter" }
  if (nama.length > 100) return { error: "Nama maksimal 100 karakter" }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Email tidak valid" }
  if (!noHP) return { error: "Nomor HP harus diisi" }
  if (!/^0\d{8,13}$/.test(noHP)) return { error: "Nomor HP tidak valid" }
  if (!password || password.length < 8) return { error: "Password minimal 8 karakter" }
  if (password.length > 128) return { error: "Password maksimal 128 karakter" }

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  if (existing) return { error: "Email sudah terdaftar" }
  const hashedPassword = await bcrypt.hash(password, 12)
  await db.insert(users).values({
    id: uuid(),
    name: nama,
    email,
    noHP,
    password: hashedPassword,
    role: "user",
  })
  return { success: true }
}

export async function loginUser(formData: { email: string; password: string }) {
  const rateError = await rateLimitByUser(20)
  if (rateError) return { error: rateError }

  const email = formData.email?.toLowerCase().trim()
  const password = formData.password

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Email tidak valid" }
  if (!password || password.length < 8) return { error: "Password minimal 8 karakter" }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    return { success: true }
  } catch {
    return { error: "Email atau password salah" }
  }
}
