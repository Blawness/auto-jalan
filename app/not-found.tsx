import Link from "next/link"
export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-gray-500">Halaman tidak ditemukan</p>
      <Link href="/" className="rounded-xl bg-blue-600 px-6 py-2 text-white">Kembali ke Beranda</Link>
    </div>
  )
}
