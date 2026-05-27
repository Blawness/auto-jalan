"use client"

import Link from "next/link"
import {
  Search,
  Bell,
  MapPin,
  Car,
  CarFront,
  Bike,
  ChevronRight,
  Star,
  Wrench,
  TriangleAlert,
  ShoppingBag,
  MessageSquare,
  LogIn,
  UserPlus,
} from "lucide-react"
import { formatRupiah } from "@/lib/utils"

const brandIcons: Record<string, React.ElementType> = {
  Honda: CarFront,
  Toyota: Car,
  Yamaha: Bike,
  Suzuki: Bike,
  Kawasaki: Bike,
  Mitsubishi: CarFront,
  Daihatsu: Car,
  Nissan: Car,
  Mazda: Car,
  Hyundai: Car,
  KIA: Car,
  BMW: Car,
  "Mercedes Benz": Car,
  Wuling: Car,
  Tesla: Car,
  BYD: Car,
  Chery: Car,
}

interface SparepartRow {
  id: string
  nama: string
  harga: number
  keaslian: "OEM" | "Aftermarket" | "KW"
  stok: number
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

      <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 62px)" }}>
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

        <div className="mx-4 mt-[14px] flex items-center justify-between overflow-hidden rounded-[18px] bg-blue-600 p-[18px]">
          <div className="flex-1">
            <span className="inline-block rounded-[20px] bg-white/20 px-[10px] py-[3px] text-[10px] font-semibold text-white">
              Promo Hari Ini
            </span>
            <div className="mt-2 text-[16px] font-bold leading-[1.3] text-white">
              Servis Cepat,<br />Harga Pasti
            </div>
            <Link
              href="/montir"
              className="mt-3 inline-flex items-center gap-[5px] rounded-[10px] bg-white px-[14px] py-2 text-[11px] font-bold text-blue-600"
            >
              Pesan Sekarang
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex flex-shrink-0 items-center justify-center opacity-20">
            <Car className="h-20 w-20 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pb-[10px] pt-4">
          <span className="text-[14px] font-bold text-gray-900">Brand Kendaraan</span>
          <Link href="/sparepart" className="text-xs font-medium text-blue-600">
            Lihat semua
          </Link>
        </div>
        <div className="flex gap-[10px] overflow-x-auto px-4 pb-1">
          {brands.slice(0, 8).map((brand) => {
            const IconComponent = brandIcons[brand] || Car
            const isActive = brand === "Honda"
            return (
              <Link
                key={brand}
                href={`/sparepart/list?merek=${encodeURIComponent(brand)}`}
                className="flex flex-shrink-0 cursor-pointer flex-col items-center gap-[6px]"
              >
                <div
                  className={`flex h-[50px] w-[50px] items-center justify-center rounded-full border-[1.5px] ${
                    isActive
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <IconComponent
                    className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500"}`}
                  />
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
        <div className="flex gap-3 overflow-x-auto px-4 pb-1">
          {spareparts.map((sp) => (
            <Link
              key={sp.id}
              href={`/sparepart/${sp.id}`}
              className="w-[150px] flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-3"
            >
              <div className="flex h-20 items-center justify-center rounded-[10px] bg-gray-100">
                <Wrench className="h-9 w-9 text-gray-300" />
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
