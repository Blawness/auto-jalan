"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { registerUser } from "@/lib/actions/auth"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/lobby"
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nama: "",
    email: "",
    noHP: "",
    password: "",
    konfirmasi: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.konfirmasi) {
      toast.error("Password dan konfirmasi tidak cocok")
      return
    }
    setLoading(true)
    const result = await registerUser({
      nama: form.nama,
      email: form.email,
      noHP: form.noHP,
      password: form.password,
    })
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }
    const signInResult = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    })
    if (signInResult?.error) {
      toast.error("Gagal login otomatis, silakan login manual")
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
    } else {
      router.push(callbackUrl)
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Buat Akun</CardTitle>
          <CardDescription>
            Daftar untuk mulai menggunakan Auto Jalan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nama</Label>
              <Input
                required
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                placeholder="Nama lengkap"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label>No. HP</Label>
              <Input
                required
                value={form.noHP}
                onChange={(e) => setForm({ ...form, noHP: e.target.value })}
                placeholder="0812xxxxxxxx"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                required
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="Minimal 8 karakter"
                minLength={8}
              />
            </div>
            <div>
              <Label>Konfirmasi Password</Label>
              <Input
                required
                type="password"
                value={form.konfirmasi}
                onChange={(e) =>
                  setForm({ ...form, konfirmasi: e.target.value })
                }
                placeholder="Masukkan ulang password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Daftar
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Masuk
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
