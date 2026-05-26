"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createThread } from "@/lib/actions/forum"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const kategoriOptions = ["Mesin", "Kaki-kaki", "Kelistrikan", "Body", "Oli & Cairan", "Umum"]

export default function AjukanPertanyaanPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [judul, setJudul] = useState("")
  const [kategori, setKategori] = useState("")
  const [deskripsi, setDeskripsi] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await createThread({ judul, kategori, deskripsi })
      toast.success("Pertanyaan berhasil diajukan")
      router.push("/forum")
    } catch {
      toast.error("Gagal mengajukan pertanyaan")
      setLoading(false)
    }
  }

  return (
    <div>
      <TopBar title="Ajukan Pertanyaan" />
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div>
          <Label>Judul</Label>
          <Input required value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Judul pertanyaan" />
        </div>
        <div>
          <Label>Kategori</Label>
          <Select value={kategori} onValueChange={setKategori} required>
            <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
            <SelectContent>{kategoriOptions.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Deskripsi</Label>
          <Textarea required value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Jelaskan pertanyaan Anda secara detail" rows={5} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit
        </Button>
      </form>
    </div>
  )
}
