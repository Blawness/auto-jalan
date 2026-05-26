"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (result?.error) {
      toast.error("Email atau password salah")
      setLoading(false)
    } else {
      router.push("/lobby")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Masuk</CardTitle>
          <CardDescription>Masuk ke akun Auto Jalan Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email / No. HP</Label>
              <Input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password Anda"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Masuk
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Daftar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
