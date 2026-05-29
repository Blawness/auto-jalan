"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useUiStore } from "@/stores/uiStore"

export default function SOSMencariPage() {
  const router = useRouter()

  useEffect(() => {
    useUiStore.getState().setSOSStatus("mencari")
    const timer = setTimeout(() => {
      const { sosState } = useUiStore.getState()
      if (!sosState.mechId) {
        useUiStore.getState().initSOSTracking({
          mechId: "m1",
          mechName: "Budi Santoso",
          mechFoto: "/images/mekaniks/m1.jpg",
          mechLat: -6.22,
          mechLng: 106.86,
        })
      }
      router.push("/sos/tracking")
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="mb-6"
      >
        <Search className="h-16 w-16 text-red-500" />
      </motion.div>
      <h2 className="mb-2 text-xl font-bold">Sedang mencari montir terdekat...</h2>
      <p className="mb-8 text-sm text-gray-500">Mohon tunggu sebentar</p>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
            className="h-3 w-3 rounded-full bg-red-500"
          />
        ))}
      </div>
    </div>
  )
}
