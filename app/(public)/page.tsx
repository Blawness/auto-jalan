"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Wrench, ShieldCheck, Zap, ChevronRight } from "lucide-react"

const slides = [
  {
    icon: Wrench,
    title: "Montir Datang ke Lokasi",
    description:
      "Cukup panggil lewat aplikasi, montir terpercaya akan datang ke mana pun kendaraan Anda berada.",
  },
  {
    icon: ShieldCheck,
    title: "Sparepart Asli & Bergaransi",
    description:
      "Beli sparepart dengan jaminan keaslian. Ada label OEM, Aftermarket, dan informasi stok real-time.",
  },
  {
    icon: Zap,
    title: "Darurat? Ada SOS!",
    description:
      "Tombol SOS langsung mencarikan montir terdekat dalam hitungan detik. Live tracking bikin Anda tenang.",
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const slide = slides[step]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <slide.icon className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold">{slide.title}</h2>
          <p className="max-w-xs text-sm text-gray-500">{slide.description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mb-12 mt-8 flex gap-2" role="tablist" aria-label="Slide navigasi">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === step}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setStep(i)}
            className={`h-2 rounded-full transition-all ${
              i === step ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        {step < slides.length - 1 ? (
          <Button onClick={() => setStep(step + 1)} className="w-full">
            Selanjutnya <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <>
            <Button asChild className="w-full">
              <Link href="/register">Buat Akun</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/login">Masuk</Link>
            </Button>
            <Link
              href="/lobby"
              className="mt-2 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Lanjut sebagai Tamu
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
