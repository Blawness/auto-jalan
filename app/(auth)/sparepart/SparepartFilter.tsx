"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Bike, Car } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { brandIconMap } from "@/lib/brand-icons"

type Brand = { merek: string; tipes: ("motor" | "mobil")[] }
type Kategori = "semua" | "motor" | "mobil"

const kategoriTabs: { value: Kategori; label: string; Icon?: typeof Bike }[] = [
  { value: "semua", label: "Semua" },
  { value: "motor", label: "Motor", Icon: Bike },
  { value: "mobil", label: "Mobil", Icon: Car },
]

export function SparepartFilter({ brands }: { brands: Brand[] }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [kategori, setKategori] = useState<Kategori>("semua")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    const tipeParam = kategori === "semua" ? "" : `&tipe=${kategori}`
    router.push(`/sparepart/list?q=${encodeURIComponent(query.trim())}${tipeParam}`)
  }

  function openBrand(merek: string) {
    const tipeParam = kategori === "semua" ? "" : `&tipe=${kategori}`
    router.push(`/sparepart/list?merek=${encodeURIComponent(merek)}${tipeParam}`)
  }

  const visibleBrands = useMemo(
    () =>
      kategori === "semua"
        ? brands
        : brands.filter((b) => b.tipes.includes(kategori)),
    [brands, kategori]
  )

  return (
    <div className="space-y-4 p-4">
      {/* Kategori Mobil / Motor */}
      <div className="flex gap-2">
        {kategoriTabs.map(({ value, label, Icon }) => {
          const active = kategori === value
          return (
            <button
              key={value}
              onClick={() => setKategori(value)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
            </button>
          )
        })}
      </div>

      {/* Search bar langsung (cari nama sparepart / model kendaraan) */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Cari sparepart atau tipe kendaraan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit">Cari</Button>
      </form>

      {/* Grid brand yang bisa di-scroll ke bawah, logo diperbesar */}
      <div>
        <p className="mb-2 text-xs font-semibold text-gray-500">
          Pilih Brand {kategori !== "semua" && `(${kategori})`}
        </p>
        <div className="grid max-h-[55vh] grid-cols-4 gap-x-2 gap-y-4 overflow-y-auto scrollbar-hide pb-2">
          {visibleBrands.map(({ merek }) => {
            const BrandIcon = brandIconMap[merek]
            return (
              <button
                key={merek}
                onClick={() => openBrand(merek)}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-gray-200 bg-white transition-colors hover:border-blue-500 active:scale-95">
                  {BrandIcon ? (
                    <div className="flex h-full w-full items-center justify-center [&_svg]:h-full [&_svg]:w-full [&_svg]:max-w-none [&_svg]:scale-[0.95]">
                      <BrandIcon size={64} />
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-gray-500">
                      {merek.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="line-clamp-1 text-center text-[11px] font-medium text-gray-600">
                  {merek}
                </span>
              </button>
            )
          })}
          {visibleBrands.length === 0 && (
            <p className="col-span-4 py-6 text-center text-sm text-gray-400">
              Tidak ada brand untuk kategori ini
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
