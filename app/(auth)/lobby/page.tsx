import { auth } from "@/lib/auth"
import Link from "next/link"
import { ShoppingBag, Wrench, MapPin, Siren, MessageSquare, Info } from "lucide-react"

const menuItems = [
  { href: "/sparepart", label: "Cari Sparepart", icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
  { href: "/montir", label: "Panggil Montir", icon: Wrench, color: "bg-green-100 text-green-600" },
  { href: "/bengkel", label: "Cari Bengkel", icon: MapPin, color: "bg-purple-100 text-purple-600" },
  { href: "/sos", label: "SOS", icon: Siren, color: "bg-red-100 text-red-600" },
  { href: "/forum", label: "Forum", icon: MessageSquare, color: "bg-orange-100 text-orange-600" },
  { href: "/about", label: "About Us", icon: Info, color: "bg-gray-100 text-gray-600" },
]

export default async function LobbyPage() {
  const session = await auth()
  const userName = session?.user?.name ?? "User"

  return (
    <div className="space-y-6 p-4">
      <div className="rounded-xl bg-blue-600 p-5 text-white">
        <p className="text-sm text-blue-100">Selamat datang,</p>
        <h2 className="text-xl font-bold">{userName}</h2>
        <p className="mt-1 text-xs text-blue-200">Butuh bantuan kendaraan hari ini?</p>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-500">LAYANAN</h3>
        <div className="grid grid-cols-3 gap-3">
          {menuItems.map(({ href, label, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-center text-xs font-medium text-gray-700">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
        <div className="flex items-center gap-2">
          <Siren className="h-5 w-5 text-red-500" />
          <p className="text-sm font-medium text-gray-800">
            Darurat? Tekan tombol SOS di kanan bawah layar.
          </p>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Montir terdekat akan langsung dikirim ke lokasi Anda.
        </p>
      </div>
    </div>
  )
}
