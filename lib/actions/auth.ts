"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { signIn } from "@/lib/auth"
import { v4 as uuid } from "uuid"

export async function registerUser(formData: {
  nama: string
  email: string
  noHP: string
  password: string
}) {
  const email = formData.email.toLowerCase().trim()
  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  if (existing) return { error: "Email sudah terdaftar" }
  const hashedPassword = await bcrypt.hash(formData.password, 12)
  await db.insert(users).values({
    id: uuid(),
    name: formData.nama,
    email,
    noHP: formData.noHP,
    password: hashedPassword,
    role: "user",
  })
  return { success: true }
}

export async function loginUser(formData: { email: string; password: string }) {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })
    return { success: true }
  } catch {
    return { error: "Email atau password salah" }
  }
}
