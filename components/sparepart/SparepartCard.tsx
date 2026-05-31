"use client"

import Link from "next/link"
import { formatRupiah } from "@/lib/utils"
import { sparepartImage } from "@/lib/sparepart-image"
import { KeaslianBadge } from "./KeaslianBadge"
import { StokBadge } from "./StokBadge"

type Props = {
  id: string
  nama: string
  harga: number
  foto: string
  keaslian: "OEM" | "Aftermarket" | "KW"
  stok: number
}

export function SparepartCard({ id, nama, harga, foto, keaslian, stok }: Props) {
  return (
    <Link
      href={`/sparepart/${id}`}
      className={`block overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md ${
        stok <= 0 ? "pointer-events-none opacity-60" : ""
      }`}
    >
      <div className="relative h-32 bg-gray-100">
        <img
          src={foto?.startsWith("http") ? foto : sparepartImage(nama, id)}
          alt={nama}
          className="h-full w-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              "https://placehold.co/400x300/e2e8f0/64748b?text=No+Image"
          }}
        />
        <div className="absolute left-2 top-2">
          <KeaslianBadge keaslian={keaslian} />
        </div>
      </div>
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-2 text-sm font-medium">{nama}</h3>
        <p className="text-sm font-bold text-blue-600">
          {formatRupiah(harga)}
        </p>
        <StokBadge stok={stok} />
      </div>
    </Link>
  )
}
