export default function ForumLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f9] animate-pulse">
      <div className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex h-14 max-w-md items-center px-4">
          <div className="h-5 w-5 rounded-full bg-gray-200 mr-3" />
          <div className="h-5 w-32 rounded-lg bg-gray-200" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-md p-4 space-y-3">
        <div className="h-12 w-full rounded-xl bg-gray-200" />
        <div className="flex gap-2 pb-2">
          {[1,2,3,4,5].map(i => <div key={i} className="h-8 w-20 flex-shrink-0 rounded-full bg-gray-200" />)}
        </div>
        <div className="space-y-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/3 rounded bg-gray-200" />
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full rounded bg-gray-200" />
                <div className="h-3 w-5/6 rounded bg-gray-200" />
              </div>
              <div className="mt-3 flex gap-2">
                <div className="h-6 w-16 rounded-full bg-gray-200" />
                <div className="h-6 w-16 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
