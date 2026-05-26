"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Search } from "lucide-react"
import { useUiStore } from "@/stores/uiStore"

export default function SOSMencariPage() {
  const router = useRouter()
  const setSOSStatus = useUiStore((s) => s.setSOSStatus)
  const initSOSTracking = useUiStore((s) => s.initSOSTracking)

  useEffect(() => {
    setSOSStatus("mencari")
    const timer = setTimeout(() => {
      initSOSTracking({
        mechId: "m1",
        mechName: "Budi Santoso",
        mechFoto: "/images/mekaniks/m1.jpg",
        mechLat: -6.22,
        mechLng: 106.86,
      })
      router.push("/sos/tracking")
    }, 3000)
    return () => clearTimeout(timer)
  }, [router, setSOSStatus, initSOSTracking])

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
      <p className="mb-6 text-sm text-gray-500">Mohon tunggu sebentar</p>
      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      <div className="mt-8 flex gap-1">
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
