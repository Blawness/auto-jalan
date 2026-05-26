"use client"

import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

type Props = { onComplete: () => void }

export function SliderButton({ onComplete }: Props) {
  const [dragged, setDragged] = useState(false)
  const [completed, setCompleted] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const handlePointerDown = useCallback(() => {
    setDragged(true)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragged || !trackRef.current) return
      const track = trackRef.current.getBoundingClientRect()
      const progress = ((e.clientX - track.left) / track.width) * 100
      if (progress > 85 && !completed) {
        setCompleted(true)
        onComplete()
      }
    },
    [dragged, completed, onComplete]
  )

  const handlePointerUp = useCallback(() => {
    setDragged(false)
  }, [])

  return (
    <div
      ref={trackRef}
      className="relative h-14 cursor-pointer select-none overflow-hidden rounded-full bg-green-100"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <motion.div
        className="absolute bottom-1 left-1 top-1 flex items-center rounded-full bg-green-500 px-4"
        animate={{ width: completed ? "calc(100% - 8px)" : "48px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <ChevronRight className="h-5 w-5 text-white" />
        {completed && (
          <span className="ml-2 whitespace-nowrap text-sm font-medium text-white">
            Selesai!
          </span>
        )}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className={`text-sm font-medium ${
            completed ? "opacity-0" : "text-green-700"
          }`}
        >
          Geser jika Service Selesai
        </span>
      </div>
    </div>
  )
}
