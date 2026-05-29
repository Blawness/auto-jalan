"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  AudiIcon, BMWIcon, BYDIcon, ChevroletIcon, FerrariIcon, FordIcon,
  HondaIcon, HyundaiIcon, JeepIcon, KiaIcon, LamborghiniIcon, LandroverIcon,
  LexusIcon, MazdaIcon, MclarenIcon, MBIcon, MiniIcon, MitsubishiIcon,
  NissanIcon, PorscheIcon, RollsRoyceIcon, SubaruIcon, TeslaIcon, ToyotaIcon,
  VinfastIcon, VolkswagenIcon, VolvoIcon,
} from "@cardog-icons/react"
import type { ComponentType } from "react"

type IconProps = { size?: number; className?: string }

const brandIconMap: Record<string, ComponentType<IconProps>> = {
  "Audi": AudiIcon,
  "BMW": BMWIcon,
  "BYD": BYDIcon,
  "Chevrolet": ChevroletIcon,
  "Ferrari": FerrariIcon,
  "Ford": FordIcon,
  "Honda": HondaIcon,
  "Hyundai": HyundaiIcon,
  "Jeep": JeepIcon,
  "KIA": KiaIcon,
  "Lamborghini": LamborghiniIcon,
  "Land Rover": LandroverIcon,
  "Lexus": LexusIcon,
  "Mazda": MazdaIcon,
  "McLaren": MclarenIcon,
  "Mercedes Benz": MBIcon,
  "Mini": MiniIcon,
  "Mitsubishi": MitsubishiIcon,
  "Nissan": NissanIcon,
  "Porsche": PorscheIcon,
  "Rolls Royce": RollsRoyceIcon,
  "Subaru": SubaruIcon,
  "Tesla": TeslaIcon,
  "Toyota": ToyotaIcon,
  "Vinfast": VinfastIcon,
  "Volkswagen": VolkswagenIcon,
  "Volvo": VolvoIcon,
}

export function SparepartFilter({ brands }: { brands: string[] }) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/sparepart/list?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="space-y-4 p-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Cari nama sparepart atau model..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit">Cari</Button>
      </form>

      <div>
        <p className="mb-2 text-xs font-semibold text-gray-500">Pilih Brand</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {brands.map((brand) => {
            const BrandIcon = brandIconMap[brand]
            return (
              <button
                key={brand}
                onClick={() => router.push(`/sparepart/list?merek=${encodeURIComponent(brand)}`)}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-[7px] text-xs font-semibold text-gray-700 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
              >
                {BrandIcon && <BrandIcon size={16} />}
                {brand}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
