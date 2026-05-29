import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { orders } from "@/lib/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { redirect } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { formatRupiah } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function RiwayatPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const allOrders = await db.select().from(orders).where(eq(orders.userId, session.user.id))

  const ongoing = allOrders.filter((o) => o.status === "ongoing")
  const selesai = allOrders.filter((o) => o.status === "selesai")

  return (
    <div>
      <TopBar title="Riwayat" />
      <div className="p-4">
        <Tabs defaultValue="ongoing">
          <TabsList className="w-full">
            <TabsTrigger value="ongoing" className="flex-1">Ongoing</TabsTrigger>
            <TabsTrigger value="selesai" className="flex-1">Selesai</TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="mt-4 space-y-3">
            {ongoing.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">Tidak ada pesanan berjalan</p>
            ) : (
              ongoing.map((o) => (
                <Link key={o.id} href="/pemesanan/ongoing" className="block rounded-xl border bg-white p-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Pesanan #{o.id.slice(0, 8)}</span>
                    <span className="text-blue-600 font-medium">Ongoing</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-blue-600">{formatRupiah(o.totalHarga)}</p>
                  <p className="text-xs text-gray-400">{new Date(o.createdAt).toLocaleDateString("id-ID")}</p>
                </Link>
              ))
            )}
          </TabsContent>

          <TabsContent value="selesai" className="mt-4 space-y-3">
            {selesai.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">Belum ada pesanan selesai</p>
            ) : (
              selesai.map((o) => (
                <div key={o.id} className="rounded-xl border bg-white p-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Pesanan #{o.id.slice(0, 8)}</span>
                    <span className="text-green-600 font-medium">Selesai</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-blue-600">{formatRupiah(o.totalHarga)}</p>
                  <p className="text-xs text-gray-400">{new Date(o.createdAt).toLocaleDateString("id-ID")}</p>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
