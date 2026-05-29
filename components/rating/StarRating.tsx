"use client"

import { useState } from "react"
import { Star } from "lucide-react"

type Props = {
  value: number
  onChange: (value: number) => void
  max?: number
}

export function StarRating({ value, onChange, max = 5 }: Props) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const filled = starValue <= (hovered || value)
        return (
          <button
            key={i}
            type="button"
            aria-label={`Rating ${starValue} dari ${max}`}
            className="transition-transform hover:scale-110"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
          >
            <Star
              className={`h-7 w-7 ${
                filled
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
