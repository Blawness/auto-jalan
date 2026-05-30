export default function SparepartLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f9] animate-pulse">
      <div className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex h-14 max-w-md items-center px-4">
          <div className="h-5 w-5 rounded-full bg-gray-200 mr-3" />
          <div className="h-5 w-32 rounded-lg bg-gray-200" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-md p-4 space-y-4">
        <div className="h-12 w-full rounded-xl bg-gray-200" />
        <div className="flex gap-2 overflow-x-auto">
          {[1,2,3,4,5].map(i => <div key={i} className="h-8 w-20 flex-shrink-0 rounded-full bg-gray-200" />)}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-3">
              <div className="h-28 rounded-[10px] bg-gray-200" />
              <div className="mt-2 h-3 w-12 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-full rounded bg-gray-200" />
              <div className="mt-1 h-4 w-20 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
