"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const daerah = ["Jakarta Selatan", "Jakarta Utara", "Jakarta Timur", "Jakarta Barat", "Jakarta Pusat"]

export default function BengkelPage() {
  const router = useRouter()
  const [selected, setSelected] = useState("")

  return (
    <div>
      <TopBar title="Cari Bengkel" />
      <div className="space-y-4 p-4">
        <div>
          <Label className="text-xs">Pilih Daerah</Label>
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger><SelectValue placeholder="Pilih daerah" /></SelectTrigger>
            <SelectContent>{daerah.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <Button className="w-full" onClick={() => router.push(`/bengkel/map?daerah=${selected}`)} disabled={!selected}>Lihat Peta</Button>
      </div>
    </div>
  )
}
