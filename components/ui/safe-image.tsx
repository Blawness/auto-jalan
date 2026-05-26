"use client"

import { useState } from "react"

type Props = {
  src: string
  alt: string
  className?: string
  fallback?: string
}

export function SafeImage({
  src,
  alt,
  className,
  fallback = "https://placehold.co/400x300/e2e8f0/64748b?text=No+Image",
}: Props) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallback)}
    />
  )
}
