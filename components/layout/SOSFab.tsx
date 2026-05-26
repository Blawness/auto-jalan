"use client"

import Link from "next/link"
import { Siren } from "lucide-react"

export function SOSFab() {
  return (
    <Link
      href="/sos"
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 shadow-lg transition-colors hover:bg-red-600 animate-pulse"
    >
      <Siren className="h-6 w-6 text-white" />
    </Link>
  )
}
