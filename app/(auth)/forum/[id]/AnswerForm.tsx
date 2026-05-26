"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createAnswer } from "@/lib/actions/forum"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function AnswerForm({ threadId }: { threadId: string }) {
  const router = useRouter()
  const [isi, setIsi] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await createAnswer({ threadId, isi })
      setIsi("")
      toast.success("Jawaban terkirim")
      router.refresh()
    } catch {
      toast.error("Gagal mengirim jawaban")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border bg-white p-4">
      <h3 className="text-sm font-semibold">Tulis Jawaban</h3>
      <Textarea required value={isi} onChange={(e) => setIsi(e.target.value)} placeholder="Tulis jawaban Anda..." rows={3} />
      <Button type="submit" disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Kirim Jawaban
      </Button>
    </form>
  )
}
