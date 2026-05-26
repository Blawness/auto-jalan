import { db } from "@/lib/db"
import { forumThreads } from "@/lib/schema"
import { TopBar } from "@/components/layout/TopBar"
import { ThreadCard } from "@/components/forum/ThreadCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function ForumPage() {
  const threads = await db.select().from(forumThreads)

  return (
    <div>
      <TopBar title="Forum" />
      <div className="p-4">
        <Button asChild className="mb-4 w-full">
          <Link href="/forum/ajukan">
            <Plus className="mr-2 h-4 w-4" /> Ajukan Pertanyaan
          </Link>
        </Button>

        {threads.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">Belum ada pertanyaan. Jadilah yang pertama!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {threads.map((t) => (
              <ThreadCard
                key={t.id}
                id={t.id}
                judul={t.judul}
                kategori={t.kategori}
                penulis="User"
                jumlahJawaban={0}
                waktu={new Date(t.createdAt).toLocaleDateString("id-ID")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
