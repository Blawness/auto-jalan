import { db } from "@/lib/db"
import { spareparts } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { SafeImage } from "@/components/ui/safe-image"
import { KeaslianBadge } from "@/components/sparepart/KeaslianBadge"
import { StokBadge } from "@/components/sparepart/StokBadge"
import { formatRupiah } from "@/lib/utils"
import { AddToCartButton } from "./AddToCartButton"
import { Star } from "lucide-react"

type Props = { params: Promise<{ id: string }> }

export default async function SparepartDetailPage({ params }: Props) {
  const { id } = await params
  const [part] = await db.select().from(spareparts).where(eq(spareparts.id, id)).limit(1)
  if (!part) notFound()

  return (
    <div>
      <TopBar title="Detail Sparepart" />
      <div className="space-y-4 p-4">
        <div className="flex h-56 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
          <SafeImage src={part.foto} alt={part.nama} className="h-full w-full object-cover" />
        </div>
        <div className="flex items-start justify-between">
          <div><h2 className="text-lg font-bold">{part.nama}</h2><p className="mt-1 text-xl font-bold text-blue-600">{formatRupiah(part.harga)}</p></div>
          <KeaslianBadge keaslian={part.keaslian} />
        </div>

        <StokBadge stok={part.stok} />

        <div className="rounded-xl bg-gray-50 p-4">
          <h3 className="mb-2 text-sm font-semibold">Spesifikasi</h3>
          <div className="space-y-1 text-sm text-gray-600">
            {Object.entries(part.spesifikasi).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-500">{key}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <h3 className="mb-2 text-sm font-semibold">Deskripsi Produk</h3>
          <p className="text-sm leading-relaxed text-gray-600">
            Produk ini dirancang untuk memberikan performa terbaik pada kendaraan Anda. Dengan bahan
            berkualitas tinggi dan proses produksi yang ketat, sparepart ini terjamin keaslian dan
            ketahanannya. Cocok digunakan untuk berbagai model kendaraan.
          </p>
        </div>

        <AddToCartButton partId={part.id} stok={part.stok} />

        {/* Ulasan Pembeli */}
        <div className="space-y-3 rounded-xl border bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Ulasan Pembeli</h3>
            <div className="flex items-center gap-1 text-sm font-semibold text-amber-700">
              <Star className="h-4 w-4 fill-amber-500" />
              4.7
              <span className="text-xs font-normal text-gray-500">(24 ulasan)</span>
            </div>
          </div>
          {[
            { nama: "Andi S.", rating: 5, teks: "Barang original, cepat sampai. Pemasangan mudah dan hasilnya bagus!", waktu: "2 hari lalu" },
            { nama: "Budi R.", rating: 4, teks: "Kualitas sesuai harga. Cocok untuk motor harian.", waktu: "1 minggu lalu" },
          ].map((ulasan, i) => (
            <div key={i} className="border-t pt-3 first:border-0 first:pt-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{ulasan.nama}</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-3 w-3 ${j < ulasan.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-600">{ulasan.teks}</p>
              <p className="mt-1 text-[10px] text-gray-500">{ulasan.waktu}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
