"use client"

import Link from "next/link"
import { formatRupiah } from "@/lib/utils"
import { useUiStore } from "@/stores/uiStore"
import { Wrench, Droplets, Cog, CircleGauge, Zap, Wind, CircleDot, Gauge } from "lucide-react"

const iconMap: Record<string, React.ElementType> = { Wrench, Droplets, Cog, CircleGauge, Zap, Wind, CircleDot, Gauge }

type Service = { id: string; nama: string; deskripsi: string; hargaJasa: number; estimasiWaktu: string; ikon: string }

export function ServiceCard({ service }: { service: Service }) {
  const setSelectedService = useUiStore((s) => s.setSelectedService)
  const Icon = iconMap[service.ikon] ?? Wrench

  return (
    <Link
      href={`/montir/list?serviceId=${service.id}`}
      onClick={() => setSelectedService(service.id)}
      className="flex items-start gap-3 rounded-xl border bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold">{service.nama}</h3>
        <p className="mt-0.5 text-xs text-gray-500">{service.deskripsi}</p>
        <div className="mt-2 flex items-center gap-3 text-xs">
          <span className="font-semibold text-blue-600">{formatRupiah(service.hargaJasa)}</span>
          <span className="text-gray-400">&middot;</span>
          <span className="text-gray-500">{service.estimasiWaktu}</span>
        </div>
      </div>
    </Link>
  )
}
