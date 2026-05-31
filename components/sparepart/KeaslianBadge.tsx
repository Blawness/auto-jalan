type Props = { keaslian: "OEM" | "Aftermarket" | "KW" }

// OEM = sparepart asli pabrikan, Aftermarket = produsen pihak ketiga, KW = tiruan.
const meta: Record<Props["keaslian"], { label: string; className: string }> = {
  OEM: { label: "Ori", className: "bg-green-100 text-green-800" },
  Aftermarket: { label: "Third Party", className: "bg-blue-100 text-blue-800" },
  KW: { label: "KW", className: "bg-yellow-100 text-yellow-800" },
}

export function KeaslianBadge({ keaslian }: Props) {
  const { label, className } = meta[keaslian]
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
