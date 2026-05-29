export default function SparepartLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f9] animate-pulse p-4 gap-4">
      <div className="h-12 rounded-xl bg-gray-200" />
      <div className="h-8 w-48 rounded-lg bg-gray-200" />
      <div className="grid grid-cols-2 gap-3">
        {[1,2,3,4].map(i => <div key={i} className="h-40 rounded-xl bg-gray-200" />)}
      </div>
    </div>
  )
}
