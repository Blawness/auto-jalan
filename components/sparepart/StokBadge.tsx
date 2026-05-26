type Props = { stok: number }

export function StokBadge({ stok }: Props) {
  if (stok <= 0) {
    return (
      <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
        Kosong
      </span>
    )
  }
  if (stok <= 3) {
    return (
      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">
        Sisa {stok}
      </span>
    )
  }
  return (
    <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
      Tersedia
    </span>
  )
}
