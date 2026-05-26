"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type Vehicle = { id: string; merek: string; model: string; tahun: number[]; tipe: "motor" | "mobil" }

export function SparepartFilter({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter()
  const [tipe, setTipe] = useState<"motor" | "mobil" | null>(null)
  const [merek, setMerek] = useState("")
  const [model, setModel] = useState("")
  const [tahun, setTahun] = useState("")

  const filteredByTipe = tipe ? vehicles.filter((v) => v.tipe === tipe) : vehicles
  const merekList = [...new Set(filteredByTipe.map((v) => v.merek))]
  const modelList = merek ? [...new Set(filteredByTipe.filter((v) => v.merek === merek).map((v) => v.model))] : []
  const tahunList = model ? filteredByTipe.find((v) => v.model === model)?.tahun ?? [] : []

  function handleCari() {
    const params = new URLSearchParams()
    if (merek) params.set("merek", merek)
    if (model) params.set("model", model)
    if (tahun) params.set("tahun", tahun)
    router.push(`/sparepart/list?${params.toString()}`)
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-2">
        <Button variant={tipe === "motor" ? "default" : "outline"} className="flex-1" onClick={() => { setTipe("motor"); setMerek(""); setModel(""); setTahun("") }}>Motor</Button>
        <Button variant={tipe === "mobil" ? "default" : "outline"} className="flex-1" onClick={() => { setTipe("mobil"); setMerek(""); setModel(""); setTahun("") }}>Mobil</Button>
      </div>
      <div>
        <Label className="text-xs">Merek</Label>
        <Select value={merek} onValueChange={(v) => { setMerek(v); setModel(""); setTahun("") }}>
          <SelectTrigger><SelectValue placeholder="Pilih merek" /></SelectTrigger>
          <SelectContent>{merekList.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      {merek && (
        <div>
          <Label className="text-xs">Model</Label>
          <Select value={model} onValueChange={(v) => { setModel(v); setTahun("") }}>
            <SelectTrigger><SelectValue placeholder="Pilih model" /></SelectTrigger>
            <SelectContent>{modelList.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      )}
      {model && (
        <div>
          <Label className="text-xs">Tahun</Label>
          <Select value={tahun} onValueChange={setTahun}>
            <SelectTrigger><SelectValue placeholder="Pilih tahun" /></SelectTrigger>
            <SelectContent>{tahunList.map((t) => <SelectItem key={t} value={String(t)}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      )}
      <Button className="w-full" onClick={handleCari} disabled={!merek}>Cari Sparepart</Button>
    </div>
  )
}
