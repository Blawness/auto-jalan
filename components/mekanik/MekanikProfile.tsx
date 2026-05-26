import { Star, MapPin, Award, Car } from "lucide-react"

type Props = {
  nama: string
  foto: string
  bengkel: string
  platKendaraan: string
  sertifikasi: string[]
  rating: number
  jumlahUlasan: number
  jarak: number
  spesialisasi: string[]
}

export function MekanikProfile({
  nama,
  foto,
  bengkel,
  platKendaraan,
  sertifikasi,
  rating,
  jumlahUlasan,
  jarak,
  spesialisasi,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-white p-5 text-center">
        <img
          src={foto}
          alt={nama}
          className="mx-auto h-24 w-24 rounded-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              "https://placehold.co/200x200/e2e8f0/64748b?text=..."
          }}
        />
        <h2 className="mt-3 text-lg font-bold">{nama}</h2>
        <p className="text-sm text-gray-500">{bengkel}</p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
            <Star className="h-4 w-4 fill-current" /> {rating}
          </span>
          <span className="text-xs text-gray-400">
            ({jumlahUlasan} ulasan)
          </span>
          <span className="text-gray-300">&middot;</span>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4" /> {jarak} km
          </span>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border bg-white p-4">
        <div className="flex items-center gap-2 text-sm">
          <Car className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">Plat: {platKendaraan}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <Award className="mt-0.5 h-4 w-4 text-gray-400" />
          <div className="flex flex-wrap gap-1">
            {sertifikasi.map((s) => (
              <span
                key={s}
                className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h3 className="mb-2 text-sm font-semibold">Spesialisasi</h3>
        <div className="flex flex-wrap gap-2">
          {spesialisasi.map((s) => (
            <span
              key={s}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
