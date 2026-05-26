type Props = { keaslian: "OEM" | "Aftermarket" | "KW" }

const colors: Record<Props["keaslian"], string> = {
  OEM: "bg-green-100 text-green-800",
  Aftermarket: "bg-blue-100 text-blue-800",
  KW: "bg-yellow-100 text-yellow-800",
}

export function KeaslianBadge({ keaslian }: Props) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[keaslian]}`}>
      {keaslian}
    </span>
  )
}
