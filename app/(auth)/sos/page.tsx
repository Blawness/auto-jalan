import { TopBar } from "@/components/layout/TopBar"
import { SOSClient } from "./SOSClient"

export default function SOSPage() {
  return (
    <div>
      <TopBar title="SOS Darurat" />
      <SOSClient />
    </div>
  )
}
