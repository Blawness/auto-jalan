"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function PilihMontirButton({ mekanikId }: { mekanikId: string }) {
  const router = useRouter()

  return (
    <Button
      className="w-full"
      onClick={() => router.push(`/montir/${mekanikId}/jasa`)}
    >
      Pilih Montir Ini
    </Button>
  )
}
