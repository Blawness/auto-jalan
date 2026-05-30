"use client"
export default function MontirSectionError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold text-red-600">Terjadi Kesalahan</h1>
      <p className="text-sm text-gray-500">Silakan coba lagi</p>
      <button onClick={reset} className="rounded-xl bg-blue-600 px-6 py-2 text-sm text-white font-semibold">Coba Lagi</button>
    </div>
  )
}
