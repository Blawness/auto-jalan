import { formatRupiah } from "@/lib/utils"
import { HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  sparepartTotal: number
  jasaMekanik: number
  biayaKedatangan: number
}

export function HargaBreakdown({
  sparepartTotal,
  jasaMekanik,
  biayaKedatangan,
}: Props) {
  const subtotal = sparepartTotal + jasaMekanik + biayaKedatangan
  const biayaLayanan = Math.round(subtotal * 0.05)
  const totalAkhir = subtotal + biayaLayanan

  return (
    <div className="space-y-3 rounded-xl border bg-white p-4">
      <h3 className="text-sm font-semibold">Rincian Biaya</h3>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Harga Suku Cadang</span>
        <span>{formatRupiah(sparepartTotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="flex items-center gap-1 text-gray-500">
          Biaya Jasa Mekanik
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3.5 w-3.5 cursor-help text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[200px] text-xs">
                Biaya ini adalah tarif standar jasa mekanik yang ditetapkan
                oleh Auto Jalan. Sudah termasuk garansi pengerjaan.
              </p>
            </TooltipContent>
          </Tooltip>
        </span>
        <span>{formatRupiah(jasaMekanik)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Biaya Kedatangan</span>
        <span>{formatRupiah(biayaKedatangan)}</span>
      </div>
      <hr />
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Biaya Layanan Platform (5%)</span>
        <span>{formatRupiah(biayaLayanan)}</span>
      </div>
      <div className="flex justify-between text-base font-bold">
        <span>Total</span>
        <span className="text-blue-600">{formatRupiah(totalAkhir)}</span>
      </div>
    </div>
  )
}
