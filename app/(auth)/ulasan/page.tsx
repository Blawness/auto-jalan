"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { StarRating } from "@/components/rating/StarRating"
import { ChipButton } from "@/components/rating/ChipButton"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { submitReview } from "@/lib/actions/reviews"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const quickChips = ["Montir Ramah", "Datang Tepat Waktu", "Pengerjaan Rapi", "Harga Sesuai"]

export default function UlasanPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [ratingMekanik, setRatingMekanik] = useState(0)
  const [ratingSparepart, setRatingSparepart] = useState(0)
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [teks, setTeks] = useState("")

  function toggleChip(chip: string) {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    )
  }

  async function handleSubmit() {
    if (ratingMekanik === 0) {
      toast.error("Berikan rating untuk mekanik")
      return
    }
    setLoading(true)
    try {
      await submitReview({
        mekanikId: "m1",
        orderId: "dummy",
        ratingMekanik,
        ratingSparepart: ratingSparepart > 0 ? ratingSparepart : undefined,
        tags: selectedChips,
        teks: teks || undefined,
      })
      toast.success("Ulasan terkirim!")
      router.push("/lobby")
    } catch {
      toast.error("Gagal mengirim ulasan")
      setLoading(false)
    }
  }

  return (
    <div>
      <TopBar title="Beri Ulasan" />
      <div className="space-y-6 p-4">
        <div className="rounded-xl border bg-white p-4 text-center">
          <h3 className="mb-2 text-sm font-semibold">Rating Mekanik</h3>
          <div className="flex justify-center">
            <StarRating value={ratingMekanik} onChange={setRatingMekanik} />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 text-center">
          <h3 className="mb-2 text-sm font-semibold">Kualitas Suku Cadang</h3>
          <div className="flex justify-center">
            <StarRating value={ratingSparepart} onChange={setRatingSparepart} />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold">Tag</h3>
          <div className="flex flex-wrap gap-2">
            {quickChips.map((chip) => (
              <ChipButton
                key={chip}
                label={chip}
                selected={selectedChips.includes(chip)}
                onToggle={() => toggleChip(chip)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-2 text-sm font-semibold">Ulasan (opsional)</h3>
          <Textarea
            placeholder="Ceritakan pengalaman Anda..."
            value={teks}
            onChange={(e) => setTeks(e.target.value)}
            rows={3}
          />
        </div>

        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Kirim Ulasan
        </Button>

        <div className="text-center">
          <Link
            href="/lobby"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Nanti Saja
          </Link>
        </div>
      </div>
    </div>
  )
}
