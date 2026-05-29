export default function ForumLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f9] animate-pulse p-4 gap-4">
      <div className="h-12 w-full rounded-xl bg-gray-200" />
      <div className="space-y-3">
        {[1,2,3].map(i => (
          <div key={i} className="h-24 rounded-xl bg-gray-200" />
        ))}
      </div>
    </div>
  )
}
