import Link from "next/link"
import { MessageSquare } from "lucide-react"

type Props = {
  id: string
  judul: string
  kategori: string
  penulis: string
  jumlahJawaban: number
  waktu: string
}

export function ThreadCard({
  id,
  judul,
  kategori,
  penulis,
  jumlahJawaban,
  waktu,
}: Props) {
  return (
    <Link
      href={`/forum/${id}`}
      className="block rounded-xl border bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="mb-1">
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
          {kategori}
        </span>
      </div>
      <h3 className="text-sm font-semibold">{judul}</h3>
      <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
        <span>{penulis}</span>
        <span>{waktu}</span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          {jumlahJawaban}
        </span>
      </div>
    </Link>
  )
}
