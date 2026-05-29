"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Search,
  Bell,
  MapPin,
  Car,
  ChevronRight,
  Star,
  Wrench,
  TriangleAlert,
  ShoppingBag,
  MessageSquare,
  LogIn,
  UserPlus,
  Siren,
} from "lucide-react"
import { SafeImage } from "@/components/ui/safe-image"
import { motion, AnimatePresence } from "framer-motion"
import { formatRupiah } from "@/lib/utils"
import { brandIconMap } from "@/lib/brand-icons"

interface SparepartRow {
  id: string
  nama: string
  harga: number
  keaslian: "OEM" | "Aftermarket" | "KW"
  stok: number
  foto: string
}

interface Props {
  isGuest?: boolean
  userName: string
  initial: string
  brands: string[]
  spareparts: SparepartRow[]
}

const layananGrid = [
  { href: "/sparepart", label: "Cari Sparepart", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
  { href: "/montir", label: "Panggil Montir", icon: Wrench, color: "bg-green-50 text-green-600" },
  { href: "/bengkel", label: "Cari Bengkel", icon: MapPin, color: "bg-purple-50 text-purple-600" },
  { href: "/forum", label: "Forum Komunitas", icon: MessageSquare, color: "bg-orange-50 text-orange-600" },
]

const banners = [
  {
    gradient: "from-blue-600 to-blue-800",
    badge: "Promo Spesial",
    offer: "20% OFF",
    title: "Servis Perdana",
    subtitle: "Teknisi bersertifikat siap datang",
    href: "/montir",
    cta: "Pesan Sekarang",
    Icon: Car,
  },
  {
    gradient: "from-green-500 to-emerald-700",
    badge: "Sparepart Ori",
    offer: "1000+",
    title: "Pilihan Suku Cadang",
    subtitle: "OEM, Aftermarket & bergaransi",
    href: "/sparepart",
    cta: "Belanja Sekarang",
    Icon: ShoppingBag,
  },
  {
    gradient: "from-red-500 to-rose-700",
    badge: "SOS Darurat",
    offer: "< 15 min",
    title: "Montir ke Lokasi",
    subtitle: "Respons cepat 24 jam sehari",
    href: "/sos",
    cta: "Panggil Sekarang",
    Icon: Siren,
  },
  {
    gradient: "from-violet-600 to-purple-800",
    badge: "Komunitas",
    offer: "Gratis",
    title: "Forum Otomotif",
    subtitle: "Tanya jawab dengan para ahli",
    href: "/forum",
    cta: "Gabung Sekarang",
    Icon: MessageSquare,
  },
]

function BannerSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((p) => (p + 1) % banners.length)
  }, [])

  useEffect(() => {
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [next])

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 320 : -320, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -320 : 320, opacity: 0 }),
  }

  const { gradient, badge, offer, title, subtitle, href, cta, Icon: BannerIcon } = banners[current]

  return (
    <div className="mx-4 mt-[14px]">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`relative overflow-hidden rounded-[18px] bg-gradient-to-br ${gradient} p-[18px] flex items-center justify-between min-h-[120px]`}
        >
          {/* Decorative background circle */}
          <div className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full bg-white opacity-10" />
          <div className="absolute right-10 bottom-[-30px] h-20 w-20 rounded-full bg-white opacity-10" />

          <div className="relative flex-1 pr-2">
            <span className="inline-block rounded-full bg-white/20 px-[10px] py-[3px] text-[10px] font-semibold text-white">
              {badge}
            </span>
            <div className="mt-1 text-[26px] font-extrabold leading-none text-white">{offer}</div>
            <div className="mt-[2px] text-[13px] font-bold text-white">{title}</div>
            <div className="mt-[2px] text-[11px] text-white/75">{subtitle}</div>
            <Link
              href={href}
              className="mt-3 inline-flex items-center gap-[5px] rounded-[10px] bg-white px-[14px] py-[7px] text-[11px] font-bold text-gray-800"
            >
              {cta}
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="relative flex-shrink-0 opacity-20">
            <BannerIcon className="h-16 w-16 text-white" />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-2 flex justify-center gap-1.5 pb-1">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`h-[6px] rounded-full transition-all ${
              i === current ? "w-[18px] bg-blue-600" : "w-[6px] bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function LobbyClient({ isGuest = false, userName, initial, brands, spareparts }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f9]">
      <div className="sticky top-0 z-40 bg-white">
        <div className="flex items-center justify-between px-4 pb-3 pt-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-[18px] w-[18px] text-blue-600" />
            <div>
              <div className="text-[10px] leading-none text-gray-400">Lokasi saat ini</div>
              <div className="text-[13px] font-bold leading-[1.4] text-blue-600">Jakarta Selatan</div>
            </div>
          </div>
          {isGuest ? (
            <Link
              href="/login"
              className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-4 py-[6px] text-xs font-semibold text-white"
            >
              <LogIn className="h-3.5 w-3.5" />
              Masuk
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gray-100">
                <Bell className="h-4 w-4 text-gray-700" />
              </div>
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-blue-600 text-[13px] font-bold text-white">
                {initial}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ maxHeight: "calc(100vh - 62px)" }}>
        <div className="px-4 pb-0 pt-[14px]">
          <p className="text-xs text-gray-400">
            {isGuest ? "Jelajahi layanan Auto Jalan" : "Selamat datang kembali,"}
          </p>
          <h2 className="mt-[2px] text-[20px] font-bold text-gray-900">{userName}</h2>
        </div>

        {isGuest && (
          <div className="mx-4 mt-3 flex gap-2">
            <Link
              href="/register"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-[10px] text-xs font-bold text-white"
            >
              <UserPlus className="h-4 w-4" />
              Daftar Gratis
            </Link>
            <Link
              href="/login"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-blue-600 bg-white py-[10px] text-xs font-bold text-blue-600"
            >
              <LogIn className="h-4 w-4" />
              Masuk Akun
            </Link>
          </div>
        )}

        <div className="mx-4 mt-3 flex items-center gap-[10px] rounded-[14px] border border-gray-200 bg-white px-[14px] py-[10px]">
          <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
          <span className="flex-1 text-[13px] text-gray-400">Cari sparepart, montir, bengkel...</span>
          <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
            <Search className="h-[14px] w-[14px] text-blue-600" />
          </div>
        </div>

        <BannerSlider />

        <div className="flex items-center justify-between px-4 pb-[10px] pt-4">
          <span className="text-[14px] font-bold text-gray-900">Layanan</span>
        </div>
        <div className="mx-4 grid grid-cols-2 gap-[10px]">
          {layananGrid.map(({ href, label, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-[10px] rounded-[14px] border border-gray-200 bg-white p-[14px_12px]"
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold leading-[1.3] text-gray-900">{label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 pb-[10px] pt-4">
          <span className="text-[14px] font-bold text-gray-900">Brand Kendaraan</span>
          <Link href="/sparepart" className="text-xs font-medium text-blue-600">
            Lihat semua
          </Link>
        </div>
        <div className="flex gap-[10px] overflow-x-auto scrollbar-hide px-4 pb-1">
          {[...brands].sort((a, b) => {
            const aHas = a in brandIconMap ? 0 : 1
            const bHas = b in brandIconMap ? 0 : 1
            return aHas - bHas
          }).slice(0, 8).map((brand) => {
            const BrandIcon = brandIconMap[brand]
            return (
              <Link
                key={brand}
                href={`/sparepart/list?merek=${encodeURIComponent(brand)}`}
                className="flex flex-shrink-0 cursor-pointer flex-col items-center gap-[6px]"
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-[1.5px] border-gray-200 bg-white">
                  {BrandIcon
                    ? <BrandIcon size={28} />
                    : <Car className="h-5 w-5 text-gray-400" />
                  }
                </div>
                <span className="text-[11px] font-medium text-gray-500">{brand}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center justify-between px-4 pb-[10px] pt-4">
          <span className="text-[14px] font-bold text-gray-900">Sparepart Populer</span>
          <Link href="/sparepart" className="text-xs font-medium text-blue-600">
            Lihat semua
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
          {spareparts.map((sp) => (
            <Link
              key={sp.id}
              href={`/sparepart/${sp.id}`}
              className="w-[150px] flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-3"
            >
              <div className="h-20 overflow-hidden rounded-[10px] bg-gray-100">
                <SafeImage src={sp.foto} alt={sp.nama} className="h-full w-full object-cover" />
              </div>
              <div className="mt-[10px] flex items-center gap-[3px] text-[11px] font-semibold text-amber-500">
                <Star className="h-[11px] w-[11px] fill-amber-500" />
                {((4 + (parseInt(sp.id.slice(2)) % 10) * 0.1) % 5).toFixed(1)}
              </div>
              <div className="mt-[3px] text-xs font-bold leading-[1.3] text-gray-900">{sp.nama}</div>
              <div className="mt-[3px] text-xs font-bold text-blue-600">{formatRupiah(sp.harga)}</div>
            </Link>
          ))}
        </div>

        <div className="mx-4 mb-4 mt-[14px] flex gap-[10px] rounded-[14px] border border-orange-200 bg-orange-50 p-[12px_14px]">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] border border-orange-200 bg-white">
            <TriangleAlert className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-orange-900">Darurat di jalan?</div>
            <div className="mt-[2px] text-[11px] leading-[1.4] text-orange-700">
              Tekan tombol SOS — montir terdekat langsung menuju lokasi Anda.
            </div>
          </div>
        </div>

        <div className="h-[68px]" />
      </div>
    </div>
  )
}
