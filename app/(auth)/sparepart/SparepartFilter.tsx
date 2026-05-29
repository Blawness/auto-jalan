"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => router.push(`/sparepart/list?merek=${encodeURIComponent(brand)}`)}
              className="flex-shrink-0 rounded-full border border-gray-200 bg-white px-4 py-[7px] text-xs font-semibold text-gray-700 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
