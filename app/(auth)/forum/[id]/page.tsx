import { db } from "@/lib/db"
import { forumThreads, forumAnswers } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { TopBar } from "@/components/layout/TopBar"
import { AnswerForm } from "./AnswerForm"

type Props = { params: Promise<{ id: string }> }

export default async function ThreadDetailPage({ params }: Props) {
  const { id } = await params
  const [thread] = await db.select().from(forumThreads).where(eq(forumThreads.id, id)).limit(1)
  if (!thread) notFound()

  const answers = await db.select().from(forumAnswers).where(eq(forumAnswers.threadId, id))

  return (
    <div>
      <TopBar title={thread.judul} />
      <div className="space-y-4 p-4">
        <div className="rounded-xl border bg-white p-4">
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">{thread.kategori}</span>
          <h2 className="mt-2 text-lg font-bold">{thread.judul}</h2>
          <p className="mt-2 text-sm text-gray-600">{thread.deskripsi}</p>
          <p className="mt-3 text-xs text-gray-400">{new Date(thread.createdAt).toLocaleDateString("id-ID")}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">{answers.length} Jawaban</h3>
          <div className="space-y-3">
            {answers.map((a) => (
              <div key={a.id} className="rounded-xl border bg-white p-4">
                <p className="text-sm text-gray-600">{a.isi}</p>
                <p className="mt-2 text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString("id-ID")}</p>
              </div>
            ))}
          </div>
        </div>

        <AnswerForm threadId={id} />
      </div>
    </div>
  )
}
