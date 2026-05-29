"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useUiStore } from "@/stores/uiStore"
import { formatRupiah } from "@/lib/utils"
import { toast } from "sonner"

type Service = { id: string; nama: string; deskripsi: string; hargaJasa: number; estimasiWaktu: string; ikon: string }

type JasaItem = {
  label: string
  harga: number
  serviceId: string | null
}

function buildJasaList(spesialisasi: string[], allServices: Service[]): JasaItem[] {
  return spesialisasi.map((spec) => {
    const matched = allServices.find((s) =>
      s.nama.toLowerCase().includes(spec.toLowerCase()) ||
      spec.toLowerCase().includes(s.nama.toLowerCase())
    )
    return {
      label: spec,
      harga: matched?.hargaJasa ?? 75000,
      serviceId: matched?.id ?? null,
    }
  })
}

export function JasaClient({
  mekanikId,
  mekanikNama,
  spesialisasi,
  allServices,
}: {
  mekanikId: string
  mekanikNama: string
  spesialisasi: string[]
  allServices: Service[]
}) {
  const router = useRouter()
  const setSelectedMekanik = useUiStore((s) => s.setSelectedMekanik)
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const jasaList = buildJasaList(spesialisasi, allServices)

  function toggle(i: number) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  function handleLanjut() {
    if (selected.size === 0) {
      toast.error("Pilih minimal satu jasa")
      return
    }
    setSelectedMekanik(mekanikId)
    router.push("/pemesanan/checkout")
  }

  const totalHarga = [...selected].reduce((sum, i) => sum + jasaList[i].harga, 0)

  return (
    <div>
      <TopBar title="Pilih Jasa" />
      <div className="space-y-4 p-4">
        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-gray-500">Jasa yang ditawarkan oleh</p>
          <p className="text-sm font-bold text-gray-900">{mekanikNama}</p>
        </div>

        <div className="space-y-2">
          {jasaList.map((jasa, i) => {
            const isSelected = selected.has(i)
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                  isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{jasa.label}</span>
                </div>
                <span className="text-sm font-semibold text-blue-600">{formatRupiah(jasa.harga)}</span>
              </button>
            )
          })}
        </div>

        {selected.size > 0 && (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm">
            <div className="flex justify-between font-semibold">
              <span>Total Estimasi Jasa</span>
              <span className="text-blue-600">{formatRupiah(totalHarga)}</span>
            </div>
          </div>
        )}

        <Button className="w-full" onClick={handleLanjut}>
          Lanjut ke Checkout ({selected.size} jasa dipilih)
        </Button>
      </div>
    </div>
  )
}
