import { auth, signOut } from "@/lib/auth"
import { TopBar } from "@/components/layout/TopBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { redirect } from "next/navigation"

export default async function AkunPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = session.user
  const initials = (user.name ?? "U").slice(0, 2).toUpperCase()

  return (
    <div>
      <TopBar title="Akun" />
      <div className="space-y-4 p-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold">{user.name ?? "User"}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 pt-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Email</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">No. HP</span>
              <span>{(user as any).noHP ?? "-"}</span>
            </div>
          </CardContent>
        </Card>

        <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/login" })
          }}
        >
          <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
            Keluar
          </Button>
        </form>
      </div>
    </div>
  )
}
