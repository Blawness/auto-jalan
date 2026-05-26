import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Auto Jalan",
  description: "Layanan kendaraan on-demand terpercaya",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${geist.className} bg-gray-50 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
