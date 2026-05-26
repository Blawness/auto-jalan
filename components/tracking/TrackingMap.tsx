"use client"

import { useEffect, useRef, useMemo } from "react"
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

const userIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const mechIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
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
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markerLayerRef = useRef<L.LayerGroup | null>(null)
  const userMarkerRef = useRef<L.Marker | null>(null)
  const mechMarkerRef = useRef<L.Marker | null>(null)
  const onMarkerClickRef = useRef(onMarkerClick)
  onMarkerClickRef.current = onMarkerClick

  const centerKey = useMemo(() => `${center[0]},${center[1]}`, [center])

  useEffect(() => {
    if (!containerRef.current) return

    const map = L.map(containerRef.current).setView(center, 13)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map)
    mapRef.current = map

    const layerGroup = L.layerGroup().addTo(map)
    markerLayerRef.current = layerGroup

    return () => {
      map.remove()
      mapRef.current = null
      markerLayerRef.current = null
    }
  }, [centerKey])

  useEffect(() => {
    const layerGroup = markerLayerRef.current
    if (!layerGroup) return

    layerGroup.clearLayers()

    markers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], { icon: defaultIcon })
        .bindPopup(
          `<div style="min-width:140px">` +
            `<p style="font-weight:600;font-size:13px;margin:0 0 4px">${m.label}</p>` +
            (m.rating ? `<p style="font-size:12px;margin:0 0 4px">&#11088; ${m.rating}</p>` : "") +
            (m.jamBuka ? `<p style="font-size:11px;color:#666;margin:0 0 6px">${m.jamBuka}</p>` : "") +
            `<a href="/bengkel/${m.id}" style="font-size:12px;color:#2563eb;text-decoration:underline">Lihat Detail</a>` +
            `</div>`
        )
      layerGroup.addLayer(marker)
    })
  }, [markers])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (userMarker) {
      if (!userMarkerRef.current) {
        userMarkerRef.current = L.marker([userMarker.lat, userMarker.lng], { icon: userIcon })
          .addTo(map)
          .bindPopup(userMarker.label)
      } else {
        userMarkerRef.current.setLatLng([userMarker.lat, userMarker.lng])
      }
    }

    if (mechMarker) {
      if (!mechMarkerRef.current) {
        mechMarkerRef.current = L.marker([mechMarker.lat, mechMarker.lng], { icon: mechIcon })
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
