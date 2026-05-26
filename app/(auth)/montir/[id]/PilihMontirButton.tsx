"use client"

import { Button } from "@/components/ui/button"
import { useUiStore } from "@/stores/uiStore"
import { useRouter } from "next/navigation"

export function PilihMontirButton({ mekanikId }: { mekanikId: string }) {
  const setSelectedMekanik = useUiStore((s) => s.setSelectedMekanik)
  const router = useRouter()

  return (
    <Button
      className="w-full"
      onClick={() => {
        setSelectedMekanik(mekanikId)
        router.push("/pemesanan/checkout")
      }}
    >
      Pilih Montir Ini
    </Button>
  )
}
