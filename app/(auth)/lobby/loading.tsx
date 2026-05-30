export default function LobbyLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f9] animate-pulse">
      <div className="sticky top-0 z-40 bg-white">
        <div className="flex items-center justify-between px-4 pb-3 pt-3">
          <div className="flex items-center gap-2">
            <div className="h-[18px] w-[18px] rounded-full bg-gray-200" />
            <div className="space-y-1">
              <div className="h-[10px] w-16 rounded bg-gray-200" />
              <div className="h-[13px] w-24 rounded bg-gray-200" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[34px] w-[34px] rounded-full bg-gray-200" />
            <div className="h-[34px] w-[34px] rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="px-4 pt-[14px]">
        <div className="h-3 w-28 rounded bg-gray-200" />
        <div className="mt-[2px] h-5 w-36 rounded bg-gray-200" />
      </div>
      <div className="mx-4 mt-3 flex items-center gap-[10px] rounded-[14px] border border-gray-200 bg-white px-[14px] py-[10px]">
        <div className="h-4 w-4 rounded bg-gray-200" />
        <div className="h-3 flex-1 rounded bg-gray-200" />
        <div className="h-[30px] w-[30px] rounded-lg bg-gray-200" />
      </div>
      <div className="mx-4 mt-[14px]">
        <div className="h-[120px] rounded-[18px] bg-gray-200" />
      </div>
      <div className="flex items-center justify-between px-4 pb-[10px] pt-4">
        <div className="h-4 w-16 rounded bg-gray-200" />
      </div>
      <div className="mx-4 grid grid-cols-2 gap-[10px]">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex items-center gap-[10px] rounded-[14px] border border-gray-200 bg-white p-[14px_12px]">
            <div className="h-10 w-10 rounded-xl bg-gray-200" />
            <div className="h-3 flex-1 rounded bg-gray-200" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-4 pb-[10px] pt-4">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200" />
      </div>
      <div className="flex gap-[10px] overflow-x-auto px-4 pb-1">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex flex-col items-center gap-[6px]">
            <div className="h-[56px] w-[56px] rounded-full border-[1.5px] border-gray-200 bg-gray-100" />
            <div className="h-3 w-12 rounded bg-gray-200" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-4 pb-[10px] pt-4">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200" />
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 pb-1">
        {[1,2,3,4].map(i => (
          <div key={i} className="w-[150px] flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-3">
            <div className="h-20 rounded-[10px] bg-gray-200" />
            <div className="mt-[10px] h-3 w-12 rounded bg-gray-200" />
            <div className="mt-[3px] h-3 w-full rounded bg-gray-200" />
            <div className="mt-1 h-3 w-16 rounded bg-gray-200" />
          </div>
        ))}
      </div>
      <div className="mx-4 mb-4 mt-[14px] rounded-[14px] border border-gray-200 bg-gray-100 p-[12px_14px]">
        <div className="flex items-center gap-[10px]">
          <div className="h-8 w-8 rounded-[10px] bg-gray-200" />
          <div className="space-y-1 flex-1">
            <div className="h-3 w-28 rounded bg-gray-200" />
            <div className="h-3 w-44 rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="h-[68px]" />
    </div>
  )
}
