"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TopBar({ title }: { title: string }) {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="mx-auto flex h-14 max-w-md items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Kembali"
          onClick={() => router.back()}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
    </header>
  )
}
