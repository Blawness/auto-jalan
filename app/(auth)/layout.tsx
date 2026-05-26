import { BottomNavbar } from "@/components/layout/BottomNavbar"
import { SOSFab } from "@/components/layout/SOSFab"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="mx-auto min-h-screen max-w-md bg-gray-50 pb-16">
      {children}
      <BottomNavbar />
      <SOSFab />
    </div>
  )
}
