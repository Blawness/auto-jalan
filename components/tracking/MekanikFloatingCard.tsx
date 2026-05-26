"use client"

import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type Props = {
  nama: string
  foto: string
  eta: number
  distance: string
}

export function MekanikFloatingCard({
  nama,
  foto,
  eta,
  distance,
}: Props) {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-30 rounded-xl border bg-white p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src={foto}
          alt={nama}
          className="h-12 w-12 rounded-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              "https://placehold.co/100x100/e2e8f0/64748b?text=..."
          }}
        />
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{nama}</h3>
          <p className="text-xs text-green-600">
            {distance} &middot; {eta} menit
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => toast.info("Fitur segera hadir")}
        >
          <MessageCircle className="mr-1 h-4 w-4" /> Chat
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => toast.info("Fitur segera hadir")}
        >
          <Phone className="mr-1 h-4 w-4" /> Telepon
        </Button>
      </div>
    </div>
  )
}
