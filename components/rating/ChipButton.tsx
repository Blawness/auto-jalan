"use client"

type Props = {
  label: string
  selected: boolean
  onToggle: () => void
}

export function ChipButton({ label, selected, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`rounded-full px-3 py-1 text-sm transition-colors ${
        selected
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  )
}
