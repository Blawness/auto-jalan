import Link from "next/link"
import { Star, MapPin } from "lucide-react"

type Props = {
  id: string
  nama: string
  foto: string
  bengkel: string
  rating: number
  jarak: number
  spesialisasi: string[]
}

export function MekanikCard({
  id,
  nama,
  foto,
  bengkel,
  rating,
  jarak,
  spesialisasi,
}: Props) {
  return (
    <Link
      href={`/montir/${id}`}
      className="flex items-center gap-3 rounded-xl border bg-white p-4 transition-shadow hover:shadow-md"
    >
      <img
        src={foto}
        alt={nama}
        className="h-14 w-14 rounded-full object-cover"
        onError={(e) => {
          ;(e.target as HTMLImageElement).src =
            "https://placehold.co/100x100/e2e8f0/64748b?text=..."
        }}
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold">{nama}</h3>
        <p className="text-xs text-gray-500">{bengkel}</p>
        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="flex items-center gap-0.5 text-yellow-500">
            <Star className="h-3 w-3 fill-current" />
            {rating}
          </span>
          <span className="flex items-center gap-0.5 text-gray-400">
            <MapPin className="h-3 w-3" />
            {jarak} km
          </span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {spesialisasi.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] text-blue-600"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
