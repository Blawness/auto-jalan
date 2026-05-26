"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const defaultIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

type MarkerData = {
  id: string
  lat: number
  lng: number
  label: string
  rating?: number
  jamBuka?: string
}

type Props = {
  center: [number, number]
  markers: MarkerData[]
  onMarkerClick?: (id: string) => void
  userMarker?: { lat: number; lng: number; label: string }
  mechMarker?: { lat: number; lng: number; label: string }
  height?: string
}

export function TrackingMap({
  center,
  markers,
  onMarkerClick,
  userMarker,
  mechMarker,
  height = "h-[calc(100vh-10rem)]",
}: Props) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const userMarkerRef = useRef<L.Marker | null>(null)
  const mechMarkerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    const map = L.map(containerRef.current).setView(center, 13)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map)
    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [center])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const existing = markersRef.current
    const newIds = new Set(markers.map((m) => m.id))
    existing.forEach((marker, id) => {
      if (!newIds.has(id)) {
        marker.remove()
        existing.delete(id)
      }
    })
    markers.forEach((m) => {
      if (existing.has(m.id)) {
        existing.get(m.id)!.setLatLng([m.lat, m.lng])
      } else {
        const marker = L.marker([m.lat, m.lng], { icon: defaultIcon })
          .addTo(map)
          .bindPopup(
            `<div class="p-1">` +
              `<p class="font-semibold text-sm">${m.label}</p>` +
              (m.rating ? `<p class="text-xs">Star ${m.rating}</p>` : "") +
              (m.jamBuka ? `<p class="text-xs text-gray-500">${m.jamBuka}</p>` : "") +
              `<button onclick="window.__bengkelClick&&window.__bengkelClick('${m.id}')" class="mt-1 text-xs text-blue-600 hover:underline">Lihat Detail</button>` +
            `</div>`
          )
        marker.on("popupopen", () => {
          if (onMarkerClick) {
            ;(window as any).__bengkelClick = (id: string) => onMarkerClick(id)
          }
        })
        existing.set(m.id, marker)
      }
    })
  }, [markers, onMarkerClick])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (userMarker) {
      if (!userMarkerRef.current) {
        userMarkerRef.current = L.marker(
          [userMarker.lat, userMarker.lng],
          {
            icon: L.icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
              shadowUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            }),
          }
        )
          .addTo(map)
          .bindPopup(userMarker.label)
      } else {
        userMarkerRef.current.setLatLng([userMarker.lat, userMarker.lng])
      }
    }
    if (mechMarker) {
      if (!mechMarkerRef.current) {
        mechMarkerRef.current = L.marker(
          [mechMarker.lat, mechMarker.lng],
          {
            icon: L.icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
              shadowUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            }),
          }
        )
          .addTo(map)
          .bindPopup(mechMarker.label)
      } else {
        mechMarkerRef.current.setLatLng([mechMarker.lat, mechMarker.lng])
      }
    }
  }, [userMarker, mechMarker])

  return (
    <div
      ref={containerRef}
      className={`${height} w-full overflow-hidden rounded-xl border`}
    />
  )
}
