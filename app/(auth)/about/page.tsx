import { TopBar } from "@/components/layout/TopBar"

export default function AboutPage() {
  return (
    <div>
      <TopBar title="About Us" />
      <div className="space-y-4 p-4">
        <div className="rounded-xl border bg-white p-5">
          <h2 className="mb-2 text-lg font-bold">Auto Jalan</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Auto Jalan adalah platform layanan kendaraan on-demand yang menghubungkan Anda dengan montir dan bengkel terpercaya di sekitar. Kami hadir untuk memudahkan perawatan kendaraan Anda — kapan pun, di mana pun.
          </p>
        </div>
        <div className="space-y-3 rounded-xl border bg-white p-5">
          <h3 className="text-md font-semibold">Fitur Utama</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2"><span className="font-medium text-blue-600">&#10003;</span>Cost Transparency — Harga transparan tanpa biaya tersembunyi</li>
            <li className="flex gap-2"><span className="font-medium text-blue-600">&#10003;</span>Sparepart Validation — Jaminan keaslian sparepart OEM/Aftermarket</li>
            <li className="flex gap-2"><span className="font-medium text-blue-600">&#10003;</span>Emergency Responsiveness — Tombol SOS dengan live tracking</li>
            <li className="flex gap-2"><span className="font-medium text-blue-600">&#10003;</span>Digital Trust — Sistem escrow dan slider konfirmasi</li>
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <h3 className="text-md mb-2 font-semibold">Kontak</h3>
          <p className="text-sm text-gray-600">Vorca Studio — Yudha Hafiz</p>
          <p className="text-sm text-gray-600">Prototype v2.0 — 2026</p>
        </div>
      </div>
    </div>
  )
}
