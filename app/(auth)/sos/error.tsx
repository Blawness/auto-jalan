"use client"
export default function SosErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center bg-[#f4f6f9]">
      <h1 className="text-4xl font-bold text-red-600">Error</h1>
      <p className="text-gray-500">Terjadi kesalahan. Silakan coba lagi.</p>
      <button onClick={reset} className="rounded-xl bg-blue-600 px-6 py-2 text-white font-semibold">Coba Lagi</button>
    </div>
  )
}
