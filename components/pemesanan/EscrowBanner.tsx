import { ShieldCheck } from "lucide-react"

export function EscrowBanner() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
      <ShieldCheck className="h-6 w-6 text-green-600" />
      <div>
        <p className="text-sm font-medium text-green-800">
          Dana Anda ditahan oleh Auto Jalan
        </p>
        <p className="text-xs text-green-600">
          Dana akan dilepas ke montir setelah Anda konfirmasi service selesai
        </p>
      </div>
    </div>
  )
}
