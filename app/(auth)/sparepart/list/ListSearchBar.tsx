"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ListSearchBar({ initialQuery, initialMerek }: { initialQuery: string; initialMerek: string }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (initialMerek) params.set("merek", initialMerek)
    if (query.trim()) params.set("q", query.trim())
    router.push(`/sparepart/list?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-9"
          placeholder="Cari di sini..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit" size="icon" variant="outline">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}
